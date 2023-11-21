import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  useMediaQuery,
  Text,
  Flex,
} from "@chakra-ui/react";
import Loader from "components/styled-components/Loader";

import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import ssIconAnimation from "./quickscan_bg.json";
import { isInViewport } from "common/functions";
import { BlockchainSelector } from "components/common/BlockchainSelector";

const QuickScanForm: React.FC<{
  view: "landing" | "quickscan";
  runQuickScan: (
    address: string,
    platform: string,
    chain: string,
    ref: string | null
  ) => Promise<void>;
  isLoading: boolean;
}> = ({ runQuickScan, isLoading, view }) => {
  const location = useLocation();
  const [stopAnimation, isDesktopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 1000px)",
  ]);
  const query = new URLSearchParams(location.search);
  const ref = query.get("ref");

  const [address, setAddress] = React.useState("");
  const [adddressError, setAddressError] = useState("");
  const [blockchainSelectorError, setBlockchainSelectorError] = useState("");
  const [platform, setPlatform] = React.useState("");
  const [node_id, setNodeId] = React.useState("");
  const [chain, setChain] = React.useState<{
    label: string;
    value: string;
    icon: string;
    website: string;
  } | null>(null);

  const quickscanRef = useRef<HTMLDivElement>(null);
  const contractAddressRef = useRef<HTMLInputElement>(null);
  const [animationOffset, setAnimationOffset] = useState(60);

  const generateQuickScan = () => {
    if (platform === "") {
      setBlockchainSelectorError(
        "Please select a Platform to perform the scan"
      );
      return;
    }
    if (!chain && platform !== "buildbear") {
      setBlockchainSelectorError("Please select a Chain to perform the scan");
      return;
    }

    if (!node_id && platform === "buildbear") {
      setBlockchainSelectorError("Please enter a Node ID to perform the scan");
      return;
    }

    if (address === "") {
      setAddressError("Please enter an address to perform the scan");
      return;
    }

    if (platform === "buildbear") {
      runQuickScan(address, platform, node_id, ref);
    } else {
      if (chain) {
        runQuickScan(address, platform, chain.value, ref);
      }
    }
  };

  const styleObj = {
    height: isDesktopView ? "100%" : "auto",
    width: "100%",
    maxWidth: isDesktopView ? "100%" : "500px",
    position: isDesktopView ? "absolute" : ("relative" as any),
    top: 0,
    left: 0,
    zIndex: 0,
  };

  useEffect(() => {
    if (ref) {
      localStorage.setItem("campaign_type", ref);
      localStorage.setItem("campaign_id", ref);
      sessionStorage.setItem("ref", ref);
    } else if (
      !localStorage.getItem("campaign_id") &&
      !localStorage.getItem("campaign_type")
    ) {
      const campaign_type = query.get("utm_source") || "quickscan";
      const campaign_id = query.get("utm_campaign") || "quickscan";
      localStorage.setItem("campaign_type", campaign_type);
      localStorage.setItem("campaign_id", campaign_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    const element = document.getElementById("public_layout");
    if (view === "quickscan") {
      setPlayAnimation(true);
      setTimeout(() => setIsVisible(true), 1500);
    } else {
      if (element) {
        element.addEventListener("scroll", function (event) {
          if (isInViewport(quickscanRef.current, setAnimationOffset)) {
            setIsVisible(true);
            setPlayAnimation(true);
          } else {
            setIsVisible(false);
          }
        });
      }
    }

    return () => {
      element?.removeEventListener("scroll", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectorClose = () => {
    if (contractAddressRef && contractAddressRef.current) {
      contractAddressRef.current.focus();
    }
  };

  return (
    <Box w="100%" h="fit-content" position="relative" ref={quickscanRef}>
      {isDesktopView && playAnimation ? (
        <Lottie animationData={ssIconAnimation} style={styleObj} loop={false} />
      ) : null}
      <Box
        position="relative"
        flexDir={"column"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
        w={"100%"}
        h={[
          "fit-content",
          "fit-content",
          "fit-content",
          view === "landing" ? "100vh" : "90vh",
        ]}
        px={[0, 0, 10]}
        pt={6}
        pb={isDesktopView ? 20 : "50px"}
        textAlign="center"
      >
        <Heading
          w={["90%", "90%", "80%", "60%"]}
          color={view === "landing" ? "black" : "white"}
          fontSize={["3xl", "4xl"]}
          mb={4}
          mt={isDesktopView ? 0 : 8}
          opacity={stopAnimation || isVisible ? 1 : 0}
          transform={
            stopAnimation
              ? "none"
              : `translateY(${isVisible ? 0 : animationOffset}px)`
          }
          transition={
            stopAnimation
              ? "none"
              : "opacity 0.25s ease-in, transform 0.5s ease-in"
          }
        >
          SolidityScan{" "}
          <Box
            as="span"
            sx={{
              background:
                "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            QuickScan
          </Box>
        </Heading>
        <Text
          w={["90%", "90%", "80%", "60%"]}
          fontWeight={500}
          color="subtle"
          mb={8}
          opacity={stopAnimation || isVisible ? 1 : 0}
          transform={
            stopAnimation
              ? "none"
              : `translateY(${isVisible ? 0 : animationOffset}px)`
          }
          transition={
            stopAnimation
              ? "none"
              : "opacity 0.25s ease-in, transform 0.5s ease-in"
          }
        >
          Experience an accessible, user-friendly threat scanner that presents
          results in simple terms. Begin a smart contract scan by choosing from
          a wide selection of supported protocols and receive a clear, concise
          analysis report in a matter of seconds.
        </Text>
        <Flex
          mt={1}
          justify="center"
          alignItems="center"
          w={"100%"}
          zIndex={1000}
          flexDirection={"column"}
          opacity={stopAnimation || isVisible ? 1 : 0}
          transform={
            stopAnimation
              ? "none"
              : `translateY(${isVisible ? 0 : animationOffset}px)`
          }
          transition={
            stopAnimation
              ? "none"
              : "opacity 0.25s ease-in, transform 0.5s ease-in"
          }
        >
          <BlockchainSelector
            theme={view === "quickscan" ? "dark" : "light"}
            view="quickscan"
            chain={chain}
            node_id={node_id}
            setNodeId={setNodeId}
            setChain={setChain}
            setPlatform={setPlatform}
            platform={platform}
            menuPlacement="bottom"
            blockchainSelectorError={blockchainSelectorError}
            setBlockchainSelectorError={setBlockchainSelectorError}
            onSelectorClose={onSelectorClose}
          />
          <Text
            w="100%"
            color={"critical"}
            fontSize={"sm"}
            mt={2}
            textAlign="center"
          >
            {blockchainSelectorError || " "}
          </Text>
          <Input
            isRequired
            ref={contractAddressRef}
            type={"text"}
            placeholder="Type or paste your contract address here..."
            variant={"brand"}
            size="lg"
            isInvalid={adddressError !== ""}
            errorBorderColor={"#960D00"}
            color={view === "quickscan" ? "white" : "gray.800"}
            _placeholder={{
              color: view === "quickscan" ? "gray.400" : "gray.500",
            }}
            height={50}
            mt={blockchainSelectorError === "" ? 14 : 10}
            borderColor={view === "quickscan" ? "gray.600" : "gray.200"}
            backgroundColor={view === "quickscan" ? "#272727" : "#FFFFFF"}
            borderRadius={15}
            width={isDesktopView ? "50%" : "90%"}
            maxWidth="800px"
            textAlign={"center"}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <Text
            w="100%"
            color={"critical"}
            fontSize={"sm"}
            mt={2}
            textAlign="center"
          >
            {adddressError}
          </Text>
        </Flex>

        <Button
          isLoading={isLoading}
          loadingText="Scanning"
          spinner={<Loader color={"#3300FF"} size={20} />}
          mt={isDesktopView ? "auto" : 10}
          mb={isDesktopView ? 6 : "120px"}
          w={"300px"}
          type="submit"
          variant="brand"
          onClick={generateQuickScan}
          opacity={stopAnimation || isVisible ? 1 : 0}
          transform={
            stopAnimation
              ? "none"
              : `translateY(${isVisible ? 0 : animationOffset}px)`
          }
          transition={
            stopAnimation
              ? "none"
              : "opacity 0.25s ease-in, transform 0.5s ease-in"
          }
        >
          Start Scan
        </Button>
      </Box>
    </Box>
  );
};

export default QuickScanForm;

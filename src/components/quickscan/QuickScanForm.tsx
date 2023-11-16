import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Input,
  Button,
  useMediaQuery,
  useToast,
  Text,
  Flex,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  VStack,
  Image,
} from "@chakra-ui/react";
import Loader from "components/styled-components/Loader";
import { StylesConfig, GroupBase } from "react-select";
import { OptionTypeWithIcon } from "common/types";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { contractChain, platforms } from "common/values";
import Select from "react-select";
import { useLocation, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import ssIconAnimation from "./quickscan_bg.json";
import { isInViewport } from "common/functions";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
  const toast = useToast();
  const location = useLocation();
  const [stopAnimation, isDesktopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 1000px)",
  ]);
  const query = new URLSearchParams(location.search);
  const ref = query.get("ref");
  const { blockAddress, blockPlatform, blockChain } = useParams<{
    blockAddress: string;
    blockPlatform: string;
    blockChain: string;
  }>();
  const [address, setAddress] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [node_id, setNodeId] = React.useState("");
  const [chain, setChain] = React.useState<{
    label: string;
    value: string;
    icon: string;
    website: string;
  } | null>(null);

  const quickscanRef = useRef<HTMLDivElement>(null);
  const [animationOffset, setAnimationOffset] = useState(60);

  const customStylesPlatform: StylesConfig<
    PropsWithChildren<OptionTypeWithIcon>,
    boolean,
    GroupBase<PropsWithChildren<OptionTypeWithIcon>>
  > = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      backgroundColor: state.isSelected
        ? "#FFFFFF"
        : state.isFocused
        ? "#E6E6E6"
        : "#FFFFFF",
      color: "#000000",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuColor,
      borderRadius: 10,
      border: "0px solid #ffffff",
      overflowY: "hidden",
      width: "300px",
      textAlign: "left",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      width: isDesktopView ? "300px" : "100%",
      maxWidth: "500px",
      padding: 5,
      margin: 0,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      borderTopRightRadius: isDesktopView ? 0 : 15,
      borderBottomRightRadius: isDesktopView ? 0 : 15,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
    container: (provided: any, state: any) => ({
      ...provided,
      width: isDesktopView ? "300px" : "95%",
      maxWidth: "500px",
    }),
  };

  const generateQuickScan = () => {
    if (platform === "") {
      toast({
        title: "Platform not selected",
        description: "Please select a Platform to perform the scan",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (chain && chain.value === "") {
      toast({
        title: "Chain not selected",
        description: "Please select a Chain to perform the scan",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (address === "") {
      toast({
        title: "Address not selected",
        description: "Please enter an address to perform the scan",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
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

    if (blockAddress) setAddress(blockAddress);

    if (blockPlatform) {
      setPlatform(blockPlatform);
      // setChainList(contractChain[blockPlatform]);
      setChain(null);
    }

    if (blockPlatform === "buildbear") {
      setNodeId(blockChain);
    } else {
      if (blockChain) {
        // contractChain[blockPlatform].forEach((item) => {
        //   if (item.value === blockChain) {
        //     setChain(item);
        //   }
        // });
      }
    }

    if (blockAddress && blockChain && blockPlatform) {
      runQuickScan(blockAddress, blockPlatform, blockChain, ref);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const element = document.getElementById("public_layout");
  //   if (element)
  //     element.addEventListener("scroll", function (event) {
  //       if (isInViewport(quickscanRef.current)) {
  //         setTimeout(() => {
  //           Lottie.play();
  //           console.log("start playing");
  //         }, 5000);
  //         element?.removeEventListener("scroll", () =>
  //          { }
  //         );
  //       }
  //     });

  //   return () => {
  //     element?.removeEventListener("scroll", () =>
  //      { }
  //     );
  //   };
  // }, []);

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
          view === "landing" ? "100vh" : "750px",
        ]}
        px={[0, 0, 10]}
        py={isDesktopView ? 20 : 10}
        pb={isDesktopView ? "200px" : "50px"}
        textAlign="center"
      >
        {playAnimation && !isDesktopView && (
          <Lottie
            animationData={ssIconAnimation}
            style={styleObj}
            loop={false}
          />
        )}
        <Heading
          w={["90%", "90%", "80%", "60%"]}
          color={view === "landing" ? "black" : "white"}
          fontSize={["3xl", "4xl"]}
          mb={8}
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
          fontSize="xl"
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
        <Stack
          mt={5}
          justify="center"
          alignItems="center"
          w={"100%"}
          zIndex={1000}
          direction={"column"}
          spacing={10}
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
            view="quickscan"
            chain={chain}
            node_id={node_id}
            setNodeId={setNodeId}
            setChain={setChain}
            setPlatform={setPlatform}
            platform={platform}
          />
          <Input
            isRequired
            placeholder="Contract Address"
            variant="brand"
            size="lg"
            color="white"
            height={50}
            mt={0}
            borderColor="white"
            backgroundColor="transparent"
            borderRadius={15}
            width={isDesktopView ? "600px" : "95%"}
            maxWidth="600px"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Stack>

        <Button
          isLoading={isLoading}
          loadingText="Scanning"
          spinner={<Loader color={"#3300FF"} size={20} />}
          mt={isDesktopView ? 20 : 10}
          mb={isDesktopView ? "0px" : "120px"}
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

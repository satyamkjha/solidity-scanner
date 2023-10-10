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
  const [isDesktopView] = useMediaQuery("(min-width: 1000px)");
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
  } | null>(null);
  const [chainList, setChainList] = React.useState<
    { label: string; value: string; icon: string }[]
  >(contractChain["etherscan"]);
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
      width: isDesktopView ? "300px" : "95%",
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
  };

  const customStylesChain: StylesConfig<
    PropsWithChildren<{
      value: string;
      label: string;
      icon: string;
    }>,
    boolean,
    GroupBase<
      PropsWithChildren<{
        value: string;
        label: string;
        icon: string;
      }>
    >
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
      width: "250px",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      width: isDesktopView ? "300px" : "95%",
      padding: 5,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: isDesktopView ? 0 : 15,
      marginLeft: isDesktopView ? -2 : 0,
      marginRight: isDesktopView ? -2 : 0,
      marginBottom: isDesktopView ? 0 : 0,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
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
      setChainList(contractChain[blockPlatform]);
      setChain(null);
    }

    if (blockPlatform === "buildbear") {
      setNodeId(blockChain);
    } else {
      if (blockChain) {
        contractChain[blockPlatform].forEach((item) => {
          if (item.value === blockChain) {
            setChain(item);
          }
        });
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
  //           console.log("removed listner")
  //         );
  //       }
  //     });

  //   return () => {
  //     element?.removeEventListener("scroll", () =>
  //       console.log("removed listner")
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
    <Box
      w="100%"
      h="fit-content"
      position="relative"
      zIndex={10}
      ref={quickscanRef}
    >
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
        h={["fit-content", "fit-content", "fit-content", "100vh"]}
        zIndex={10}
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
          opacity={isVisible ? 1 : 0}
          transform={`translateY(${isVisible ? 0 : animationOffset}px)`}
          transition="opacity 0.25s ease-in, transform 0.5s ease-in"
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
          opacity={isVisible ? 1 : 0}
          transform={`translateY(${isVisible ? 0 : animationOffset}px)`}
          transition="opacity 0.25s ease-in, transform 0.5s ease-in"
        >
          An open to all quick scanning extension designed to view results in
          simple terms. Initiate a smart contract scan by selecting from a wide
          range of supported protocols and get a quick analysis report within
          seconds.
        </Text>
        <Stack
          mt={20}
          ml={[4, 4, 4, 0]}
          justify="center"
          w={"100%"}
          maxW={isDesktopView ? "1500px" : "900px"}
          direction={isDesktopView ? "row" : "column"}
          spacing={isDesktopView ? 0 : 3}
          opacity={isVisible ? 1 : 0}
          transform={`translateY(${isVisible ? 0 : animationOffset}px)`}
          transition="opacity 0.25s ease-in, transform 0.5s ease-in"
        >
          <Select
            formatOptionLabel={FormatOptionLabelWithImage}
            options={platforms.map((item) => ({
              ...item,
              isDisabled: false,
            }))}
            isSearchable={true}
            value={platforms.find((item) => platform === item.value)}
            placeholder="Select Contract Platform"
            styles={customStylesPlatform}
            onChange={(newValue: any) => {
              if (newValue) {
                // setAction(newValue.value)
                setPlatform(newValue.value);
                setChainList(contractChain[newValue.value]);
                setChain(null);
              }
            }}
          />

          {platform === "buildbear" ? (
            <Input
              isRequired
              placeholder="Node ID"
              variant="brand"
              size="lg"
              height={50}
              borderRadius={isDesktopView ? 0 : 15}
              width={isDesktopView ? "300px" : "95%"}
              value={node_id}
              onChange={(e) => {
                setNodeId(e.target.value);
              }}
            />
          ) : (
            <Select
              formatOptionLabel={FormatOptionLabelWithImage}
              isDisabled={platform === ""}
              isSearchable={false}
              value={chain}
              options={chainList}
              placeholder="Select Contract Chain"
              styles={customStylesChain}
              onChange={(newValue: any) => {
                if (newValue) {
                  setChain(newValue);
                }
              }}
            />
          )}
          <Input
            isRequired
            placeholder="Contract Address"
            variant="brand"
            size="lg"
            height={50}
            mt={0}
            borderTopLeftRadius={isDesktopView ? 0 : 15}
            borderBottomLeftRadius={isDesktopView ? 0 : 15}
            width={isDesktopView ? "500px" : "95%"}
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
          mt={20}
          w={"300px"}
          type="submit"
          variant="brand"
          onClick={generateQuickScan}
          opacity={isVisible ? 1 : 0}
          transform={`translateY(${isVisible ? 0 : animationOffset}px)`}
          transition="opacity 0.25s ease-in, transform 0.5s ease-in"
        >
          Start Scan
        </Button>
      </Box>
    </Box>
  );
};

export default QuickScanForm;

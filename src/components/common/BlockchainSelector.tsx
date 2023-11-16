import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import {
  HStack,
  PinInput,
  PinInputField,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Flex,
  Image,
  Divider,
  Box,
  Input,
} from "@chakra-ui/react";
import StyledButton from "components/styled-components/StyledButton";
import Loader from "components/styled-components/Loader";
import { ChevronDownIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { contractChain, platforms } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { StylesConfig, GroupBase } from "react-select";
import Select from "react-select";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { FaPen } from "react-icons/fa";
import RadioButton from "components/styled-components/RadioButton";

export const BlockchainSelector: React.FC<{
  view: "quickscan" | "homepage";
  platform: string;
  node_id: string;
  setNodeId: React.Dispatch<React.SetStateAction<string>>;
  setPlatform: React.Dispatch<React.SetStateAction<string>>;
  chain: {
    label: string;
    value: string;
    icon: string;
    website: string;
  } | null;
  setChain: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
      icon: string;
      website: string;
    } | null>
  >;
}> = ({ view, platform, setPlatform, chain, setChain, node_id, setNodeId }) => {
  const [blockchain, setBlockchain] = useState("");
  const assetsUrl = getAssetsURL();

  useEffect(() => {
    if (blockchain !== "" && blockchain !== "buildbear") {
      setPlatform(Object.keys(contractChain[blockchain].platforms)[0]);
    }
  }, [blockchain]);

  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <HStack
          h="80px"
          w="90vw"
          maxW="500px"
          justifyContent="space-between"
          p={5}
          bgColor={view === "quickscan" ? "#272727" : "#F6F6F6"}
          borderRadius={15}
          color={"gray.400"}
        >
          {blockchain !== "" &&
          platform !== "" &&
          (chain !== null || node_id !== "") ? (
            <>
              <HStack justifyContent="flex-start">
                <Image
                  src={`${assetsUrl}${
                    blockchain === "buildbear"
                      ? `blockscan/buildbear-${
                          view === "quickscan" ? "white" : "black"
                        }`
                      : contractChain[blockchain].logoUrl
                  }.svg`}
                  height="40px"
                  width="40px"
                />
                <VStack textAlign="left" spacing={1}>
                  <Text
                    w="100%"
                    color={view === "quickscan" ? "white" : "gray.600"}
                    fontWeight={600}
                    fontSize="md"
                  >
                    {blockchain === "buildbear"
                      ? "Buildbear"
                      : contractChain[blockchain].blockchainName +
                        " (" +
                        chain?.label +
                        ")"}
                  </Text>
                  <Text
                    cursor="pointer"
                    w="100%"
                    color="#8A94A6"
                    fontWeight={400}
                    fontSize="sm"
                  >
                    Verified on{" "}
                    {blockchain === "buildbear"
                      ? "https://www.buildbear.io/"
                      : contractChain[blockchain].platforms[platform].label}
                  </Text>
                </VStack>
              </HStack>
              <FaPen />
            </>
          ) : (
            <>
              <Text>Select Blockchain</Text>
              <ChevronDownIcon />
            </>
          )}
        </HStack>
      </PopoverTrigger>
      <PopoverContent
        color="white"
        bg={view === "quickscan" ? "#323232" : "#FFF"}
        borderRadius={15}
        border="none"
        width="95vw"
        sx={{
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2) !important",
        }}
        h="50vh"
        maxH="400px"
        maxW="910px"
        display="flex"
        py={5}
        px={5}
        flexWrap="wrap"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="center"
        rowGap={5}
        columnGap={5}
        overflowY="scroll"
      >
        {blockchain === "" ? (
          <>
            {Object.keys(contractChain).map((item) => (
              <VStack
                w="120px"
                justifyContent="center"
                alignItems="flex-start"
                spacing={3}
                cursor="pointer"
                onClick={() => setBlockchain(item)}
              >
                <Flex
                  height="80px"
                  width="80px"
                  padding="10px"
                  borderRadius="40px"
                  backgroundColor={view === "quickscan" ? "#404040" : "#F3F3F3"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    height="50px"
                    width="50px"
                    src={`${assetsUrl}${contractChain[item].logoUrl}.svg`}
                  />
                </Flex>
                <Text color="#8A94A6" fontSize="xs">
                  {contractChain[item].blockchainName}
                </Text>
              </VStack>
            ))}
            <VStack
              w="120px"
              justifyContent="center"
              alignItems="flex-start"
              spacing={3}
              cursor="pointer"
              onClick={() => {
                setBlockchain("buildbear");
                setPlatform("buildbear");
              }}
            >
              <Flex
                height="80px"
                width="80px"
                padding="10px"
                borderRadius="40px"
                backgroundColor={view === "quickscan" ? "#404040" : "#F3F3F3"}
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  height="50px"
                  width="50px"
                  src={`${assetsUrl}blockscan/buildbear-${
                    view === "quickscan" ? "white" : "black"
                  }.svg`}
                />
              </Flex>
              <Text color="#8A94A6" fontSize="xs">
                Buildbear
              </Text>
            </VStack>
          </>
        ) : (
          <Flex
            justifyContent="space-between"
            w="100%"
            h="100%"
            flexDir="row"
            alignItems="flex-start"
          >
            <VStack w="120px" overflowY="scroll" h="100%" spacing={4}>
              <Flex
                height={"90px"}
                width={"90px"}
                padding="10px"
                borderRadius={"50px"}
                backgroundColor={view === "quickscan" ? "#404040" : "#F3F3F3"}
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                border="3px solid #52FF00"
              >
                <Image
                  height={"70px"}
                  width={"70px"}
                  src={`${assetsUrl}${
                    blockchain === "buildbear"
                      ? `blockscan/buildbear-${
                          view === "quickscan" ? "white" : "black"
                        }`
                      : contractChain[blockchain].logoUrl
                  }.svg`}
                />
              </Flex>
              {Object.keys(contractChain).map((item) => {
                if (item !== blockchain)
                  return (
                    <Flex
                      height={"80px"}
                      width={"70px"}
                      padding="10px"
                      borderRadius={"40px"}
                      backgroundColor={"#F3F3F3"}
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                      onClick={() => setBlockchain(item)}
                      border={"none"}
                    >
                      <Image
                        height={"50px"}
                        width={"50px"}
                        src={`${assetsUrl}${contractChain[item].logoUrl}.svg`}
                      />
                    </Flex>
                  );
              })}
              {blockchain !== "buildbear" && (
                <Flex
                  height={"80px"}
                  width={"70px"}
                  padding="10px"
                  borderRadius={"40px"}
                  backgroundColor={"#F3F3F3"}
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => setBlockchain("buildbear")}
                  border={"none"}
                >
                  <Image
                    height={"50px"}
                    width={"50px"}
                    src={`${assetsUrl}blockscan/buildbear-${
                      view === "quickscan" ? "white" : "black"
                    }.svg`}
                  />
                </Flex>
              )}
            </VStack>
            <Divider
              borderColor={view === "quickscan" ? "#424242" : "#8A94A6"}
              orientation="vertical"
            />
            <Flex
              justifyContent="flex-start"
              w="calc(100% - 130px)"
              h="100%"
              flexDir="column"
              alignItems="flex-start"
            >
              <HStack
                mb={5}
                justifyContent="space-between"
                alignItems="flex-start"
                pl={5}
              >
                <VStack textAlign="left" w="85%" spacing={1}>
                  <Text
                    w="100%"
                    color={view === "quickscan" ? "white" : "gray.600"}
                    fontWeight={600}
                    fontSize="md"
                  >
                    {blockchain === "buildbear"
                      ? "Buildbear"
                      : contractChain[blockchain].blockchainName}
                  </Text>
                  <Text
                    cursor="pointer"
                    onClick={() =>
                      window.open(
                        blockchain === "buildbear"
                          ? "https://www.buildbear.io/"
                          : contractChain[blockchain].website,
                        "_blank"
                      )
                    }
                    w="100%"
                    textDecoration="underline"
                    color="#8A94A6"
                    fontWeight={400}
                    fontSize="sm"
                  >
                    {blockchain === "buildbear"
                      ? "https://www.buildbear.io/"
                      : contractChain[blockchain].website}
                  </Text>
                  <Text w="100%" color="#8A94A6" fontWeight={400} fontSize="sm">
                    {blockchain === "buildbear"
                      ? "BuildBear is a platform that allows you to test your DApps at scale and with your entire team and understanding what happens under the hood when you do your complicated blockchain transactions."
                      : contractChain[blockchain].description}
                  </Text>
                </VStack>
                <ArrowBackIcon
                  fontSize={30}
                  mr={10}
                  cursor="pointer"
                  color={view === "quickscan" ? "white" : "gray.600"}
                  onClick={() => setBlockchain("")}
                />
              </HStack>
              {blockchain === "buildbear" ? (
                <>
                  <Text
                    textAlign="left"
                    my={5}
                    ml={5}
                    w="100%"
                    color={view === "quickscan" ? "white" : "gray.600"}
                    fontWeight={400}
                    fontSize="sm"
                  >
                    Please enter the Node ID for your block chain
                  </Text>
                  <Input
                    ml={5}
                    isRequired
                    placeholder="Node ID"
                    variant="brand"
                    size="lg"
                    color={view === "quickscan" ? "white" : "gray.600"}
                    height={50}
                    mt={0}
                    borderColor={view === "quickscan" ? "white" : "gray.200"}
                    backgroundColor="transparent"
                    borderRadius={15}
                    width={"90%"}
                    maxWidth="600px"
                    value={node_id}
                    onChange={(e) => {
                      setNodeId(e.target.value);
                    }}
                  />
                </>
              ) : (
                Object.keys(contractChain[blockchain].platforms).map(
                  (platformValue) => (
                    <ChainSelector
                      view={view}
                      platform={platform}
                      platformValue={platformValue}
                      chain={chain}
                      setChain={setChain}
                      setPlatform={setPlatform}
                      platformData={
                        contractChain[blockchain].platforms[platformValue]
                      }
                    />
                  )
                )
              )}
            </Flex>
          </Flex>
        )}
      </PopoverContent>
    </Popover>
  );
};

const ChainSelector: React.FC<{
  view: "quickscan" | "homepage";
  platform: string;
  setPlatform: React.Dispatch<React.SetStateAction<string>>;
  chain: {
    label: string;
    value: string;
    icon: string;
    website: string;
  } | null;
  setChain: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
      icon: string;
      website: string;
    } | null>
  >;
  platformValue: string;
  platformData: {
    label: string;
    iconUrl: string;
    chains: {
      value: string;
      label: string;
      icon: string;
      isDisabled: boolean;
      website: string;
    }[];
  };
}> = ({
  view,
  platform,
  setPlatform,
  chain,
  setChain,
  platformData,
  platformValue,
}) => {
  const assetsUrl = getAssetsURL();

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
      position: "absolute",
      zIndex: 100,
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "transparent",
      width: "100%",
      padding: 3,
      maxWidth: "500px",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: 15,
      margin: 0,
      fontSize: 15,
      border: view === "quickscan" ? "1px solid #FFFFFF" : "1px solid #8A94A6",
    }),
    container: (provided: any, state: any) => ({
      ...provided,
      width: "200px",
      maxWidth: "500px",
      marginRight: "30px",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

  const [currentChain, setCurrentChain] = useState<{
    value: string;
    label: string;
    icon: string;
    isDisabled: boolean;
    website: string;
  }>(platformData.chains[0]);

  return (
    <HStack
      w="100%"
      h="fit-content"
      justifyContent="space-between"
      alignItems="center"
      color="white"
      background={
        platform === platformValue
          ? view === "quickscan"
            ? "#272727"
            : "#f6f6f6"
          : "transparent"
      }
      onClick={() => setPlatform(platformValue)}
      px={7}
      py={5}
    >
      <HStack>
        <Image
          src={`${assetsUrl}${platformData.iconUrl}.svg`}
          height="40px"
          width="40px"
        />
        <VStack textAlign="left" w="85%" spacing={1}>
          <Text
            w="100%"
            color={view === "quickscan" ? "white" : "gray.600"}
            fontWeight={600}
            fontSize="md"
          >
            {platformData.label}
          </Text>
          <Text
            cursor="pointer"
            onClick={() => window.open(currentChain.website, "_blank")}
            w="100%"
            textDecoration="underline"
            color="#8A94A6"
            fontWeight={400}
            fontSize="sm"
          >
            {currentChain.website}
          </Text>
        </VStack>
      </HStack>
      <HStack justifyContent="flex-end">
        <Select
          formatOptionLabel={FormatOptionLabelWithImage}
          isSearchable={false}
          isDisabled={platform !== platformValue}
          options={platformData.chains}
          value={chain}
          placeholder="Select Chain"
          styles={customStylesChain}
          onChange={(newValue: any) => {
            if (newValue) {
              setChain(newValue);
              setCurrentChain(newValue);
            }
          }}
        />
        <RadioButton isActive={platform === platformValue} />
      </HStack>
    </HStack>
  );
};

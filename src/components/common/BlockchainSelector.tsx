import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import {
  HStack,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Flex,
  Image,
  Divider,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { contractChain } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { StylesConfig, GroupBase } from "react-select";
import Select from "react-select";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { FaPen } from "react-icons/fa";
import RadioButton from "components/styled-components/RadioButton";
import { BlockchainComp } from "./BlockchainComp";
import { ChainSelector } from "./ChainSelector";

export const BlockchainSelector: React.FC<{
  view: "dark" | "light";
  menuPlacement: "bottom" | "bottom-start";
  onSelectorClose: any;
  platform: string;
  node_id: string;
  blockchainSelectorError: string;
  setBlockchainSelectorError: React.Dispatch<React.SetStateAction<string>>;
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
}> = ({
  view,
  onSelectorClose,
  platform,
  setPlatform,
  chain,
  setChain,
  node_id,
  setNodeId,
  blockchainSelectorError,
  setBlockchainSelectorError,
  menuPlacement,
}) => {
  const [elementPosition, setElementPosition] = useState<any>({});
  const [blockchain, setBlockchain] = useState("");
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const [showOtherSection, setShowOtherSection] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [firstBlockChain, setFirstBlockchain] = useState("");

  const assetsUrl = getAssetsURL();

  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    if (showTransition) {
      setTimeout(() => {
        setShowTransition(false);
      }, 10);
      setTimeout(() => {
        setShowOtherSection(true);
        setTimeout(() => {
          setShowAnimation(false);
        }, 1);
      }, 310);
    }
  }, [showTransition]);

  const onBlockChainClick = (
    event: any,
    item: React.SetStateAction<string>
  ) => {
    event.stopPropagation();
    if (popoverRef.current) {
      const clickedRect = event.currentTarget.getBoundingClientRect();
      const containerRect = popoverRef.current.getBoundingClientRect();

      const relativePosition = {
        top: clickedRect.top - containerRect.top,
        left: clickedRect.left - containerRect.left,
      };
      setElementPosition(relativePosition);
      setBlockchain(item);
      setFirstBlockchain(item);
      setShowTransition(true);
      setShowOtherSection(false);
      setShowAnimation(true);
    }
  };

  const onBlockchainSelect = (selectedChain: string) => {
    setShowAnimation(true);
    setSelectedBlockchain(selectedChain);
  };

  const onBlockChainClose = () => {
    onClose();
    onSelectorClose();
  };

  useEffect(() => {
    if (selectedBlockchain) {
      setTimeout(() => {
        setShowAnimation(false);
        setBlockchain(selectedBlockchain);
        setPlatform("");
        setChain(null);
      }, 125);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockchain]);

  useEffect(() => {
    setChain(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchain]);

  const currectBlockChainRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLElement>(null);

  return (
    <HStack
      borderRadius={15}
      h="80px"
      w="90vw"
      pr={"10px"}
      maxW="600px"
      bgColor={view === "dark" ? "transparent" : "#ECECEC"}
      justifyContent="space-between"
    >
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement={menuPlacement}
      >
        <PopoverTrigger>
          <HStack
            h="80px"
            w="calc(100% - 80px)"
            justifyContent="space-between"
            p={5}
            bgColor={view === "dark" ? "#272727C0" : "transparent"}
            borderRadius={15}
            border={
              blockchainSelectorError !== "" ? "1px solid #960D00" : "none"
            }
            color={"gray.400"}
            onClick={() => setBlockchainSelectorError("")}
          >
            {blockchain !== "" &&
            platform !== "" &&
            (chain !== null || node_id !== "") ? (
              <>
                <HStack justifyContent="flex-start">
                  <Image
                    src={
                      blockchain === "buildbear"
                        ? `${assetsUrl}blockscan/buildbear-${
                            view === "dark" ? "white" : "black"
                          }.svg`
                        : `${assetsUrl}${contractChain[blockchain].logoUrl}.svg`
                    }
                    height="40px"
                    width="40px"
                  />
                  <VStack textAlign="left" spacing={1}>
                    <Text
                      w="100%"
                      color={view === "dark" ? "white" : "gray.600"}
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
                      {blockchain === "buildbear"
                        ? "https://www.buildbear.io/"
                        : chain?.website}
                      <ExternalLinkIcon ml={1} />
                    </Text>
                  </VStack>
                </HStack>
                <FaPen cursor="pointer" />
              </>
            ) : (
              <>
                <Text color="gray.400">Select Blockchain</Text>
                {view === "dark" && <ChevronDownIcon />}
              </>
            )}
          </HStack>
        </PopoverTrigger>
        <PopoverContent
          ref={popoverRef}
          color="white"
          bg={view === "dark" ? "#323232" : "#FFF"}
          borderRadius={15}
          border="none"
          sx={{
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2) !important",
          }}
          w={"90vw"}
          h={["fit-content", "fit-content", "37vh", "48vh", "50vh"]}
          maxH={["90vh", "90vh", "400px", "400px", "480px"]}
          maxW="1055px"
          display="flex"
          py={5}
          px={[2, 3, 5]}
          flexWrap="wrap"
          flexDir="row"
          alignItems="flex-start"
          justifyContent="flex"
          rowGap={5}
          columnGap={[2, 3, 5]}
          overflowY="scroll"
        >
          {blockchain === "" ? (
            <>
              {Object.keys(contractChain).map((item, index) => (
                <VStack
                  key={index}
                  w={["100px", "100px", "120px"]}
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                  cursor="pointer"
                  onClick={(e) => {
                    onBlockChainClick(e, item);
                  }}
                >
                  <Flex
                    height="80px"
                    width="80px"
                    padding="10px"
                    borderRadius="40px"
                    backgroundColor={view === "dark" ? "#404040" : "#F3F3F3"}
                    justifyContent="center"
                    alignItems="center"
                    animation={`zoomInAnimation ${
                      0.1 + index / 100
                    }s ease-in-out`}
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
                w={["100px", "100px", "120px"]}
                justifyContent="center"
                alignItems="center"
                spacing={3}
                cursor="pointer"
                onClick={(e) => {
                  onBlockChainClick(e, "buildbear");
                }}
              >
                <Flex
                  height="80px"
                  width="80px"
                  padding="10px"
                  borderRadius="40px"
                  backgroundColor={view === "dark" ? "#404040" : "#F3F3F3"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    height="50px"
                    width="50px"
                    src={`${assetsUrl}blockscan/buildbear-${
                      view === "dark" ? "white" : "black"
                    }.svg`}
                  />
                </Flex>
                <Text color="#8A94A6" fontSize="xs">
                  Buildbear
                </Text>
              </VStack>
            </>
          ) : !showOtherSection ? (
            <Flex
              my={[0, 0, 1]}
              mx={[2, 2, 0]}
              height={showTransition ? "80px" : "100px"}
              width={showTransition ? "80px" : "100px"}
              padding="10px"
              borderRadius={"50px"}
              backgroundColor={view === "dark" ? "#404040" : "#F3F3F3"}
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              ref={currectBlockChainRef}
              transform={
                showTransition
                  ? `translate(${elementPosition.left}px, ${elementPosition.top}px)`
                  : "none"
              }
              transition={"all 0.3s ease-in-out"}
              sx={{
                position: "absolute",
                top: 5,
                left: 5,
              }}
            >
              <Image
                height={"60px"}
                width={"60px"}
                src={
                  blockchain === "buildbear"
                    ? `${assetsUrl}blockscan/buildbear-${
                        view === "dark" ? "white" : "black"
                      }.svg`
                    : `${assetsUrl}${contractChain[blockchain].logoUrl}.svg`
                }
              />
            </Flex>
          ) : (
            <Flex
              justifyContent={["flex-start", "flex-start", "space-between"]}
              w="100%"
              h={["fit-content", "fit-content", "100%"]}
              flexDir={["column", "column", "row"]}
              alignItems={["center", "center", "flex-start"]}
              overflowX={"hidden"}
            >
              <Flex
                flexDir={["row", "row", "column"]}
                w={["100%", "100%", "120px"]}
                overflowY={["auto", "auto", "scroll"]}
                overflowX={["scroll", "scroll", "hidden"]}
                h={["110px", "110px", "100%"]}
              >
                <Flex
                  flexDir={["row", "row", "column"]}
                  w={"fit-content"}
                  h={"fit-content"}
                  alignItems="center"
                  position={"relative"}
                >
                  <BlockchainComp
                    view={view}
                    blockchain={firstBlockChain}
                    selectedChain={blockchain}
                    onBlockchainSelect={onBlockchainSelect}
                  />

                  {Object.keys(contractChain).map((item, index) => {
                    if (item !== firstBlockChain)
                      return (
                        <BlockchainComp
                          key={index}
                          index={index}
                          view={view}
                          blockchain={item}
                          selectedChain={blockchain}
                          onBlockchainSelect={onBlockchainSelect}
                        />
                      );
                  })}
                  {firstBlockChain !== "buildbear" && (
                    <BlockchainComp
                      view={view}
                      blockchain={"buildbear"}
                      selectedChain={blockchain}
                      onBlockchainSelect={onBlockchainSelect}
                    />
                  )}
                </Flex>
              </Flex>
              <Divider
                display={["none", "none", "block"]}
                borderColor={view === "dark" ? "#424242" : "#8A94A680"}
                orientation="vertical"
              />
              <Divider
                display={["block", "block", "none"]}
                borderColor={view === "dark" ? "#424242" : "#8A94A680"}
              />

              <Flex
                justifyContent="flex-start"
                w={["100%", "100%", "calc(100% - 130px)"]}
                h={["fit-content", "fit-content", "100%"]}
                flexDir="column"
                mt={[5, 5, 0]}
                alignItems="flex-start"
                opacity={showAnimation ? 0 : 1}
                transform={showAnimation ? `translateX(150px)` : "none"}
                transition={"opacity 0.2s ease-in, transform 0.2s ease-out"}
              >
                <Flex
                  mb={5}
                  justifyContent="space-between"
                  alignItems="flex-start"
                  pl={5}
                  w={"100%"}
                >
                  <VStack
                    textAlign="left"
                    w={["100%", "100%", "auto"]}
                    spacing={1}
                    alignItems="flex-start"
                  >
                    <HStack w="100%" justifyContent={"flex-start"}>
                      <Text
                        color={view === "dark" ? "white" : "gray.600"}
                        fontWeight={600}
                        fontSize="md"
                      >
                        {blockchain === "buildbear"
                          ? "Buildbear"
                          : contractChain[blockchain].blockchainName}
                      </Text>
                      <Divider
                        orientation="vertical"
                        h={4}
                        borderColor="#8A94A6"
                      />
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
                        color="#8A94A6"
                        fontWeight={400}
                        fontSize="sm"
                      >
                        {blockchain === "buildbear"
                          ? "https://www.buildbear.io/"
                          : contractChain[blockchain].website}{" "}
                        <ExternalLinkIcon color="#8A94A6" />
                      </Text>
                    </HStack>

                    <Text
                      w="100%"
                      color="#8A94A6"
                      fontWeight={400}
                      fontSize="sm"
                    >
                      {blockchain === "buildbear"
                        ? "BuildBear is a platform that allows you to test your DApps at scale and with your entire team and understanding what happens under the hood when you do your complicated blockchain transactions."
                        : contractChain[blockchain].description}
                    </Text>
                  </VStack>
                  <ArrowBackIcon
                    fontSize={30}
                    ml={"auto"}
                    display={["none", "none", "block"]}
                    cursor="pointer"
                    color={view === "dark" ? "white" : "gray.600"}
                    onClick={() => {
                      setBlockchain("");
                      setFirstBlockchain("");
                    }}
                  />
                </Flex>
                {blockchain === "buildbear" ? (
                  <>
                    <Text
                      textAlign="left"
                      my={5}
                      ml={5}
                      w="100%"
                      color={view === "dark" ? "white" : "gray.600"}
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
                      color={view === "dark" ? "white" : "gray.600"}
                      height={50}
                      mt={0}
                      borderColor={view === "dark" ? "white" : "gray.200"}
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
                    (platformValue, index) => (
                      <ChainSelector
                        key={`${platformValue}_${index}`}
                        index={index}
                        view={view}
                        onClose={onBlockChainClose}
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
      <Flex
        w="60px"
        h="60px"
        p="10px"
        borderRadius="40px"
        filter="drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.25))"
        bgColor={view === "dark" ? "#272727C0" : "#E1E1E1"}
        onClick={() => {
          onOpen();
          setBlockchain("");
          setPlatform("");
          setChain(null);
        }}
        cursor="pointer"
      >
        <Image
          src={`${assetsUrl}common/reset-button-${view}.svg`}
          height="40px"
          width="40px"
        />
      </Flex>
    </HStack>
  );
};

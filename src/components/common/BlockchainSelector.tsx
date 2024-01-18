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
  useMediaQuery,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { contractChain } from "common/values";
import { getAssetsURL, getFeatureGateConfig } from "helpers/helperFunction";
import { FaPen } from "react-icons/fa";
import { BlockchainComp } from "./BlockchainComp";
import { ChainSelector } from "./ChainSelector";
import { useConfig } from "hooks/useConfig";
import { FaUndo } from "react-icons/fa";

export const BlockchainSelector: React.FC<{
  theme: "dark" | "light";
  view: "quickscan" | "homepage";
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
  theme,
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
  view,
}) => {
  const [blockchain, setBlockchain] = useState("");
  const assetsUrl = getAssetsURL();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [firstBlockChain, setFirstBlockchain] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const [showOtherSection, setShowOtherSection] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

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

  useEffect(() => {
    if (selectedBlockchain) {
      setTimeout(() => {
        setShowAnimation(false);
        setBlockchain(selectedBlockchain);
        if (selectedBlockchain === "buildbear") {
          setPlatform("buildbear");
        } else {
          setPlatform("");
        }

        setChain(null);
      }, 125);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockchain]);

  useEffect(() => {
    setChain(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchain]);

  const [isLargerThan1350, isLargerThan950] = useMediaQuery([
    "(min-width: 1350px)",
    "(min-width: 950px)",
  ]);

  return (
    <Flex
      borderRadius={15}
      h="fit-content"
      w="90vw"
      pr={"10px"}
      maxW="600px"
      flexDir={["column", "column", "row"]}
      alignItems="center"
      justifyContent={["flex-start", "flex-start", "center"]}
    >
      {isLargerThan950 ? (
        <>
          {blockchain !== "" &&
            platform !== "" &&
            (chain !== null || node_id !== "") && (
              <Flex
                w="60px"
                h="60px"
                p="10px"
                borderRadius="40px"
                filter="drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.25))"
                bgColor={"transparent"}
                display={["none", "none", "flex"]}
              ></Flex>
            )}
          <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement={isLargerThan1350 ? menuPlacement : "bottom-start"}
          >
            <PopoverTrigger>
              <Box h="fit-content" w={["100%", "100%", "calc(100% - 80px)"]}>
                <BlockchainSelectorControl
                  theme={theme}
                  onOpen={onOpen}
                  blockchainSelectorError={blockchainSelectorError}
                  setBlockchainSelectorError={setBlockchainSelectorError}
                  chain={chain}
                  blockchain={blockchain}
                  platform={platform}
                  node_id={node_id}
                />
              </Box>
            </PopoverTrigger>
            <PopoverContent
              ref={popoverRef}
              color="white"
              bg={theme === "dark" ? "#323232" : "#FFF"}
              borderRadius={15}
              border="none"
              sx={{
                boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2) !important",
              }}
              w={
                view === "quickscan"
                  ? ["350px", "480px", "500px", "770px", "1020px"]
                  : ["350px", "480px", "500px", "650px"]
              }
              h={["fit-content", "fit-content", "fit-content", "48vh", "50vh"]}
              maxH={["60vh", "60vh", "500px", "500px", "580px"]}
              display="flex"
              py={5}
              px={[2, 3, 5]}
              flexWrap="wrap"
              flexDir="row"
              alignItems="flex-start"
              justifyContent="flex"
              rowGap={5}
              columnGap={[2, 3]}
              overflowY="scroll"
            >
              <BlockchainSelectorContent
                theme={theme}
                onSelectorClose={onSelectorClose}
                platform={platform}
                setPlatform={setPlatform}
                chain={chain}
                setChain={setChain}
                node_id={node_id}
                setNodeId={setNodeId}
                blockchain={blockchain}
                setBlockchain={setBlockchain}
                popoverRef={popoverRef}
                selectedBlockchain={selectedBlockchain}
                firstBlockChain={firstBlockChain}
                setSelectedBlockchain={setSelectedBlockchain}
                setFirstBlockchain={setFirstBlockchain}
                view={view}
                onClose={onClose}
                setShowAnimation={setShowAnimation}
                showAnimation={showAnimation}
                showOtherSection={showOtherSection}
                showTransition={showTransition}
                setShowOtherSection={setShowOtherSection}
                setShowTransition={setShowTransition}
              />
            </PopoverContent>
          </Popover>
          {blockchain !== "" &&
            platform !== "" &&
            (chain !== null || node_id !== "") && (
              <Flex
                w="60px"
                h="60px"
                p="10px"
                ml={4}
                borderRadius="40px"
                filter="drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.25))"
                bgColor={theme === "dark" ? "#272727C0" : "#E1E1E1"}
                display={["none", "none", "flex"]}
                onClick={() => {
                  onOpen();
                  setBlockchain("");
                  setPlatform("");
                  setChain(null);
                }}
                cursor="pointer"
              >
                <Image
                  src={`${assetsUrl}common/reset-button-${theme}.svg`}
                  height="40px"
                  width="40px"
                />
              </Flex>
            )}
        </>
      ) : (
        <>
          <Box
            onClick={() => {
              onOpen();
            }}
            h="fit-content"
            w={["100%", "100%", "calc(100% - 80px)"]}
          >
            <BlockchainSelectorControl
              theme={theme}
              onOpen={onOpen}
              blockchainSelectorError={blockchainSelectorError}
              setBlockchainSelectorError={setBlockchainSelectorError}
              chain={chain}
              blockchain={blockchain}
              platform={platform}
              node_id={node_id}
            />
          </Box>
          {blockchain !== "" &&
            platform !== "" &&
            (chain !== null || node_id !== "") && (
              <>
                <Button
                  display={["block", "block", "none"]}
                  // borderColor="#2F00FF"
                  // borderWidth={3}
                  onClick={() => {
                    onOpen();
                    setBlockchain("");
                    setPlatform("");
                    setChain(null);
                  }}
                  mt={4}
                  size="md"
                  bgColor="#ECECEC"
                  leftIcon={<FaUndo color="#2F00FF" />}
                >
                  Reset
                </Button>
              </>
            )}
        </>
      )}
      {!isLargerThan950 && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent
            maxW={"720px"}
            my={5}
            sx={{
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2) !important",
            }}
            ref={popoverRef}
            w={"90vw"}
            bg={theme === "dark" ? "#323232" : "#FFF"}
            h="95vh"
            minH={"600px"}
            alignItems={"center"}
            borderRadius={15}
          >
            <ModalHeader w={"100%"}>
              <ModalCloseButton
                color={theme === "dark" ? "white" : "#323232"}
              />
            </ModalHeader>

            <ModalBody
              color="white"
              border="none"
              w={"100%"}
              h={"100%"}
              display="flex"
              py={5}
              px={[2, 3, 5]}
              flexWrap="wrap"
              flexDir="row"
              alignItems="flex-start"
              justifyContent="flex"
              rowGap={5}
              columnGap={[2, 3]}
              overflowY="scroll"
            >
              <BlockchainSelectorContent
                theme={theme}
                onSelectorClose={onSelectorClose}
                platform={platform}
                setPlatform={setPlatform}
                chain={chain}
                setChain={setChain}
                node_id={node_id}
                setNodeId={setNodeId}
                blockchain={blockchain}
                setBlockchain={setBlockchain}
                popoverRef={popoverRef}
                selectedBlockchain={selectedBlockchain}
                firstBlockChain={firstBlockChain}
                setSelectedBlockchain={setSelectedBlockchain}
                setFirstBlockchain={setFirstBlockchain}
                view={view}
                onClose={onClose}
                setShowAnimation={setShowAnimation}
                showAnimation={showAnimation}
                showOtherSection={showOtherSection}
                showTransition={showTransition}
                setShowOtherSection={setShowOtherSection}
                setShowTransition={setShowTransition}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

const BlockchainSelectorControl: React.FC<{
  theme: "dark" | "light";
  blockchainSelectorError: string;
  setBlockchainSelectorError: React.Dispatch<React.SetStateAction<string>>;
  chain: {
    label: string;
    value: string;
    icon: string;
    website: string;
  } | null;
  blockchain: string;
  platform: string;
  onOpen(): any;
  node_id: string;
}> = ({
  theme,
  blockchainSelectorError,
  setBlockchainSelectorError,
  chain,
  blockchain,
  platform,
  node_id,
  onOpen,
}) => {
  const assetsUrl = getAssetsURL();
  return (
    <HStack
      h={["110px", "110px", "80px"]}
      w="100%"
      justifyContent="space-between"
      p={5}
      zIndex={-1}
      bgColor={theme === "dark" ? "#272727" : "#ECECEC"}
      borderRadius={15}
      border={blockchainSelectorError !== "" ? "1px solid #960D00" : "none"}
      color={"gray.400"}
      onClick={() => {
        onOpen();
        setBlockchainSelectorError("");
      }}
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
                      theme === "dark" ? "white" : "black"
                    }.svg`
                  : `${assetsUrl}${contractChain[blockchain].logoUrl}.svg`
              }
              height="40px"
              width="40px"
            />
            <VStack alignItems="flex-start" textAlign="left" spacing={1}>
              <Flex
                flexDir={["column", "column", "row"]}
                alignItems="flex-start"
                justifyContent="flex-start"
                textAlign="left"
              >
                <Text
                  color={theme === "dark" ? "white" : "gray.600"}
                  fontWeight={600}
                  fontSize="md"
                  mr={1}
                >
                  {blockchain === "buildbear"
                    ? "Buildbear"
                    : contractChain[blockchain].blockchainName}
                </Text>
                {blockchain !== "buildbear" && (
                  <Text
                    color={theme === "dark" ? "white" : "gray.600"}
                    fontWeight={600}
                    fontSize="md"
                  >
                    {" (" + chain?.label + ")"}
                  </Text>
                )}
              </Flex>
              <Text
                cursor="pointer"
                w="100%"
                color="#8A94A6"
                fontWeight={400}
                fontSize="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    blockchain === "buildbear"
                      ? "https://www.buildbear.io/"
                      : chain?.website,
                    "_blank"
                  );
                }}
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
          {theme === "dark" && <ChevronDownIcon />}
        </>
      )}
    </HStack>
  );
};

const BlockchainSelectorContent: React.FC<{
  theme: "dark" | "light";
  view: "quickscan" | "homepage";
  onSelectorClose: any;
  platform: string;
  setBlockchain: React.Dispatch<React.SetStateAction<string>>;
  node_id: string;
  setNodeId: React.Dispatch<React.SetStateAction<string>>;
  setPlatform: React.Dispatch<React.SetStateAction<string>>;
  popoverRef: React.RefObject<HTMLElement>;
  selectedBlockchain: string;
  setSelectedBlockchain: React.Dispatch<React.SetStateAction<string>>;
  setFirstBlockchain: React.Dispatch<React.SetStateAction<string>>;
  firstBlockChain: string;
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
  blockchain: string;
  onClose(): any;
  showTransition: boolean;
  showOtherSection: boolean;
  showAnimation: boolean;
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOtherSection: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTransition: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  theme,
  onSelectorClose,
  platform,
  setPlatform,
  chain,
  setChain,
  node_id,
  setNodeId,
  blockchain,
  setBlockchain,
  popoverRef,
  selectedBlockchain,
  firstBlockChain,
  setSelectedBlockchain,
  setFirstBlockchain,
  view,
  onClose,
  setShowAnimation,
  showAnimation,
  showOtherSection,
  showTransition,
  setShowOtherSection,
  setShowTransition,
}) => {
  const assetsUrl = getAssetsURL();
  const config = useConfig();
  const [elementPosition, setElementPosition] = useState<any>({});

  const onBlockChainClick = (
    event: any,
    item: React.SetStateAction<string>
  ) => {
    try {
      event.stopPropagation();
      if (popoverRef.current) {
        const clickedRect = event.currentTarget.getBoundingClientRect();
        const containerRect = popoverRef.current.getBoundingClientRect();
        const relativePosition = {
          top: clickedRect.top - containerRect.top,
          left: clickedRect.left - containerRect.left,
        };
        setElementPosition(relativePosition);
        setShowTransition(true);
        setShowOtherSection(false);
        setShowAnimation(true);
        setBlockchain(item);
        if (item === "buildbear") {
          setPlatform(item);
        }
        setFirstBlockchain(item);
      }
    } catch (e) {
      console.log(e);
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

  const currectBlockChainRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {blockchain === "" ? (
        <>
          {Object.keys(contractChain).map(
            (item, index) =>
              !getFeatureGateConfig(config).blockchain_disabled?.includes(
                item
              ) && (
                <VStack
                  key={index}
                  w={["100px", "100px", "100px", "110px"]}
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
                    backgroundColor={theme === "dark" ? "#404040" : "#F3F3F3"}
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
              )
          )}
          <VStack
            w={["100px", "100px", "100px", "110px"]}
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
              backgroundColor={theme === "dark" ? "#404040" : "#F3F3F3"}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                height="50px"
                width="50px"
                src={`${assetsUrl}blockscan/buildbear-${
                  theme === "dark" ? "white" : "black"
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
          backgroundColor={theme === "dark" ? "#404040" : "#F3F3F3"}
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
                    theme === "dark" ? "white" : "black"
                  }.svg`
                : `${assetsUrl}${contractChain[blockchain].logoUrl}.svg`
            }
          />
        </Flex>
      ) : (
        <Flex
          justifyContent={[
            "flex-start",
            "flex-start",
            "flex-start",
            "space-between",
          ]}
          w="100%"
          h={["100%", "100%", "500px", "100%"]}
          minH={["100%", "100%", "fit-content", "100%"]}
          flexDir={["column", "column", "column", "row"]}
          alignItems={["center", "center", "center", "flex-start"]}
          overflowX={"hidden"}
        >
          <Flex
            flexDir={["row", "row", "row", "column"]}
            w={["100%", "100%", "100%", "120px"]}
            overflowY={["auto", "auto", "auto", "scroll"]}
            overflowX={["scroll", "scroll", "scroll", "hidden"]}
            h={["120px", "120px", "120px", "100%"]}
          >
            <Flex
              flexDir={["row", "row", "row", "column"]}
              w={"fit-content"}
              h={"fit-content"}
              alignItems="center"
              position={"relative"}
            >
              <BlockchainComp
                theme={theme}
                blockchain={firstBlockChain}
                selectedChain={blockchain}
                onBlockchainSelect={onBlockchainSelect}
              />

              {Object.keys(contractChain).map(
                (item, index) =>
                  item !== firstBlockChain &&
                  !getFeatureGateConfig(config).blockchain_disabled?.includes(
                    item
                  ) && (
                    <BlockchainComp
                      key={index}
                      index={index}
                      theme={theme}
                      blockchain={item}
                      selectedChain={blockchain}
                      onBlockchainSelect={onBlockchainSelect}
                    />
                  )
              )}
              {firstBlockChain !== "buildbear" && (
                <BlockchainComp
                  theme={theme}
                  blockchain={"buildbear"}
                  selectedChain={blockchain}
                  onBlockchainSelect={onBlockchainSelect}
                />
              )}
            </Flex>
          </Flex>
          <Divider
            display={["none", "none", "none", "block"]}
            borderColor={theme === "dark" ? "#424242" : "#8A94A680"}
            orientation="vertical"
          />
          <Divider
            display={["block", "block", "block", "none"]}
            borderColor={theme === "dark" ? "#424242" : "#8A94A680"}
          />

          <Flex
            justifyContent="flex-start"
            w={["100%", "100%", "100%", "calc(100% - 130px)"]}
            h={[
              "calc(100% - 130px)",
              "calc(100% - 130px)",
              "calc(100% - 130px)",
              "100%",
            ]}
            flexDir="column"
            mt={[5, 5, 5, 0]}
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
                w={["100%", "100%", "100%", "auto"]}
                spacing={1}
                alignItems="flex-start"
              >
                <HStack w="100%" justifyContent={"flex-start"}>
                  <Text
                    color={theme === "dark" ? "white" : "gray.600"}
                    fontWeight={600}
                    fontSize="md"
                  >
                    {blockchain === "buildbear"
                      ? "Buildbear"
                      : contractChain[blockchain].blockchainName}
                  </Text>
                  <Divider orientation="vertical" h={4} borderColor="#8A94A6" />
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

                <Text w="100%" color="#8A94A6" fontWeight={400} fontSize="sm">
                  {blockchain === "buildbear"
                    ? "BuildBear is a platform that allows you to test your DApps at scale and with your entire team and understanding what happens under the hood when you do your complicated blockchain transactions."
                    : contractChain[blockchain].description}
                </Text>
              </VStack>
              <ArrowBackIcon
                fontSize={30}
                ml={"auto"}
                display={["none", "none", "none", "block"]}
                cursor="pointer"
                color={theme === "dark" ? "white" : "gray.600"}
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
                  color={theme === "dark" ? "white" : "gray.600"}
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
                  color={theme === "dark" ? "white" : "gray.600"}
                  height={50}
                  mt={0}
                  borderColor={theme === "dark" ? "white" : "gray.200"}
                  backgroundColor="transparent"
                  borderRadius={15}
                  width={"90%"}
                  maxWidth="600px"
                  value={node_id}
                  onChange={(e) => {
                    setNodeId(e.target.value);
                  }}
                />
                <Button
                  ml={5}
                  mt={5}
                  variant="brand"
                  onClick={() => onClose()}
                  w="200px"
                >
                  Confirm
                </Button>
              </>
            ) : (
              Object.keys(contractChain[blockchain].platforms).map(
                (platformValue, index) =>
                  !getFeatureGateConfig(config).platform_disabled?.includes(
                    platformValue
                  ) &&
                  platformValue !== "fuse" && (
                    <ChainSelector
                      key={`${platformValue}_${index}`}
                      index={index}
                      view={view}
                      theme={theme}
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
    </>
  );
};

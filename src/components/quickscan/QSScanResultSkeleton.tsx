import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import {
  HStack,
  Text,
  VStack,
  Flex,
  Image,
  Divider,
  Box,
  Button,
  SkeletonText,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import { severityArrayInOrder, contractChain } from "common/values";
import {
  getAssetsURL,
  getContractBlockChainLogoUrl,
  getContractBlockchainId,
  getContractChainLabel,
  sentenceCapitalize,
} from "helpers/helperFunction";
import { useHistory } from "react-router-dom";

export const QSScanResultSkeleton: React.FC<{
  blockAddress: string;
  blockPlatform: string;
  blockChain: string;
}> = ({ blockAddress, blockPlatform, blockChain }) => {
  const assetsUrl = getAssetsURL();
  const history = useHistory();

  return (
    <Flex
      w="100%"
      h="fit-content"
      flexDir={["column", "column", "row"]}
      justifyContent={["flex-start", "flex-start", "space-between"]}
      alignItems="center"
      mt={10}
    >
      <VStack
        spacing={5}
        borderRadius={10}
        padding={5}
        bgColor="#222222"
        justifyContent="flex-start"
        alignItems="center"
        h={["fit-content", "fit-content", "520px"]}
        w={["100%", "100%", "55%"]}
      >
        <Flex
          w="100%"
          justifyContent={["flex-start"]}
          alignItems={"center"}
          flexDir={["column", "column", "row"]}
        >
          <Flex
            w="60px"
            h="60px"
            backgroundColor={"#272727"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={["column", "column", "row"]}
          >
            <Image
              src={`${assetsUrl}${getContractBlockChainLogoUrl(
                blockPlatform,
                blockChain
              )}.svg`}
              height="40px"
              width="40px"
            />
          </Flex>
          <VStack
            ml={5}
            alignItems={["center", "center", "flex-start"]}
            w={["100%", "100%", "calc(100% - 60px)"]}
            spacing={1}
            textAlign={["center", "center", "left"]}
          >
            <Text
              w="100%"
              overflowWrap="break-word"
              color="white"
              fontWeight={600}
              fontSize="lg"
            >
              {blockAddress}
            </Text>
            <Flex
              w="100%"
              justifyContent={["flex-start"]}
              alignItems={"center"}
              flexDir={["column", "column", "row"]}
            >
              <Text
                whiteSpace="nowrap"
                color="white"
                fontWeight={300}
                fontSize="md"
              >
                {blockPlatform === "buildbear"
                  ? "Buildbear"
                  : contractChain[
                      getContractBlockchainId(blockPlatform, blockChain)
                    ].blockchainName.toUpperCase()}{" "}
                {`(${getContractChainLabel(
                  blockPlatform || "",
                  blockChain || ""
                )})`}
              </Text>
              <Divider
                mx={5}
                h={7}
                borderColor="gray.200"
                orientation="vertical"
                display={["none", "none", "block"]}
              />
              <SkeletonText
                w="150px"
                startColor="#4d4d4d"
                endColor="#757575"
                noOfLines={1}
                skeletonHeight="2"
              />
            </Flex>
          </VStack>
        </Flex>
        <Flex
          w="100%"
          justifyContent={["flex-start", "flex-start", "space-between"]}
          alignItems="center"
          flexDir={["column", "column", "row"]}
        >
          <HStack
            bgColor="#272727"
            w={["100%", "100%", "32%"]}
            borderRadius={5}
            p={3}
          >
            <Flex
              bgColor="#272727"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            >
              <Image
                src={`${assetsUrl}quickscan/qs_security_score.svg`}
                height="40px"
                width="40px"
              />
            </Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Security Score
              </Text>
              <HStack spacing={1}>
                <SkeletonText
                  w="30px"
                  startColor="#4d4d4d"
                  endColor="#757575"
                  noOfLines={1}
                  skeletonHeight="2"
                />
                <Text color="white" fontSize="sm" fontWeight={400}>
                  /100
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack
            bgColor="#272727"
            w={["100%", "100%", "32%"]}
            mt={[5, 5, 0]}
            borderRadius={5}
            p={3}
          >
            <Flex
              padding={2}
              bgColor="#272727"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            >
              {" "}
              <Image
                src={`${assetsUrl}quickscan/qs_scan_duration.svg`}
                height="40px"
                width="40px"
              />
            </Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={1}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Scan duration
              </Text>
              <SkeletonText
                w="50px"
                startColor="#4d4d4d"
                endColor="#757575"
                noOfLines={1}
                skeletonHeight="2"
              />
            </VStack>
          </HStack>
          <HStack
            bgColor="#272727"
            w={["100%", "100%", "32%"]}
            mt={[5, 5, 0]}
            borderRadius={5}
            p={3}
          >
            <Flex
              padding={2}
              bgColor="#272727"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            >
              <Image
                src={`${assetsUrl}quickscan/qs_loc.svg`}
                height="40px"
                width="40px"
              />
            </Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={1}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Lines of code
              </Text>
              <SkeletonText
                w="50px"
                startColor="#4d4d4d"
                endColor="#757575"
                noOfLines={1}
                skeletonHeight="2"
              />
            </VStack>
          </HStack>
        </Flex>
        <Box
          bgColor="#272727"
          w="100%"
          px={[4, 4, 4, 8]}
          py={6}
          borderRadius={"15px"}
        >
          <Flex
            w="100%"
            justifyContent={["center", "center", "center", "flex-start"]}
            alignItems={["center", "center", "center", "flex-start"]}
            direction={["column", "column", "row"]}
          >
            <SkeletonCircle
              startColor="#4d4d4d"
              endColor="#757575"
              height="100px"
              width="100px"
            />
            <VStack
              ml={5}
              textAlign="left"
              alignItems="flex-start"
              w={["100%", "100%", "100%", "calc(100% - 100px)"]}
              px={4}
              spacing={3}
            >
              <SkeletonText
                w="60%"
                startColor="#4d4d4d"
                endColor="#757575"
                noOfLines={1}
                skeletonHeight="4"
              />
              <SkeletonText
                w="100%"
                startColor="#4d4d4d"
                endColor="#757575"
                noOfLines={4}
                skeletonHeight="2"
              />
            </VStack>
          </Flex>
        </Box>
        <HStack
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          bgColor="#272727"
          p={8}
          borderRadius={10}
          spacing={10}
        >
          <Skeleton
            startColor="#4d4d4d"
            endColor="#757575"
            height="56px"
            width="56px"
          />
          <SkeletonText
            w="100%"
            startColor="#4d4d4d"
            endColor="#757575"
            noOfLines={3}
            skeletonHeight="2"
          />
        </HStack>
      </VStack>
      <Flex
        w={["100%", "100%", "calc(45% - 40px)"]}
        bgColor="#222222"
        borderRadius={10}
        padding={5}
        flexDir={["column", "column", "row"]}
        alignItems={"center"}
        justifyContent={["flex-start", "flex-start", "space-between"]}
        h={["fit-content", "fit-content", "520px"]}
      >
        <VStack
          w={[
            "100%",
            "100%",
            "calc(100% - 150px)",
            "calc(100% - 180px)",
            "calc(100% - 220px)",
          ]}
          alignItems="center"
          justifyContent="center"
          h={["fit-content", "fit-content", "100%"]}
          spacing={10}
        >
          <SkeletonCircle
            startColor="#4d4d4d"
            endColor="#575757"
            height="300px"
            width="300px"
          />
          <Button
            variant="brand"
            w={"100%"}
            maxW={"300px"}
            onClick={() => history.push("/signin")}
          >
            View detailed Result
          </Button>
        </VStack>
        <Flex
          w={["100%", "100%", "120px", "150px", "180px"]}
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="row"
          flexWrap="wrap"
          columnGap={5}
          rowGap={3}
          mt={[5, 10, 0]}
        >
          {severityArrayInOrder.map((item) => (
            <VStack
              w={["45%", "30%", "100%"]}
              h="fit-content"
              cursor="pointer"
              px={3}
              py={2}
              bgColor={"#3E3E3E"}
              border="1px solid #3E3E3E"
              spacing={3}
              borderRadius={5}
              alignItems="flex-start"
            >
              <HStack>
                <Divider
                  h={3}
                  orientation="vertical"
                  borderColor={item.value}
                  borderWidth={2}
                />{" "}
                <Text color="#8A94A6" fontSize="sm">
                  {item.value}
                </Text>
              </HStack>
              <SkeletonText
                w="100px"
                startColor="#4d4d4d"
                endColor="#757575"
                noOfLines={1}
                skeletonHeight="2"
              />
            </VStack>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

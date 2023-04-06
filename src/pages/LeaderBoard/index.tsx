import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { SeverityIcon } from "components/icons";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link,
  useDisclosure,
  HStack,
  VStack,
  Input,
  CircularProgressLabel,
  CircularProgress,
  Divider,
  useToast,
  Spinner,
  Stack,
  useMediaQuery,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";

import SignupBox from "components/signupBox";
import Infographics from "components/infographics";
import { DetectorIcon } from "components/icons";
import { DetectorItemProp } from "common/types";
import { detectorData } from "common/values";

const HackComp: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDir="column"
      w="calc(33.33% - 15px)"
      maxW="450px"
      height="250px"
      borderRadius="25px"
      mr={"15px"}
      mb={"15px"}
      p={7}
      background={"#FFFFFF"}
    >
      <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          height="fit-content"
        >
          <Heading mb={3} fontSize="lg">
            WinDice
          </Heading>
          <HStack>
            <SeverityIcon variant={"low"} />
            <Text fontSize="sm">Rug Pull</Text>
          </HStack>
        </HStack>
        <Text fontSize="xs" color="#78909C">
          Total Loss
        </Text>
        <HStack mt={5} w="80%" flexWrap="wrap">
          <HStack mr={3}>
            <Image
              mr={1}
              src={`/blockscan/etherscan.svg`}
              alt="Product screenshot"
              h={"25px"}
              w={"25px"}
            />
            <Heading mb={3} fontSize="lg">
              8000 BTC,
            </Heading>
          </HStack>
          <HStack>
            <Image
              mr={1}
              src={`/blockscan/bscscan.svg`}
              alt="Product screenshot"
              h={"25px"}
              w={"25px"}
            />
            <Heading mb={3} fontSize="lg">
              56,000 ETH,
            </Heading>
          </HStack>
        </HStack>
      </VStack>

      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        height="fit-content"
      >
        <Text fontSize="xs" color="#78909C">
          March 27, 2023
        </Text>
        M
        <Button variant="text" color="#3300FF">
          Learn ore
        </Button>
      </HStack>
    </Flex>
  );
};

const ArticleComp: React.FC = () => {
  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      w="350px"
      height="300px"
      borderRadius="25px"
      mr={5}
      background={"#FAFBFC"}
    >
      <Image
        src="/background/article_img.png"
        width="100%"
        height="250px"
        borderRadius="25px"
        alt={"Article Image"}
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDir="row"
        px={5}
        borderBottomLeftRadius="25px"
        borderBottomRightRadius="25px"
        width="100%"
        height="100px"
        background={"#FAFBFC"}
      >
        <VStack spacing={1} alignItems="flex-start">
          <Text fontSize="sm">Smart Contract Audit</Text>
          <Text fontSize="xs" color="#78909C">
            Published in . Mar 13
          </Text>
        </VStack>
        <Button fontSize="12px" py={4} px={5} variant="cta-outline" w="">
          Read Full Article
        </Button>
      </Flex>
    </Flex>
  );
};

const LeaderBoard: React.FC = () => {
  const attackTrendsData = [
    { title: "Contract Vulnerability", color: "#9C003D", number: "56" },
    { title: "Rug Pull", color: "#F46D43", number: "34" },
    // { title: "Contract", color: "", number: "" },
    // { title: "Contract", color: "", number: "" },
    // { title: "Contract", color: "", number: "" },
    // { title: "Contract", color: "", number: "" },
    // { title: "Contract", color: "", number: "" },
    // { title: "Contract", color: "", number: "" },
    // { title: "Contract", color: "", number: "" },
    // { title: "Contract", color: "", number: "" },
  ];

  const headingData = [
    { title: "The total amount hacked ", data: "$6.27B" },
    { title: "Number of hacks", data: "205" },
    { title: "Security Breaches", data: "155" },
    { title: "Security Breaches", data: "155" },
  ];

  return (
    <>
      <Header />
      <Container maxW="100vw" p={0} color="black">
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          p={0}
          textAlign={["center", "center"]}
          flexDir="column"
        >
          <Box
            flexDir={"column"}
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            w={"100%"}
            px={[0, 0, 20]}
            py={10}
            h="800px"
            pb={"200px"}
            background={"url('/background/leaderboard_bg.png')"}
            backgroundSize="cover"
            backgroundPosition={"center"}
            backgroundRepeat="no-repeat"
          >
            <Text color="#B0B7C3" fontSize={"2xl"}>
              Web3 Hack Statistics, Hackerboard
            </Text>
            <Flex
              flexDir={"row"}
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              w={"100%"}
              mt={5}
            >
              <Flex
                flexDir={"column"}
                display={"flex"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                w={"25%"}
                h="fit-content"
              >
                <Heading
                  fontSize={["3xl", "6xl"]}
                  mb={3}
                  sx={{
                    background:
                      "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  $ 6.27B
                </Heading>
                <Text color="#8A94A6" fontSize={"lg"}>
                  The total amount hacked
                </Text>
                <HStack mt={7} mb={2} w="100%" justifyContent={"space-between"}>
                  <Heading color={"white"} fontSize={"2xl"}>
                    Attack Trends
                  </Heading>
                  <Heading color={"white"} fontSize={"2xl"}>
                    205
                  </Heading>
                </HStack>
                {attackTrendsData.map((item) => (
                  <HStack mt={3} w="100%" justifyContent={"space-between"}>
                    <HStack>
                      <SeverityIcon variant={item.color} />
                      <Text color="#FFFFFF" fontSize={"md"}>
                        {item.title}
                      </Text>
                    </HStack>
                    <Text color="#FFFFFF" fontSize={"md"}>
                      {item.number}
                    </Text>
                  </HStack>
                ))}
              </Flex>
              <Flex
                flexDir={"column"}
                display={"flex"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                w={"70%"}
                h="fit-content"
              >
                <Box
                  backgroundColor={"#060316"}
                  height="450px"
                  width="100%"
                ></Box>
                <Flex
                  sx={{
                    mt: 7,
                    w: "100%",
                    justifyContent: "space-between",
                    flexDir: "row",
                  }}
                >
                  {headingData.map((item) => (
                    <Flex
                      sx={{
                        flexDir: "column",
                        alignItems: "flex-start",
                        mb: [8, 8, 0],
                        ml: [20, 20, 0],
                      }}
                    >
                      <Text color={"#D9D9D9"} fontSize="sm" fontWeight={400}>
                        {item.title}
                      </Text>
                      <Heading
                        as="h1"
                        color="#FFFFFF"
                        mt={2}
                        fontSize={["3xl", "4xl"]}
                        mb={8}
                      >
                        {item.data}
                      </Heading>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Box>

          <Box
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={["90%"]}
            px={[0, 0, 0, 10]}
            mt={"-60px"}
            mb={"120px"}
            py={[0, 0, 0, 10]}
            borderRadius={20}
            background={"#FFFFFF"}
          >
            <Heading as="h1" fontSize="3xl" my={5}>
              Explore through all the hacks{" "}
              <Box as="span" color="#3300FF" textDecoration="underline">
                since 2020
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
              Lorem ipsum dolor sit amet consectetur. Vitae egestas integer est
              ut iaculis. Volutpat nascetur tortor et ante.
            </Text>
          </Box>

          <Box
            w={"90%"}
            borderRadius={15}
            p={5}
            my={10}
            background={" #FAFBFC "}
            display="flex"
            flexDir={"column"}
            alignItems={["center", "center", "center", "flex-start"]}
            justifyContent={"flex-start"}
          >
            <Flex
              w={"100%"}
              mt={5}
              display="flex"
              flexDir={"row"}
              alignItems={["flex-start", "flex-start", "flex-start", "center"]}
              justifyContent={"flex-start"}
              flexWrap="wrap"
            >
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
            </Flex>
          </Box>

          <Box
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={"90%"}
            px={[0, 0, 10]}
            py={10}
            my={10}
            borderRadius={20}
            background={"#FFFFFF"}
          >
            <Heading as="h1" fontSize="3xl" mb={4}>
              Most recent hacks that{" "}
              <Box as="span" color="#3300FF" textDecoration="underline">
                made the news
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize={["lg", "lg", "xl"]} mt={4} mb={6}>
              Lorem ipsum dolor sit amet consectetur. Vitae egestas integer est
              ut iaculis. Volutpat nascetur tortor et ante.
            </Text>
            <Flex
              justifyContent="flex-start"
              alignItems={"flex-start"}
              height="fit-content"
              width="100%"
              overflowX="scroll"
              my={20}
              pb={5}
            >
              <Flex
                justifyContent="flex-start"
                alignItems={"flex-start"}
                height="fit-content"
                width="fit-content"
              >
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
              </Flex>
            </Flex>
          </Box>
          <Box
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={"90%"}
            px={[0, 0, 10]}
            py={10}
            borderRadius={20}
            background={"#FFFFFF"}
          >
            <Heading as="h1" fontSize="3xl" mb={4}>
              Why{" "}
              <Box as="span" color="#3300FF">
                SolidityScan ?
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <Infographics />
            <SignupBox />
          </Box>
        </Flex>
        <Footer />
      </Container>
    </>
  );
};

export default LeaderBoard;

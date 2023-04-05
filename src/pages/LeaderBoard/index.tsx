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
        {/* <Text fontSize="xs" color="#78909C">
          Total Loss
        </Text> */}
        {/* <HStack mt={5} w="80%" flexWrap="wrap">
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
        </HStack> */}
      </VStack>

      {/* <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        height="fit-content"
      >
        <Text fontSize="xs" color="#78909C">
          March 27, 2023
        </Text>
        <Button variant="text" color="#3300FF">
          Learn More
        </Button>
      </HStack> */}
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
            alignItems={"center"}
            w={"100%"}
            px={[0, 0, 10]}
            py={20}
            h="750px"
            pb={"200px"}
            background={"url('/background/leaderboard_bg.png')"}
            backgroundSize="cover"
            backgroundPosition={"center"}
            backgroundRepeat="no-repeat"
          ></Box>

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

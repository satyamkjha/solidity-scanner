import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";

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

const LeaderBoard: React.FC = () => {
  const headingData = [
    { title: "Total Vulnerability Detectors", data: "121" },
    { title: "Attack Categories", data: "38" },
    { title: "SWC Coverage", data: "36/36" },
    { title: "Upcoming Vulnerability Detectors", data: "46" },
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
            <Heading as="h1" fontSize="3xl" mb={4}>
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

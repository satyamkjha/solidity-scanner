import React from "react";

import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { DetectorItemProp } from "common/types";
import { useConfig } from "hooks/useConfig";
import { getAssetsURL } from "helpers/helperFunction";
import { Header } from "components/header";
import { useDetectorsData } from "hooks/useDetectorsData";

const DetectorItem: React.FC<{ item: DetectorItemProp }> = ({ item }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Flex
      sx={{
        w: "calc(100%)",
        background: "white",
        borderRadius: 15,
        p: 8,
        my: 4,
      }}
      justifyContent="space-between"
      flexDir={"row"}
      alignItems="flex-start"
      //   filter={"drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));"}
    >
      <Flex
        justifyContent="flex-start"
        flexDir={"column"}
        alignItems="flex-start"
        flexWrap={"wrap"}
        w={["calc(100%)", "calc(100%)", "calc(100% - 200px)"]}
      >
        <Text fontSize={["xl"]} mb={6} fontWeight={600}>
          {item.attackCategory}
        </Text>
        <Flex
          justifyContent={["space-between", "space-between", "flex-start"]}
          flexDir={"row"}
          alignItems="flex-start"
          w={"calc(100%)"}
        >
          <Flex
            justifyContent="flex-start"
            flexDir={["column", "column", "row"]}
            alignItems="flex-start"
            flexWrap={["nowrap", "nowrap", "wrap"]}
            w={"calc(100% - 100px)"}
          >
            {item.swc.map((swcItem, index) => (
              <Text
                as="h3"
                color={"#3300FF"}
                fontSize={["lg"]}
                mb={1}
                mr={1}
                fontWeight={600}
              >
                {`${swcItem}${index === item.swc.length - 1 ? "" : ","}`}
              </Text>
            ))}
          </Flex>
          <VStack
            sx={{
              width: "120px",
            }}
            display={["flex", "flex", "none"]}
            justifyContent="flex-start"
          >
            <Text color="#78909C" fontSize={["sm"]} fontWeight={500}>
              No. of Detectors
            </Text>
            <HStack spacing={5} width="100%" justifyContent={"center"}>
              <Image src={`${assetsURL}detectors/detectorIcon.svg`} />
              <Text fontSize={["2xl"]} fontWeight={900}>
                {item.nod}
              </Text>
            </HStack>
          </VStack>
        </Flex>
        <Text fontSize={["md"]} mt={4} fontWeight={300}>
          {item.description}
        </Text>
      </Flex>
      <HStack
        sx={{
          width: "180px",
        }}
        display={["none", "none", "flex"]}
        justifyContent="space-between"
      >
        <Image src={`${assetsURL}detectors/detectorIcon.svg`} />
        <VStack alignItems={"flex-start"}>
          <Text color="#78909C" fontSize={["sm"]} fontWeight={500}>
            No. of Detector
          </Text>
          <Text fontSize={["2xl"]} fontWeight={900}>
            {item.nod}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

const Detectors: React.FC = () => {
  const config: any = useConfig();
  const headingData: { title: string; data: string }[] =
    config && config.REACT_APP_ISSUES_DATA
      ? config.REACT_APP_ISSUES_DATA.detectorPageData
      : [];
  const assetsURL = getAssetsURL(config);

  const { data: detectorsData } = useDetectorsData();

  return (
    <Flex
      w="100%"
      flexDir={"column"}
      alignItems={"center"}
      justifyContent="flex-start"
    >
      <Header theme="light" />
      <Flex
        as="section"
        w="100%"
        my={10}
        textAlign={["center", "left"]}
        py={10}
        px={[5, 5, 5, 20]}
        display={["flex"]}
        flexDirection={["column", "column", "column", "row"]}
        alignItems={"center"}
        justifyContent={[
          "flex-start",
          "flex-start",
          "flex-start",
          "space-between",
        ]}
      >
        <Box
          w={["100%", "100%", "100%", "60%"]}
          px={[0, 0, 10]}
          py={5}
          justifyContent="center"
          display={"flex"}
          flexDir="column"
          alignItems={["center", "center", "center", "flex-start"]}
        >
          <Heading as="h1" fontSize={["3xl", "4xl"]} mb={8}>
            SolidityScan Smart Contract Vulnerability Coverage
          </Heading>
          <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
            SolidityScan is capable of identifying all the SWCs listed in the
            SWC Registry, as well as providing additional coverage that has been
            developed by the researchers on the SolidityScan team. This includes
            a comprehensive list of smart contract vulnerabilities,
            misconfigurations, logical issues, and weaknesses,
            technology-specific smart contract vulnerabilities, and gas
            optimization techniques to reduce gas costs.
          </Text>
        </Box>
        <Box
          w={["100%", "100%", "100%", "40%"]}
          display={["flex"]}
          flexDirection="column"
          alignItems={"flex-end"}
        >
          <Image
            src={`${assetsURL}detectors/detector_icon_lg.png`}
            transform={[
              "translateX(0px)",
              "translateX(0px)",
              "translateX(0px)",
              "translateX(20px)",
            ]}
            zIndex={"10"}
            alt={"Run scans for your smart contracts"}
          />
        </Box>
      </Flex>
      <Box
        w="100%"
        as="section"
        sx={{ textAlign: "center" }}
        my={[4, 8]}
        px={[0, 0, 0, 24]}
      >
        <Flex
          sx={{
            w: "90%",
            justifyContent: "space-between",
            my: [10, 10, 10],
            mx: "auto",
            flexDir: ["column", "column", "row"],
            flexWrap: "wrap",
          }}
        >
          {headingData.map((item) => (
            <Flex
              sx={{
                flexDir: "column",
                alignItems: "flex-start",
                mb: [8, 8, 0],
                ml: [20, 20, 0],
                w: "200px",
              }}
            >
              <Text
                textAlign={"left"}
                color={"#00006D"}
                fontSize="sm"
                fontWeight={400}
              >
                {item.title}
              </Text>
              <Heading as="h1" mt={2} fontSize={["3xl", "4xl"]} mb={8}>
                {item.data}
              </Heading>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Box
        w={["95%", "95%", "90%"]}
        borderRadius={15}
        p={[2, 2, 10]}
        mt={[0, 0, 10]}
        background={"#FAFBFC"}
        display="flex"
        flexDir={"column"}
        alignItems={["center", "center", "center", "flex-start"]}
        justifyContent={"flex-start"}
      >
        <Heading
          width={"100%"}
          textAlign="left"
          as="h1"
          fontSize={["2xl", "3xl"]}
          mb={8}
          mt={[8, 8, 0]}
          ml={[5, 5, 0]}
        >
          SolidityScan Detectors
        </Heading>
        {detectorsData &&
          detectorsData.data.map((item) => <DetectorItem item={item} />)}
      </Box>
    </Flex>
  );
};

export default Detectors;

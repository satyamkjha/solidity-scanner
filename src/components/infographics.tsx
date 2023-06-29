import { Flex, Text, Image, Heading, Box } from "@chakra-ui/react";
import React from "react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

const Infographics: React.FC<{ header?: any; subHeader?: any }> = ({
  header,
  subHeader,
}) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  return (
    <Flex w={"100%"} flexDir="column" alignItems="center" mb={14}>
      {header ? (
        header
      ) : (
        <Heading as="h1" fontSize="3xl" mb={4}>
          Why{" "}
          <Box textDecoration="underline" as="span" color="#3300FF">
            SolidityScan ?
          </Box>{" "}
        </Heading>
      )}
      {subHeader ? (
        subHeader
      ) : (
        <Text
          color="subtle"
          fontSize={["lg", "lg", "xl"]}
          w={"50%"}
          textAlign="center"
        >
          Smart-contract scanning tool built to discover vulnerabilities &
          mitigate risks in your code.
        </Text>
      )}
      <Flex
        sx={{
          w: "65%",
          justifyContent: "space-between",
          my: [10],
          color: "#00006D",
          mx: "auto",
          flexDir: ["column", "column", "row"],
        }}
      >
        <Flex
          sx={{
            flexDir: "column",
            alignItems: "center",
            mb: [8, 8, 0],
          }}
        >
          <Image
            src={`${assetsURL}landing/infographic_1.svg`}
            height={"140px"}
            width={"140px"}
          />
          <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
            Initiate Scans
          </Text>
        </Flex>
        <Flex
          sx={{
            flexDir: "column",
            alignItems: "center",
            mb: [8, 8, 0],
          }}
        >
          <Image
            src={`${assetsURL}landing/infographic_2.svg`}
            height={"140px"}
            width={"140px"}
          />
          <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
            Publish Reports
          </Text>
        </Flex>
        <Flex
          sx={{
            flexDir: "column",
            alignItems: "center",
            mb: [8, 8, 0],
          }}
        >
          <Image
            src={`${assetsURL}landing/infographic_3.svg`}
            height={"140px"}
            width={"140px"}
          />
          <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
            {no_of_vuln_detectors}+ Vulnerability Checks
          </Text>
        </Flex>
        <Flex
          sx={{
            flexDir: "column",
            alignItems: "center",
            mb: [8, 8, 0],
          }}
        >
          <Image
            src={`${assetsURL}landing/infographic_4.svg`}
            height={"140px"}
            width={"140px"}
          />
          <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
            Easy Integrations
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Infographics;

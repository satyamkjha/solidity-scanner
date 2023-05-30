import { Flex, Text, useMediaQuery, Image } from "@chakra-ui/react";
import React from "react";
import { ScheduleScan, PublishReport, VulnCheck, Integration } from "./icons";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const Infographics: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  return (
    <Flex
      sx={{
        w: "70%",
        justifyContent: "space-between",
        my: [10, 10, 20],
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
      </Flex>{" "}
    </Flex>
  );
};

export default Infographics;

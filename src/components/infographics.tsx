import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { ScheduleScan, PublishReport, VulnCheck, Integration } from "./icons";

export const Infographics: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

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
        <ScheduleScan size={isDesktopView ? 140 : 100} />
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
        <PublishReport size={isDesktopView ? 140 : 100} />
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
        <VulnCheck size={isDesktopView ? 140 : 100} />
        <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
          100+ Vulnerability Checks
        </Text>
      </Flex>
      <Flex
        sx={{
          flexDir: "column",
          alignItems: "center",
          mb: [8, 8, 0],
        }}
      >
        <Integration size={isDesktopView ? 140 : 100} />
        <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
          Easy Integrations
        </Text>
      </Flex>{" "}
    </Flex>
  );
};

export default Infographics;

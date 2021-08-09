import React from "react";
import { Flex, VStack, HStack, Box, Text } from "@chakra-ui/react";

import VulnerabilityDistribution from "components/vulnDistribution";
import PieChart from "components/pieChart";
import Score from "components/score";
import { ScanSummary } from "common/types";

const pieData = (
  critical: number,
  high: number,
  medium: number,
  low: number,
  informational: number
) => [
  {
    id: "critical",
    label: "Critical",
    value: critical,
    color: "#FF5C00",
  },
  {
    id: "high",
    label: "High",
    value: high,
    color: "#FF5C00",
  },
  {
    id: "medium",
    label: "Medium",
    value: medium,
    color: "#FFE600",
  },
  {
    id: "low",
    label: "Low",
    value: low,
    color: "#38CB89",
  },
  {
    id: "informational",
    label: "Informational",
    value: informational,
    color: "#A0AEC0",
  },
];

const Overview: React.FC<{ data: ScanSummary }> = ({ data }) => {
  const {
    issues_count,
    issue_severity_distribution: { critical, high, medium, low, informational },
    scan_time_taken,
    count_files_analyzed,
    score,
  } = data;
  return (
    <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }}>
      <VStack w={["100%", "100%", "50%"]} mb={[8, 8, 0]}>
        <Box w={["100%", "100%", "70%"]} h="300px">
          <PieChart
            data={pieData(critical, high, medium, low, informational)}
          />
        </Box>
        <Box w={["70%", "70%", "60%"]}>
          <VulnerabilityDistribution
            critical={critical}
            high={high}
            medium={medium}
            low={low}
            informational={informational}
          />
        </Box>
      </VStack>
      <VStack
        w={["100%", "100%", "50%"]}
        alignItems="flex-start"
        p={8}
        spacing={5}
      >
        <Score score={score} />
        <Box sx={{ w: "100%", borderRadius: 15, bg: "bg.subtle", p: 4 }}>
          <Text sx={{ fontSize: "sm", letterSpacing: "0.7px" }}>
            SCAN STATISTICS
          </Text>
        </Box>

        <VStack w="100%" px={4} spacing={8} fontSize="sm">
          <HStack w="100%" justifyContent="space-between">
            <Text>Status</Text>
            <Text
              sx={{
                color: "green.500",
                bg: "green.50",
                px: 3,
                py: 1,
                borderRadius: 20,
              }}
            >
              Completed
            </Text>
          </HStack>
          <HStack w="100%" justifyContent="space-between">
            <Text>Score</Text>
            <Text color="subtle">{score}</Text>
          </HStack>
          <HStack w="100%" justifyContent="space-between">
            <Text>Issue Count</Text>
            <Text color="subtle">{issues_count}</Text>
          </HStack>
          <HStack w="100%" justifyContent="space-between">
            <Text>Duration</Text>
            <Text color="subtle">{scan_time_taken}</Text>
          </HStack>
          <HStack w="100%" justifyContent="space-between">
            <Text>Lines of code</Text>
            <Text color="subtle">{count_files_analyzed}</Text>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Overview;

import React from "react";
import {
  Flex,
  VStack,
  HStack,
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Image
} from "@chakra-ui/react";

import VulnerabilityDistribution from "components/vulnDistribution";
import PieChart from "components/pieChart";
import { ScanSummary } from "common/types";
import { LogoIcon } from "./icons";

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

const Overview: React.FC<{ data: ScanSummary; scansRemaining?: number }> = ({
  data,
  scansRemaining,
}) => {
  const {
    issues_count,
    issue_severity_distribution: { critical, high, medium, low, informational },
    scan_time_taken,
    lines_analyzed_count,
    score,
  } = data;


  console.log(issues_count);
  return (
    <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }}>
      <VStack w={["100%", "100%", "50%"]} mb={[8, 8, 0]}>
        <Box w={["100%", "100%", "70%"]} display='flex' justifyContent='center' alignItems={'center'} h="300px">
          {issues_count === 0 ? <Image
              src="/nobug.svg"
              alt="No Bugs Found"
            /> : <PieChart
            data={pieData(critical, high, medium, low, informational)}
          /> }
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
        <HStack w="100%" justifyContent="space-between">
          {scansRemaining && (
            <Flex px={2}>
              <LogoIcon size={40} />
              <Box ml={2} mt="-4px">
                <Text>
                  {scansRemaining.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </Text>
                <Text fontSize="12px" color="subtle">
                  Scans left
                </Text>
              </Box>
            </Flex>
          )}
          <CircularProgress
            value={(parseInt(score, 10) * 100) / 5}
            color="accent"
            thickness="4px"
            size="65px"
            capIsRound
          >
            <CircularProgressLabel
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box>
                <Text fontSize="14px" fontWeight={700} color="accent">
                  {score}
                </Text>
                <Text fontSize="11px" color="subtle" mt="-4px">
                  Score
                </Text>
              </Box>
            </CircularProgressLabel>
          </CircularProgress>
        </HStack>
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
            <Text color="subtle">{lines_analyzed_count}</Text>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Overview;

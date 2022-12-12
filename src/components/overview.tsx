import React from "react";
import {
  Flex,
  VStack,
  HStack,
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Image,
} from "@chakra-ui/react";

import VulnerabilityDistribution, {
  ErrorVulnerabilityDistribution,
} from "components/vulnDistribution";
import PieChart, { ErrorResponsivePie } from "components/pieChart";
import { Scan, ScanSummary } from "common/types";
import { LogoIcon, NoBugIcon, ScanErrorIcon } from "./icons";

const pieData = (
  critical: number,
  high: number,
  medium: number,
  low: number,
  informational: number,
  gas: number
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
    {
      id: "gas",
      label: "Gas",
      value: gas,
      color: "#F795B4",
    },
  ];

const Overview: React.FC<{
  scanData: Scan;
  scansRemaining?: number;
}> = ({ scanData, scansRemaining }) => {
  return (
    <>
      {scanData.multi_file_scan_status === "scan_done" &&
        scanData.multi_file_scan_summary ? (
        <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }}>
          <VStack w={["100%", "100%", "50%"]} mb={[8, 8, 0]}>
            <Box
              w={["100%", "100%", "70%"]}
              display="flex"
              justifyContent="center"
              alignItems={"center"}
              h="300px"
            >
              {scanData.multi_file_scan_summary.issues_count === 0 ? (
                <NoBugIcon size={200} />
              ) : (
                <PieChart
                  data={pieData(
                    scanData.multi_file_scan_summary.issue_severity_distribution
                      .critical,
                    scanData.multi_file_scan_summary.issue_severity_distribution
                      .high,
                    scanData.multi_file_scan_summary.issue_severity_distribution
                      .medium,
                    scanData.multi_file_scan_summary.issue_severity_distribution
                      .low,
                    scanData.multi_file_scan_summary.issue_severity_distribution
                      .informational,
                    scanData.multi_file_scan_summary.issue_severity_distribution
                      .gas
                  )}
                />
              )}
            </Box>
            <Box w={["70%", "70%", "60%"]}>
              <VulnerabilityDistribution
                critical={
                  scanData.multi_file_scan_summary.issue_severity_distribution
                    .critical
                }
                high={
                  scanData.multi_file_scan_summary.issue_severity_distribution
                    .high
                }
                medium={
                  scanData.multi_file_scan_summary.issue_severity_distribution
                    .medium
                }
                low={
                  scanData.multi_file_scan_summary.issue_severity_distribution
                    .low
                }
                informational={
                  scanData.multi_file_scan_summary.issue_severity_distribution
                    .informational
                }
                gas={
                  scanData.multi_file_scan_summary.issue_severity_distribution
                    .gas
                }
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
                value={
                  (parseInt(scanData.multi_file_scan_summary.score, 10) * 100) /
                  5
                }
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
                      {scanData.multi_file_scan_summary.score}
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
                <Text color="subtle">
                  {scanData.multi_file_scan_summary.score + "/5"}
                </Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Issue Count</Text>
                <Text color="subtle">
                  {scanData.multi_file_scan_summary.issues_count}
                </Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Duration</Text>
                <Text color="subtle">
                  {scanData.multi_file_scan_summary.scan_time_taken + " second(s)"}
                </Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Lines of code</Text>
                <Text color="subtle">
                  {scanData.multi_file_scan_summary.lines_analyzed_count}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Flex>
      ) : scanData.scan_status === "scan_done" && scanData.scan_summary ? (
        <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }}>
          <VStack w={["100%", "100%", "50%"]} mb={[8, 8, 0]}>
            <Box
              w={["100%", "100%", "70%"]}
              display="flex"
              justifyContent="center"
              alignItems={"center"}
              h="300px"
            >
              {scanData.scan_summary.issues_count === 0 ? (
                <Image src="/nobug.svg" alt="No Bugs Found" />
              ) : (
                <PieChart
                  data={pieData(
                    scanData.scan_summary.issue_severity_distribution.critical,
                    scanData.scan_summary.issue_severity_distribution.high,
                    scanData.scan_summary.issue_severity_distribution.medium,
                    scanData.scan_summary.issue_severity_distribution.low,
                    scanData.scan_summary.issue_severity_distribution
                      .informational,
                    scanData.scan_summary.issue_severity_distribution.gas
                  )}
                />
              )}
            </Box>
            <Box w={["70%", "70%", "60%"]}>
              <VulnerabilityDistribution
                critical={
                  scanData.scan_summary.issue_severity_distribution.critical
                }
                high={scanData.scan_summary.issue_severity_distribution.high}
                medium={
                  scanData.scan_summary.issue_severity_distribution.medium
                }
                low={scanData.scan_summary.issue_severity_distribution.low}
                informational={
                  scanData.scan_summary.issue_severity_distribution
                    .informational
                }
                gas={scanData.scan_summary.issue_severity_distribution.gas}
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
                value={(parseInt(scanData.scan_summary.score, 10) * 100) / 5}
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
                      {scanData.scan_summary.score}
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
                <Text color="subtle">{scanData.scan_summary.score}</Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Issue Count</Text>
                <Text color="subtle">{scanData.scan_summary.issues_count}</Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Duration</Text>
                <Text color="subtle">
                  {scanData.scan_summary.scan_time_taken}
                </Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Lines of code</Text>
                <Text color="subtle">
                  {scanData.scan_summary.lines_analyzed_count}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Flex>
      ) : (
        <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }}>
          <VStack w={["100%", "100%", "50%"]} spacing={5} mb={[8, 8, 0]}>
            <Box w={["100%", "100%", "70%"]} h="200px">
              <ErrorResponsivePie />
            </Box>
            <Box w={["70%", "70%", "60%"]} sx={{ marginBottom: 10 }}>
              <ErrorVulnerabilityDistribution />
            </Box>
            <Flex
              w="100%"
              m={5}
              borderRadius="20px"
              bgColor="high-subtle"
              p={5}
            >
              <ScanErrorIcon size={28} />
              <Text fontSize={"xs"} color="high" ml={4}>
                {scanData.scan_message
                  ? scanData.scan_message
                  : scanData.scan_status}
              </Text>
            </Flex>
          </VStack>
          <VStack
            w={["100%", "100%", "50%"]}
            alignItems="flex-start"
            p={8}
            spacing={5}
          >
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
                    color: "high",
                    bg: "high-subtle",
                    px: 3,
                    py: 1,
                    borderRadius: 20,
                  }}
                >
                  Error
                </Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Score</Text>
                <Text color="subtle">--</Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Issue Count</Text>
                <Text color="subtle">--</Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Duration</Text>
                <Text color="subtle">--</Text>
              </HStack>
              <HStack w="100%" justifyContent="space-between">
                <Text>Lines of code</Text>
                <Text color="subtle">--</Text>
              </HStack>
            </VStack>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default Overview;

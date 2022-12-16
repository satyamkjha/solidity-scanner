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
  Divider,
  Link,
} from "@chakra-ui/react";

import VulnerabilityDistribution, {
  ErrorVulnerabilityDistribution,
} from "components/vulnDistribution";
import PieChart, { ErrorResponsivePie } from "components/pieChart";
import { Scan, ScanSummary } from "common/types";
import { CredshieldsIcon, LogoIcon, NoBugIcon, ScanErrorIcon } from "./icons";
import ManualAuditCard from "./manualAuditCard";

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
  onTabChange: any;
}> = ({ scanData, scansRemaining, onTabChange }) => {
  const handleTabsChange = (index: number) => {
    onTabChange(index);
  };
  return (
    <>
      {scanData.multi_file_scan_status === "scan_done" &&
      scanData.multi_file_scan_summary ? (
        <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }}>
          <VStack w={["100%", "100%", "40%"]} mb={[8, 8, 0]}>
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
            <Box w={["100%", "80%", "60%"]}>
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
            w={["100%", "100%", "60%"]}
            alignItems={["center", "center", "center", "flex-start"]}
            py={8}
            px={[0, 0, 8]}
            spacing={5}
          >
            <Box
              w="100%"
              px={[4, 4, 4, 8]}
              py={6}
              borderRadius={"15px"}
              background={
                parseFloat(scanData.multi_file_scan_summary.score) < 2.5
                  ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                  : parseFloat(scanData.multi_file_scan_summary.score) >= 4.5
                  ? "linear-gradient(96.27deg, #EFFFED 0.75%, #E6FFE2 96.71%)"
                  : "linear-gradient(96.27deg, #FFFAF2 0.75%, #FFF4E1 96.71%)"
              }
            >
              <Flex
                w="100%"
                justifyContent={["center", "center", "center", "flex-start"]}
                alignItems={["center", "center", "center", "flex-start"]}
                direction={["column", "column", "row"]}
              >
                <CircularProgress
                  value={
                    (parseInt(scanData.multi_file_scan_summary.score, 10) *
                      100) /
                    5
                  }
                  color="accent"
                  thickness="7px"
                  size="85px"
                  p={2}
                  capIsRound
                  background="white"
                  borderRadius={"50%"}
                  border={"1px solid #EEEEEE"}
                >
                  <CircularProgressLabel
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box>
                      <Text fontSize="22px" fontWeight={600} color="accent">
                        {scanData.multi_file_scan_summary.score}
                      </Text>
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <VStack alignItems="flex-start" px={4}>
                  <Text fontSize="18px" fontWeight={600} textAlign="center">
                    Your Solidity Score is
                    {parseFloat(scanData.multi_file_scan_summary.score) < 2.5
                      ? " LOW"
                      : parseFloat(scanData.multi_file_scan_summary.score) >=
                        4.5
                      ? " GREAT"
                      : " AVERAGE"}
                  </Text>
                  <Text color="subtle" fontSize="14px" fontWeight={400}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Molestie ultricies id posuere mauris proin.
                  </Text>
                </VStack>
              </Flex>
              <Flex mt={4} justifyContent="end">
                <Link
                  variant="accent"
                  fontSize="sm"
                  onClick={() => handleTabsChange(1)}
                >
                  View Detailed Result ⟶
                </Link>
              </Flex>
            </Box>
            <Flex
              direction={"column"}
              width="100%"
              justifyContent="center"
              bg="bg.subtle"
              borderRadius={"15px"}
            >
              <Box
                px={[4, 4, 4, 8]}
                py={6}
                sx={{ w: "100%", borderRadius: 15 }}
              >
                <Text fontSize="sm" fontWeight={600} letterSpacing={0.7}>
                  SCAN STATISTICS
                </Text>
              </Box>

              <VStack
                w="100%"
                px={[4, 4, 4, 8]}
                py={4}
                spacing={3}
                fontSize="sm"
              >
                <HStack w="100%" justifyContent="space-between">
                  <Text color="detail">Score</Text>
                  <Text color="detail">
                    {scanData.multi_file_scan_summary.score + "/5"}
                  </Text>
                </HStack>
                <Divider />
                <HStack w="100%" justifyContent="space-between">
                  <Text color="detail">Issue Count</Text>
                  <Text color="detail">
                    {scanData.multi_file_scan_summary.issues_count}
                  </Text>
                </HStack>
                <Divider />
                <HStack w="100%" justifyContent="space-between">
                  <Text color="detail">Duration</Text>
                  <Text color="detail">
                    {scanData.multi_file_scan_summary.scan_time_taken +
                      " second(s)"}
                  </Text>
                </HStack>
                <Divider />
                <HStack w="100%" justifyContent="space-between">
                  <Text color="detail">Lines of code</Text>
                  <Text color="detail">
                    {scanData.multi_file_scan_summary.lines_analyzed_count}
                  </Text>
                </HStack>
              </VStack>
            </Flex>
            <ManualAuditCard />
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
            <Box
              w="100%"
              px={8}
              py={6}
              borderRadius={"15px"}
              background={
                parseFloat(scanData.scan_summary.score) < 2.5
                  ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                  : parseFloat(scanData.scan_summary.score) >= 4.5
                  ? "linear-gradient(96.27deg, #EFFFED 0.75%, #E6FFE2 96.71%)"
                  : "linear-gradient(96.27deg, #FFFAF2 0.75%, #FFF4E1 96.71%)"
              }
            >
              <HStack w="100%" justifyContent="flex-start">
                <CircularProgress
                  value={(parseInt(scanData.scan_summary.score, 10) * 100) / 5}
                  color="accent"
                  thickness="7px"
                  size="85px"
                  p={2}
                  capIsRound
                  background="white"
                  borderRadius={"50%"}
                  border={"1px solid #EEEEEE"}
                >
                  <CircularProgressLabel
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box>
                      <Text fontSize="22px" fontWeight={600} color="accent">
                        {scanData.scan_summary.score}
                      </Text>
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <VStack alignItems="flex-start" px={4}>
                  <Text fontSize="18px" fontWeight={600}>
                    Your Solidity Score is
                    {parseFloat(scanData.scan_summary.score) < 2.5
                      ? " LOW"
                      : parseFloat(scanData.scan_summary.score) >= 4.5
                      ? " GREAT"
                      : " AVERAGE"}
                  </Text>
                  <Text color="subtle" fontSize="14px" fontWeight={400}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Molestie ultricies id posuere mauris proin.
                  </Text>
                </VStack>
              </HStack>
              <Flex mt={4} justifyContent="end">
                <Link
                  variant="accent"
                  fontSize="sm"
                  onClick={() => handleTabsChange(1)}
                >
                  View Detailed Result ⟶
                </Link>
              </Flex>
            </Box>
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
            <ManualAuditCard />
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
          <ManualAuditCard />
        </Flex>
      )}
    </>
  );
};

export default Overview;

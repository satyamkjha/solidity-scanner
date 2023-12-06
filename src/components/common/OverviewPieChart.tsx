import React from "react";
import { Flex, VStack, Box, Text, Image } from "@chakra-ui/react";
import PieChart from "components/pieChart";
import { ScanSummary, MultiFileScanSummary } from "common/types";
import VulnerabilityDistribution from "components/vulnDistribution";
import { getAssetsURL } from "helpers/helperFunction";
import { pieData } from "common/values";

const OverviewPieChart: React.FC<{
  multi_file_scan_summary: MultiFileScanSummary | ScanSummary;
}> = ({ multi_file_scan_summary }) => {
  const assetsURL = getAssetsURL();
  const vulnerabilityCount =
    multi_file_scan_summary.issue_severity_distribution.critical +
    multi_file_scan_summary.issue_severity_distribution.gas +
    multi_file_scan_summary.issue_severity_distribution.high +
    multi_file_scan_summary.issue_severity_distribution.informational +
    multi_file_scan_summary.issue_severity_distribution.low +
    multi_file_scan_summary.issue_severity_distribution.medium;
  return (
    <VStack w={"100%"} mb={[8, 8, 0]}>
      <Box
        w={["100%", "100%", "70%"]}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        h="300px"
      >
        {multi_file_scan_summary.issues_count === 0 ||
        vulnerabilityCount === 0 ? (
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Image src={`${assetsURL}common/fixedIssueIcon.svg`} />
            <Text> No Bugs Found </Text>
          </Flex>
        ) : (
          <PieChart
            data={pieData(
              multi_file_scan_summary.issue_severity_distribution.critical,
              multi_file_scan_summary.issue_severity_distribution.high,
              multi_file_scan_summary.issue_severity_distribution.medium,
              multi_file_scan_summary.issue_severity_distribution.low,
              multi_file_scan_summary.issue_severity_distribution.informational,
              multi_file_scan_summary.issue_severity_distribution.gas
            )}
          />
        )}
      </Box>
      <Box w={["100%", "80%", "60%"]}>
        <VulnerabilityDistribution
          issueSeverityDistribution={{
            critical:
              multi_file_scan_summary.issue_severity_distribution.critical,
            high: multi_file_scan_summary.issue_severity_distribution.high,
            medium: multi_file_scan_summary.issue_severity_distribution.medium,
            low: multi_file_scan_summary.issue_severity_distribution.low,
            informational:
              multi_file_scan_summary.issue_severity_distribution.informational,
            gas: multi_file_scan_summary.issue_severity_distribution.gas,
          }}
          view="scans"
        />
      </Box>
    </VStack>
  );
};

export default OverviewPieChart;

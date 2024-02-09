import { Flex, Heading, Text } from "@chakra-ui/react";
import { Report } from "common/types";
import React from "react";

import ResultOverview from "components/common/scans/ResultOverview";
import VulnerabilityChart from "components/common/scans/VulnerabilityChart";
import ReportTag from "components/common/scans/ReportTag";
import VulnerabilityDistribution from "components/vulnDistribution";
import { getAssetsURL } from "helpers/helperFunction";

const FindingSummaryContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  const assetsURL = getAssetsURL();

  return (
    <Flex as="div" w="100%" flexDir={"column"} id={"finding-summary"}>
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        mb={14}
        alignItems="center"
      >
        <Text fontSize="28px" fontWeight={400} mr={4}>
          3.
        </Text>
        <Heading color={"#52FF00"} fontSize="4xl">
          Findings
        </Heading>
        <Text fontSize="4xl" fontWeight={400}>
          {" "}
          &nbsp;Summary{" "}
        </Text>
      </Flex>
      <ResultOverview
        type={
          summary_report.project_summary_report.project_url
            ? "project"
            : "block"
        }
        scanReport={summary_report.scan_summary[0]}
        projectDetails={summary_report.project_summary_report}
        spacing={10}
        theme={"light"}
        page={"report"}
      />
      <Flex
        w="100%"
        pb={10}
        pt={6}
        my={4}
        px={8}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
        flexDir={"column"}
        bgImage={`url("${assetsURL}report/gradient_bg.svg")`}
        bgSize={"cover"}
        borderRadius={15}
        className={"ss-report-right-nav"}
        content={"Finding Summary"}
      >
        <VulnerabilityChart
          issue_count={summary_report.scan_summary[0].issues_count}
          issue_severity_distribution={
            summary_report.scan_summary[0].issue_severity_distribution
          }
          theme={"light"}
        />
        <Flex mt={4} w={"100%"}>
          <VulnerabilityDistribution
            view="home"
            size={"large"}
            issueSeverityDistribution={
              summary_report.scan_summary[0].issue_severity_distribution
            }
          />
        </Flex>
      </Flex>
      <ReportTag
        is_approved={
          summary_report.project_summary_report.report_type
            ? summary_report.project_summary_report.report_type !==
              "self_published"
            : false
        }
        theme={"light"}
      />
    </Flex>
  );
};

export default FindingSummaryContainer;

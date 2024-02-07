import {
  Flex,
  Heading,
  Text,
  Box,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { Report } from "common/types";
import React from "react";

import ReportTag from "components/common/scans/ReportTag";
import VulnerabilityDistribution from "components/vulnDistribution";
import { getAssetsURL } from "helpers/helperFunction";
import ResultOverviewReports from "./ResultOverviewForReports";
import { pieData } from "common/values";
import PieChart from "components/pieChart";

const FindingSummaryContainer: React.FC<{
  summary_report: Report;
  download: boolean;
}> = ({ summary_report, download }) => {
  const assetsURL = getAssetsURL();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex as="div" w="100%" flexDir={"column"} id={"finding-summary"}>
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        my={download ? 10 : [4, 6, 10]}
        alignItems="center"
      >
        <Text
          fontSize={download ? "28px" : ["14px", "20px", "28px"]}
          fontWeight={400}
          mr={download ? 4 : [1, 2, 4]}
        >
          3.
        </Text>
        <Heading
          color={"#52FF00"}
          fontSize={download ? "4xl" : ["xl", "2xl", "4xl"]}
        >
          Findings
        </Heading>
        <Text
          fontSize={download ? "4xl" : ["xl", "2xl", "4xl"]}
          fontWeight={400}
        >
          {" "}
          &nbsp;Summary{" "}
        </Text>
      </Flex>
      <ResultOverviewReports
        type={
          summary_report.project_summary_report.project_url
            ? "project"
            : "block"
        }
        scanReport={summary_report.scan_summary[0]}
        projectDetails={summary_report.project_summary_report}
        theme={"light"}
        download={download}
      />

      <Flex
        w="100%"
        pb={download ? 10 : [3, 4, 10]}
        pt={download ? 6 : [2, 3, 6]}
        my={download ? 4 : [1, 2, 4]}
        px={download ? 8 : [3, 4, 8]}
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
        <Box
          w={download ? "330px" : ["170px", "200px", "330px"]}
          p={download ? "20px" : ["4px", "7px", "20px"]}
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          h={download ? "330px" : ["170px", "200px", "330axscpx"]}
          position={"relative"}
        >
          {summary_report.scan_summary[0].issues_count === 0 ? (
            <Flex flexDir="column" justifyContent="center" alignItems="center">
              <Image src={`${assetsURL}common/fixedIssueIcon.svg`} />
              <Text> No Bugs Found </Text>
            </Flex>
          ) : (
            <>
              <PieChart
                data={pieData(
                  summary_report.scan_summary[0].issue_severity_distribution
                    .critical,
                  summary_report.scan_summary[0].issue_severity_distribution
                    .high,
                  summary_report.scan_summary[0].issue_severity_distribution
                    .medium,
                  summary_report.scan_summary[0].issue_severity_distribution
                    .low,
                  summary_report.scan_summary[0].issue_severity_distribution
                    .informational,
                  summary_report.scan_summary[0].issue_severity_distribution.gas
                )}
                page={"quickscan"}
              />
              <Flex
                position={"absolute"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"black"}
              >
                <Heading
                  fontSize={download ? "3xl" : ["lg", "xl", "4xl"]}
                  fontWeight={900}
                >
                  {summary_report.scan_summary[0].issue_severity_distribution
                    .critical +
                    summary_report.scan_summary[0].issue_severity_distribution
                      .high +
                    summary_report.scan_summary[0].issue_severity_distribution
                      .medium +
                    summary_report.scan_summary[0].issue_severity_distribution
                      .low +
                    summary_report.scan_summary[0].issue_severity_distribution
                      .informational +
                    summary_report.scan_summary[0].issue_severity_distribution
                      .gas}
                </Heading>
                <Text
                  fontSize={download ? "lg" : ["10px", "12px", "lg"]}
                  textAlign="center"
                >
                  Total Vulnerabilities <br /> found
                </Text>
              </Flex>
            </>
          )}
        </Box>
        <Flex mt={download ? 4 : [1, 2, 4]} w={"100%"}>
          <VulnerabilityDistribution
            view={download || isLargerThan768 ? "home" : "scans"}
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

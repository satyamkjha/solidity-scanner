import {
  Container,
  Flex,
  Heading,
  Box,
  HStack,
  Divider,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Image,
  useMediaQuery,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Report } from "common/types";
import { useReactToPrint } from "react-to-print";
import {
  Logo,
  SeverityIcon,
  GithubIcon,
  ProjectIcon,
  IssueDescriptionIcons,
  IssueRemediationIcons,
  ReportCoverDots,
} from "components/icons";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useConfig } from "hooks/useConfig";
import CoverPageContainer from "components/pdf/CoverPageContainer";
import TableContentContainer from "components/pdf/TableContentContainer";
import ProjectSummaryContainer from "components/pdf/ProjectSummaryContainer";
import AuditSummaryContainer from "components/pdf/AuditSummaryContainer";
import FindingSummaryContainer from "components/pdf/FindingSummaryContainer";
import VulnerabililtyDetailsContainer from "components/pdf/VulnerabililtyDetailsContainer";
import ScanHistoryContainer from "components/pdf/ScanHistoryContainer";
import DisclaimerContainer from "components/pdf/DisclaimerContainer";

export const PrintContainer: React.FC<{ summary_report: Report }> = ({
  summary_report,
}) => {
  let d = new Date();

  if (summary_report) {
    d = new Date(
      summary_report.project_summary_report.last_project_report_update_time
    );
  }

  const [isDesktopView] = useMediaQuery(["(min-width: 1024px)"]);
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  let counter2 = 0;

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <Container
        sx={{
          "@page": {
            margin: "30px",
            border: "1px solid #D9D9D9;",
            "@bottom-left": {
              display: "none",
            },
          },
        }}
        maxW={"900px"}
        color="black"
        overflow={"hidden"}
      >
        {/* Cover Section */}
        <CoverPageContainer
          d={d}
          summary_report={summary_report}
          isPublicReport={true}
        />

        {/* Table of Contents */}
        <TableContentContainer summary_report={summary_report} />

        {/* Project Summary */}
        <ProjectSummaryContainer summary_report={summary_report} />

        {/* Audit Summary */}
        <AuditSummaryContainer summary_report={summary_report} />

        {/* Findings Summary */}
        <FindingSummaryContainer summary_report={summary_report} />

        {/* Vulnerability Details */}
        <VulnerabililtyDetailsContainer summary_report={summary_report} />

        <h6></h6>

        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          py={10}
          alignItems="center"
        >
          <Heading color={"#52FF00"} fontSize="4xl">
            Vulnerability
          </Heading>
          <Text fontSize="4xl" fontWeight={400}>
            {" "}
            &nbsp;Details{" "}
          </Text>
        </Flex>

        {Object.keys(summary_report.issues).map((key) =>
          summary_report.issues[key].issue_details.map((issue) => {
            counter2++;
            return (
              <>
                {counter2 !== 1 && <h6></h6>}
                <Flex
                  p={5}
                  flexDir="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  border={"1px solid #D9D9D9;"}
                  my={5}
                  width={"100%"}
                  sx={{
                    pageBreakAfter: "always",
                  }}
                >
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    width={"100%"}
                    mb={1}
                  >
                    Bug ID
                  </Text>
                  <Text fontSize="xl" fontWeight={"bold"} mb={5} width={"100%"}>
                    {issue.bug_id}
                  </Text>
                  <Flex width={"100%"} mb={3} flexWrap="wrap">
                    <VStack
                      width={["50%", "50%", "50%", "15%"]}
                      mb={[4, 4, 4, 0]}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="md"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={1}
                      >
                        Severity
                      </Text>
                      <HStack>
                        <SeverityIcon variant={issue.severity} />
                        <Text
                          fontSize="lg"
                          fontWeight={"bold"}
                          ml={2}
                          width={"100%"}
                        >
                          {sentenceCapitalize(issue.severity)}
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack
                      width={["50%", "50%", "50%", "15%"]}
                      mb={[4, 4, 4, 0]}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="md"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={1}
                      >
                        Confidence
                      </Text>
                      <HStack>
                        <Text
                          px={5}
                          py={1}
                          borderRadius={20}
                          color={
                            issue.issue_confidence === "2"
                              ? "#289F4C"
                              : issue.issue_confidence === "1"
                              ? "#ED9801"
                              : "#FF5630"
                          }
                          backgroundColor={
                            issue.issue_confidence === "2"
                              ? "#CFFFB8"
                              : issue.issue_confidence === "1"
                              ? "#FFF8EB"
                              : "#FFF5F3"
                          }
                          fontSize="lg"
                          fontWeight={"bold"}
                        >
                          {issue.issue_confidence === "2"
                            ? "Certain"
                            : issue.issue_confidence === "1"
                            ? "Firm"
                            : "Tentative"}
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack
                      width={["50%", "50%", "50%", "15%"]}
                      my={[4, 4, 4, 0]}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="md"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={1}
                      >
                        Line nos
                      </Text>
                      <Text fontSize="lg" fontWeight={"bold"}>
                        {issue.findings[0].line_nos_start}-
                        {issue.findings[0].line_nos_end}
                      </Text>
                    </VStack>
                    <VStack
                      width={["50%", "50%", "50%", "15%"]}
                      my={[4, 4, 4, 0]}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="md"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={1}
                      >
                        Action Taken
                      </Text>
                      <HStack>
                        <Image
                          src={`${assetsURL}icons/${issue.bug_status}_color.svg`}
                        />
                        <Text
                          fontSize="md"
                          fontWeight={"normal"}
                          color={"gray.600"}
                        >
                          {/* {sentenceCapitalize(
                          issue.status.toLowerCase().replace("_", " ")
                        )} */}

                          {issue.bug_status === "false_positive" &&
                            "False Positive"}
                          {issue.bug_status === "wont_fix" && "Won't Fix"}
                          {issue.bug_status === "pending_fix" && "Pending Fix"}
                          {issue.bug_status === "fixed" && "Fixed"}
                        </Text>
                      </HStack>
                    </VStack>
                  </Flex>
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                    width={"100%"}
                  >
                    Bug Type
                  </Text>
                  <Text fontSize="lg" fontWeight={"bols"} mb={5} width={"100%"}>
                    {issue.issue_name}
                  </Text>
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                    width={"100%"}
                  >
                    File Location
                  </Text>
                  {issue.findings.map((finding) => (
                    <Text
                      fontSize="md"
                      fontWeight={"bold"}
                      mb={1}
                      width={"100%"}
                    >
                      {finding.file_path}
                    </Text>
                  ))}
                  <Divider mt={5} />
                  <HStack spacing={5} mt={5} mb={3}>
                    <IssueDescriptionIcons size={40} />
                    <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
                      Issue Description
                    </Text>
                  </HStack>
                  <DescriptionWrapper>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: issue.issue_description,
                      }}
                    />
                  </DescriptionWrapper>
                  <HStack spacing={5} mt={5} mb={3}>
                    <IssueRemediationIcons size={40} />
                    <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
                      Issue Remediation
                    </Text>
                  </HStack>
                  <DescriptionWrapper>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: issue.issue_remediation,
                      }}
                    />
                  </DescriptionWrapper>
                  {issue.comment !== "" && issue.bug_status === "wont_fix" && (
                    <>
                      <HStack spacing={5} mt={10} mb={5}>
                        <IssueRemediationIcons size={40} />
                        <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
                          Comments
                        </Text>
                      </HStack>
                      <Text>{issue.comment}</Text>
                    </>
                  )}
                </Flex>
              </>
            );
          })
        )}

        {/* Scan History */}
        <ScanHistoryContainer summary_report={summary_report} />

        {/* Disclaimer */}
        <DisclaimerContainer />
      </Container>
    </>
  );
};

const DescriptionWrapper = styled.div`
  p {
    font-weight: 300;
  }
  code {
    background: #cbd5e0;
    padding: 2px 4px;
    border-radius: 5px;
  }
  a {
    color: #4299e1;
    text-decoration: underline;
    transition: 0.2s color;
    &:hover {
      color: #2b6cb0;
    }
  }
`;

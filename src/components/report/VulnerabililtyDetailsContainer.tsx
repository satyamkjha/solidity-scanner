import {
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Divider,
  VStack,
  Box,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Report, IssueItem, Finding } from "common/types";
import { SeverityIcon } from "components/icons";
import {
  sentenceCapitalize,
  getAssetsURL,
  getProjectFileUrl,
  getContractBlockchainId,
} from "helpers/helperFunction";
import styled from "@emotion/styled";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { codePlatform } from "common/values";
import { ReportPayWall } from "./ReportPayWall";
import { DemoCodeBlock } from "./DemoCodeBlock";
import { ReportCodeBlock } from "./ReportCodeBlock";

const VulnerabililtyDetailsContainer: React.FC<{
  summary_report: Report;
  issue: IssueItem;
  type: string;
  showVulnerabilityTitle: boolean;
  showDescription: boolean;
  showMetadata: boolean;
  filesContent: any[];
  codeStartLine?: number;
  codeEndLine?: number;
  onOpen: () => void;
  download: boolean;
  onImportScan: () => void;
  isQSReport: boolean;
}> = ({
  summary_report,
  issue,
  type,
  showVulnerabilityTitle,
  showDescription,
  showMetadata,
  filesContent,
  codeStartLine,
  codeEndLine,
  onOpen,
  onImportScan,
  download,
  isQSReport,
}) => {
  const assetsURL = getAssetsURL();

  const demoIssueDescription =
    "Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.";

  const demoIssueRemediation =
    "Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.";

  const getFileUrlLink = (finding: Finding) => {
    if (
      summary_report.project_summary_report.project_url &&
      summary_report.project_summary_report.project_url !== "File Scan"
    ) {
      return getProjectFileUrl(
        summary_report.project_summary_report.project_url,
        "master",
        finding
      );
    } else if (
      summary_report.project_summary_report.contract_url &&
      summary_report.project_summary_report.contract_platform &&
      summary_report.project_summary_report.contract_chain &&
      codePlatform[
        getContractBlockchainId(
          summary_report.project_summary_report.contract_platform,
          summary_report.project_summary_report.contract_chain
        )
      ]
    ) {
      return `${summary_report.project_summary_report.contract_url}${
        codePlatform[
          getContractBlockchainId(
            summary_report.project_summary_report.contract_platform,
            summary_report.project_summary_report.contract_chain
          )
        ][summary_report.project_summary_report.contract_platform]
      }`;
    } else return "";
  };

  let severityIconSize =
    useBreakpointValue({
      base: 5,
      sm: 6,
      md: 10,
    }) || 10;

  let descFontSize =
    useBreakpointValue({
      base: "5px",
      sm: "6px",
      md: "10px",
    }) || "10px";

  let descListMargin =
    useBreakpointValue({
      base: "8px",
      sm: "10px",
      md: "20px",
    }) || "20px";

  let descCodePadding =
    useBreakpointValue({
      base: "1px 2px",
      sm: "1px 2px",
      md: "2px 4px",
    }) || "2px 4px";

  const DescriptionWrapper = styled.div`
    p {
      font-size: ${download ? "12px" : descFontSize};
      font-weight: 300;
      word-break: break-all;
    }

    ul,
    ol {
      margin-left: ${download ? "20px" : descListMargin};
    }

    li {
      font-weight: 300;
      font-size: ${download ? "12px" : descFontSize};
    }

    code {
      background: #cbd5e0;
      padding: ${download ? "2px 4px" : descCodePadding};
      border-radius: 5px;
      word-break: break-all;
      font-weight: 300;
      font-size: ${download ? "12px" : descFontSize};
    }
    a {
      font-size: ${download ? "12px" : descFontSize};
      color: #4299e1;
      text-decoration: underline;
      word-break: break-all;
      transition: 0.2s color;
      &:hover {
        color: #2b6cb0;
      }
    }
  `;

  return (
    <Flex
      as="div"
      w="100%"
      h={"100%"}
      position="relative"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      id={"vulnerability-detail"}
    >
      {showVulnerabilityTitle ? (
        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          alignItems="center"
        >
          <Text
            fontSize={download ? "28px" : ["14px", "20px", "28px"]}
            fontWeight={400}
          >
            4.
          </Text>
          <Heading
            color={"#52FF00"}
            fontSize={download ? "4xl" : ["xl", "2xl", "4xl"]}
            ml={4}
          >
            Vulnerability
          </Heading>
          <Text
            fontSize={download ? "4xl" : ["xl", "2xl", "4xl"]}
            fontWeight={400}
          >
            {" "}
            &nbsp;Details{" "}
          </Text>
        </Flex>
      ) : null}
      <Flex
        w={"100%"}
        h={"100%"}
        flexDir={"column"}
        mt={showVulnerabilityTitle ? (download ? 6 : [2, 3, 6]) : 0}
      >
        {showMetadata ? (
          <>
            <VStack
              w={"100%"}
              bg={"#FBFBFB"}
              flexDir={"column"}
              alignItems={"flex-start"}
              spacing={download ? 6 : [2, 3, 6]}
              p={download ? 6 : [2, 3, 6]}
              border={"1px solid #D9D9D9"}
              borderBottom={"none"}
            >
              <Flex w={"100%"}>
                <VStack spacing={1} alignItems={"flex-start"} w={"24%"}>
                  <Text
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                    color={"subtle"}
                  >
                    Bug ID
                  </Text>
                  <Text
                    fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                    fontWeight={600}
                  >
                    {issue.bug_id}
                  </Text>
                </VStack>
                <VStack spacing={1} alignItems={"flex-start"}>
                  <Text
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                    color={"subtle"}
                  >
                    Bug Type
                  </Text>
                  <Text
                    fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                    fontWeight={600}
                    className={"ss-report-right-nav"}
                    content={issue.issue_name}
                  >
                    {issue.issue_name}
                  </Text>
                </VStack>
              </Flex>
              <Flex w={"100%"}>
                <VStack
                  spacing={1}
                  alignItems={"flex-start"}
                  w={download ? "24%" : ["27%", "27%", "24%"]}
                >
                  <Text
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                    color={"subtle"}
                  >
                    Severity
                  </Text>
                  <HStack spacing={download ? 3 : [1, 1, 3]}>
                    <SeverityIcon
                      size={download ? 10 : severityIconSize}
                      variant={issue.severity}
                    />
                    <Text
                      fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                      ml={[0, 1, 2]}
                    >
                      {sentenceCapitalize(issue.severity)}
                    </Text>
                  </HStack>
                </VStack>
                <VStack
                  spacing={1}
                  alignItems={"flex-start"}
                  w={download ? "24%" : ["33%", "33%", "24%"]}
                >
                  <Text
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                    color={"subtle"}
                  >
                    Action Taken
                  </Text>
                  <HStack spacing={download ? 3 : [1, 1, 3]}>
                    <Image
                      height={download ? "25px" : ["10px", "15px", "25px"]}
                      width={download ? "25px" : ["10px", "15px", "25px"]}
                      src={`${assetsURL}report/${issue.bug_status}_color.svg`}
                    />
                    <Text
                      fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                      fontWeight={"500"}
                      fontStyle={"italic"}
                    >
                      {issue.bug_status === "false_positive" &&
                        "False Positive"}
                      {issue.bug_status === "wont_fix" && "Won't Fix"}
                      {issue.bug_status === "pending_fix" && "Pending Fix"}
                      {issue.bug_status === "fixed" && "Fixed"}
                    </Text>
                  </HStack>
                </VStack>
                <VStack spacing={1} alignItems={"flex-start"}>
                  <Text
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                    color={"subtle"}
                  >
                    Detection Method
                  </Text>
                  <Text
                    fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                    fontWeight={500}
                  >
                    {issue.audit_type
                      ? sentenceCapitalize(issue.audit_type)
                      : "Automated"}
                  </Text>
                </VStack>
              </Flex>
            </VStack>
            {issue.findings && (
              <Flex
                px={download ? 6 : [2, 3, 6]}
                pt={download ? 6 : [2, 3, 6]}
                borderLeft={"1px solid #D9D9D9"}
                borderRight={"1px solid #D9D9D9"}
              >
                <VStack spacing={1} alignItems={"flex-start"} w={"24%"}>
                  <Text
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                    color={"subtle"}
                  >
                    Line No.
                  </Text>
                  <Flex flexDir={"column"}>
                    {issue.findings.map((finding) => (
                      <Text
                        fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                        lineHeight={1.8}
                      >
                        L{finding.line_nos_start} - L{finding.line_nos_end}
                      </Text>
                    ))}
                  </Flex>
                </VStack>
                <VStack spacing={1} alignItems={"flex-start"}>
                  <Text
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                    color={"subtle"}
                  >
                    File Location
                  </Text>
                  <Flex flexDir={"column"}>
                    {issue.findings.map((finding) => {
                      if (
                        summary_report.project_summary_report.project_url ===
                        "File Scan"
                      )
                        return (
                          <Text
                            fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                            lineHeight={1.8}
                            color="#8A94A6"
                          >
                            {finding.file_path}
                          </Text>
                        );
                      else {
                        return (
                          <Flex>
                            <Link
                              href={getFileUrlLink(finding)}
                              target={"_blank"}
                              fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                              lineHeight={1.8}
                            >
                              {finding.file_path}
                              <ExternalLinkIcon
                                ml={download ? 2 : [1, 2, 2]}
                                color={"#8A94A6"}
                              />
                            </Link>
                          </Flex>
                        );
                      }
                    })}
                  </Flex>
                </VStack>
              </Flex>
            )}

            <Flex
              px={download ? 6 : [2, 3, 6]}
              borderLeft={"1px solid #D9D9D9"}
              borderRight={"1px solid #D9D9D9"}
            >
              <Divider borderColor={"#D9D9D9"} my={download ? 6 : [2, 3, 6]} />
            </Flex>
            <HStack
              spacing={download ? 2 : [0, 1, 2]}
              pb={download ? 3 : [1, 1, 3]}
              pl={download ? 6 : [2, 3, 6]}
              borderLeft={"1px solid #D9D9D9"}
              borderRight={"1px solid #D9D9D9"}
            >
              <Image
                src={`${assetsURL}report/clipboard.svg`}
                width={download ? 6 : [2, 3, 6]}
              />
              <Text
                fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                fontWeight={600}
                width={"100%"}
              >
                Affected Code
              </Text>
            </HStack>
          </>
        ) : null}

        {type !== "desc" &&
          (issue.findings ? (
            <ReportCodeBlock
              download={download}
              findings={issue.findings}
              type={type}
              showDescription={showDescription}
              codeStartLine={codeStartLine}
              codeEndLine={codeEndLine}
              filesContent={filesContent}
            />
          ) : (
            <DemoCodeBlock download={download} />
          ))}

        {showDescription &&
          (issue.issue_remediation && issue.issue_description ? (
            <>
              <Flex
                w={"100%"}
                px={download ? 6 : [2, 3, 6]}
                flexDir={"column"}
                borderLeft={"1px solid #D9D9D9"}
                borderRight={"1px solid #D9D9D9"}
              >
                <HStack
                  spacing={download ? 2 : [1, 2, 2]}
                  mt={download ? 5 : [2, 3, 5]}
                  mb={download ? 3 : [1, 2, 3]}
                >
                  <Image
                    src={`${assetsURL}report/issue_description.svg`}
                    width={download ? 6 : [2, 3, 6]}
                  />
                  <Text
                    fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                    fontWeight={600}
                    width={"100%"}
                  >
                    Description
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: issue.issue_description,
                    }}
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>

              <Flex
                w={"100%"}
                pt={download ? 2 : [1, 2, 2]}
                px={download ? 6 : [2, 3, 6]}
                pb={issue.comment ? 0 : download ? 8 : [3, 4, 8]}
                flexDir={"column"}
                border={"1px solid #D9D9D9"}
                borderTop={"none"}
                borderBottom={issue.comment ? "none" : "1px solid #D9D9D9"}
              >
                <HStack
                  spacing={download ? 2 : [1, 2, 2]}
                  mt={download ? 5 : [2, 3, 5]}
                  mb={download ? 3 : [1, 2, 3]}
                >
                  <Image
                    src={`${assetsURL}report/issue_remediation.svg`}
                    width={download ? 6 : [2, 3, 6]}
                  />
                  <Text
                    fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                    fontWeight={600}
                    width={"100%"}
                  >
                    Remediation
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: issue.issue_remediation,
                    }}
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>
              {issue.comment && issue.bug_status === "wont_fix" && (
                <Flex
                  w={"100%"}
                  pt={download ? 2 : [1, 2, 2]}
                  px={download ? 6 : [2, 3, 6]}
                  pb={8}
                  flexDir={"column"}
                  border={"1px solid #D9D9D9"}
                  borderTop={"none"}
                >
                  <HStack
                    spacing={download ? 2 : [1, 2, 2]}
                    mt={download ? 5 : [2, 3, 5]}
                    mb={download ? 3 : [1, 2, 3]}
                  >
                    <Image
                      src={`${assetsURL}report/comment.svg`}
                      width={download ? 6 : [2, 3, 6]}
                    />
                    <Text
                      fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                      fontWeight={600}
                      width={"100%"}
                    >
                      Comments
                    </Text>
                  </HStack>
                  <Text
                    fontWeight={400}
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    wordBreak="break-all"
                  >
                    {issue.comment}
                  </Text>
                </Flex>
              )}
            </>
          ) : (
            <>
              <Flex
                w={"100%"}
                px={download ? 6 : [2, 3, 6]}
                flexDir={"column"}
                borderLeft={"1px solid #D9D9D9"}
                borderRight={"1px solid #D9D9D9"}
              >
                <HStack
                  spacing={download ? 2 : [1, 2, 2]}
                  mt={download ? 5 : [2, 3, 5]}
                  mb={download ? 3 : [1, 2, 3]}
                >
                  <Image
                    src={`${assetsURL}report/issue_description.svg`}
                    width={download ? 6 : [2, 3, 6]}
                  />
                  <Text
                    fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                    fontWeight={600}
                    width={"100%"}
                  >
                    Description
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: demoIssueDescription,
                    }}
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>

              <Flex
                w={"100%"}
                pt={download ? 2 : [1, 2, 2]}
                px={download ? 6 : [2, 3, 6]}
                pb={issue.comment ? 0 : 8}
                flexDir={"column"}
                border={"1px solid #D9D9D9"}
                borderTop={"none"}
                borderBottom={issue.comment ? "none" : "1px solid #D9D9D9"}
              >
                <HStack
                  spacing={download ? 2 : [1, 2, 2]}
                  mt={download ? 5 : [2, 3, 5]}
                  mb={download ? 3 : [1, 2, 3]}
                >
                  <Image
                    src={`${assetsURL}report/issue_remediation.svg`}
                    width={download ? 6 : [2, 3, 6]}
                  />
                  <Text
                    fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                    fontWeight={600}
                    width={"100%"}
                  >
                    Remediation
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: demoIssueRemediation,
                    }}
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>
              {issue.comment && issue.bug_status === "wont_fix" && (
                <Flex
                  w={"100%"}
                  pt={download ? 2 : [1, 2, 2]}
                  px={download ? 6 : [2, 3, 6]}
                  pb={8}
                  flexDir={"column"}
                  border={"1px solid #D9D9D9"}
                  borderTop={"none"}
                >
                  <HStack
                    spacing={download ? 2 : [1, 2, 2]}
                    mt={download ? 5 : [2, 3, 5]}
                    mb={download ? 3 : [1, 2, 3]}
                  >
                    <Image
                      src={`${assetsURL}report/comment.svg`}
                      width={download ? 6 : [2, 3, 6]}
                    />
                    <Text
                      fontSize={download ? "sm" : ["8px", "10px", "sm"]}
                      fontWeight={600}
                      width={"100%"}
                    >
                      Comments
                    </Text>
                  </HStack>
                  <Text
                    fontWeight={400}
                    fontSize={download ? "xs" : ["7px", "8px", "xs"]}
                    wordBreak="break-all"
                  >
                    {"issue.comment"}
                  </Text>
                </Flex>
              )}
            </>
          ))}

        {!issue.findings && (
          <ReportPayWall
            issue_count={
              summary_report.scan_summary[0].issue_severity_distribution[
                issue.severity
              ]
            }
            issue_severity={issue.severity}
            showVulnerabilityTitle={showVulnerabilityTitle}
            download={download}
            isQSReport={isQSReport}
            onImportScan={onImportScan}
            onOpen={onOpen}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default VulnerabililtyDetailsContainer;

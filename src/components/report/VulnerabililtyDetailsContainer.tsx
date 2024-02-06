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
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { Report, IssueItem } from "common/types";
import { SeverityIcon } from "components/icons";
import {
  sentenceCapitalize,
  getAssetsURL,
  getProjectFileUrl,
} from "helpers/helperFunction";
import styled from "@emotion/styled";
import React from "react";
import { ExternalLinkIcon, LockIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

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
  isQSReport,
}) => {
  const assetsURL = getAssetsURL();
  const history = useHistory();
  const getFileContent = (
    file_path: string,
    line_start: number,
    line_end: number
  ) => {
    const file = filesContent.filter((item) => item.path === file_path);

    if (file.length === 0) {
      return [];
    }

    let dataArray = file[0].content.split("\n");

    line_start = Math.max(0, line_start - 2);
    line_end = Math.min(dataArray.length - 1, line_end + 1);

    dataArray = [...dataArray];

    return dataArray.slice(line_start, line_end + 1);
  };

  const [isLargerThan450, isLargerThan768] = useMediaQuery([
    "(min-width: 450px)",
    "(min-width: 768px)",
  ]);

  const getCodeLineNo = (start: number, index: number) => {
    return start === 0 ? index + 1 : start - 2 + index + 1;
  };

  const demoCodeArray = [
    "",
    "    function callback(uint256[] memory ids, uint256 campaignId)onlyOracle public {",
    '        require(winningTicketIds[campaignId].length + ids.length <= campaigns[campaignId].rewardCount, "exceeded reward limit");',
    "",
    "        for(uint256 i = 0; i<ids.length; i++){",
    "             winningTicketIds[campaignId].push(ids[i]);",
    "            winningTixketIdExist[campaignId][ids[i]] = true;",
    "        }",
    "        for(uint256 i = 0; i<ids.length; i++){",
    "             winningTicketIds[campaignId].push(ids[i]);",
    "            winningTixketIdExist[campaignId][ids[i]] = true;",
    "        }",
    "        for(uint256 i = 0; i<ids.length; i++){",
    "             winningTicketIds[campaignId].push(ids[i]);",
    "            winningTixketIdExist[campaignId][ids[i]] = true;",
    "        }",
    "    }",
    "",
    "    function setOracleAddress(address _add) onlyOwner public {",
  ];

  const demoIssueDescription =
    "Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.";

  const demoIssueRemediation =
    "Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.";

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
          <Text fontSize={["28px"]} fontWeight={400}>
            4.
          </Text>
          <Heading color={"#52FF00"} fontSize={["4xl"]} ml={4}>
            Vulnerability
          </Heading>
          <Text fontSize={["4xl"]} fontWeight={400}>
            {" "}
            &nbsp;Details{" "}
          </Text>
        </Flex>
      ) : null}
      <Flex
        w={"100%"}
        h={"100%"}
        flexDir={"column"}
        mt={showVulnerabilityTitle ? [6] : 0}
      >
        {showMetadata ? (
          <>
            <VStack
              w={"100%"}
              bg={"#FBFBFB"}
              flexDir={"column"}
              alignItems={"flex-start"}
              spacing={6}
              p={[6]}
              border={"1px solid #D9D9D9"}
              borderBottom={"none"}
            >
              <Flex w={"100%"}>
                <VStack spacing={1} alignItems={"flex-start"} w={"24%"}>
                  <Text fontSize={["xs"]} fontWeight={400} color={"subtle"}>
                    Bug ID
                  </Text>
                  <Text fontSize={["sm"]} fontWeight={600}>
                    {issue.bug_id}
                  </Text>
                </VStack>
                <VStack spacing={1} alignItems={"flex-start"}>
                  <Text fontSize={["xs"]} fontWeight={400} color={"subtle"}>
                    Bug Type
                  </Text>
                  <Text
                    fontSize={["sm"]}
                    fontWeight={600}
                    className={"ss-report-right-nav"}
                    content={issue.issue_name}
                  >
                    {issue.issue_name}
                  </Text>
                </VStack>
              </Flex>
              <Flex w={"100%"}>
                <VStack spacing={1} alignItems={"flex-start"} w={"24%"}>
                  <Text fontSize={["xs"]} fontWeight={400} color={"subtle"}>
                    Severity
                  </Text>
                  <HStack spacing={[3]}>
                    <SeverityIcon
                      size={isLargerThan768 ? 12 : isLargerThan450 ? 5 : 5}
                      variant={issue.severity}
                    />
                    <Text fontSize={["sm"]} ml={[0, 1, 2]}>
                      {sentenceCapitalize(issue.severity)}
                    </Text>
                  </HStack>
                </VStack>
                <VStack spacing={1} alignItems={"flex-start"} w={"24%"}>
                  <Text fontSize={["xs"]} fontWeight={400} color={"subtle"}>
                    Action Taken
                  </Text>
                  <HStack spacing={[3]}>
                    <Image
                      height={["10px", "10px", "25px"]}
                      width={["10px", "10px", "25px"]}
                      src={`${assetsURL}report/${issue.bug_status}_color.svg`}
                    />
                    <Text
                      fontSize={["sm"]}
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
                  <Text fontSize={["xs"]} fontWeight={400} color={"subtle"}>
                    Detection Method
                  </Text>
                  <Text fontSize={["sm"]} fontWeight={500}>
                    {issue.audit_type
                      ? sentenceCapitalize(issue.audit_type)
                      : "Automated"}
                  </Text>
                </VStack>
              </Flex>
            </VStack>
            {issue.findings && (
              <Flex
                px={[6]}
                pt={[6]}
                borderLeft={"1px solid #D9D9D9"}
                borderRight={"1px solid #D9D9D9"}
              >
                <VStack spacing={1} alignItems={"flex-start"} w={"24%"}>
                  <Text fontSize={["xs"]} fontWeight={400} color={"subtle"}>
                    Line No.
                  </Text>
                  <Flex flexDir={"column"}>
                    {issue.findings.map((finding) => (
                      <Text fontSize={["xs"]} lineHeight={1.8}>
                        L{finding.line_nos_start} - L{finding.line_nos_end}
                      </Text>
                    ))}
                  </Flex>
                </VStack>
                <VStack spacing={1} alignItems={"flex-start"}>
                  <Text fontSize={["xs"]} fontWeight={400} color={"subtle"}>
                    File Location
                  </Text>
                  <Flex flexDir={"column"}>
                    {issue.findings.map((finding) => (
                      <Flex>
                        <Link
                          href={
                            summary_report.project_summary_report.project_url &&
                            summary_report.project_summary_report
                              .project_url !== "File Scan"
                              ? getProjectFileUrl(
                                  summary_report.project_summary_report
                                    .project_url,
                                  "master",
                                  finding
                                )
                              : ""
                          }
                          target={"_blank"}
                          fontSize={["xs"]}
                          lineHeight={1.8}
                        >
                          {finding.file_path}
                          <ExternalLinkIcon ml={2} color={"#8A94A6"} />
                        </Link>
                      </Flex>
                    ))}
                  </Flex>
                </VStack>
              </Flex>
            )}

            <Flex
              px={6}
              borderLeft={"1px solid #D9D9D9"}
              borderRight={"1px solid #D9D9D9"}
            >
              <Divider borderColor={"#D9D9D9"} my={6} />
            </Flex>
            <HStack
              spacing={2}
              pb={3}
              pl={6}
              borderLeft={"1px solid #D9D9D9"}
              borderRight={"1px solid #D9D9D9"}
            >
              <Image src={`${assetsURL}report/clipboard.svg`} width={6} />
              <Text fontSize={["sm"]} fontWeight={600} width={"100%"}>
                Affected Code
              </Text>
            </HStack>
          </>
        ) : null}

        {type !== "desc" ? (
          issue.findings ? (
            <Flex
              w={"100%"}
              h={showDescription ? "auto" : "100%"}
              px={6}
              mb={showDescription ? 0 : 4}
              flexDir={"column"}
              borderLeft={"1px solid #D9D9D9"}
              borderRight={"1px solid #D9D9D9"}
            >
              {issue.findings.map((item, index) => (
                <Flex
                  key={index}
                  w={"100%"}
                  flexDir={"column"}
                  bg={"#FBFBFB"}
                  borderRadius={15}
                  mb={4}
                  p={4}
                >
                  <Flex w={"100%"} pb={3}>
                    <Text fontSize={"10px"} color={"#323B4B"}>
                      {item.file_path}
                    </Text>
                    <Text fontSize={"10px"} color={"#323B4B"} ml={"auto"}>
                      L{item.line_nos_start} - L{item.line_nos_end}
                    </Text>
                  </Flex>
                  <Divider mb={3} />
                  <Flex w={"100%"} flexDir={"column"}>
                    {getFileContent(
                      item.file_path,
                      item.file_path === type && codeStartLine
                        ? codeStartLine
                        : item.line_nos_start[0],
                      item.file_path === type && codeEndLine
                        ? codeEndLine
                        : item.line_nos_end[0]
                    ).map((content: any, cIndex: number, array: any[]) => (
                      <HStack
                        as={"div"}
                        key={cIndex}
                        align={"flex-start"}
                        spacing={4}
                        pb={1}
                      >
                        <Text
                          color={"#D8D8D8"}
                          fontSize="10px"
                          fontWeight="normal"
                        >
                          {codeStartLine
                            ? getCodeLineNo(codeStartLine, cIndex)
                            : getCodeLineNo(item.line_nos_start[0], cIndex)}
                        </Text>
                        <pre
                          style={{
                            fontSize: "10px",
                            color:
                              (cIndex > 0 && cIndex < array.length - 2) ||
                              item.line_nos_start[0] === 0
                                ? "#000000"
                                : "#B0B7C3",
                            whiteSpace: "pre-wrap",
                          }}
                          key={cIndex}
                        >
                          {content}
                        </pre>
                      </HStack>
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ) : (
            <Flex
              w={"100%"}
              h={showDescription ? "auto" : "100%"}
              px={6}
              mb={showDescription ? 0 : 4}
              flexDir={"column"}
              borderLeft={"1px solid #D9D9D9"}
              borderRight={"1px solid #D9D9D9"}
            >
              <Flex
                w={"100%"}
                flexDir={"column"}
                bg={"#FBFBFB"}
                borderRadius={15}
                mb={4}
                p={4}
              >
                <Flex w={"100%"} pb={3}>
                  <Text fontSize={"10px"} color={"#323B4B"}>
                    {"item.file_path"}
                  </Text>
                  <Text fontSize={"10px"} color={"#323B4B"} ml={"auto"}>
                    L{"110"} - L{"120"}
                  </Text>
                </Flex>
                <Divider mb={3} />
                <Flex w={"100%"} flexDir={"column"}>
                  {demoCodeArray.map(
                    (content: any, cIndex: number, array: any[]) => (
                      <HStack
                        as={"div"}
                        key={cIndex}
                        align={"flex-start"}
                        spacing={4}
                        pb={1}
                      >
                        <Text
                          color={"#D8D8D8"}
                          fontSize="10px"
                          fontWeight="normal"
                        ></Text>
                        <pre
                          style={{
                            fontSize: "10px",
                            color: "#B0B7C3",
                            whiteSpace: "pre-wrap",
                          }}
                          key={cIndex}
                        >
                          {content}
                        </pre>
                      </HStack>
                    )
                  )}
                </Flex>
              </Flex>
            </Flex>
          )
        ) : null}

        {showDescription ? (
          issue.issue_remediation && issue.issue_description ? (
            <>
              <Flex
                w={"100%"}
                px={6}
                flexDir={"column"}
                borderLeft={"1px solid #D9D9D9"}
                borderRight={"1px solid #D9D9D9"}
              >
                <HStack spacing={2} mt={5} mb={3}>
                  <Image
                    src={`${assetsURL}report/issue_description.svg`}
                    width={6}
                  />
                  <Text fontSize={["sm"]} fontWeight={600} width={"100%"}>
                    Description
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: issue.issue_description,
                    }}
                    fontSize={"xs"}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>

              <Flex
                w={"100%"}
                pt={2}
                px={6}
                pb={issue.comment ? 0 : 8}
                flexDir={"column"}
                border={"1px solid #D9D9D9"}
                borderTop={"none"}
                borderBottom={issue.comment ? "none" : "1px solid #D9D9D9"}
              >
                <HStack spacing={2} mt={5} mb={3}>
                  <Image
                    src={`${assetsURL}report/issue_remediation.svg`}
                    width={6}
                  />
                  <Text fontSize={["sm"]} fontWeight={600} width={"100%"}>
                    Remediation
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: issue.issue_remediation,
                    }}
                    fontSize={"xs"}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>
              {issue.comment && issue.bug_status === "wont_fix" && (
                <Flex
                  w={"100%"}
                  pt={2}
                  px={6}
                  pb={8}
                  flexDir={"column"}
                  border={"1px solid #D9D9D9"}
                  borderTop={"none"}
                >
                  <HStack spacing={2} mt={5} mb={3}>
                    <Image src={`${assetsURL}report/comment.svg`} width={6} />
                    <Text fontSize={["sm"]} fontWeight={600} width={"100%"}>
                      Comments
                    </Text>
                  </HStack>
                  <Text fontWeight={400} fontSize={"xs"} wordBreak="break-all">
                    {issue.comment}
                  </Text>
                </Flex>
              )}
            </>
          ) : (
            <>
              <Flex
                w={"100%"}
                px={6}
                flexDir={"column"}
                borderLeft={"1px solid #D9D9D9"}
                borderRight={"1px solid #D9D9D9"}
              >
                <HStack spacing={2} mt={5} mb={3}>
                  <Image
                    src={`${assetsURL}report/issue_description.svg`}
                    width={6}
                  />
                  <Text fontSize={["sm"]} fontWeight={600} width={"100%"}>
                    Description
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: demoIssueDescription,
                    }}
                    fontSize={"xs"}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>

              <Flex
                w={"100%"}
                pt={2}
                px={6}
                pb={issue.comment ? 0 : 8}
                flexDir={"column"}
                border={"1px solid #D9D9D9"}
                borderTop={"none"}
                borderBottom={issue.comment ? "none" : "1px solid #D9D9D9"}
              >
                <HStack spacing={2} mt={5} mb={3}>
                  <Image
                    src={`${assetsURL}report/issue_remediation.svg`}
                    width={6}
                  />
                  <Text fontSize={["sm"]} fontWeight={600} width={"100%"}>
                    Remediation
                  </Text>
                </HStack>
                <DescriptionWrapper>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: demoIssueRemediation,
                    }}
                    fontSize={"xs"}
                    fontWeight={400}
                  />
                </DescriptionWrapper>
              </Flex>
              {issue.comment && issue.bug_status === "wont_fix" && (
                <Flex
                  w={"100%"}
                  pt={2}
                  px={6}
                  pb={8}
                  flexDir={"column"}
                  border={"1px solid #D9D9D9"}
                  borderTop={"none"}
                >
                  <HStack spacing={2} mt={5} mb={3}>
                    <Image src={`${assetsURL}report/comment.svg`} width={6} />
                    <Text fontSize={["sm"]} fontWeight={600} width={"100%"}>
                      Comments
                    </Text>
                  </HStack>
                  <Text fontWeight={400} fontSize={"xs"} wordBreak="break-all">
                    {"issue.comment"}
                  </Text>
                </Flex>
              )}
            </>
          )
        ) : null}

        {isQSReport && (
          <Flex
            w="96%"
            left="2px"
            top={showVulnerabilityTitle ? "270px" : "190px"}
            h="730px"
            position="absolute"
            sx={{
              backdropFilter: "blur(6px)",
            }}
            bg="rgba(255,255,255,0.3)"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
          >
            <Flex
              w="90%"
              borderRadius={10}
              p={7}
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
              bg="linear-gradient(rgba(238, 235, 255, 1), rgba(229, 246, 255, 1))"
            >
              <VStack
                alignItems="flex-start"
                textAlign="left"
                w="calc(100% - 250px)"
              >
                <Text color="#000000" fontWeight={600} fontSize="md">
                  {isQSReport
                    ? issue.severity === "gas"
                      ? "Access Gas Issues"
                      : "Reveal Detailed Vulnerabilities"
                    : "Upgrade your Plan to view the full report"}
                </Text>
                <Text color="#000000" fontWeight={300} fontSize="sm">
                  {isQSReport
                    ? issue.severity === "gas"
                      ? "Sign up for a free trial and optimize your contracts for gas absolutely free!"
                      : "Make a one-time payment and get a detailed security report for your smart contract with security scores, bug descriptions & remediations directly in your inbox!"
                    : "Please upgrade your plan to view all the issues in your report."}
                </Text>
              </VStack>
              <Button
                leftIcon={<LockIcon />}
                mt={2}
                mb={4}
                variant="brand"
                width="200px"
                onClick={() => {
                  if (isQSReport) {
                    if (issue.severity === "gas") {
                      history.push("/signup");
                    } else {
                      onOpen();
                    }
                  } else {
                    history.push("/billing");
                  }
                }}
              >
                {isQSReport ? "Pay & Unlock report" : "Upgrade"}
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

const DescriptionWrapper = styled.div`
  p {
    font-size: 12px;
    font-weight: 300;
    word-break: break-all;
  }

  ul,
  ol {
    margin-left: 20px;
  }

  li {
    font-weight: 300;
    font-size: 12px;
  }

  code {
    background: #cbd5e0;
    padding: 2px 4px;
    border-radius: 5px;
    word-break: break-all;
    font-weight: 300;
    font-size: 12px;
  }
  a {
    font-size: 12px;
    color: #4299e1;
    text-decoration: underline;
    word-break: break-all;
    transition: 0.2s color;
    &:hover {
      color: #2b6cb0;
    }
  }
`;

export default VulnerabililtyDetailsContainer;

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
  Link,
  Button,
} from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import LazyLoad from "react-lazyload";
import { Report, Profile, IssueItem } from "common/types";
import {
  Logo,
  SeverityIcon,
  GithubIcon,
  ProjectIcon,
  ReportCoverDots,
} from "components/icons";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useConfig } from "hooks/useConfig";
import UpgradePackageV2 from "components/UpgradePackageV2";
import { pieData } from "common/values";
import PDFContainer from "components/report/PDFContainer";
import CoverPageContainer from "components/report/CoverPageContainer";
import TableContentContainer, {
  IssueComponent,
} from "components/report/TableContentContainer";
import ProjectSummaryContainer from "components/report/ProjectSummaryContainer";
import AuditSummaryContainer from "components/report/AuditSummaryContainer";
import FindingSummaryContainer from "components/report/FindingSummaryContainer";
import VulnerabililtyDetailsContainer from "components/report/VulnerabililtyDetailsContainer";
import ScanHistoryContainer from "components/report/ScanHistoryContainer";
import DisclaimerContainer from "components/report/DisclaimerContainer";
import FindingBugListContainer from "components/report/FindingBugListContainer";
import { useParams, useLocation } from "react-router-dom";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { DownloadIcon } from "@chakra-ui/icons";
import Loader from "components/styled-components/Loader";

export const ReportContainerV2: React.FC<{
  summary_report: Report;
  isPublicReport: boolean;
  profile?: Profile;
}> = ({ summary_report, isPublicReport, profile }) => {
  let d = new Date();

  if (summary_report) {
    d = new Date(
      summary_report.project_summary_report.last_project_report_update_time
    );
  }

  const leftNavs = [
    { label: "Table of Content", value: "toc" },
    { label: "Vulnerability Classification and Severity", value: "summary" },
    { label: "Executive Summary", value: "executive" },
    { label: "Findings Summary", value: "findings" },
    { label: "Vulnerability Details", value: "details" },
    { label: "Scan History", value: "history" },
    { label: "Disclaimer", value: "disclaimer" },
  ];

  let counter = -1;
  const { projectType, reportId, projectId } = useParams<{
    projectType: string;
    reportId: string;
    projectId: string;
  }>();

  const [currentPage, setCurrentPage] = useState<any>();
  const [bugList, setBugList] = useState<IssueItem[]>();
  const [filePaths, setFilePaths] = useState<string[]>();
  const [filesContent, setFilesContent] = useState<any[]>([]);
  const [totalVulnerabilitySplit, setTotalVulnerabilitySplit] =
    useState<number[]>();
  const [totalBugsSplit, setTotalBugsSplit] = useState<number[]>();
  const [vulnerabilityDetailSplit, setVulnerabilityDetailSplit] = useState<
    any[]
  >([]);
  const [currentPageHeadings, setCurrentPageHeadings] =
    useState<(string | null)[]>();
  const [printLoading, setPrintLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const download = searchParams.get("download");

  useEffect(() => {
    let totalCount = 0;
    let doubleCount = 0;
    let split: number[] = [0];
    let bugSplit: number[] = [0];
    let issueDetailList: IssueItem[] = [];

    Object.keys(summary_report.issues).forEach((key, index) => {
      if (key.length > 77) {
        doubleCount = doubleCount + 1;
      }
      const totalLines = index - split[split.length - 1] + doubleCount / 0.5;
      if (!doubleCount && index <= 17 && totalLines >= 17) {
        split.push(index);
      }
      if (doubleCount && index <= 15 && totalLines >= 15) {
        split.push(index);
      } else if (index > split[split.length - 1] && totalLines > 30) {
        split.push(index);
      }
      issueDetailList.push(...summary_report.issues[key].issue_details);
    });

    issueDetailList.forEach((item, index) => {
      if (item.issue_name.length > 41) {
        doubleCount = doubleCount + 1;
      }
      const totalLines =
        index - bugSplit[bugSplit.length - 1] + doubleCount / 0.7;
      if (bugSplit.length < 2 && totalLines >= 15) {
        bugSplit.push(index);
        doubleCount = 0;
      } else if (!doubleCount && totalLines >= 18) {
        bugSplit.push(index);
        doubleCount = 0;
      } else if (doubleCount && totalLines >= 19) {
        bugSplit.push(index);
        doubleCount = 0;
      }
    });
    setBugList(issueDetailList);
    setTotalBugsSplit(bugSplit);
    setTotalVulnerabilitySplit(split);

    const uniqueFilePaths: string[] = Object.values(summary_report.issues)
      .flatMap((issue) =>
        issue.issue_details.flatMap((details) =>
          details.findings.map((finding) => finding.file_path)
        )
      )
      .filter(
        (filePath: string, index: number, array: string[]) =>
          array.indexOf(filePath) === index
      );
    setFilePaths(uniqueFilePaths);
    // getFileContent(projectType, uniqueFilePaths).then((data) => {
    //   setFilesContent(data.file_contents);
    // });
    getFileContentBatched(projectType, uniqueFilePaths).then((data) => {
      const mergedFileContents = data.flatMap((batch) => batch.file_contents);
      setFilesContent(mergedFileContents);
    });
  }, [summary_report.issues]);

  useEffect(() => {
    if (download) {
      setTimeout(() => {
        const elementToRemove = document.getElementById(
          "hubspot-messages-iframe-container"
        );
        if (elementToRemove) {
          elementToRemove.remove();
        }
      }, 3000);
    }
  }, [filesContent]);

  const getFileContentBatched = async (
    type: "project" | "block",
    allFilePaths: string[]
  ) => {
    const batchSize = 10;
    const batches = [];

    for (let i = 0; i < allFilePaths.length; i += batchSize) {
      const batch = allFilePaths.slice(i, i + batchSize);
      batches.push(batch);
    }

    const results = [];

    for (const batch of batches) {
      const { data } = await API.post(
        type === "project"
          ? isPublicReport
            ? API_PATH.API_GET_PUBLIC_FILE_CONTENT
            : API_PATH.API_GET_FILE_CONTENT
          : isPublicReport
          ? API_PATH.API_GET_PUBLIC_FILE_CONTENT_BLOCK
          : API_PATH.API_GET_FILE_CONTENT_BLOCK,
        {
          file_paths: batch,
          report_id: reportId,
          project_id:
            projectId || summary_report.project_summary_report.project_id,
          project_type: projectType,
        }
      );
      results.push(data);
    }

    return results;
  };

  const navToPage = (leftNav: any) => {
    const page = document.querySelector(`.ss-report-${leftNav.value}`);
    if (page) {
      page.scrollIntoView({ behavior: "auto" });

      const pageElements = page.getElementsByClassName("ss-report-right-nav");
      const pageElementsContentList = Array.from(pageElements).map((element) =>
        element.getAttribute("content")
      );
      setCurrentPageHeadings(pageElementsContentList);
      setCurrentPage(leftNav);
    }
  };

  const printReport = async () => {
    try {
      setPrintLoading(true);
      const { data } = await API.post(`${API_PATH.API_GET_REPORT_PDF}`, {
        project_id:
          projectId || summary_report.project_summary_report.project_id,
        report_id: reportId,
        scan_type: projectType,
      });
      setPrintLoading(false);
      if (data.status === "success" && data.download_url) {
        const link = document.createElement("a");
        link.href = data.download_url;
        link.click();
      }
    } catch (e) {
      console.log(e);
      setPrintLoading(false);
    }
  };

  const getVulnerabilityDetailSplit = (issue: IssueItem) => {
    if (issue.findings.length === 1) {
      if (
        issue.findings[0].line_nos_end[0] -
          issue.findings[0].line_nos_start[0] +
          3 >
        70
      ) {
        let split = [];
        split.push({
          point: issue.findings[0].file_path,
          start_line: issue.findings[0].line_nos_start[0],
          end_line: issue.findings[0].line_nos_start[0] + 27,
        });
        split.push({
          point: issue.findings[0].file_path,
          start_line: issue.findings[0].line_nos_start[0] + 27 + 1,
          end_line: issue.findings[0].line_nos_start[0] + 70,
        });
        split.push({
          point: issue.findings[0].file_path,
          start_line: issue.findings[0].line_nos_start[0] + 70 + 1,
          end_line: issue.findings[0].line_nos_end[0],
        });
        return split;
      } else if (
        issue.findings[0].line_nos_end[0] -
          issue.findings[0].line_nos_start[0] +
          3 >
        27
      ) {
        let split = [];
        split.push({
          point: issue.findings[0].file_path,
          start_line: issue.findings[0].line_nos_start[0],
          end_line: issue.findings[0].line_nos_start[0] + 27,
        });
        split.push({
          point: issue.findings[0].file_path,
          start_line: issue.findings[0].line_nos_start[0] + 27 + 1,
          end_line: issue.findings[0].line_nos_end[0],
        });
        return split;
      } else if (
        issue.findings[0].line_nos_end[0] -
          issue.findings[0].line_nos_start[0] +
          3 >
        11
      ) {
        return [
          {
            point: issue.findings[0].file_path,
            start_line: issue.findings[0].line_nos_start[0],
            end_line: issue.findings[0].line_nos_end[0],
          },
          {
            point: "desc",
            start_line: null,
            end_line: null,
          },
        ];
      } else
        return [
          {
            point: null,
            start_line: issue.findings[0].line_nos_start[0],
            end_line: issue.findings[0].line_nos_end[0],
          },
        ];
    }
  };

  return (
    <Container
      maxW={"100vw"}
      h={"100vh"}
      p={0}
      overflow={download ? "" : "hidden"}
    >
      <Flex
        w={"100%"}
        h={"100vh"}
        flexDir={"column"}
        overflow={download ? "" : "hidden"}
        alignItems={"center"}
      >
        {!download && isPublicReport ? (
          <Flex
            w={"100%"}
            bg={"#333639"}
            color={"white"}
            px={10}
            py={6}
            boxShadow={"0px -1px 13.800000190734863px 0px #00000040"}
          >
            <Text fontSize={"lg"} fontWeight={700}>
              {summary_report.project_summary_report.project_name ||
                summary_report.project_summary_report.contract_name}
            </Text>
            <Button
              variant={"accent-outline"}
              w={["250px"]}
              ml={"auto"}
              onClick={printReport}
            >
              {printLoading ? (
                <Flex mr={5}>
                  <Loader size={25} color="#3E15F4" />
                </Flex>
              ) : (
                <DownloadIcon mr={5} />
              )}
              Download Report
            </Button>
          </Flex>
        ) : null}
        <Flex
          w={"100%"}
          h={"100%"}
          bg={!download ? "#535659" : "white"}
          pt={download ? 0 : 5}
          overflow={download ? "" : "hidden"}
          alignItems={"center"}
        >
          {!download ? (
            <Flex w={"25%"} h={"100%"} flexDir={"column"} pt={20} pl={8} pr={2}>
              {leftNavs.map((nav, index) => (
                <Text
                  key={index}
                  fontSize="sm"
                  fontWeight={
                    currentPage && currentPage.value === nav.value ? 600 : 400
                  }
                  color={
                    currentPage && currentPage.value === nav.value
                      ? "white"
                      : "#B0B7C3"
                  }
                  mb={6}
                  cursor={"pointer"}
                  onClick={() => navToPage(nav)}
                >
                  {nav.label.toUpperCase()}
                </Text>
              ))}
            </Flex>
          ) : null}
          <VStack
            spacing={download ? 0 : 4}
            align="stretch"
            mt={download ? 0 : 6}
            pb={20}
            w={"813px"}
            minW={"813px"}
            h={download ? "inherit" : "100%"}
            bg={!download ? "#535659" : "white"}
            overflowY={download ? "visible" : "auto"}
          >
            <LazyLoad>
              <PDFContainer
                page={"cover"}
                content={
                  <CoverPageContainer
                    d={d}
                    summary_report={summary_report}
                    isPublicReport={isPublicReport}
                  />
                }
                setCurrentPage={setCurrentPage}
                setCurrentPageHeadings={setCurrentPageHeadings}
              />
            </LazyLoad>

            <LazyLoad>
              <PDFContainer
                page={"toc"}
                pageNumber={1}
                content={
                  <TableContentContainer
                    summaryReport={summary_report}
                    maxLength={
                      totalVulnerabilitySplit && totalVulnerabilitySplit.length
                        ? totalVulnerabilitySplit[1]
                        : Object.keys(summary_report.issues).length
                    }
                  />
                }
                setCurrentPage={setCurrentPage}
                setCurrentPageHeadings={setCurrentPageHeadings}
              />
            </LazyLoad>
            {totalVulnerabilitySplit && totalVulnerabilitySplit.length ? (
              <>
                {totalVulnerabilitySplit
                  .slice(1, totalVulnerabilitySplit.length)
                  .map((value, index) => {
                    return (
                      // <LazyLoad key={"toc-v" + index}>
                      <PDFContainer
                        page={"toc-v"}
                        pageNumber={index + 2}
                        content={
                          <Flex
                            as="div"
                            w="100%"
                            alignItems="flex-start"
                            justifyContent="flex-start"
                            flexDir={"column"}
                          >
                            {Object.keys(summary_report.issues)
                              .slice(
                                value,
                                totalVulnerabilitySplit.slice(
                                  1,
                                  totalVulnerabilitySplit.length
                                )[index + 1] ||
                                  Object.keys(summary_report.issues).length
                              )
                              .map((key, index) => {
                                return (
                                  <IssueComponent
                                    key={index}
                                    issue={summary_report.issues[key]}
                                  />
                                );
                              })}
                            {!totalVulnerabilitySplit.slice(
                              1,
                              totalVulnerabilitySplit.length
                            )[index + 1] ? (
                              <>
                                <a href={"#scan-history"}>
                                  <Text
                                    fontSize="md"
                                    fontWeight={600}
                                    mt={4}
                                    mb={4}
                                  >
                                    05 &nbsp;Scan History
                                  </Text>
                                </a>

                                <a href={"#disclaimer"}>
                                  <Text
                                    fontSize="md"
                                    fontWeight={600}
                                    mt={4}
                                    mb={4}
                                  >
                                    06 &nbsp;Disclaimer
                                  </Text>
                                </a>
                              </>
                            ) : null}
                          </Flex>
                        }
                        setCurrentPage={setCurrentPage}
                        setCurrentPageHeadings={setCurrentPageHeadings}
                      />
                      // </LazyLoad>
                    );
                  })}
              </>
            ) : null}

            <LazyLoad>
              <PDFContainer
                page={"summary"}
                pageNumber={
                  totalVulnerabilitySplit
                    ? totalVulnerabilitySplit?.length + 1
                    : 2
                }
                content={
                  <ProjectSummaryContainer summary_report={summary_report} />
                }
                setCurrentPage={setCurrentPage}
                setCurrentPageHeadings={setCurrentPageHeadings}
              />
            </LazyLoad>

            <LazyLoad>
              <PDFContainer
                page={"executive"}
                pageNumber={
                  totalVulnerabilitySplit
                    ? totalVulnerabilitySplit?.length + 2
                    : 3
                }
                content={
                  <AuditSummaryContainer summary_report={summary_report} />
                }
                setCurrentPage={setCurrentPage}
                setCurrentPageHeadings={setCurrentPageHeadings}
              />
            </LazyLoad>

            <LazyLoad>
              <PDFContainer
                page={"findings"}
                pageNumber={
                  totalVulnerabilitySplit
                    ? totalVulnerabilitySplit?.length + 3
                    : 4
                }
                content={
                  <FindingSummaryContainer summary_report={summary_report} />
                }
                setCurrentPage={setCurrentPage}
                setCurrentPageHeadings={setCurrentPageHeadings}
              />
            </LazyLoad>

            {bugList && totalBugsSplit && totalBugsSplit.length ? (
              <>
                {totalBugsSplit.map((value, index) => {
                  return (
                    // <LazyLoad key={"findings" + index}>
                    <PDFContainer
                      page={"findings"}
                      pageNumber={
                        totalVulnerabilitySplit
                          ? totalVulnerabilitySplit?.length + index + 4
                          : 5 + index
                      }
                      content={
                        <FindingBugListContainer
                          showActionTaken={index === 0}
                          summary_report={summary_report}
                          issues={bugList.slice(
                            totalBugsSplit[index],
                            totalBugsSplit[index + 1] || bugList.length - 1
                          )}
                        />
                      }
                      setCurrentPage={setCurrentPage}
                      setCurrentPageHeadings={setCurrentPageHeadings}
                    />
                    // </LazyLoad>
                  );
                })}
              </>
            ) : null}

            {Object.keys(summary_report.issues).map((key, index) =>
              summary_report.issues[key].issue_details.map((issue) => {
                const splitResult = getVulnerabilityDetailSplit(issue);
                if (splitResult) {
                  return (
                    splitResult as {
                      point: string;
                      start_line: number;
                      end_line: number;
                    }[]
                  ).map((item, index, array) => {
                    counter = counter + 1;
                    return (
                      <PDFContainer
                        page={"details"}
                        pageNumber={
                          totalVulnerabilitySplit && totalBugsSplit
                            ? totalVulnerabilitySplit?.length +
                              totalBugsSplit?.length +
                              counter +
                              4
                            : 5 + counter
                        }
                        content={
                          <VulnerabililtyDetailsContainer
                            type={item.point}
                            summary_report={summary_report}
                            issue={issue}
                            showVulnerabilityTitle={counter === 0}
                            filesContent={filesContent}
                            codeStartLine={item.start_line}
                            codeEndLine={item.end_line}
                            showMetadata={index === 0}
                            showDescription={
                              item.point === "desc" ||
                              index === array.length - 1
                            }
                          />
                        }
                        setCurrentPage={setCurrentPage}
                        setCurrentPageHeadings={setCurrentPageHeadings}
                      />
                    );
                  });
                }
              })
            )}

            {/* <LazyLoad> */}
            <PDFContainer
              page={"history"}
              pageNumber={
                totalVulnerabilitySplit && totalBugsSplit
                  ? totalVulnerabilitySplit?.length +
                    totalBugsSplit?.length +
                    counter +
                    5
                  : 6
              }
              content={<ScanHistoryContainer summary_report={summary_report} />}
              setCurrentPage={setCurrentPage}
              setCurrentPageHeadings={setCurrentPageHeadings}
            />
            {/* </LazyLoad> */}

            {/* <LazyLoad> */}
            <PDFContainer
              page={"disclaimer"}
              pageNumber={
                totalVulnerabilitySplit && totalBugsSplit
                  ? totalVulnerabilitySplit?.length +
                    totalBugsSplit?.length +
                    counter +
                    6
                  : 7
              }
              content={<DisclaimerContainer />}
              setCurrentPage={setCurrentPage}
              setCurrentPageHeadings={setCurrentPageHeadings}
            />
            {/* </LazyLoad> */}
          </VStack>
          {!download ? (
            <Flex w={"25%"} h={"100%"} flexDir={"column"} pt={20} pl={8} pr={2}>
              <Text
                fontSize="sm"
                fontWeight={600}
                color={"white"}
                mb={6}
                cursor={"pointer"}
              >
                ON THIS PAGE
              </Text>
              {currentPageHeadings &&
                currentPageHeadings.map((nav, index) => (
                  <Text
                    key={index}
                    fontSize="sm"
                    fontWeight={400}
                    color={"#B0B7C3"}
                    mb={4}
                  >
                    {nav}
                  </Text>
                ))}
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </Container>
  );
};

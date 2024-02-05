import {
  Container,
  Flex,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Report,
  Profile,
  IssueItem,
  ScanSummaryItem,
  IssueDetailObject,
} from "common/types";
import React, { useState, useEffect } from "react";
import PDFContainer from "components/report/PDFContainer";
import TableContentContainer, {
  IssueComponent,
} from "components/report/TableContentContainer";
import { useParams, useLocation, useHistory } from "react-router-dom";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { DownloadIcon, LockIcon } from "@chakra-ui/icons";
import Loader from "components/styled-components/Loader";
import {
  getFeatureGateConfig,
  splitListIntoChunks,
} from "helpers/helperFunction";
import CoverPageContainer from "components/report/CoverPageContainer";
import ProjectSummaryContainer from "components/report/ProjectSummaryContainer";
import AuditSummaryContainer from "components/report/AuditSummaryContainer";
import FindingSummaryContainer from "components/report/FindingSummaryContainer";
import FindingBugListContainer from "components/report/FindingBugListContainer";
import VulnerabililtyDetailsContainer from "components/report/VulnerabililtyDetailsContainer";
import ScanHistoryContainer from "components/report/ScanHistoryContainer";
import DisclaimerContainer from "components/report/DisclaimerContainer";
import { QSPaymentModal } from "components/modals/QSPaymentModal";

// const CoverPageContainer = React.lazy(
//   () => import("components/report/CoverPageContainer")
// );
// const TableContentContainer = React.lazy(
//   () => import("components/report/TableContentContainer")
// );
// const ProjectSummaryContainer = React.lazy(
//   () => import("components/report/ProjectSummaryContainer")
// );
// const AuditSummaryContainer = React.lazy(
//   () => import("components/report/AuditSummaryContainer")
// );
// const VulnerabililtyDetailsContainer = React.lazy(
//   () => import("components/report/VulnerabililtyDetailsContainer")
// );
// const ScanHistoryContainer = React.lazy(
//   () => import("components/report/ScanHistoryContainer")
// );
// const DisclaimerContainer = React.lazy(
//   () => import("components/report/DisclaimerContainer")
// );
// const FindingBugListContainer = React.lazy(
//   () => import("components/report/FindingBugListContainer")
// );
// const FindingSummaryContainer = React.lazy(
//   () => import("components/report/FindingSummaryContainer")
// );

export const ReportContainer: React.FC<{
  summary_report: Report;
  isPublicReport: boolean;
  needsTokenValidation?: boolean;
  isQSReport?: boolean;
  profile?: Profile;
}> = ({
  summary_report,
  isPublicReport,
  profile,
  isQSReport = false,
  needsTokenValidation = false,
}) => {
  const priority_list = [
    "critical",
    "high",
    "medium",
    "low",
    "informational",
    "gas",
  ];

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

  const { isOpen, onClose, onOpen } = useDisclosure();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<any>();
  const [issuesObj, setIssuesObj] = useState<{
    [key: string]: IssueDetailObject;
  }>({});
  const [bugList, setBugList] = useState<IssueItem[]>();
  const [filesContent, setFilesContent] = useState<any[]>([]);
  const [totalVulnerabilitySplit, setTotalVulnerabilitySplit] =
    useState<number[]>();
  const [totalBugsSplit, setTotalBugsSplit] = useState<number[]>();
  const [scanHistorySplit, setScanHistorySplit] =
    useState<ScanSummaryItem[][]>();

  const [currentPageHeadings, setCurrentPageHeadings] =
    useState<(string | null)[]>();
  const [printLoading, setPrintLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const download = searchParams.get("download");
  const token = searchParams.get("token");

  // const containerRef = useRef<HTMLDivElement>(null);
  // const observer = useRef<IntersectionObserver | null>(null);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.1,
  //   };

  //   observer.current = new IntersectionObserver(handleIntersection, options);

  //   if (containerRef.current) {
  //     observer.current.observe(containerRef.current);
  //   }

  //   return () => {
  //     if (observer.current) {
  //       observer.current.disconnect();
  //     }
  //   };
  // }, [])

  useEffect(() => {
    let doubleCount = 0;
    let split: number[] = [0];
    let bugSplit: number[] = [0];
    let issueDetailList: IssueItem[] = [];

    const issues = sortIssuesBySeverity(summary_report);

    Object.keys(issues).forEach((key, index) => {
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
      issueDetailList.push(...issues[key].issue_details);
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
    setIssuesObj(issues);
    setBugList(issueDetailList);
    setTotalBugsSplit(bugSplit);
    setTotalVulnerabilitySplit(split);
    setScanHistorySplit(splitListIntoChunks(summary_report.scan_summary, 11));

    const uniqueFilePaths: string[] = Object.values(issues)
      .flatMap((issue) =>
        issue.issue_details.flatMap((details) => {
          if (details.findings) {
            return details.findings?.map((finding) => finding.file_path);
          } else return [];
        })
      )
      .filter(
        (filePath: string, index: number, array: string[]) =>
          array.indexOf(filePath) === index
      );

    getFileContentBatched(projectType, uniqueFilePaths).then((data) => {
      const mergedFileContents = data.flatMap((batch) => batch.file_contents);
      setFilesContent(mergedFileContents);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary_report.issues]);

  useEffect(() => {
    if (download) {
      const checkElementInterval = setInterval(() => {
        const elementToRemove = document.getElementById(
          "hubspot-messages-iframe-container"
        );

        if (elementToRemove) {
          elementToRemove.remove();
          clearInterval(checkElementInterval);
        }
      }, 1000);

      return () => clearInterval(checkElementInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent]);

  const compareSeverity = (severity1: string, severity2: string): number => {
    const index1 = priority_list.indexOf(severity1);
    const index2 = priority_list.indexOf(severity2);

    if (index1 === -1) return 1;
    if (index2 === -1) return -1;

    return index1 - index2;
  };

  const sortIssuesBySeverity = (report: Report) => {
    let issues: {
      [key: string]: IssueDetailObject;
    } = {};

    const sortedKeys = Object.keys(report.issues).sort((key1, key2) => {
      const issue1 = report.issues[key1].issue_details[0];
      const issue2 = report.issues[key2].issue_details[0];

      return compareSeverity(issue1.severity, issue2.severity);
    });

    sortedKeys.forEach((key) => {
      issues[key] = report.issues[key];
    });

    return issues;
  };

  const getFileContentBatched = async (
    type: "project" | "block",
    allFilePaths: string[]
  ) => {
    setIsLoading(true);
    const batchSize = getFeatureGateConfig().report_file_batch_size || 5;
    const batches = [];

    for (let i = 0; i < allFilePaths.length; i += batchSize) {
      const batch = allFilePaths.slice(i, i + batchSize);
      batches.push(batch);
    }

    const promises = batches.map(async (batch) => {
      try {
        if (needsTokenValidation) {
          const { data } = await API.post(
            API_PATH.API_GET_CHECKOUT_PUBLIC_FILE_CONTENT,
            {
              file_paths: batch,
              report_id: reportId,
              token: token,
            }
          );
          return data;
        } else {
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
          return data;
        }
      } catch (error) {
        console.error(`Error fetching file content: ${error.message}`);
        return null;
      }
    });

    const results = await Promise.all(promises);
    setIsLoading(false);
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
    if (isQSReport) {
      onOpen();
    } else {
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
    }
  };
  const splitNumber = (num: number): number[] => {
    const result: number[] = [0];
    const initial = 25;
    const increment = 40;

    let current = initial;
    while (current < num) {
      result.push(current);
      current += increment;
    }

    return result;
  };

  const getVulnerabilityDetailSplit = (issue: IssueItem) => {
    if (issue && issue.findings !== undefined && issue.findings.length === 1) {
      if (
        issue.findings[0].line_nos_end[0] -
          issue.findings[0].line_nos_start[0] +
          3 >
        25
      ) {
        const splitList = splitNumber(
          issue.findings[0].line_nos_end[0] -
            issue.findings[0].line_nos_start[0]
        );
        let split: any[] = [];
        splitList.forEach((value, index) => {
          if (index === splitList.length - 1 && issue.findings) {
            split.push({
              point: issue.findings[0].file_path,
              start_line: issue.findings[0].line_nos_start[0] + value + 1,
              end_line: issue.findings[0].line_nos_end[0],
            });
            if (
              issue.findings[0].line_nos_end[0] -
                (issue.findings[0].line_nos_start[0] + value) >
              37
            ) {
              split.push({
                point: "desc",
                start_line: null,
                end_line: null,
              });
            }
          } else if (index === 0) {
            if (issue.findings) {
              split.push({
                point: issue.findings[0].file_path,
                start_line: issue.findings[0].line_nos_start[0] + value,
                end_line:
                  issue.findings[0].line_nos_start[0] + splitList[index + 1],
              });
            }
          } else {
            if (issue.findings) {
              split.push({
                point: issue.findings[0].file_path,
                start_line: issue.findings[0].line_nos_start[0] + value + 1,
                end_line:
                  issue.findings[0].line_nos_start[0] + splitList[index + 1],
              });
            }
          }
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
    } else {
      return [
        {
          point: null,
          start_line: 0,
          end_line: 0,
        },
      ];
    }
  };

  return (
    <>
      {isLoading ? (
        <Container py={12} h="100vh" maxW={"100vw"} bg="black">
          <Flex
            as="div"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            flexDir={"row"}
            textAlign={["left", "left"]}
            mb={10}
          >
            <Loader />
          </Flex>
        </Container>
      ) : (
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
            {!download ? (
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
                {isPublicReport ? (
                  <Button
                    variant={"accent-outline"}
                    w={["250px"]}
                    ml={"auto"}
                    display={["none", "none", "none", "flex"]}
                    onClick={printReport}
                  >
                    {isQSReport ? (
                      <LockIcon mr={5} color="#3300FF" />
                    ) : printLoading ? (
                      <Flex mr={5}>
                        <Loader size={25} color="#3E15F4" />
                      </Flex>
                    ) : (
                      <DownloadIcon mr={5} />
                    )}

                    {isQSReport ? "Pay & Unlock report" : "Download Report"}
                  </Button>
                ) : null}
              </Flex>
            ) : null}
            <Flex
              w={"100%"}
              h={"100%"}
              px={5}
              bg={!download ? "#535659" : "white"}
              pt={download ? 0 : 5}
              overflow={download ? "" : "hidden"}
              alignItems={"center"}
              justifyContent={["center", "center", "center", "space-between"]}
              flexDir="row"
              // ref={containerRef}
            >
              {!download ? (
                <Flex
                  w={"25%"}
                  h={"100%"}
                  flexDir={"column"}
                  pt={20}
                  pl={8}
                  pr={2}
                  display={["none", "none", "none", "flex"]}
                >
                  {leftNavs.map((nav, index) => (
                    <Text
                      key={index}
                      fontSize="sm"
                      fontWeight={
                        currentPage && currentPage.value === nav.value
                          ? 600
                          : 400
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
                w={download ? "826px" : ["90%", "400px", "700px", "830px"]}
                minW={download ? "826px" : ["360px", "400px", "700px", "830px"]}
                h={download ? "inherit" : "100%"}
                bg={!download ? "#535659" : "white"}
                overflowY={download ? "visible" : "auto"}
                overflowX={download ? "visible" : "hidden"}
              >
                {/* <LazyLoad> */}
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
                {/* </LazyLoad> */}

                {/* <LazyLoad> */}
                <PDFContainer
                  page={"toc"}
                  pageNumber={1}
                  content={
                    <TableContentContainer
                      issues={issuesObj}
                      maxLength={
                        totalVulnerabilitySplit &&
                        totalVulnerabilitySplit.length
                          ? totalVulnerabilitySplit[1]
                          : Object.keys(issuesObj).length
                      }
                    />
                  }
                  setCurrentPage={setCurrentPage}
                  setCurrentPageHeadings={setCurrentPageHeadings}
                />
                {/* </LazyLoad> */}
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
                                {Object.keys(issuesObj)
                                  .slice(
                                    value,
                                    totalVulnerabilitySplit.slice(
                                      1,
                                      totalVulnerabilitySplit.length
                                    )[index + 1] ||
                                      Object.keys(issuesObj).length
                                  )
                                  .map((key, index) => {
                                    return (
                                      <IssueComponent
                                        key={index}
                                        issue={issuesObj[key]}
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
                                        fontSize={["xs", "sm", "md"]}
                                        fontWeight={600}
                                        mt={4}
                                        mb={4}
                                      >
                                        05 &nbsp;Scan History
                                      </Text>
                                    </a>

                                    <a href={"#disclaimer"}>
                                      <Text
                                        fontSize={["xs", "sm", "md"]}
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

                {/* <LazyLoad> */}
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
                {/* </LazyLoad> */}

                {/* <LazyLoad> */}
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
                {/* </LazyLoad> */}

                {/* <LazyLoad> */}
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
                {/* </LazyLoad> */}

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

                {Object.keys(issuesObj).map((key, index) =>
                  issuesObj[key].issue_details.map((issue) => {
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
                          // <LazyLoad key={"vul" + counter}>
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
                                onOpen={onOpen}
                                isQSReport={isQSReport}
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
                          // </LazyLoad>
                        );
                      });
                    } else return splitResult;
                  })
                )}

                {scanHistorySplit?.map((item, index) => (
                  <PDFContainer
                    page={"history"}
                    pageNumber={
                      totalVulnerabilitySplit && totalBugsSplit
                        ? totalVulnerabilitySplit?.length +
                          totalBugsSplit?.length +
                          counter +
                          5 +
                          index
                        : 6
                    }
                    content={
                      <ScanHistoryContainer
                        scan_summary={item}
                        startIndex={index * 11 + 1}
                      />
                    }
                    setCurrentPage={setCurrentPage}
                    setCurrentPageHeadings={setCurrentPageHeadings}
                  />
                ))}

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
                isQSReport ? (
                  <VStack
                    w="300px"
                    bg={
                      "linear-gradient(rgba(5, 12, 18, 1), rgba(23, 0, 114, 1))"
                    }
                    display={["none", "none", "none", "flex"]}
                    borderRadius={10}
                    p={7}
                    spacing={10}
                    textAlign="center"
                    ml={8}
                  >
                    <Text fontWeight={600} fontSize="md" color="white">
                      Lorem ipsum dolor sit amet consectetur. Lacus elit.
                    </Text>
                    <Text fontWeight={400} fontSize="sm" color="subtle">
                      Lorem ipsum dolor sit amet consectetur. Auctor quam
                      pretium tellus varius in suspendisse velit pretium massa.
                      Ornare sed eget aliquam urna duis eget.
                    </Text>
                    <Button
                      w="100%"
                      onClick={() => history.push("/signin")}
                      variant="brand"
                    >
                      Signup For Free Trial
                    </Button>
                  </VStack>
                ) : (
                  <Flex
                    w={"25%"}
                    h={"100%"}
                    flexDir={"column"}
                    pt={20}
                    display={["none", "none", "none", "flex"]}
                    pl={8}
                    pr={2}
                  >
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
                )
              ) : null}
            </Flex>
            <QSPaymentModal onClose={onClose} isOpen={isOpen} />
          </Flex>
        </Container>
      )}
    </>
  );
};

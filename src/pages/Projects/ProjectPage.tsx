import React, { useEffect, useState, useRef } from "react";
import { useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Text,
  Link,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  HStack,
  Tooltip,
  Progress,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  InputLeftElement,
  Input,
  ModalFooter,
  Switch as SwitchComp,
  useToast,
  Image,
  useMediaQuery,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Collapse,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import Overview from "components/overview";
import MultifileResult from "components/detailedResult/MultifileResult";
import { RescanIcon, LogoIcon, ScanErrorIcon } from "components/icons";
import { InfoIcon } from "@chakra-ui/icons";
import API from "helpers/api";
import { restructureRepoTree, updateCheckedValue } from "helpers/fileStructure";
import { useScans } from "hooks/useScans";
import { useScan, getScan } from "hooks/useScan";

import {
  Profile,
  Report,
  ReportsListItem,
  ScanMeta,
  TreeItem,
  TreeItemUP,
} from "common/types";
import { useProfile } from "hooks/useProfile";
import {
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaFileCode,
  FaGithub,
  FaInternetExplorer,
  FaRegCalendarCheck,
} from "react-icons/fa";
import {
  CheckCircleIcon,
  LockIcon,
  TimeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { monthNames } from "common/values";
import PublishedReports from "components/publishedReports";
import { useReports } from "hooks/useReports";
import { usePricingPlans } from "hooks/usePricingPlans";
import { API_PATH } from "helpers/routeManager";
import { useReactToPrint } from "react-to-print";
import { PrintContainer } from "pages/Report/PrintContainer";
import { getPublicReport } from "hooks/usePublicReport";
import ProjectCustomSettings from "components/projectCustomSettings";
import FolderSettings from "components/projectFolderSettings";
import { getRepoTree } from "hooks/getRepoTree";
import {
  getAssetsURL,
  checkGenerateReportAccess,
  checkPublishReportAccess,
} from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import Loader from "components/styled-components/Loader";

export const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading } = useScans(projectId);
  const [repoTree, setRepoTree] = useState<TreeItem | null>(null);

  const getRepoTreeReq = async () => {
    if (data && data.project_url !== "File Scan" && repoTree === null) {
      const responseData = await getRepoTree(
        data.project_url,
        data.project_branch ? data.project_branch : "HEAD"
      );
      if (responseData) {
        if (responseData.status === "success") {
          setRepoTree(responseData.tree);
        }
      }
    }
  };

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        bg: "bg.subtle",
        borderRadius: "20px",
        mx: [0, 0, 2],
        py: 3,
        minH: "78vh",
      }}
      px={[2, 2, 2, 3]}
    >
      {isLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Loader />
        </Flex>
      ) : (
        data && (
          <ScanDetails
            scansRemaining={data.scans_remaining}
            scans={data.scans}
            getRepoTreeReq={getRepoTreeReq}
            project_name={data.project_name}
            project_url={data.project_url}
            repoTree={repoTree}
            project_branch={data.project_branch ? data.project_branch : "HEAD"}
          />
        )
      )}
    </Box>
  );
};

const ScanDetails: React.FC<{
  scansRemaining: number;
  scans: ScanMeta[];
  project_name: string;
  project_url: string;
  repoTree: TreeItem | null;
  project_branch: string;
  getRepoTreeReq: () => Promise<void>;
}> = ({
  scansRemaining,
  scans,
  project_name,
  project_url,
  repoTree,
  project_branch,
  getRepoTreeReq,
}) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [isOpen, setIsOpen] = useState(false);
  const [isRescanLoading, setRescanLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const [reportingStatus, setReportingStatus] = useState<string>("");
  const { projectId, scanId } = useParams<{
    projectId: string;
    scanId: string;
  }>();
  const history = useHistory();
  const { data: plans } = usePricingPlans();
  const { data: scanData, isLoading, refetch } = useScan(scanId);
  const { data: reportList, refetch: refetchReprtList } = useReports(
    "project",
    projectId
  );
  const [tabIndex, setTabIndex] = React.useState(0);

  const { data: profile, isLoading: isProfileLoading } = useProfile();

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const toast = useToast();
  const [next, setNext] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (scanData) {
      setReportingStatus(scanData.scan_report.reporting_status);
    }
  }, [scanData]);

  const onClose = () => setIsOpen(false);

  const generateReport = async () => {
    setReportingStatus("generating_report");
    const { data } = await API.post(API_PATH.API_GENERATE_REPORT, {
      project_id: projectId,
      scan_id: scanId,
    });
    let intervalId: NodeJS.Timeout;
    const refetchTillReportGenerates = () => {
      intervalId = setInterval(async () => {
        await refetch().then((res) => {
          if (res.data?.scan_report.reporting_status === "report_generated") {
            clearInterval(intervalId);
            setReportingStatus("report_generated");
          }
        });
      }, 5000);
    };
    if (data.success) {
      refetchTillReportGenerates();
    }
  };

  const rescan = async () => {
    setRescanLoading(true);
    const { data } = await API.post<{ scan_id: string }>(
      API_PATH.API_PROJECT_SCAN,
      {
        project_id: projectId,
        project_type: "existing",
      }
    );
    setRescanLoading(false);
    queryClient.invalidateQueries(["scan_list", projectId]);
    onClose();
    history.push(`/projects/`);
  };

  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [commitHash, setCommitHash] = useState("");
  const [lastTimeUpdate, setLastTimeUpdate] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [pubName, setPubName] = useState("");
  const [nameSwitch, setNameSwitch] = useState(true);
  const [pubOrg, setPubOrg] = useState("");
  const [orgSwitch, setOrgSwitch] = useState(true);
  const [pubWeb, setPubWeb] = useState("");
  const [webSwitch, setWebSwitch] = useState(true);
  const [pubEmail, setPubEmail] = useState("");
  const [emailSwitch, setEmailSwitch] = useState(true);
  const [publishStatus, setPublishStatus] = useState("");
  const [publishInfoSwitch, setPublishInfoSwitch] = useState(true);

  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const getReportData = async (project_id: string, report_id: string) => {
    const reportResponse = await API.post<{ summary_report: Report }>(
      API_PATH.API_GET_REPORT,
      {
        project_id,
        report_id,
        project_type: "project",
      }
    );
    setCommitHash(reportResponse.data.summary_report.git_commit_hash);
    const d = new Date(
      reportResponse.data.summary_report.project_summary_report.last_project_report_update_time
    );
    setLastTimeUpdate(
      `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`
    );
  };

  const checkReportPublished = async (
    project_id: string,
    report_id: string
  ) => {
    const reportResponse = await API.post<{ reports: ReportsListItem[] }>(
      API_PATH.API_GET_REPORTS,
      {
        project_type: "project",
        project_id,
        report_id,
      }
    );
    if (reportResponse.data.reports.length === 0) {
      setPublishStatus("Not-Published");
      return;
    }
    if (reportResponse.data.reports[0].is_approved)
      setPublishStatus("Approved");
    else setPublishStatus("Waiting For Approval");
    return;
  };

  useEffect(() => {
    if (scanData) {
      if (scanData.scan_report.reporting_status === "report_generated") {
        setReportingStatus(scanData.scan_report.reporting_status);
        setProjectName(scanData.scan_report.project_name);
        setRepoUrl(scanData.scan_report.project_url);
        checkReportPublished(projectId, scanData.scan_report.latest_report_id);
        const d = new Date();
        setDatePublished(
          `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`
        );
      } else {
        setPublishStatus("Not-Generated");
      }
    }
  }, [scanData]);

  const reportId = scanData?.scan_report.latest_report_id;

  const publishReport = async () => {
    const { data } = await API.post(API_PATH.API_PUBLISH_REPORT, {
      project_type: "project",
      project_id: projectId,
      report_id: reportId,
      additional_details: {
        report_owner: {
          value: pubName,
          is_public: isDesktopView ? nameSwitch : publishInfoSwitch,
        },
        website: {
          value: pubWeb,
          is_public: isDesktopView ? webSwitch : publishInfoSwitch,
        },
        organization: {
          value: pubOrg,
          is_public: isDesktopView ? orgSwitch : publishInfoSwitch,
        },
        contact_email: {
          value: pubEmail,
          is_public: isDesktopView ? emailSwitch : publishInfoSwitch,
        },
      },
    });

    if (data.status === "success") {
      toast({
        title: "Publish Request Success.",
        description:
          "Report has been sent for approval. It will be published once approved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setOpen(false);
    }
    checkReportPublished(projectId, reportId);
    refetchReprtList();
  };

  const [summaryReport, setSummaryReport] = useState<Report | null>(null);
  const [printLoading, setPrintLoading] = useState<boolean>(false);
  const componentRef = useRef();

  const generatePDF = async () => {
    setPrintLoading(true);
    const publishReportData = await getPublicReport(
      "project",
      scanData.scan_report.latest_report_id
    );
    if (publishReportData.summary_report) {
      setSummaryReport(publishReportData.summary_report);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (summaryReport) {
      setTimeout(() => {
        handlePrint();
        setPrintLoading(false);
      }, 100);
    }
  }, [summaryReport]);

  const checkIfGeneratingReport = () => {
    if (profile && plans) {
      if (reportingStatus === "generating_report") return true;

      return !checkGenerateReportAccess(profile, plans);
    }
    return true;
  };

  return (
    <>
      <Box
        sx={{
          w: "100%",
          bg: "white",
          borderRadius: "20px",
          p: 2,
        }}
      >
        {isLoading || isProfileLoading ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Loader />
          </Flex>
        ) : (
          scanData &&
          profile &&
          plans &&
          reportList && (
            <>
              <Flex
                sx={{
                  justifyContent: ["flex-start", "flex-start", "space-between"],
                  alignItems: ["center"],
                  pb: 3,
                  px: 6,
                  w: "100%",
                  h: "fit-content",
                  borderBottom: "1px solid",
                  borderColor: "border",
                  flexDir: ["column", "column", "column", "row"],
                }}
              >
                <Flex
                  flexDir={["column", "column", "column", "row"]}
                  justifyContent="flex-start"
                  alignItems={"center"}
                  mb={[4, 4, 0]}
                >
                  {!scanData.scan_report.file_url_list && (
                    <Tooltip label="Rescan" aria-label="A tooltip" mt={2}>
                      <Button
                        size="sm"
                        colorScheme="white"
                        transition="0.3s opacity"
                        height="58px"
                        width="58px"
                        mr={[0, 0, 0, 6]}
                        onClick={() => setIsOpen(true)}
                        _hover={{
                          opacity:
                            scansRemaining === 0 ||
                            scanData.scan_report.scan_status === "scanning"
                              ? 0.4
                              : 0.9,
                        }}
                        isDisabled={
                          scansRemaining === 0 ||
                          scanData.scan_report.scan_status === "scanning"
                        }
                      >
                        <Flex sx={{ flexDir: "column", alignItems: "center" }}>
                          <RescanIcon size={50} />
                        </Flex>
                      </Button>
                    </Tooltip>
                  )}
                  <VStack
                    mt={[2, 2, 2, 0]}
                    alignItems={["center", "center", "center", "flex-start"]}
                    justifyContent={"flex-start"}
                    spacing={0}
                  >
                    <Text sx={{ fontSize: "xl", fontWeight: 600 }}>
                      {project_name}
                    </Text>
                    {project_url !== "File Scan" && (
                      <Link
                        fontSize="14px"
                        variant="subtle"
                        target="_blank"
                        href={project_url}
                        isTruncated
                        width={["70%", "70%", "70%", "fit-content"]}
                      >
                        {project_url}
                      </Link>
                    )}
                  </VStack>
                </Flex>
                <Flex
                  flexDir={[
                    "column-reverse",
                    "column-reverse",
                    "column-reverse",
                    "row",
                  ]}
                  mt={[4, 4, 4, 0]}
                  justifyContent={["center", "center", "center", "flex-end"]}
                  alignItems={"center"}
                  width={["100%", "100%", "100%", "fit-content"]}
                >
                  {!scanData.scan_report.report_regeneration_enabled &&
                    scanData.scan_report.reporting_status ===
                      "report_generated" &&
                    publishStatus !== "" &&
                    publishStatus !== "Not-Generated" &&
                    (publishStatus === "Not-Published" ? (
                      <Button
                        variant={"accent-outline"}
                        bg={"white"}
                        w={["80%", "80%", "50%", "auto"]}
                        mx={["auto", "auto", "auto", 4]}
                        isDisabled={!checkPublishReportAccess(profile, plans)}
                        onClick={() => {
                          if (commitHash == "") {
                            getReportData(
                              projectId,
                              scanData.scan_report.latest_report_id
                            );
                          }
                          setOpen(!open);
                        }}
                      >
                        {!checkPublishReportAccess(profile, plans) && (
                          <LockIcon color={"accent"} size="xs" mr={3} />
                        )}
                        Publish Report
                      </Button>
                    ) : (
                      <HStack mb={[5, 5, 5, 0]}>
                        {publishStatus === "Approved" ? (
                          <CheckCircleIcon color={"#03C04A"} />
                        ) : (
                          <TimeIcon color={"#FF5C00"} />
                        )}
                        <Text
                          color={
                            publishStatus === "Approved" ? "#03C04A" : "#FF5C00"
                          }
                          sx={{ fontSize: "md", fontWeight: 600, ml: 2 }}
                        >
                          {publishStatus}
                        </Text>
                      </HStack>
                    ))}

                  {scanData.scan_report.scan_status === "scan_done" &&
                    reportingStatus !== "" &&
                    publishStatus !== "" &&
                    (scanData.scan_report.report_regeneration_enabled ? (
                      <Button
                        variant={"accent-outline"}
                        w={["80%", "80%", "50%", "auto"]}
                        mx={["auto", "auto", "auto", 4]}
                        mb={[4, 4, 4, 0]}
                        onClick={() => {
                          generateReport();
                        }}
                        isDisabled={checkIfGeneratingReport()}
                      >
                        {reportingStatus === "generating_report" && (
                          <Flex mr={3}>
                            <Loader color="#806CCF" size={25} />
                          </Flex>
                        )}
                        Re-Generate Report
                      </Button>
                    ) : publishStatus === "Approved" ? (
                      <HStack
                        borderRadius={"15px"}
                        border="1px solid #806CCF"
                        backgroundColor={"#F5F2FF"}
                        pl={7}
                        pr={3}
                        py={2}
                        ml={5}
                      >
                        <Text
                          color="#3E15F4"
                          cursor={"pointer"}
                          onClick={() => {
                            window.open(
                              `http://${document.location.host}/published-report/project/${scanData.scan_report.latest_report_id}`,
                              "_blank"
                            );
                          }}
                          fontSize="sm"
                          mr={2}
                        >
                          View Report
                        </Text>
                        <Text color="#3E15F4" fontSize="sm">
                          |
                        </Text>

                        {summaryReport && printLoading && (
                          <Box
                            w={0}
                            h={0}
                            visibility={"hidden"}
                            position="absolute"
                          >
                            <Box w="100vw" ref={componentRef}>
                              <PrintContainer summary_report={summaryReport} />
                            </Box>
                          </Box>
                        )}
                      </HStack>
                    ) : (
                      <Button
                        variant={"accent-outline"}
                        w={["80%", "80%", "50%", "auto"]}
                        mx={["auto", "auto", "auto", 4]}
                        mb={[4, 4, 4, 0]}
                        isDisabled={checkIfGeneratingReport()}
                        onClick={() => {
                          if (reportingStatus === "not_generated") {
                            generateReport();
                          } else if (reportingStatus === "report_generated") {
                            window.open(
                              `http://${document.location.host}/report/project/${projectId}/${scanData?.scan_report.latest_report_id}`,
                              "_blank"
                            );
                          }
                        }}
                      >
                        {reportingStatus === "generating_report" && (
                          <Flex mr={3}>
                            <Loader color="#806CCF" size={25} />
                          </Flex>
                        )}
                        {!checkGenerateReportAccess(profile, plans) && (
                          <LockIcon color={"accent"} mr={3} />
                        )}
                        {reportingStatus === "generating_report"
                          ? "Generating report..."
                          : reportingStatus === "not_generated"
                          ? "Generate Report"
                          : reportingStatus === "report_generated"
                          ? "View Report"
                          : "Loading"}
                      </Button>
                    ))}
                </Flex>
              </Flex>
              {scanData.scan_report.scan_status === "scanning" ||
              scanData.scan_report.scan_status === "initialised" ? (
                <Flex
                  w="100%"
                  h="60vh"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Flex
                    sx={{
                      display: "inline-flex",
                      bg: "bg.subtle",
                      alignItems: "center",
                      p: 2,
                      mb: 2,
                      borderRadius: 15,
                    }}
                  >
                    <LogoIcon size={15} />
                    <Text mx={2} fontSize="sm">
                      Scan in progress...
                    </Text>
                  </Flex>
                  <Progress
                    value={30}
                    width="400px"
                    mb={10}
                    isIndeterminate
                    size="sm"
                  />
                </Flex>
              ) : (
                <Tabs
                  index={tabIndex}
                  onChange={handleTabsChange}
                  variant="soft-rounded"
                  colorScheme="green"
                  w={"100%"}
                  isLazy
                >
                  <Flex
                    width={"100%"}
                    overflow={"scroll"}
                    flexDir={"row"}
                    justifyContent="flex-start"
                    align={"center"}
                    ml={[0, 0, 0, 0]}
                  >
                    <TabList
                      sx={{
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        borderColor: "border",
                        p: 3,
                        w: "100%",
                      }}
                    >
                      <Tab
                        fontSize={"sm"}
                        h="35px"
                        minW={"120px"}
                        bgColor={"#F5F5F5"}
                      >
                        Overview
                      </Tab>
                      <Tab
                        fontSize={"sm"}
                        h="35px"
                        minW={"150px"}
                        bgColor={"#F5F5F5"}
                        ml={4}
                        whiteSpace="nowrap"
                      >
                        Detailed Result
                      </Tab>
                      {scanData.scan_report.project_skip_files &&
                        scanData.scan_report.project_url &&
                        scanData.scan_report.project_url !== "File Scan" && (
                          <Tab
                            fontSize={"sm"}
                            h="35px"
                            minW={"175px"}
                            bgColor={"#F5F5F5"}
                            ml={4}
                            whiteSpace="nowrap"
                          >
                            Custom Settings
                          </Tab>
                        )}

                      {profile.promo_code ? (
                        profile.actions_supported &&
                        profile.actions_supported.publishable_report && (
                          <Tab
                            fontSize={"sm"}
                            h="35px"
                            minW={"175px"}
                            bgColor={"#F5F5F5"}
                            ml={4}
                            whiteSpace="nowrap"
                          >
                            Published Reports
                          </Tab>
                        )
                      ) : (
                        <Tab
                          fontSize={"sm"}
                          h="35px"
                          minW={"175px"}
                          bgColor={"#F5F5F5"}
                          ml={4}
                          whiteSpace="nowrap"
                        >
                          Published Reports
                        </Tab>
                      )}
                      <Tab
                        fontSize={"sm"}
                        h="35px"
                        minW={"120px"}
                        bgColor={"#F5F5F5"}
                        mx={4}
                        whiteSpace="nowrap"
                      >
                        Scan History
                      </Tab>
                    </TabList>
                  </Flex>
                  <TabPanels>
                    <TabPanel p={[0, 0, 0, 2]}>
                      {(scanData.scan_report.multi_file_scan_summary ||
                        scanData.scan_report.scan_summary) && (
                        <Overview
                          scansRemaining={scansRemaining}
                          scanData={scanData.scan_report}
                          onTabChange={handleTabsChange}
                        />
                      )}
                    </TabPanel>
                    <TabPanel p={[0, 0, 0, 2]}>
                      {scanData.scan_report.multi_file_scan_status ===
                        "scan_done" &&
                      scanData.scan_report.multi_file_scan_details &&
                      scanData.scan_report.multi_file_scan_summary ? (
                        <MultifileResult
                          type="project"
                          details_enabled={scanData.scan_report.details_enabled}
                          profileData={profile}
                          is_latest_scan={scanData.is_latest_scan}
                          scanSummary={
                            scanData.scan_report.multi_file_scan_summary
                          }
                          scanDetails={
                            scanData.scan_report.multi_file_scan_details
                          }
                          project_url={project_url}
                          contract_url={""}
                          contract_platform={""}
                          branchName={project_branch}
                          refetch={refetch}
                          contract_address=""
                        />
                      ) : (
                        <Flex
                          w="97%"
                          m={4}
                          borderRadius="20px"
                          bgColor="high-subtle"
                          p={4}
                        >
                          <ScanErrorIcon size={28} />
                          <Text fontSize={"xs"} color="high" ml={4}>
                            {scanData.scan_report.multi_file_scan_status
                              ? scanData.scan_report.multi_file_scan_status
                              : "Please do Rescan to carry out a Multifile Scan "}
                          </Text>
                        </Flex>
                      )}
                    </TabPanel>
                    {scanData.scan_report.project_skip_files &&
                      scanData.scan_report.project_url &&
                      scanData.scan_report.project_url !== "File Scan" && (
                        <TabPanel p={[0, 0, 0, 2]}>
                          <ProjectCustomSettings
                            project_skip_files={
                              scanData.scan_report.project_skip_files
                            }
                            project_branch={project_branch}
                            repoTree={repoTree}
                            webhook_enabled={
                              scanData.webhook_enabled
                                ? scanData.webhook_enabled
                                : false
                            }
                            getRepoTreeReq={getRepoTreeReq}
                            project_url={scanData.scan_report.project_url}
                            project_id={scanData.scan_report.project_id}
                            isGithubIntegrated={
                              profile._integrations?.github?.status ===
                              "successful"
                            }
                          />
                        </TabPanel>
                      )}

                    {profile.promo_code ? (
                      profile.actions_supported &&
                      profile.actions_supported.publishable_report && (
                        <TabPanel p={[0, 0, 0, 2]}>
                          <PublishedReports
                            type="project"
                            scan_report={scanData.scan_report}
                            reportList={reportList.reports}
                            profile={profile}
                          />
                        </TabPanel>
                      )
                    ) : (
                      <TabPanel p={[0, 0, 0, 2]}>
                        <PublishedReports
                          type="project"
                          scan_report={scanData.scan_report}
                          reportList={reportList.reports}
                          profile={profile}
                        />
                      </TabPanel>
                    )}

                    <TabPanel p={[0, 0, 0, 2]}>
                      <ScanHistory
                        project_url={project_url}
                        getRepoTreeReq={getRepoTreeReq}
                        repoTree={repoTree}
                        profile={profile}
                        scans={scans}
                        setTabIndex={setTabIndex}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              )}
            </>
          )
        )}
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Rescan Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You have{" "}
              <Box as="span" sx={{ fontWeight: 600 }}>
                {scansRemaining}
              </Box>{" "}
              scans remaining.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} py={6}>
                Cancel
              </Button>
              <Button
                variant="brand"
                onClick={rescan}
                ml={3}
                isLoading={isRescanLoading}
                spinner={<Loader color={"#3300FF"} size={25} />}
              >
                Rescan
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent
          bg="bg.subtle"
          h={["auto", "auto", "auto", "650px"]}
          minH={"fit-content"}
          maxW={["90vw", "90vw", "70vw"]}
          minW={"300px"}
          borderRadius="15px"
        >
          <ModalHeader
            background="rgba(82, 255, 0, 0.04)"
            backgroundImage={`url('${assetsURL}background/pattern.png')`}
            textAlign={["center", "center", "center", "left"]}
            py={10}
          >
            Publish Report
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              flexDir="row"
            >
              {!next && (
                <VStack
                  zIndex={"10"}
                  w={["100%", "100%", "100%", "70%"]}
                  spacing={2}
                >
                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={3}
                    px={5}
                    py={3}
                    w={"100%"}
                    fontSize="14px"
                    bgColor={"white"}
                    border={"2px solid #EDF2F7"}
                    borderRadius={"16px"}
                  >
                    <Text
                      fontSize="md"
                      fontWeight={"600"}
                      color={"gray.500"}
                      width={["100%", "100%", "100%", "30%"]}
                    >
                      Project Name
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={["100%", "100%", "100%", "70%"]}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <AiOutlineProject color="" />

                      <Text fontSize="md" fontWeight={"600"}>
                        {projectName}
                      </Text>
                    </HStack>
                  </Stack>
                  {repoUrl !== "File Scan" && (
                    <Stack
                      direction={["column", "column", "column", "row"]}
                      alignItems={["left", "left", "left", "center"]}
                      spacing={3}
                      px={5}
                      py={3}
                      w={"100%"}
                      fontSize="14px"
                      bgColor={"white"}
                      border={"2px solid #EDF2F7"}
                      borderRadius={"16px"}
                    >
                      <Text
                        fontSize="md"
                        fontWeight={"600"}
                        color={"gray.500"}
                        width={["100%", "100%", "100%", "30%"]}
                      >
                        Link to the repository{" "}
                      </Text>
                      <HStack
                        alignItems="center"
                        spacing={3}
                        width={["100%", "100%", "100%", "70%"]}
                        bgColor={"white"}
                        borderRadius={"16px"}
                      >
                        <FaFileCode />

                        <Text isTruncated fontSize="md" fontWeight={"600"}>
                          {repoUrl}
                        </Text>
                      </HStack>
                    </Stack>
                  )}

                  {commitHash && (
                    <Stack
                      direction={["column", "column", "column", "row"]}
                      alignItems={["left", "left", "left", "center"]}
                      spacing={3}
                      px={5}
                      py={3}
                      w={"100%"}
                      fontSize="14px"
                      bgColor={"white"}
                      border={"2px solid #EDF2F7"}
                      borderRadius={"16px"}
                    >
                      <Text
                        fontSize="md"
                        fontWeight={"600"}
                        color={"gray.500"}
                        width={["100%", "100%", "100%", "30%"]}
                      >
                        Git commit hash{" "}
                      </Text>
                      <HStack
                        alignItems="center"
                        spacing={3}
                        width={["100%", "100%", "100%", "70%"]}
                        bgColor={"white"}
                        borderRadius={"16px"}
                      >
                        <FaGithub />
                        <Text isTruncated fontSize="md" fontWeight={"600"}>
                          {commitHash}
                        </Text>
                      </HStack>
                    </Stack>
                  )}
                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={3}
                    px={5}
                    py={3}
                    w={"100%"}
                    fontSize="14px"
                    bgColor={"white"}
                    border={"2px solid #EDF2F7"}
                    borderRadius={"16px"}
                  >
                    <Text
                      fontSize="md"
                      fontWeight={"600"}
                      color={"gray.500"}
                      width={["100%", "100%", "100%", "30%"]}
                    >
                      Latest Report Update
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={["100%", "100%", "100%", "70%"]}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <FaCalendarAlt />
                      <Text fontSize="md" fontWeight={"600"}>
                        {lastTimeUpdate}
                      </Text>
                    </HStack>
                  </Stack>
                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={3}
                    px={5}
                    py={3}
                    w={"100%"}
                    fontSize="14px"
                    bgColor={"white"}
                    border={"2px solid #EDF2F7"}
                    borderRadius={"16px"}
                  >
                    <Text
                      fontSize="md"
                      fontWeight={"600"}
                      color={"gray.500"}
                      width={["100%", "100%", "100%", "30%"]}
                    >
                      Date Published
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={["100%", "100%", "100%", "70%"]}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <FaRegCalendarCheck />
                      <Text fontSize="md" fontWeight={"600"}>
                        {datePublished}
                      </Text>
                    </HStack>
                  </Stack>
                </VStack>
              )}
              {next && (
                <VStack
                  zIndex={"10"}
                  w={["100%", "100%", "100%", "70%"]}
                  spacing={6}
                >
                  {!isDesktopView && (
                    <HStack my={6}>
                      <Text>Private</Text>
                      <SwitchComp
                        isChecked={publishInfoSwitch}
                        onChange={() => {
                          setPublishInfoSwitch(!publishInfoSwitch);
                        }}
                        size="lg"
                        variant="brand"
                      />
                      <Text>Public</Text>
                    </HStack>
                  )}
                  <HStack
                    alignItems="center"
                    spacing={3}
                    px={5}
                    w={"100%"}
                    bgColor={"white"}
                    border={"2px solid #EDF2F7"}
                    borderRadius={"16px"}
                    _hover={{
                      borderColor: "#52FF00",
                      boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                    }}
                  >
                    <InputGroup alignItems="center">
                      <InputLeftElement
                        height="48px"
                        children={
                          <Icon as={AiOutlineProject} color="gray.300" />
                        }
                      />
                      <Input
                        isRequired
                        type="text"
                        placeholder="Publisher's name"
                        border={"0px solid #FFFFFF"}
                        _focus={{
                          border: "0px solid #FFFFFF",
                        }}
                        fontSize={"15px"}
                        fontWeight={500}
                        size="lg"
                        value={pubName}
                        onChange={(e) => {
                          setPubName(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {isDesktopView && (
                      <>
                        <Text>Private</Text>
                        <SwitchComp
                          isChecked={nameSwitch}
                          onChange={() => {
                            setNameSwitch(!nameSwitch);
                          }}
                          size="lg"
                          variant="brand"
                        />
                        <Text>Public</Text>
                      </>
                    )}
                  </HStack>
                  <HStack
                    alignItems="center"
                    spacing={3}
                    px={5}
                    w={"100%"}
                    bgColor={"white"}
                    border={"2px solid #EDF2F7"}
                    borderRadius={"16px"}
                    _hover={{
                      borderColor: "#52FF00",
                      boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                    }}
                  >
                    <InputGroup alignItems="center">
                      <InputLeftElement
                        height="48px"
                        children={<Icon as={FaEnvelope} color="gray.300" />}
                      />
                      <Input
                        isRequired
                        type="email"
                        placeholder="Publisher's Email"
                        size="lg"
                        border={"0px solid #FFFFFF"}
                        _focus={{
                          border: "0px solid #FFFFFF",
                        }}
                        fontSize={"15px"}
                        fontWeight={500}
                        value={pubEmail}
                        onChange={(e) => {
                          setPubEmail(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {isDesktopView && (
                      <>
                        <Text>Private</Text>
                        <SwitchComp
                          isChecked={emailSwitch}
                          onChange={() => {
                            setEmailSwitch(!emailSwitch);
                          }}
                          size="lg"
                          variant="brand"
                        />
                        <Text> Public</Text>
                      </>
                    )}
                  </HStack>

                  <HStack
                    alignItems="center"
                    spacing={3}
                    px={5}
                    w={"100%"}
                    bgColor={"white"}
                    border={"2px solid #EDF2F7"}
                    borderRadius={"16px"}
                    _hover={{
                      borderColor: "#52FF00",
                      boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                    }}
                  >
                    <InputGroup alignItems="center">
                      <InputLeftElement
                        height="48px"
                        children={
                          <Icon as={FaInternetExplorer} color="gray.300" />
                        }
                      />
                      <Input
                        isRequired
                        type="url"
                        placeholder="Link to the Publisher's Website"
                        _focus={{
                          border: "0px solid #FFFFFF",
                        }}
                        border={"0px solid #FFFFFF"}
                        fontSize={"15px"}
                        fontWeight={500}
                        size="lg"
                        value={pubWeb}
                        onChange={(e) => {
                          setPubWeb(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {isDesktopView && (
                      <>
                        <Text>Private</Text>
                        <SwitchComp
                          isChecked={webSwitch}
                          onChange={() => {
                            setWebSwitch(!webSwitch);
                          }}
                          size="lg"
                          variant="brand"
                        />
                        <Text>Public</Text>
                      </>
                    )}
                  </HStack>
                  <HStack
                    alignItems="center"
                    spacing={3}
                    px={5}
                    w={"100%"}
                    bgColor={"white"}
                    border={"2px solid #EDF2F7"}
                    borderRadius={"16px"}
                    _hover={{
                      borderColor: "#52FF00",
                      boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                    }}
                  >
                    <InputGroup alignItems="center">
                      <InputLeftElement
                        height="48px"
                        children={<Icon as={FaBuilding} color="gray.300" />}
                      />
                      <Input
                        isRequired
                        type="text"
                        placeholder="Publisher's Organization"
                        size="lg"
                        border={"0px solid #FFFFFF"}
                        _focus={{
                          border: "0px solid #FFFFFF",
                        }}
                        fontSize={"15px"}
                        fontWeight={500}
                        value={pubOrg}
                        onChange={(e) => {
                          setPubOrg(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {isDesktopView && (
                      <>
                        <Text>Private</Text>
                        <SwitchComp
                          isChecked={orgSwitch}
                          onChange={() => {
                            setOrgSwitch(!orgSwitch);
                          }}
                          size="lg"
                          variant="brand"
                        />
                        <Text>Public</Text>
                      </>
                    )}
                  </HStack>
                </VStack>
              )}
              <Image
                ml={"-10%"}
                src={`${assetsURL}common/publishreport.png`}
                alt="Product screenshot"
                w={"40%"}
                h={"auto"}
                display={["none", "none", "none", "block"]}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            {next && (
              <Button
                w={"100px"}
                variant={"ghost"}
                mr={3}
                my={[4, 4, 4, 0]}
                onClick={() => {
                  setNext(false);
                }}
              >
                Back
              </Button>
            )}
            <Button
              w={["100%", "100%", "100%", "100px"]}
              variant={"brand"}
              mr={3}
              my={[4, 4, 4, 0]}
              onClick={() => {
                if (next) {
                  publishReport();
                } else {
                  setNext(true);
                }
              }}
            >
              {next ? "Publish" : "Next"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ScanHistory: React.FC<{
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  profile: Profile;
  scans: ScanMeta[];
  repoTree: TreeItem | null;
  getRepoTreeReq: () => Promise<void>;
  project_url: string;
}> = ({
  setTabIndex,
  profile,
  scans,
  repoTree,
  getRepoTreeReq,
  project_url,
}) => {
  return (
    <Box
      sx={{
        w: "100%",
        borderRadius: "20px",
        px: 2,
        h: "65vh",
        overflowY: "scroll",
      }}
    >
      {profile &&
        scans?.map((scan) => (
          <ScanBlock
            key={scan.scan_id}
            scan={scan}
            setTabIndex={setTabIndex}
            repoTree={repoTree}
            project_url={project_url}
            profile={profile}
            getRepoTreeReq={getRepoTreeReq}
          />
        ))}
    </Box>
  );
};

const ScanBlock: React.FC<{
  scan: ScanMeta;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  profile: Profile;
  repoTree: TreeItem | null;
  getRepoTreeReq: () => Promise<void>;
  project_url: string;
}> = ({
  scan,
  setTabIndex,
  profile,
  repoTree,
  getRepoTreeReq,
  project_url,
}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [repoTreeUP, setRepoTreeUP] = useState<TreeItemUP | null>(null);

  useEffect(() => {
    if (repoTree && scan.skip_file_paths) {
      let newRepoTreeUP = restructureRepoTree(repoTree, true);
      scan.skip_file_paths.forEach((path) => {
        newRepoTreeUP = updateCheckedValue(path, false, newRepoTreeUP);
      });
      setRepoTreeUP(newRepoTreeUP);
    }
  }, [repoTree, scan.skip_file_paths]);

  return (
    <>
      <Flex
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        sx={{
          cursor: "pointer",
          w: "100%",
          bg: "white",
          my: 4,
          px: [5, 5, 7, 10],
          borderRadius: "10px",
          transition: "0.3s box-shadow",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          _hover: {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Flex
          w="100%"
          h="fit-content"
          flexDir={"row"}
          alignItems={["flex-start", "flex-start", "center"]}
          justifyContent="space-between"
          py={3}
        >
          <Flex
            width={"calc(100% - 60px)"}
            justifyContent="flex-start"
            flexWrap={"wrap"}
            alignItems={"flex-start"}
            flexDir="row"
          >
            <VStack my={2} alignItems={"flex-start"} spacing={1} width="130px">
              <Text fontSize={"sm"} color="gray.400">
                Scan Name
              </Text>
              <Text fontSize={"md"}>{scan.scan_name}</Text>
            </VStack>
            {scan.scan_status === "scan_incomplete" ? (
              <Flex
                p={3}
                sx={{ bgColor: "high-subtle", borderRadius: "20px" }}
                mr={10}
                my={2}
              >
                <ScanErrorIcon size={28} />
              </Flex>
            ) : (
              <VStack
                my={2}
                alignItems={"flex-start"}
                spacing={1}
                width="120px"
              >
                <Text fontSize={"sm"} color="gray.400">
                  Score
                </Text>
                <Text
                  sx={{
                    color: "accent",
                    fontSize: "xl",
                    fontWeight: 600,
                    mx: "auto",
                    lineHeight: 1,
                  }}
                >
                  {parseFloat(scan.scan_score_v2).toFixed(2) || scan.scan_score}
                </Text>
              </VStack>
            )}
            <Flex
              justifyContent={"flex-start"}
              alignItems="flex-start"
              flexWrap={"wrap"}
              width={"fit-content"}
              flexDir={["column", "row", "row"]}
            >
              <Button
                variant="accent-outline"
                minW="200px"
                bg={"white"}
                mr={10}
                my={2}
                onClick={() => {
                  setTabIndex(0);
                  history.push(`/projects/${scan.project_id}/${scan.scan_id}`);
                }}
              >
                View Scan Result
              </Button>

              <Button
                variant="accent-outline"
                minW="200px"
                bg={"white"}
                mr={10}
                my={2}
                isDisabled={
                  scan.reporting_status !== "report_generated" ||
                  (profile.actions_supported
                    ? !profile.actions_supported.generate_report
                    : profile.current_package === "trial")
                }
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `http://${document.location.host}/report/project/${scan.project_id}/${scan.latest_report_id}`,
                    "_blank"
                  );
                }}
              >
                {scan.reporting_status === "generating_report" && (
                  <Flex mr={3}>
                    <Loader color="#806CCF" size={25} />
                  </Flex>
                )}
                {scan.reporting_status === "report_generated"
                  ? "View Report"
                  : scan.reporting_status === "generating_report"
                  ? "Generating Report"
                  : "Report Not Generated"}
              </Button>
              {project_url !== "File Scan" &&
                scan.skip_file_paths &&
                scan.scan_status === "scan_done" && (
                  <HStack spacing={3} mr={10} my={2}>
                    <Button
                      variant="accent-outline"
                      minW="200px"
                      isLoading={isLoading}
                      spinner={<Loader color={"#3300FF"} size={25} />}
                      onClick={async () => {
                        if (show) {
                          setShow(false);
                        } else {
                          setIsLoading(true);
                          setShow(true);
                          await getRepoTreeReq();
                          setIsLoading(false);
                        }
                      }}
                    >
                      {show ? "Hide Scanned Files" : "View Scanned Files"}{" "}
                      {show ? (
                        <ChevronUpIcon ml={2} />
                      ) : (
                        <ChevronDownIcon ml={2} />
                      )}
                    </Button>
                    <Popover placement="bottom-end">
                      <PopoverTrigger>
                        <InfoIcon color="#d7cdfa" />
                      </PopoverTrigger>
                      <PopoverContent p={1}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Text
                            fontSize="sm"
                            textAlign="left"
                            lineHeight="title"
                            fontWeight={"300"}
                            mb={0}
                          >
                            The scanned files have been highlighted while the
                            remaining ones were skipped. To modify settings for
                            future scans, please refer to the{" "}
                            <Box
                              textDecoration="underline"
                              as="span"
                              color="#3E15F4"
                              mr={1}
                            >
                              Custom Settings
                            </Box>
                            option.
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                )}
            </Flex>
          </Flex>
          <Box
            sx={{
              width: "60px",
              height: "60px",
              my: 2,
              bg: "#F7F7F7",
              color: "#4E5D78",
              borderRadius: "50%",
              textAlign: "center",
            }}
          >
            <Text fontSize="xl" fontWeight="600">
              {new Date(scan.scan_time).getDate()}
            </Text>
            <Text fontSize="12px" mt="-4px">
              {monthNames[new Date(scan.scan_time).getMonth()]}
            </Text>
          </Box>
        </Flex>
        <Collapse
          style={{
            width: "100%",
          }}
          in={show}
          animateOpacity
        >
          {repoTreeUP && (
            <FolderSettings
              branch=""
              view="scan_history"
              repoTreeUP={repoTreeUP}
              setRepoTreeUP={setRepoTreeUP}
            />
          )}
        </Collapse>
      </Flex>
    </>
  );
};

export default ProjectPage;

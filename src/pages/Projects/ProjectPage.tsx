import React, { useEffect, useState, useRef } from "react";
import { useQueryClient } from "react-query";
import {
  Switch,
  Route,
  Link as RouterLink,
  useParams,
  useHistory,
} from "react-router-dom";
import FileDownload from "js-file-download";
import {
  Flex,
  keyframes,
  Box,
  Text,
  Link,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
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
  toast,
  useToast,
  Badge,
  Image,
  useMediaQuery,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import {
  AiOutlineClockCircle,
  AiOutlineDownload,
  AiFillLock,
  AiOutlineProject,
  AiOutlineLock,
} from "react-icons/ai";
import Overview from "components/overview";
import Result, { MultifileResult } from "components/result";
import { RescanIcon, LogoIcon, ScanErrorIcon } from "components/icons";

import API from "helpers/api";

import { useScans } from "hooks/useScans";
import { useScan } from "hooks/useScan";

import { Profile, Report, ReportsListItem, ScanMeta } from "common/types";
import { useProfile } from "hooks/useProfile";
import {
  FaBuilding,
  FaCalendar,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarDay,
  FaCopy,
  FaEnvelope,
  FaFileCode,
  FaGithub,
  FaInternetExplorer,
  FaMailBulk,
  FaRegCalendarCheck,
  FaRegCopy,
} from "react-icons/fa";
import {
  CheckCircleIcon,
  CheckIcon,
  LockIcon,
  TimeIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { profile } from "console";
import { motion } from "framer-motion";
import { Profiler } from "inspector";
import { monthNames } from "common/values";
import { MdPeopleOutline } from "react-icons/md";
import PublishedReports from "components/publishedReports";
import { useReports } from "hooks/useReports";
import { usePricingPlans } from "hooks/usePricingPlans";
import { API_PATH } from "helpers/routeManager";

export const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, refetch } = useScans(projectId);

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        bg: "bg.subtle",
        borderRadius: "20px",
        my: 4,
        mx: [0, 0, 4],
        py: 4,
        minH: "78vh",
      }}
      px={[2, 2, 2, 8]}
    >
      {isLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        data && (
          <>
            <Flex
              sx={{
                alignItems: [
                  "flex-start",
                  "flex-start",
                  "flex-start",
                  "center",
                ],
              }}
              direction={["column", "column", "column", "row"]}
            >
              <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                {data.project_name}
              </Text>
              <Link
                fontSize="14px"
                ml={3}
                variant="subtle"
                target="_blank"
                href={data.project_url}
              >
                {data.project_url}
              </Link>

              <Link
                as={RouterLink}
                to="/projects"
                variant="subtle-without-underline"
                fontSize="md"
                ml="auto"
                display={["none", "none", "none", "block"]}
              >
                ← back
              </Link>
            </Flex>
            <Switch>
              <Route exact path="/projects/:projectId/:scanId">
                <ScanDetails
                  scansRemaining={data.scans_remaining}
                  scans={data.scans}
                />
              </Route>
            </Switch>
          </>
        )
      )}
    </Box>
  );
};

const ScanDetails: React.FC<{ scansRemaining: number; scans: ScanMeta[] }> = ({
  scansRemaining,
  scans,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRescanLoading, setRescanLoading] = useState(false);

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const [reportingStatus, setReportingStatus] = useState<string>("");
  const { projectId, scanId } =
    useParams<{ projectId: string; scanId: string }>();
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
    queryClient.invalidateQueries(["scans", projectId]);
    onClose();
    history.push(`/projects/`);
  };

  const scan_name =
    scanData &&
    scans.find((scan) => scan.scan_id === scanData.scan_report.scan_id)
      ?.scan_name;

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
      API_PATH.API_GET_REPORTS,
      {
        project_id,
        report_id,
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
    if (
      scanData &&
      scanData.scan_report.reporting_status === "report_generated"
    ) {
      setReportingStatus(scanData.scan_report.reporting_status);
      setProjectName(scanData.scan_report.project_name);
      setRepoUrl(scanData.scan_report.project_url);
      checkReportPublished(projectId, scanData.scan_report.latest_report_id);
      const d = new Date();
      setDatePublished(
        `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`
      );
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

  return (
    <>
      <Box
        sx={{
          w: "100%",
          bg: "white",
          borderRadius: "20px",
          my: 4,
          p: 4,
        }}
      >
        {isLoading || isProfileLoading ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Spinner />
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
                  pb: 4,
                  px: 6,
                  w: "100%",
                  borderBottom: "1px solid",
                  borderColor: "border",
                  flexDir: ["column", "column", "column", "row"],
                }}
              >
                <HStack spacing={[8]} mb={[4, 4, 0]}>
                  {!scanData.scan_report.file_url_list && (
                    <Tooltip label="Rescan" aria-label="A tooltip" mt={2}>
                      <Button
                        size="sm"
                        colorScheme="white"
                        transition="0.3s opacity"
                        height="58px"
                        width="58px"
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
                          <RescanIcon size={60} />
                        </Flex>
                      </Button>
                    </Tooltip>
                  )}
                </HStack>
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
                  {scanData.scan_report.reporting_status ===
                    "report_generated" &&
                    publishStatus !== "" &&
                    (publishStatus === "Not-Published" ? (
                      <Button
                        variant={"accent-outline"}
                        bg={"white"}
                        w={["80%", "80%", "50%", "auto"]}
                        mx={["auto", "auto", "auto", 4]}
                        isDisabled={
                          profile.actions_supported
                            ? !profile.actions_supported.publishable_report
                            : profile.current_package !== "expired" &&
                              !plans.monthly[profile.current_package]
                                .publishable_report
                        }
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
                        {profile.actions_supported
                          ? !profile.actions_supported.publishable_report
                          : profile.current_package !== "expired" &&
                            !plans.monthly[profile.current_package]
                              .publishable_report && (
                              <LockIcon color={"accent"} size="xs" mr={3} />
                            )}
                        Publish Report
                      </Button>
                    ) : (
                      <HStack>
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
                  {scanData.scan_report.scan_status === "scan_done" && (
                    <Button
                      variant={"accent-outline"}
                      isLoading={reportingStatus === ""}
                      w={["80%", "80%", "50%", "auto"]}
                      mx={["auto", "auto", "auto", 4]}
                      mb={[4, 4, 4, 0]}
                      isDisabled={
                        reportingStatus === "generating_report" ||
                        (profile.actions_supported
                          ? !profile.actions_supported.generate_report
                          : profile.current_package !== "expired" &&
                            !plans.monthly[profile.current_package].report)
                      }
                      onClick={() => {
                        if (
                          reportingStatus === "not_generated" ||
                          scanData.scan_report.report_regeneration_enabled
                        ) {
                          generateReport();
                        } else if (reportingStatus === "report_generated") {
                          if (publishStatus === "Approved") {
                            window.open(
                              `http://${document.location.host}/published-report/project/${scanData.scan_report.latest_report_id}`,
                              "_blank"
                            );
                          } else {
                            window.open(
                              `http://${document.location.host}/report/project/${projectId}/${scanData?.scan_report.latest_report_id}`,
                              "_blank"
                            );
                          }
                        }
                      }}
                    >
                      {reportingStatus === "generating_report" && (
                        <Spinner color="#806CCF" size="xs" mr={3} />
                      )}
                      {profile.actions_supported
                        ? !profile.actions_supported.generate_report
                        : profile.current_package !== "expired" &&
                          !plans.monthly[profile.current_package].report && (
                            <LockIcon color={"accent"} size="xs" mr={3} />
                          )}
                      {reportingStatus === "generating_report"
                        ? "Generating report..."
                        : scanData.scan_report.report_regeneration_enabled
                        ? "Re-generate Report"
                        : reportingStatus === "report_generated"
                        ? "View Report"
                        : reportingStatus === "not_generated"
                        ? "Generate Report"
                        : "Loading"}
                    </Button>
                  )}
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
                    overflow={["scroll", "scroll", "scroll", "visible"]}
                    flexDir={"row"}
                    justifyContent="flex-start"
                    align={"center"}
                    ml={[0, 0, 0, 5]}
                  >
                    <TabList
                      sx={{
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        borderColor: "border",
                        p: 4,
                      }}
                    >
                      <Tab minW={"150px"} bgColor={"#F5F5F5"}>
                        Overview
                      </Tab>
                      <Tab minW={"150px"} bgColor={"#F5F5F5"} ml={4}>
                        Detailed Result
                      </Tab>
                      <Tab minW={"150px"} bgColor={"#F5F5F5"} ml={4}>
                        Scan History
                      </Tab>
                      {profile.promo_code ? (
                        profile.actions_supported &&
                        profile.actions_supported.publishable_report && (
                          <Tab minW={"175px"} bgColor={"#F5F5F5"} mx={2}>
                            Published Reports
                          </Tab>
                        )
                      ) : (
                        <Tab minW={"175px"} bgColor={"#F5F5F5"} mx={2}>
                          Published Reports
                        </Tab>
                      )}
                    </TabList>
                  </Flex>
                  <TabPanels>
                    <TabPanel p={[0, 0, 0, 4]}>
                      {(scanData.scan_report.multi_file_scan_summary ||
                        scanData.scan_report.scan_summary) && (
                        <Overview
                          scansRemaining={scansRemaining}
                          scanData={scanData.scan_report}
                          onTabChange={handleTabsChange}
                        />
                      )}
                    </TabPanel>
                    <TabPanel p={[0, 0, 0, 4]}>
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
                          refetch={refetch}
                        />
                      ) : scanData.scan_report.scan_details &&
                        scanData.scan_report.scan_summary ? (
                        <Result
                          details_enabled={scanData.scan_report.details_enabled}
                          profileData={profile}
                          scanSummary={scanData.scan_report.scan_summary}
                          scanDetails={scanData.scan_report.scan_details}
                          type="project"
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
                    <TabPanel p={[0, 0, 0, 4]}>
                      <ScanHistory
                        profile={profile}
                        scans={scans}
                        setTabIndex={setTabIndex}
                      />
                    </TabPanel>
                    {profile.promo_code ? (
                      profile.actions_supported &&
                      profile.actions_supported.publishable_report && (
                        <TabPanel p={[0, 0, 0, 4]}>
                          <PublishedReports
                            type="project"
                            scan_report={scanData.scan_report}
                            reportList={reportList.reports}
                            profile={profile}
                          />
                        </TabPanel>
                      )
                    ) : (
                      <TabPanel p={[0, 0, 0, 4]}>
                        <PublishedReports
                          type="project"
                          scan_report={scanData.scan_report}
                          reportList={reportList.reports}
                          profile={profile}
                        />
                      </TabPanel>
                    )}
                  </TabPanels>
                  <></>
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
            backgroundImage="url('/background/pattern.png')"
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
                src="/common/publishreport.png"
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

interface Props {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ScanHistory: React.FC<{
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  profile: Profile;
  scans: ScanMeta[];
}> = ({ setTabIndex, profile, scans }) => {
  return (
    <Box
      sx={{
        w: "100%",
        borderRadius: "20px",
        p: 4,
      }}
    >
      {profile &&
        scans?.map((scan) => (
          <ScanBlock
            key={scan.scan_id}
            scan={scan}
            setTabIndex={setTabIndex}
            // isTrial={profile?.current_package === "trial"}
            profile={profile}
          />
        ))}
    </Box>
  );
};

const ScanBlock: React.FC<{
  scan: ScanMeta;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  profile: Profile;
}> = ({ scan, setTabIndex, profile }) => {
  const history = useHistory();
  return (
    <Flex
      alignItems="flex-start"
      justifyContent="space-between"
      flexDir={"row"}
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
        width={"calc(100% - 60px)"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
        alignItems={"flex-start"}
        flexDir="row"
      >
        <VStack mt={5} alignItems={"flex-start"} spacing={1} width="130px">
          <Text fontSize={"sm"} color="gray.400">
            Scan Name
          </Text>
          <Text fontSize={"md"}>{scan.scan_name}</Text>
        </VStack>
        {scan.scan_status === "scan_incomplete" ? (
          <Flex
            p={3}
            sx={{ bgColor: "high-subtle", borderRadius: "20px" }}
            mt={5}
            mr={10}
          >
            <ScanErrorIcon size={28} />
          </Flex>
        ) : (
          <VStack mt={5} alignItems={"flex-start"} spacing={1} width="120px">
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
              {scan.scan_score}
            </Text>
          </VStack>
        )}
        <Flex
          justifyContent={"flex-start"}
          alignItems="flex-start"
          flexDir={["column", "column", "row"]}
        >
          <Button
            variant="accent-outline"
            minW="200px"
            bg={"white"}
            mr={10}
            my={5}
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
            mr={10}
            mt={[0, 0, 5]}
            mb={5}
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
              <Spinner color="#806CCF" size="sm" mr={2} />
            )}
            {scan.reporting_status === "report_generated"
              ? "View Report"
              : scan.reporting_status === "generating_report"
              ? "Generating Report"
              : "Report Not Generated"}
          </Button>
        </Flex>
      </Flex>
      <Box
        sx={{
          width: "60px",
          height: "60px",
          my: 5,
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
  );
};

const IncompleteScan: React.FC<{ message: string; scansRemaining: number }> = ({
  message,
  scansRemaining,
}) => {
  return (
    <>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="border"
        borderRightWidth="0px"
        borderLeftWidth="0px"
      >
        <Flex w="97%" m={4} borderRadius="20px" bgColor="high-subtle" p={4}>
          <ScanErrorIcon size={28} />
          <Text color="high" ml={4}>
            {message}
          </Text>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      ></Flex>
    </>
  );
};
export default ProjectPage;

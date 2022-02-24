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
} from "@chakra-ui/react";
import {
  AiOutlineClockCircle,
  AiOutlineDownload,
  AiFillLock,
  AiOutlineProject,
} from "react-icons/ai";
import Overview from "components/overview";
import Result from "components/result";
import AdvancedScan from "components/advancedScan";
import { RescanIcon, LogoIcon, ScanErrorIcon } from "components/icons";
import { ErrorResponsivePie } from "components/pieChart";
import { ErrorVulnerabilityDistribution } from "components/vulnDistribution";

import API, { API_URL_DEV } from "helpers/api";

import { useScans } from "hooks/useScans";
import { useScan } from "hooks/useScan";

import { Report, ReportsListItem, ScanMeta } from "common/types";
import Score from "components/score";
import { useProfile } from "hooks/useProfile";
import {
  FaBuilding,
  FaCalendar,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarDay,
  FaEnvelope,
  FaFileCode,
  FaGithub,
  FaInternetExplorer,
  FaMailBulk,
  FaRegCalendarCheck,
  FaRegCopy,
} from "react-icons/fa";
import { useReport } from "hooks/useReport";
import { useReports } from "hooks/useReports";

export const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, refetch } = useScans(projectId);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const refetchTillScanComplete = () => {
      if (
        data &&
        data.scans.some(
          ({ reporting_status }) => reporting_status === "generating_report"
        )
      ) {
        intervalId = setInterval(async () => {
          await refetch();
          if (
            data &&
            data.scans.some(
              ({ reporting_status }) => reporting_status !== "generating_report"
            )
          ) {
            clearInterval(intervalId);
          }
        }, 10000);
      }
    };

    refetchTillScanComplete();
    return () => {
      clearInterval(intervalId);
    };
  }, [data, refetch]);

  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        my: 4,
        px: 8,
        py: 4,
        minH: "78vh",
      }}
    >
      {isLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        data && (
          <>
            <Flex
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                {data.project_name}
                <Link
                  fontSize="14px"
                  ml={3}
                  variant="subtle"
                  target="_blank"
                  href={data.project_url}
                >
                  {data.project_url}
                </Link>
              </Text>
              <Link
                as={RouterLink}
                to="/projects"
                variant="subtle-without-underline"
                fontSize="md"
              >
                ← back
              </Link>
            </Flex>
            <Switch>
              <Route exact path="/projects/:projectId/history">
                <ScanHistory />
              </Route>
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
  const { projectId, scanId } =
    useParams<{ projectId: string; scanId: string }>();
  const history = useHistory();
  const { data, isLoading, refetch } = useScan(scanId);

  const [tabIndex, setTabIndex] = React.useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }


  // data &&
  // const { data } = useReport(projectId, data?.scan_report.latest_report_id)

  const toast = useToast();

  const [next, setNext] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const refetchTillScanComplete = () => {
      if (
        data &&
        (data.scan_report.scan_status === "scanning" ||
          data.scan_report.reporting_status === "generating_report")
      ) {
        intervalId = setInterval(async () => {
          await refetch();
          if (data && data.scan_report.scan_status === "scan_done") {
            clearInterval(intervalId);
          }
        }, 1000);
      }
    };

    refetchTillScanComplete();
    return () => {
      clearInterval(intervalId);
    };
  }, [data, refetch]);

  const onClose = () => setIsOpen(false);

  const generateReport = async () => {
    const { data } = await API.post("/api-generate-report/", {
      project_id: projectId,
    });
    if (data.success) {
      await refetch();
    }
  };

  const rescan = async () => {
    setRescanLoading(true);
    const { data } = await API.post<{ scan_id: string }>("/api-project-scan/", {
      project_id: projectId,
      project_type: "existing",
    });
    setRescanLoading(false);
    queryClient.invalidateQueries(["scans", projectId]);
    onClose();
    history.push(`/projects/${projectId}/${data.scan_id}`);
  };

  const scan_name =
    data &&
    scans.find((scan) => scan.scan_id === data.scan_report.scan_id)?.scan_name;

  const reporting_status = data?.scan_report.reporting_status;


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

  const getReportData = async (project_id: string, report_id: string) => {
    const reportResponse = await API.post<{ summary_report: Report }>(
      "/api-get-beta-report/",
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

  useEffect(() => {
    if (data) {
      getReportData(projectId, data.scan_report.latest_report_id);
      setProjectName(data.scan_report.project_name);
      setRepoUrl(data.scan_report.project_url);
      const d = new Date();
      setDatePublished(
        `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`
      );
    }
  }, [data]);

  
  const reportId = data?.scan_report.latest_report_id;


  const publishReport = async () => {
    const { data } = await API.post("/api-publish-report/", {
      project_id: projectId,
      report_id: reportId,
      additional_details: {
        report_owner: {
          value: pubName,
          is_public: nameSwitch,
        },
        website: {
          value: pubWeb,
          is_public: webSwitch,
        },
        organization: {
          value: pubOrg,
          is_public: orgSwitch,
        },
        contact_email: {
          value: pubEmail,
          is_public: emailSwitch,
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
        {isLoading ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          data && (
            <>
              <Flex
                sx={{
                  justifyContent: ["flex-start", "flex-start", "space-between"],
                  alignItems: ["flex-start", "flex-start", "center"],
                  pb: 4,
                  px: 6,
                  borderBottom: "1px solid",
                  borderColor: "border",
                  flexDir: ["column", "column", "row"],
                }}
              >
                <HStack spacing={[8]} mb={[4, 4, 0]}>
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
                          data.scan_report.scan_status === "scanning"
                            ? 0.4
                            : 0.9,
                      }}
                      isDisabled={
                        scansRemaining === 0 ||
                        data.scan_report.scan_status === "scanning"
                      }
                    >
                      <Flex sx={{ flexDir: "column", alignItems: "center" }}>
                        <RescanIcon size={60} />
                      </Flex>
                    </Button>
                  </Tooltip>
                  <Text sx={{ fontSize: "xl", fontWeight: 600 }}>
                    {scan_name}
                    <Box
                      as="span"
                      ml={4}
                      sx={{
                        fontWeight: 600,
                        fontSize: "sm",
                        color: scansRemaining === 0 ? "high" : "subtle",
                      }}
                    >
                      {scansRemaining} scans remaining
                    </Box>
                  </Text>
                </HStack>
                <HStack
                  spacing={8}
                  alignSelf={["flex-end", "flex-end", "auto"]}
                >
                  {data.scan_report.reporting_status === "report_generated" && (
                    <Button
                      variant="accent-ghost"
                      onClick={() =>
                        // history.push(`/projects/${projectId}/history`)
                        setOpen(!open)
                      }
                    >
                      {/* <Icon as={AiOutlineClockCircle} mr={2} fontSize="17px" /> */}
                      Publish Report
                    </Button>
                  )}
                  {data.scan_report.scan_status !== "scanning" && (
                    <Button
                      variant={"accent-outline"}
                      isDisabled={reporting_status === "generating_report"}
                      onClick={() => {
                        if (reporting_status === "not_generated") {
                          generateReport();
                        } else if (reporting_status === "report_generated") {
                          window.open(
                            `http://${document.location.host}/report/${projectId}/${data?.scan_report.latest_report_id}`,
                            "_blank"
                          );
                        }
                      }}
                    >
                      {reporting_status === "generating_report" && (
                        <Spinner color="#806CCF" size="xs" mr={3} />
                      )}
                      {reporting_status === "not_generated"
                        ? "Generate Report"
                        : reporting_status === "generating_report"
                        ? "Generating report..."
                        : "View Report"}
                    </Button>
                  )}
                </HStack>
              </Flex>
              {data.scan_report.scan_status === "scan_incomplete" ? (
                <IncompleteScan
                  message={data.scan_report.scan_message}
                  scansRemaining={scansRemaining}
                />
              ) : data.scan_report.scan_status === "scanning" ? (
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
  <Tabs   index={tabIndex} onChange={handleTabsChange}
  variant="soft-rounded" colorScheme="green" isLazy>
                  <TabList
                    sx={{
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderColor: "border",
                      p: 4,
                    }}
                  >
                    <Tab mx={2}>Overview</Tab>
                    <Tab mx={2}>Detailed Result</Tab>
                    <Tab mx={2}>Scan History</Tab>
                    <Tab mx={2}>Published Reports</Tab>
                    {/* <Tab mx={2}>Advanced Scan(Beta)</Tab> */}
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {data.scan_report.scan_summary && (
                        <Overview
                          data={data.scan_report.scan_summary}
                          scansRemaining={scansRemaining}
                        />
                      )}
                    </TabPanel>
                    <TabPanel>
                      {
                        // profile.current_package === "trial" ? (
                        //   <TrialWall />
                        // ) : (
                        data.scan_report.scan_details &&
                          data.scan_report.scan_summary && (
                            <Result
                              scanSummary={data.scan_report.scan_summary}
                              scanDetails={data.scan_report.scan_details}
                              type="project"
                            />
                          )
                        // )
                      }
                    </TabPanel>
                    <TabPanel>
                      <ScanHistory />
                    </TabPanel>
                    <TabPanel>
                      <PublishedReports />
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
          h={"500px"}
          minH={"fit-content"}
          maxW="container.md"
        >
          <ModalHeader>Publish Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!next && (
              <>
                <HStack
                  alignItems="center"
                  spacing={3}
                  mt={4}
                  mb={4}
                  fontSize="14px"
                >
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={AiOutlineProject} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      type="text"
                      placeholder="Project name "
                      variant="brand"
                      size="lg"
                      value={projectName}
                      onChange={(e) => {
                        setProjectName(e.target.value);
                      }}
                    />
                  </InputGroup>
                </HStack>
                <HStack alignItems="center" spacing={3} mb={4} fontSize="14px">
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaFileCode} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      type="url"
                      placeholder="Link to the repository"
                      variant="brand"
                      size="lg"
                      value={repoUrl}
                      onChange={(e) => {
                        setRepoUrl(e.target.value);
                      }}
                    />
                  </InputGroup>
                </HStack>

                <HStack alignItems="center" spacing={3} mb={4} fontSize="14px">
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaGithub} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      type="text"
                      placeholder="Git commit hash"
                      variant="brand"
                      size="lg"
                      value={commitHash}
                      onChange={(e) => {
                        setCommitHash(e.target.value);
                      }}
                    />
                  </InputGroup>
                </HStack>

                <HStack alignItems="center" spacing={3} mb={4} fontSize="14px">
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaCalendarAlt} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      type="text"
                      placeholder="Latest Report Update Time"
                      variant="brand"
                      size="lg"
                      value={lastTimeUpdate}
                      onChange={(e) => {
                        setLastTimeUpdate(e.target.value);
                      }}
                    />
                  </InputGroup>
                </HStack>

                <HStack alignItems="center" spacing={3} fontSize="14px">
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={
                        <Icon as={FaRegCalendarCheck} color="gray.300" />
                      }
                    />
                    <Input
                      isRequired
                      type="text"
                      placeholder="Date Published"
                      variant="brand"
                      size="lg"
                      value={datePublished}
                      onChange={(e) => {
                        setDatePublished(e.target.value);
                      }}
                    />
                  </InputGroup>
                </HStack>
              </>
            )}
            {next && (
              <>
                <HStack
                  alignItems="center"
                  spacing={3}
                  mt={4}
                  mb={4}
                  fontSize="14px"
                >
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={AiOutlineProject} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      type="text"
                      placeholder="Publisher's name"
                      variant="brand"
                      size="lg"
                      value={pubName}
                      onChange={(e) => {
                        setPubName(e.target.value);
                      }}
                    />
                  </InputGroup>
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
                </HStack>
                <HStack alignItems="center" spacing={3} mb={4} fontSize="14px">
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaEnvelope} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      type="email"
                      placeholder="Publisher's Email"
                      variant="brand"
                      size="lg"
                      value={pubEmail}
                      onChange={(e) => {
                        setPubEmail(e.target.value);
                      }}
                    />
                  </InputGroup>
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
                </HStack>

                <HStack alignItems="center" spacing={3} mb={4} fontSize="14px">
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
                      variant="brand"
                      size="lg"
                      value={pubWeb}
                      onChange={(e) => {
                        setPubWeb(e.target.value);
                      }}
                    />
                  </InputGroup>
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
                </HStack>
                <HStack alignItems="center" spacing={3} fontSize="14px">
                  <InputGroup alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaBuilding} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      type="text"
                      placeholder="Publisher's Organization"
                      variant="brand"
                      size="lg"
                      value={pubOrg}
                      onChange={(e) => {
                        setPubOrg(e.target.value);
                      }}
                    />
                  </InputGroup>
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
                </HStack>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {next && (
              <Button
                w={"100px"}
                variant={"ghost"}
                mr={3}
                onClick={() => {
                  setNext(false);
                }}
              >
                Back
              </Button>
            )}
            <Button
              w={"100px"}
              variant={"brand"}
              mr={3}
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



const ScanHistory: React.FC = () => {
  const { data: profile } = useProfile();

  const { projectId } = useParams<{ projectId: string }>();
  const { data } = useScans(projectId);

  const scans = data?.scans;

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
            // isTrial={profile?.current_package === "trial"}
            isTrial={false}
          />
        ))}
    </Box>
  );
};

const PublishedReports: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data } = useReports(projectId);

  return (
    <Box
      sx={{
        w: "100%",
        borderRadius: "20px",
        p: 4,
      }}
    >
      {data && data?.reports.map((report) => <ReportBlock report={report} />)}
    </Box>
  );
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ScanBlock: React.FC<{ scan: ScanMeta; isTrial: boolean }> = ({
  scan,
  isTrial,
}) => {
  const [isDownloadLoading, setDownloadLoading] = useState(false);
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isLoading, refetch } = useScan(scan.scan_id);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      sx={{
        cursor: "pointer",
        w: "100%",
        bg: "white",
        my: 4,
        p: 4,
        px: 10,
        borderRadius: "5px",
        transition: "0.3s box-shadow",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        _hover: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => history.push(`/projects/${projectId}/${scan.scan_id}`)}
    >
      <Flex alignItems="center">
        <Box
          sx={{
            width: "60px",
            height: "60px",
            p: 2,
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
        <Text fontSize="xl" mx={16}>
          {scan.scan_name}
        </Text>
        {scan.scan_status === "scan_incomplete" ? (
          <Flex
            p={3}
            sx={{ bgColor: "high-subtle", borderRadius: "20px" }}
            ml={3}
          >
            <ScanErrorIcon size={28} />
          </Flex>
        ) : (
          <Score score={scan.scan_score} />
        )}
      </Flex>
      <Button
        variant="accent-outline"
        isDisabled={scan.reporting_status !== "report_generated" || isTrial}
        isLoading={isDownloadLoading}
        onClick={(e) => {
          e.stopPropagation();
          window.open(
            `http://${document.location.host}/report/${projectId}/${data?.scan_report.latest_report_id}`,
            "_blank"
          );
          // history.push(`/report/${scan.project_id}/${data?.scan_report.latest_report_id}`)
        }}
      >
        {scan.reporting_status === "report_generated"
          ? "View Report"
          : "Report Not Generated"}
        {scan.reporting_status === "generating_report" && (
          <Spinner color="#806CCF" size="sm" ml={2} />
        )}
      </Button>
    </Flex>
  );
};

const ReportBlock: React.FC<{ report: ReportsListItem }> = ({ report }) => {
  const [isDownloadLoading, setDownloadLoading] = useState(false);
  const history = useHistory();

  const toast = useToast();

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      sx={{
        cursor: "pointer",
        w: "100%",
        bg: "white",
        my: 4,
        p: 2,
        px: 10,
        borderRadius: "10px",
        transition: "0.3s box-shadow",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        _hover: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => history.push(``)}
    >
      <Flex alignItems="center">
        <Box
          sx={{
            width: "60px",
            height: "60px",
            p: 2,
            bg: "#F7F7F7",
            color: "#4E5D78",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          <Text fontSize="xl" fontWeight="600">
            {report.date_published.slice(0, 2)}
          </Text>
          <Text fontSize="12px" mt="-4px">
            {report.date_published.slice(3, 6)}
          </Text>
        </Box>

        <Badge
          fontSize="sm"
          ml={5}
          p={2}
          borderRadius={10}
          colorScheme={report.is_approved ? "green" : "red"}
        >
          {report.is_approved ? "Approved" : "Waiting for Approval"}
        </Badge>
      </Flex>
      <Flex alignItems="center">
        <Button
          variant="accent-outline"
          isLoading={isDownloadLoading}
          onClick={(e) => {
            e.stopPropagation();
            console.log('asdkbkalsd');
            navigator.clipboard
              .writeText(
                `http://${document.location.host}/published-report/${report.report_id}`
              )
              .then(
                () =>
                  toast({
                    title: "Copied Report URL",
                    description:"",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  }),
                () =>
                  toast({
                    title: "Could not Copy Report URL",
                    description: "",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  })
              );
          }}
        >
          <FaRegCopy style={{ marginRight: "1rem" }} />
          Copy Report URL
        </Button>
        <Button
          variant="accent-outline"
          ml={5}
          isLoading={isDownloadLoading}
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              `http://${document.location.host}/report/${report.project_id}/${report.report_id}`,
              "_blank"
            );
            // history.push(`/report/${scan.project_id}/${data?.scan_report.latest_report_id}`)
          }}
        >
          View Report
        </Button>
      </Flex>
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
      <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }}>
        <VStack w={["100%", "100%", "50%"]} mb={[8, 8, 0]}>
          <Box w={["100%", "100%", "70%"]} h="300px">
            <ErrorResponsivePie />
          </Box>
          <Box w={["70%", "70%", "60%"]}>
            <ErrorVulnerabilityDistribution />
          </Box>
        </VStack>
        <VStack
          w={["100%", "100%", "50%"]}
          alignItems="flex-start"
          p={8}
          spacing={5}
        >
          <HStack w="100%" justifyContent="space-between">
            {scansRemaining && (
              <Flex px={2}>
                <LogoIcon size={40} />
                <Box ml={2} mt="-4px">
                  <Text>
                    {scansRemaining.toLocaleString("en-US", {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </Text>
                  <Text fontSize="12px" color="subtle">
                    Scans left
                  </Text>
                </Box>
              </Flex>
            )}
          </HStack>
          <Box sx={{ w: "100%", borderRadius: 15, bg: "bg.subtle", p: 4 }}>
            <Text sx={{ fontSize: "sm", letterSpacing: "0.7px" }}>
              SCAN STATISTICS
            </Text>
          </Box>

          <VStack w="100%" px={4} spacing={8} fontSize="sm">
            <HStack w="100%" justifyContent="space-between">
              <Text>Status</Text>
              <Text
                sx={{
                  color: "high",
                  bg: "high-subtle",
                  px: 3,
                  py: 1,
                  borderRadius: 20,
                }}
              >
                Error
              </Text>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text>Score</Text>
              <Text color="subtle">--</Text>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text>Issue Count</Text>
              <Text color="subtle">--</Text>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text>Duration</Text>
              <Text color="subtle">--</Text>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text>Lines of code</Text>
              <Text color="subtle">--</Text>
            </HStack>
          </VStack>
        </VStack>
      </Flex>
    </>
  );
};
export default ProjectPage;

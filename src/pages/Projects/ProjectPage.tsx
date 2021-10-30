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
} from "@chakra-ui/react";

import { AiOutlineClockCircle, AiOutlineDownload } from "react-icons/ai";
import Overview from "components/overview";
import Result from "components/result";
import AdvancedScan from "components/advancedScan";
import { RescanIcon, LogoIcon, ScanErrorIcon } from "components/icons";
import { ErrorResponsivePie } from "components/pieChart";
import { ErrorVulnerabilityDistribution } from "components/vulnDistribution";

import API from "helpers/api";

import { useScans } from "hooks/useScans";
import { useScan } from "hooks/useScan";

import { ScanMeta } from "common/types";
import Score from "components/score";

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
        minH: "80vh",
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
                <ScanHistory scans={data.scans} />
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
  const [isDownloadLoading, setDownloadLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const { projectId, scanId } =
    useParams<{ projectId: string; scanId: string }>();
  const history = useHistory();
  const { data, isLoading, refetch } = useScan(scanId);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const refetchTillScanComplete = () => {
      if (data && data.scan_report.scan_status === "scanning") {
        intervalId = setInterval(async () => {
          await refetch();
          if (data && data.scan_report.scan_status === "scan_done") {
            clearInterval(intervalId);
          }
        }, 3000);
      }
    };

    refetchTillScanComplete();
    return () => {
      clearInterval(intervalId);
    };
  }, [data, refetch]);

  const onClose = () => setIsOpen(false);

  const downloadReport = async () => {
    setDownloadLoading(true);
    const { data } = await API.post(
      "/api-get-report/",
      {
        scan_id: scanId,
      },
      { responseType: "blob" }
    );
    FileDownload(
      new Blob([data], { type: "application/pdf" }),
      `${scanId}.pdf`
    );
    setDownloadLoading(false);
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

  // const scan_message =
  //   data &&
  //   scans.find((scan) => scan.scan_id === data.scan_report.scan_id)
  //     ?.scan_message;

  const reporting_status =
    data &&
    scans.find((scan) => scan.scan_id === data.scan_report.scan_id)
      ?.reporting_status;

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
                  <Button
                    variant="accent-ghost"
                    onClick={() =>
                      history.push(`/projects/${projectId}/history`)
                    }
                  >
                    <Icon as={AiOutlineClockCircle} mr={2} fontSize="17px" />
                    Scan History
                  </Button>
                  <Button
                    variant="accent-outline"
                    isDisabled={reporting_status !== "generated"}
                    onClick={downloadReport}
                    isLoading={isDownloadLoading}
                  >
                    {reporting_status === "generated" ? (
                      <Icon
                        as={AiOutlineDownload}
                        mr={2}
                        fontSize="17px"
                        color="#806CCF"
                      />
                    ) : (
                      <Spinner color="#806CCF" size="xs" mr={3} />
                    )}
                    {reporting_status === "generated"
                      ? "Export report"
                      : "Generating report..."}
                  </Button>
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
                <Tabs variant="soft-rounded" colorScheme="green" isLazy>
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
                    <Tab mx={2}>Advanced Scan(Beta)</Tab>
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
                      {data.scan_report.scan_details &&
                        data.scan_report.scan_summary && (
                          <Result
                            scanSummary={data.scan_report.scan_summary}
                            scanDetails={data.scan_report.scan_details}
                            type="project"
                          />
                        )}
                    </TabPanel>
                    <TabPanel>
                      <AdvancedScan scanId={scanId} />
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
    </>
  );
};

const ScanHistory: React.FC<{ scans: ScanMeta[] }> = ({ scans }) => {
  return (
    <Box
      sx={{
        w: "100%",
        borderRadius: "20px",
        my: 4,
        p: 4,
      }}
    >
      <Text sx={{ fontSize: "xl", mb: 4 }}>Scan History</Text>
      {scans.map((scan) => (
        <ScanBlock key={scan.scan_id} scan={scan} />
      ))}
    </Box>
  );
};

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

const ScanBlock: React.FC<{ scan: ScanMeta }> = ({ scan }) => {
  const [isDownloadLoading, setDownloadLoading] = useState(false);
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();
  const downloadReport = async (scan_id: string) => {
    setDownloadLoading(true);
    const { data } = await API.post(
      "/api-get-report/",
      {
        scan_id,
      },
      { responseType: "blob" }
    );
    FileDownload(
      new Blob([data], { type: "application/pdf" }),
      `${scan_id}.pdf`
    );
    setDownloadLoading(false);
  };
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
        isDisabled={scan.reporting_status !== "generated"}
        isLoading={isDownloadLoading}
        onClick={(e) => {
          e.stopPropagation();
          downloadReport(scan.scan_id);
        }}
      >
        {scan.reporting_status === "generated" ? "PDF" : "Generating PDF..."}
        {scan.reporting_status === "generated" ? (
          <Icon as={AiOutlineDownload} ml={2} fontSize="17px" color="#806CCF" />
        ) : (
          <Spinner color="#806CCF" size="sm" ml={2} />
        )}
      </Button>
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

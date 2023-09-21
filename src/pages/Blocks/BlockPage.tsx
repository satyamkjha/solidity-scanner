import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionButton,
  AccordionItem,
  VStack,
  Image,
  HStack,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch as SwitchComp,
  useToast,
  Stack,
  useMediaQuery,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Overview from "components/overview";
import MultifileResult from "components/detailedResult/MultifileResult";
import { CheckCircleIcon, LockIcon, TimeIcon } from "@chakra-ui/icons";
import { useScan } from "hooks/useScan";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useProfile } from "hooks/useProfile";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { FaEnvelope, FaInternetExplorer, FaBuilding } from "react-icons/fa";
import API from "helpers/api";
import { Report, ReportsListItem } from "common/types";
import { useReports } from "hooks/useReports";
import { ScanErrorIcon } from "components/icons";
import ContractDetails from "components/contractDetails";
import PublishedReports from "components/publishedReports";
import { usePricingPlans } from "hooks/usePricingPlans";
import { API_PATH } from "helpers/routeManager";
import { getPublicReport } from "hooks/usePublicReport";
import { useReactToPrint } from "react-to-print";
import { PrintContainer } from "pages/Report/PrintContainer";
import {
  getAssetsURL,
  checkPublishReportAccess,
  checkGenerateReportAccess,
} from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import Loader from "components/styled-components/Loader";
import { formattedDate } from "common/functions";
import { useUserRole } from "hooks/useUserRole";
import { PublishReport } from "components/modals/report/PublishReport";

const BlockPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const role: string = useUserRole();
  const { data: scanData, isLoading, refetch } = useScan(scanId);

  const [reportingStatus, setReportingStatus] = useState<string>("");
  const [publishStatus, setPublishStatus] = useState("");

  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: reportList, refetch: refetchReportList } = useReports(
    "block",
    scanData?.scan_report.project_id
  );
  const toast = useToast();

  const { data: plans } = usePricingPlans();
  const [next, setNext] = useState(false);
  const [open, setOpen] = useState(false);

  const [pubName, setPubName] = useState("");
  const [nameSwitch, setNameSwitch] = useState(true);
  const [pubOrg, setPubOrg] = useState("");
  const [orgSwitch, setOrgSwitch] = useState(true);
  const [pubWeb, setPubWeb] = useState("");
  const [webSwitch, setWebSwitch] = useState(true);
  const [pubEmail, setPubEmail] = useState("");
  const [emailSwitch, setEmailSwitch] = useState(true);
  const [lastTimeUpdate, setLastTimeUpdate] = useState("");
  const [datePublished, setDatePublished] = useState("");

  const [publishInfoSwitch, setPublishInfoSwitch] = useState(true);

  const [tabIndex, setTabIndex] = React.useState(0);
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  useEffect(() => {
    if (scanData) {
      setReportingStatus(scanData.scan_report.reporting_status);
    }
  }, [scanData]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const generateReport = async (scanId: string, projectId: string) => {
    setReportingStatus("generating_report");
    const { data } = await API.post(API_PATH.API_GENERATE_REPORT, {
      project_id: projectId,
      scan_id: scanId,
      scan_type: "block",
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

  const publishReport = async () => {
    const { data } = await API.post(API_PATH.API_PUBLISH_REPORT, {
      project_type: "block",
      project_id: scanData?.scan_report.project_id,
      report_id: scanData?.scan_report.latest_report_id,
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
    if (scanData) {
      checkReportPublished(
        scanData.scan_report.project_id,
        scanData.scan_report.latest_report_id
      );
    }
    refetchReportList();
  };

  const getReportData = async (project_id: string, report_id: string) => {
    const reportResponse = await API.post<{ summary_report: Report }>(
      API_PATH.API_GET_REPORT,
      {
        project_id,
        report_id,
      }
    );
    const d = new Date(
      reportResponse.data.summary_report.project_summary_report.last_project_report_update_time
    );
    setLastTimeUpdate(formattedDate(d, "long"));
  };

  const checkReportPublished = async (
    project_id: string,
    report_id: string
  ) => {
    const reportResponse = await API.post<{ reports: ReportsListItem[] }>(
      API_PATH.API_GET_REPORTS,
      {
        project_type: "block",
        project_id,
        report_id,
      }
    );
    if (reportResponse.data.reports.length === 0) {
      setPublishStatus("Not-Published");
      return;
    }
    if (reportResponse.data.reports[0].report_type === "self_published") {
      setPublishStatus("Self-Published");
    } else if (reportResponse.data.reports[0].is_approved)
      setPublishStatus("Approved");
    else setPublishStatus("Waiting For Approval");
    return;
  };

  useEffect(() => {
    if (scanData) {
      if (scanData.scan_report.reporting_status === "report_generated") {
        setReportingStatus(scanData.scan_report.reporting_status);
        getReportData(
          scanData.scan_report.project_id,
          scanData.scan_report.latest_report_id
        );
        checkReportPublished(
          scanData.scan_report.project_id,
          scanData.scan_report.latest_report_id
        );
        const d = new Date();
        setDatePublished(formattedDate(d, "long"));
      } else {
        setPublishStatus("Not-Generated");
      }
    }
  }, [scanData]);

  const [summaryReport, setSummaryReport] = useState<Report | null>(null);
  const [printLoading, setPrintLoading] = useState<boolean>(false);
  const componentRef = useRef();

  const generatePDF = async () => {
    setPrintLoading(true);
    const publishReportData = await getPublicReport(
      "block",
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryReport]);

  const checkIfGeneratingReport = () => {
    if (profile && plans) {
      if (reportingStatus === "generating_report") return true;

      return !checkGenerateReportAccess(profile, plans, role);
    }
    return true;
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
      {isLoading || isProfileLoading || !plans ? (
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
              w="100%"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Accordion allowMultiple w={["100%", "100%", "100%", "90%"]}>
                <AccordionItem
                  borderTopWidth={0}
                  borderBottomWidth={"0 !important"}
                >
                  {({ isExpanded }) => (
                    <>
                      <HStack
                        w="100%"
                        display={["flex", "flex", "flex", "none"]}
                        justifyContent="space-between"
                        px={3}
                        mb={3}
                      >
                        <VStack alignItems={"flex-start"}>
                          <HStack justifyContent="flex-start">
                            <Image
                              src={`${assetsURL}blockscan/${scanData.scan_report.contract_platform}.svg`}
                              alt="Product screenshot"
                              h={"20px"}
                              w={"20px"}
                            />
                            <Text
                              isTruncated
                              width={"80%"}
                              sx={{
                                fontSize: "xl",
                                fontWeight: 600,
                                mx: 2,
                                maxW: "250px",
                              }}
                            >
                              {scanData.scan_report.contractname
                                ? scanData.scan_report.contractname
                                : scanData.scan_report.contract_address}
                            </Text>
                          </HStack>
                          <Text
                            fontSize={["12px", "12px", "12px", "14px"]}
                            color="gray.500"
                          >
                            {scanData.scan_report?.contract_address}
                          </Text>
                        </VStack>
                        <AccordionButton
                          width={"fit-content"}
                          borderRadius="48px"
                          display={["flex", "flex", "flex", "none"]}
                        >
                          {isExpanded ? (
                            <BiChevronUpCircle size={20} />
                          ) : (
                            <BiChevronDownCircle size={20} />
                          )}
                        </AccordionButton>
                      </HStack>
                      <ContractDetails scanData={scanData} />
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Flex>
            <Box
              sx={{
                w: "100%",
                bg: "white",
                borderRadius: "20px",
              }}
            >
              <Accordion allowMultiple borderBottomWidth={0}>
                <AccordionItem borderTopWidth={0} style={{}}>
                  {({ isExpanded }) => (
                    <>
                      <Flex
                        flexDirection={"row"}
                        justifyContent="space-between"
                        alignItems={"center"}
                        width={"100%"}
                        height="fit-content"
                        py={3}
                        px={4}
                      >
                        <VStack
                          display={["none", "none", "none", "block"]}
                          alignItems={"flex-start"}
                          ml={2}
                        >
                          <HStack justifyContent="flex-start">
                            <Image
                              src={`${assetsURL}blockscan/${scanData.scan_report.contract_platform}.svg`}
                              alt="Product screenshot"
                              h={"20px"}
                              w={"20px"}
                            />
                            <Text
                              isTruncated
                              width={"80%"}
                              sx={{
                                fontSize: "xl",
                                fontWeight: 600,
                                mx: 2,
                                maxW: "250px",
                              }}
                            >
                              {scanData.scan_report.contractname
                                ? scanData.scan_report.contractname
                                : scanData.scan_report.contract_address}
                            </Text>
                          </HStack>
                          <Text
                            fontSize={["12px", "12px", "12px", "14px"]}
                            color="gray.500"
                          >
                            {scanData.scan_report?.contract_address}
                          </Text>
                        </VStack>
                        <Flex
                          as={"div"}
                          flexDirection={[
                            "column-reverse",
                            "column-reverse",
                            "column-reverse",
                            "row",
                          ]}
                          justifyContent={[
                            "center",
                            "center",
                            "center",
                            "flex-end",
                          ]}
                          alignItems={"center"}
                          width={["100%", "100%", "100%", "fit-content"]}
                          height="fit-content"
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
                                mx={["auto", "auto", "auto", "0"]}
                                mr={["auto", "auto", "auto", 5]}
                                isDisabled={
                                  !checkPublishReportAccess(
                                    profile,
                                    plans,
                                    role
                                  )
                                }
                                onClick={() => setOpen(!open)}
                              >
                                {!checkPublishReportAccess(
                                  profile,
                                  plans,
                                  role
                                ) && (
                                  <LockIcon color={"accent"} size="xs" mr={3} />
                                )}
                                Publish Report
                              </Button>
                            ) : (
                              <HStack my={[4, 4, 4, 0]}>
                                {publishStatus === "Approved" ? (
                                  <CheckCircleIcon color={"#03C04A"} />
                                ) : publishStatus === "Self-Published" ? (
                                  <Image
                                    width="25px"
                                    height="25px"
                                    src={`${assetsURL}report/user.svg`}
                                  />
                                ) : (
                                  <TimeIcon color={"#FF5C00"} />
                                )}
                                <Text
                                  color={
                                    publishStatus === "Approved"
                                      ? "#03C04A"
                                      : publishStatus === "Self-Published"
                                      ? "black"
                                      : "#FF5C00"
                                  }
                                  sx={{
                                    fontSize: "md",
                                    fontWeight: 600,
                                    ml: 2,
                                  }}
                                >
                                  {publishStatus}
                                </Text>
                              </HStack>
                            ))}
                          {scanData.scan_report.scan_status === "scan_done" &&
                            reportingStatus !== "" &&
                            publishStatus !== "" &&
                            (scanData.scan_report
                              .report_regeneration_enabled ? (
                              <Button
                                variant={"accent-outline"}
                                w={["80%", "80%", "50%", "auto"]}
                                mx={["auto", "auto", "auto", 4]}
                                mb={[4, 4, 4, 0]}
                                onClick={() => {
                                  generateReport(
                                    scanData.scan_report.scan_id,
                                    scanData.scan_report.project_id
                                  );
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
                            ) : publishStatus === "Approved" ||
                              publishStatus === "Self-Published" ? (
                              <HStack
                                borderRadius={"15px"}
                                backgroundColor={"#F5F2FF"}
                                pl={7}
                                pr={3}
                                py={1}
                                ml={5}
                                border="1px solid #806CCF"
                              >
                                <Text
                                  color="#3E15F4"
                                  cursor={"pointer"}
                                  onClick={() => {
                                    window.open(
                                      `http://${document.location.host}/published-report/block/${scanData.scan_report.latest_report_id}`,
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
                                <Menu>
                                  <MenuButton
                                    as={Button}
                                    aria-label="Options"
                                    variant="unstyled"
                                  >
                                    {printLoading ? (
                                      <Loader
                                        size={20}
                                        color="#3E15F4"
                                        py={2}
                                      />
                                    ) : (
                                      <ArrowDownIcon color="#3E15F4" />
                                    )}
                                  </MenuButton>
                                  <MenuList>
                                    <MenuItem onClick={() => generatePDF()}>
                                      Download PDF
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                                {summaryReport && printLoading && (
                                  <Box
                                    w={0}
                                    h={0}
                                    visibility={"hidden"}
                                    position="absolute"
                                  >
                                    {" "}
                                    <Box w="100vw" ref={componentRef}>
                                      <PrintContainer
                                        summary_report={summaryReport}
                                      />
                                    </Box>
                                  </Box>
                                )}
                              </HStack>
                            ) : (
                              <Button
                                variant={"accent-outline"}
                                w={["80%", "80%", "50%", "auto"]}
                                mx={["auto", "auto", "auto", 5]}
                                mb={[4, 4, 4, 0]}
                                isDisabled={checkIfGeneratingReport()}
                                onClick={() => {
                                  if (
                                    reportingStatus === "not_generated" ||
                                    scanData.scan_report
                                      .report_regeneration_enabled
                                  ) {
                                    generateReport(
                                      scanData.scan_report.scan_id,
                                      scanData.scan_report.project_id
                                    );
                                  } else if (
                                    reportingStatus === "report_generated"
                                  ) {
                                    window.open(
                                      `http://${document.location.host}/report/block/${scanData.scan_report.project_id}/${scanData.scan_report.latest_report_id}`,
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
                                {!checkGenerateReportAccess(
                                  profile,
                                  plans,
                                  role
                                ) && <LockIcon color={"accent"} mr={3} />}
                                {reportingStatus === "generating_report"
                                  ? "Generating report..."
                                  : reportingStatus === "not_generated"
                                  ? "Generate Report"
                                  : scanData.scan_report
                                      .report_regeneration_enabled
                                  ? "Re-generate Report"
                                  : reportingStatus === "report_generated"
                                  ? "View Report"
                                  : "Loading"}
                              </Button>
                            ))}
                          <AccordionButton
                            width={"fit-content"}
                            borderRadius="48px"
                            display={["none", "none", "none", "flex"]}
                          >
                            {isExpanded ? (
                              <BiChevronUpCircle size={20} />
                            ) : (
                              <BiChevronDownCircle size={20} />
                            )}
                          </AccordionButton>
                        </Flex>
                      </Flex>
                      <ContractDetails scanData={scanData} />
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Flex
                w={"100%"}
                sx={{
                  flexDir: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Tabs
                  index={tabIndex}
                  onChange={handleTabsChange}
                  w={"100%"}
                  variant="soft-rounded"
                  colorScheme="green"
                  isLazy
                >
                  <Flex
                    width={"100%"}
                    overflow={["scroll", "scroll", "scroll", "visible"]}
                    flexDir={"row"}
                    justifyContent="flex-start"
                    align={"center"}
                    ml={0}
                  >
                    <TabList
                      sx={{
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        borderColor: "border",
                        p: 3,
                        w: "100%",
                      }}
                      zIndex={0}
                    >
                      <Tab
                        fontSize={"sm"}
                        h="35px"
                        minW={"150px"}
                        bgColor={"#F5F5F5"}
                      >
                        Overview
                      </Tab>
                      <Tab
                        fontSize={"sm"}
                        h="35px"
                        minW={"150px"}
                        bgColor={"#F5F5F5"}
                        whiteSpace="nowrap"
                        ml={4}
                      >
                        Detailed Result
                      </Tab>
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
                    </TabList>
                  </Flex>
                  <TabPanels>
                    <TabPanel p={[0, 0, 0, 2]}>
                      {(scanData.scan_report.multi_file_scan_summary ||
                        scanData.scan_report.scan_summary) && (
                        <Overview
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
                          profileData={profile}
                          details_enabled={scanData.scan_report.details_enabled}
                          type={"block"}
                          is_latest_scan={scanData.is_latest_scan}
                          scanSummary={
                            scanData.scan_report.multi_file_scan_summary
                          }
                          scanDetails={
                            scanData.scan_report.multi_file_scan_details
                          }
                          refetch={refetch}
                          project_url={""}
                          contract_url={scanData?.scan_report.contract_url}
                          contract_platform={
                            scanData?.scan_report.contract_platform
                          }
                          contract_address={
                            scanData?.scan_report.contract_address
                          }
                          branchName={""}
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
                    {profile.promo_code ? (
                      profile.actions_supported &&
                      profile.actions_supported.publishable_report && (
                        <TabPanel p={[0, 0, 0, 2]}>
                          <PublishedReports
                            type="block"
                            reportList={reportList.reports}
                            profile={profile}
                            scan_report={scanData.scan_report}
                          />
                        </TabPanel>
                      )
                    ) : (
                      <TabPanel p={[0, 0, 0, 2]}>
                        <PublishedReports
                          type="block"
                          reportList={reportList.reports}
                          profile={profile}
                          scan_report={scanData.scan_report}
                        />
                      </TabPanel>
                    )}
                  </TabPanels>
                </Tabs>
              </Flex>
            </Box>
          </>
        )
      )}

      {scanData && profile && plans && open ? (
        <PublishReport
          type={"block"}
          scanData={scanData}
          projectId={scanData.scan_report.project_id}
          profile={profile}
          plans={plans}
          lastTimeUpdate={lastTimeUpdate}
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </Box>
  );
};

export default BlockPage;

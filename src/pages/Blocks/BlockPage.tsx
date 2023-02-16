import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";

import {
  Flex,
  Box,
  Text,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  Badge,
  border,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import Overview from "components/overview";
import Result, { MultifileResult } from "components/result";
import {
  AddIcon,
  CheckCircleIcon,
  LockIcon,
  MinusIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { useScan } from "hooks/useScan";
import { useProfile } from "hooks/useProfile";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import {
  FaFileCode,
  FaGithub,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaEnvelope,
  FaInternetExplorer,
  FaBuilding,
  FaRegCopy,
} from "react-icons/fa";
import API from "helpers/api";
import { Report, ReportsListItem, Scan } from "common/types";
import { useReports } from "hooks/useReports";
import { ScanErrorIcon } from "components/icons";
import { monthNames } from "common/values";
import ContractDetails from "components/contractDetails";
import PublishedReports from "components/publishedReports";
import { usePricingPlans } from "hooks/usePricingPlans";
import { API_PATH } from "helpers/routeManager";

const BlockPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();

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

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;
  //   const refetchTillScanComplete = () => {
  //     intervalId = setInterval(async () => {
  //       await refetch().then((res) => {
  //         if (res.data) {
  //           setReportingStatus(res.data?.scan_report.reporting_status);
  //         }
  //       });
  //     }, 5000);
  //   };
  //   refetchTillScanComplete();
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

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
      API_PATH.API_GET_REPORT_BETA,
      {
        project_id,
        report_id,
      }
    );
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
        project_type: "block",
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
      getReportData(
        scanData.scan_report.project_id,
        scanData.scan_report.latest_report_id
      );
      checkReportPublished(
        scanData.scan_report.project_id,
        scanData.scan_report.latest_report_id
      );
      const d = new Date();
      setDatePublished(
        `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`
      );
    }
  }, [scanData]);

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
      px={[4, 4, 8]}
    >
      {isLoading || isProfileLoading || !plans ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        scanData &&
        profile &&
        plans &&
        reportList && (
          <>
            {" "}
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
                      <VStack align={"left"} spacing={0} w="100%">
                        <HStack
                          w="100%"
                          display={["flex", "flex", "flex", "none"]}
                        >
                          <Image
                            src={`/blockscan/${scanData.scan_report.contract_platform}-scan.svg`}
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
                          <AccordionButton
                            width={"fit-content"}
                            borderRadius="48px"
                            display={["flex", "flex", "flex", "none"]}
                          >
                            {isExpanded ? (
                              <BiChevronUpCircle />
                            ) : (
                              <BiChevronDownCircle />
                            )}
                          </AccordionButton>
                        </HStack>
                        <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                          <Text
                            as="span"
                            fontSize={["12px", "12px", "12px", "14px"]}
                            ml={[0, 0, 0, 3]}
                            color="gray.500"
                          >
                            {scanData.scan_report?.contract_address}
                          </Text>
                        </Text>
                      </VStack>
                      <ContractDetails scanData={scanData} />
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Link
                as={RouterLink}
                to="/blocks"
                variant="subtle-without-underline"
                fontSize="md"
                display={["none", "none", "none", "block"]}
              >
                ← back
              </Link>
            </Flex>
            <Box
              sx={{
                w: "100%",
                bg: "white",
                borderRadius: "20px",
                my: 4,
                py: 4,
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
                        pt={2}
                        pb={5}
                        px={4}
                      >
                        <Text
                          isTruncated
                          display={["none", "none", "none", "block"]}
                          sx={{
                            fontSize: "lg",
                            fontWeight: 600,
                            ml: 2,
                            maxW: "250px",
                          }}
                        >
                          {scanData.scan_report.contractname
                            ? scanData.scan_report.contractname
                            : scanData.scan_report.contract_address}
                        </Text>
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
                          {scanData.scan_report.reporting_status ===
                            "report_generated" &&
                            publishStatus !== "" &&
                            (publishStatus === "Not-Published" ? (
                              <Button
                                variant={"accent-outline"}
                                bg={"white"}
                                w={["80%", "80%", "50%", "auto"]}
                                mx={["auto", "auto", "auto", "0"]}
                                mr={["auto", "auto", "auto", 5]}
                                isDisabled={
                                  profile.actions_supported
                                    ? !profile.actions_supported
                                        .publishable_report
                                    : profile.current_package !== "expired" &&
                                      !plans.monthly[profile.current_package]
                                        .publishable_report
                                }
                                onClick={() => setOpen(!open)}
                              >
                                {(profile.actions_supported
                                  ? !profile.actions_supported
                                      .publishable_report
                                  : profile.current_package !== "expired" &&
                                    !plans.monthly[profile.current_package]
                                      .publishable_report) && (
                                  <LockIcon color={"accent"} size="xs" mr={3} />
                                )}
                                Publish Report
                              </Button>
                            ) : (
                              <HStack my={[4, 4, 4, 0]}>
                                {publishStatus === "Approved" ? (
                                  <CheckCircleIcon color={"#03C04A"} />
                                ) : (
                                  <TimeIcon color={"#FF5C00"} />
                                )}
                                <Text
                                  color={
                                    publishStatus === "Approved"
                                      ? "#03C04A"
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
                          {scanData.scan_report.scan_status !== "scanning" && (
                            <Button
                              variant={"accent-outline"}
                              w={["80%", "80%", "50%", "auto"]}
                              mx={["auto", "auto", "auto", 5]}
                              mb={[4, 4, 4, 0]}
                              isLoading={reportingStatus === ""}
                              isDisabled={
                                reportingStatus === "generating_report" ||
                                (profile.actions_supported
                                  ? !profile.actions_supported.generate_report
                                  : profile.current_package !== "expired" &&
                                    !plans.monthly[profile.current_package]
                                      .report)
                              }
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
                                  if (publishStatus === "Approved") {
                                    window.open(
                                      `http://${document.location.host}/published-report/block/${scanData.scan_report.latest_report_id}`,
                                      "_blank"
                                    );
                                  } else {
                                    window.open(
                                      `http://${document.location.host}/report/block/${scanData.scan_report.project_id}/${scanData.scan_report.latest_report_id}`,
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
                                  !plans.monthly[profile.current_package]
                                    .report && (
                                    <LockIcon
                                      color={"accent"}
                                      size="xs"
                                      mr={3}
                                    />
                                  )}
                              {reportingStatus === "generating_report"
                                ? "Generating report..."
                                : scanData.scan_report
                                    .report_regeneration_enabled
                                ? "Re-generate Report"
                                : reportingStatus === "report_generated"
                                ? "View Report"
                                : reportingStatus === "not_generated"
                                ? "Generate Report"
                                : "Loading"}
                            </Button>
                          )}
                          <AccordionButton
                            width={"fit-content"}
                            borderRadius="48px"
                            display={["none", "none", "none", "flex"]}
                          >
                            {isExpanded ? (
                              <BiChevronUpCircle />
                            ) : (
                              <BiChevronDownCircle />
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
                  my: 4,
                }}
              >
                <Tabs
                  index={tabIndex}
                  onChange={handleTabsChange}
                  mx={0}
                  px={0}
                  w={"100%"}
                  variant="soft-rounded"
                  colorScheme="green"
                >
                  <Flex
                    width={"100%"}
                    overflow={["scroll", "scroll", "scroll", "visible"]}
                    flexDir={"row"}
                    justifyContent="flex-start"
                    align={"center"}
                    ml={[3, 3, 5]}
                  >
                    <TabList my={3} width={"fit-content"} zIndex={0}>
                      <Tab minW={"150px"} bgColor={"#F5F5F5"}>
                        Overview
                      </Tab>
                      <Tab minW={"150px"} bgColor={"#F5F5F5"} ml={4}>
                        Detailed Result
                      </Tab>
                      <Tab minW={"175px"} bgColor={"#F5F5F5"} ml={4}>
                        Published Reports
                      </Tab>
                    </TabList>
                  </Flex>
                  <TabPanels>
                    <TabPanel>
                      {(scanData.scan_report.multi_file_scan_summary ||
                        scanData.scan_report.scan_summary) && (
                        <Overview
                          scanData={scanData.scan_report}
                          onTabChange={handleTabsChange}
                        />
                      )}
                    </TabPanel>
                    <TabPanel p={[2, 2, 2, 4]}>
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
                        />
                      ) : scanData.scan_report.scan_details &&
                        scanData.scan_report.scan_summary ? (
                        <Result
                          details_enabled={scanData.scan_report.details_enabled}
                          profileData={profile}
                          scanSummary={scanData.scan_report.scan_summary}
                          scanDetails={scanData.scan_report.scan_details}
                          type="block"
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
                        <TabPanel p={4}>
                          <PublishedReports
                            type="block"
                            reportList={reportList.reports}
                            profile={profile}
                            scan_report={scanData.scan_report}
                          />
                        </TabPanel>
                      )
                    ) : (
                      <TabPanel p={4}>
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
            py={[6, 6, 6, 10]}
          >
            Publish Report
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody h={"fit-content"} w={"100%"} px={[4, 4, 4, 10]}>
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
                    spacing={[2, 2, 2, 3]}
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
                      Contract Name
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={["100%", "100%", "100%", "70%"]}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contractname}
                      </Text>
                    </HStack>
                  </Stack>
                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={[2, 2, 2, 3]}
                    px={5}
                    py={3}
                    mb={4}
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
                      Contract Address{" "}
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={["100%", "100%", "100%", "70%"]}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text isTruncated fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contract_address}
                      </Text>
                    </HStack>
                  </Stack>

                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={[2, 2, 2, 3]}
                    px={5}
                    py={3}
                    mb={4}
                    w={"100%"}
                    fontSize="14px"
                    border={"2px solid #EDF2F7"}
                    bgColor={"white"}
                    borderRadius={"16px"}
                  >
                    <Text
                      fontSize="md"
                      fontWeight={"600"}
                      color={"gray.500"}
                      width={["100%", "100%", "100%", "30%"]}
                    >
                      Contract Platform{" "}
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={["100%", "100%", "100%", "70%"]}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contract_platform}
                      </Text>
                    </HStack>
                  </Stack>

                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={[2, 2, 2, 3]}
                    px={5}
                    py={3}
                    mb={4}
                    w={"100%"}
                    fontSize="14px"
                    border={"2px solid #EDF2F7"}
                    bgColor={"white"}
                    borderRadius={"16px"}
                  >
                    <Text
                      fontSize="md"
                      fontWeight={"600"}
                      color={"gray.500"}
                      width={["100%", "100%", "100%", "30%"]}
                    >
                      Contract Chain{" "}
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={["100%", "100%", "100%", "70%"]}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contract_chain}
                      </Text>
                    </HStack>
                  </Stack>

                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={[2, 2, 2, 3]}
                    px={5}
                    py={3}
                    mb={4}
                    w={"100%"}
                    fontSize="14px"
                    border={"2px solid #EDF2F7"}
                    bgColor={"white"}
                    borderRadius={"16px"}
                  >
                    <Text
                      fontSize="md"
                      fontWeight={"600"}
                      color={"gray.500"}
                      width={["100%", "100%", "100%", "30%"]}
                    >
                      Contract URL{" "}
                    </Text>

                    <Text
                      width={["100%", "100%", "100%", "70%"]}
                      isTruncated
                      fontSize="md"
                      fontWeight={"600"}
                    >
                      {scanData?.scan_report.contract_url}
                    </Text>
                  </Stack>

                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={[2, 2, 2, 3]}
                    px={5}
                    py={3}
                    mb={4}
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
                      <Text fontSize="md" fontWeight={"600"}>
                        {lastTimeUpdate}
                      </Text>
                    </HStack>
                  </Stack>

                  <Stack
                    direction={["column", "column", "column", "row"]}
                    alignItems={["left", "left", "left", "center"]}
                    spacing={[2, 2, 2, 3]}
                    px={5}
                    py={3}
                    w={"100%"}
                    border={"2px solid #EDF2F7"}
                    fontSize="14px"
                    bgColor={"white"}
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
    </Box>
  );
};

export default BlockPage;

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
} from "@chakra-ui/react";
import Overview from "components/overview";
import Result, { MultifileResult } from "components/result";
import TrialWall from "components/trialWall";
import { AddIcon, LockIcon, MinusIcon } from "@chakra-ui/icons";
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
import { useReport } from "hooks/useReport";
import { sentenceCapitalize } from "helpers/helperFunction";
import { ScanErrorIcon } from "components/icons";
import { pricingDetails as plans } from "common/values";

const BlockPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();

  const { data: scanData, isLoading, refetch } = useScan(scanId);

  const [reportingStatus, setReportingStatus] = useState<string>("");
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const toast = useToast();

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

  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const refetchTillScanComplete = () => {
      intervalId = setInterval(async () => {
        await refetch().then((res) => {
          if (res.data) {
            setReportingStatus(res.data?.scan_report.reporting_status);
          }
        });
      }, 5000);
    };
    refetchTillScanComplete();
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const generateReport = async (scanId: string, projectId: string) => {
    setReportingStatus("generating_report");
    console.log(projectId, scanId);
    const { data } = await API.post("/api-generate-report/", {
      project_id: projectId,
      scan_id: scanId,
    });

    if (data.success) {



      setInterval(async () => {
        await refetch();
      }, 5000);
    }
  };

  const publishReport = async () => {
    const { data } = await API.post("/api-publish-report/", {
      project_type: "block",
      project_id: scanData?.scan_report.project_id,
      report_id: scanData?.scan_report.latest_report_id,
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

  const getReportData = async (project_id: string, report_id: string) => {
    const reportResponse = await API.post<{ summary_report: Report }>(
      "/api-get-report-beta/",
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
      const d = new Date();
      setDatePublished(
        `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`
      );
    }
  }, [scanData]);

  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        my: 4,
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
        plans && (
          <>
            {" "}
            <Flex
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                <Text as="span" fontSize="14px" ml={3} color="gray.500">
                  {scanData.scan_report?.contract_address}
                </Text>
              </Text>
              <Link
                as={RouterLink}
                to="/blocks"
                variant="subtle-without-underline"
                fontSize="md"
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
                          flexDirection={"row"}
                          justifyContent="flex-end"
                          alignItems={"center"}
                          width={"fit-content"}
                          height="fit-content"
                        >
                          {scanData.scan_report.reporting_status ===
                            "report_generated" && (
                              <Button
                                variant="accent-ghost"
                                mr={5}
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
                                  ? !profile.actions_supported.publishable_report
                                  : profile.current_package !== "expired" &&
                                  !plans.monthly[profile.current_package]
                                    .publishable_report) && (
                                    <LockIcon color={"accent"} size="xs" mr={3} />
                                  )}
                                Publish Report
                              </Button>
                            )}
                          {scanData.scan_report.scan_status !== "scanning" && (
                            <Button
                              variant={"accent-outline"}
                              mr={5}
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
                                  window.open(
                                    `http://${document.location.host}/report/block/${scanData.scan_report.project_id}/${scanData.scan_report.latest_report_id}`,
                                    "_blank"
                                  );
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
                          >
                            {isExpanded ? (
                              <BiChevronUpCircle />
                            ) : (
                              <BiChevronDownCircle />
                            )}
                          </AccordionButton>
                        </Flex>
                      </Flex>

                      <AccordionPanel backgroundColor={"#FAFBFC"} pb={4}>
                        <Flex
                          flexDirection={"row"}
                          justifyContent="flex-start"
                          alignItems={"flex-start"}
                          width={"100%"}
                          height="fit-content"
                          flexWrap={"wrap"}
                          textAlign={"left"}
                          p={6}
                        >
                          <HStack
                            py={2}
                            px={9}
                            borderRadius={36}
                            backgroundColor={"white"}
                            cursor="pointer"
                            onClick={() =>
                              window.open(
                                `${scanData.scan_report.contract_url}`,
                                "_blank"
                              )
                            }
                            boxShadow="0px 1px 1px rgba(0, 0, 0, 0.09)"
                          >
                            <Text
                              minW={"50px"}
                              width={"100%"}
                              as="p"
                              fontSize="12px"
                            >
                              View on
                            </Text>
                            <Text
                              width={"100%"}
                              color="gray.200"
                              as="p"
                              fontSize="16px"
                            >
                              |
                            </Text>
                            <Image
                              src={`/blockscan/${scanData.scan_report.contract_platform}-scan.svg`}
                              alt="Product screenshot"
                              mx="auto"
                              h={"20px"}
                              w={"20px"}
                            />
                            {scanData.scan_report.contract_platform && (
                              <Text
                                fontWeight={"700"}
                                width={"fit-content"}
                                as="p"
                                fontSize="18px"
                              >
                                {scanData.scan_report.contract_platform ===
                                  "fantom"
                                  ? "FTMScan"
                                  : scanData.scan_report.contract_platform ===
                                    "avalanche"
                                    ? "Snowtrace"
                                    : sentenceCapitalize(
                                      scanData.scan_report.contract_platform
                                    )}
                              </Text>
                            )}
                          </HStack>
                        </Flex>
                        <Flex
                          flexDirection={"row"}
                          justifyContent="flex-start"
                          alignItems={"flex-start"}
                          width={"100%"}
                          height="fit-content"
                          flexWrap={"wrap"}
                          textAlign={"left"}
                          p={6}
                        >
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                            >
                              Contract Name
                            </Text>
                            <Text width={"100%"} as="p" fontSize="14px">
                              {scanData?.scan_report.contractname}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                            >
                              Compiler Version
                            </Text>
                            <Text width={"100%"} as="p" fontSize="14px">
                              {scanData?.scan_report.compilerversion}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                            >
                              EVM Version
                            </Text>
                            <Text width={"100%"} as="p" fontSize="14px">
                              {scanData?.scan_report.evmversion}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                              mt={10}
                            >
                              License Type
                            </Text>
                            <Text width={"100%"} as="p" fontSize="14px">
                              {scanData?.scan_report.licensetype}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                              mt={10}
                            >
                              Balance
                            </Text>
                            <Text width={"100%"} as="p" fontSize="14px">
                              {scanData?.scan_report.value}{" "}
                              {scanData.scan_report.currency}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                              mt={10}
                            >
                              Contract Chain
                            </Text>
                            <Text width={"100%"} as="p" fontSize="14px">
                              {scanData?.scan_report.contract_chain}{" "}
                            </Text>
                          </VStack>
                        </Flex>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Tabs
                index={tabIndex}
                onChange={handleTabsChange}
                variant="soft-rounded"
                colorScheme="green">
                <TabList
                  sx={{
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    borderColor: "border",
                    py: 4,
                    px: 4,
                  }}
                >
                  <Tab mx={2}>Overview</Tab>
                  <Tab mx={2}>Detailed Result</Tab>

                  <Tab mx={2}>Published Reports</Tab>
                </TabList>
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
                  <TabPanel>
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
                      <TabPanel>
                        <PublishedReports scan_report={scanData.scan_report} />
                      </TabPanel>
                    )
                  ) : (
                    <TabPanel>
                      <PublishedReports scan_report={scanData.scan_report} />
                    </TabPanel>
                  )}
                </TabPanels>
              </Tabs>
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
          h={"650px"}
          minH={"fit-content"}
          overflowY={"scroll"}
          overflowX={"scroll"}
          maxW="70vw"
          minW={"300px"}
        >
          <ModalHeader
            background="rgba(82, 255, 0, 0.04)"
            backgroundImage="url('/background/pattern.png')"
            py={10}
          >
            Publish Report
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody h={"fit-content"} w={"100%"} px={10}>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              flexDir="row"
            >
              {!next && (
                <VStack zIndex={"10"} w={"70%"} spacing={2}>
                  <HStack
                    alignItems="center"
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
                      width={"30%"}
                    >
                      Contract Name
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={"70%"}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contractname}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack
                    alignItems="center"
                    spacing={3}
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
                      width={"30%"}
                    >
                      Contract Address{" "}
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={"70%"}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text isTruncated fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contract_address}
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack
                    alignItems="center"
                    spacing={3}
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
                      width={"30%"}
                    >
                      Contract Platform{" "}
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={"70%"}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contract_platform}
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack
                    alignItems="center"
                    spacing={3}
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
                      width={"30%"}
                    >
                      Contract Chain{" "}
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={"70%"}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {scanData?.scan_report.contract_chain}
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack
                    alignItems="center"
                    spacing={3}
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
                      width={"30%"}
                    >
                      Contract URL{" "}
                    </Text>

                    <Text
                      width={"70%"}
                      isTruncated
                      fontSize="md"
                      fontWeight={"600"}
                    >
                      {scanData?.scan_report.contract_url}
                    </Text>
                  </HStack>

                  <HStack
                    alignItems="center"
                    spacing={3}
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
                      width={"30%"}
                    >
                      Latest Report Update
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={"70%"}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {lastTimeUpdate}
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack
                    alignItems="center"
                    spacing={3}
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
                      width={"30%"}
                    >
                      Date Published
                    </Text>
                    <HStack
                      alignItems="center"
                      spacing={3}
                      width={"70%"}
                      bgColor={"white"}
                      borderRadius={"16px"}
                    >
                      <Text fontSize="md" fontWeight={"600"}>
                        {datePublished}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              )}
              {next && (
                <VStack zIndex={"10"} w={"70%"} spacing={6}>
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
                </VStack>
              )}
              <Image
                ml={"-10%"}
                src="/common/publishreport.png"
                alt="Product screenshot"
                w={"40%"}
                h={"auto"}
              />
            </Flex>
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
    </Box>
  );
};

export default BlockPage;

const PublishedReports: React.FC<{ scan_report: Scan }> = ({ scan_report }) => {
  const { data } = useReports("block", scan_report.project_id);

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
          disabled={!report.is_approved}
          onClick={(e) => {
            e.stopPropagation();
            console.log("asdkbkalsd");
            navigator.clipboard
              .writeText(
                `http://${document.location.host}/published-report/block/${report.report_id}`
              )
              .then(
                () =>
                  toast({
                    title: "Copied Report URL",
                    description: "",
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
              `http://${document.location.host}/report/block/${report.project_id}/${report.report_id}`,
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

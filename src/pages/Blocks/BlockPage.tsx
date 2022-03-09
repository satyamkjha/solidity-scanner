import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

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
} from "@chakra-ui/react";
import Overview from "components/overview";
import Result from "components/result";
import TrialWall from "components/trialWall";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
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
} from "react-icons/fa";
import API from "helpers/api";

const BlockPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();

  const { data, isLoading, refetch } = useScan(scanId);
  const [reportingStatus, setReportingStatus] = useState<string>();
  const { data: profile, isLoading: isProfileLoading } = useProfile();

  const [next, setNext] = useState(false);
  const [open, setOpen] = useState(false);

  // let reportingStatus = data?.scan_report.reporting_status;

  useEffect(() => {
    if (data) {
      setReportingStatus(data.scan_report.reporting_status);
    }
    let intervalId: NodeJS.Timeout;
    const refetchTillScanComplete = () => {
      if (data && data.scan_report.reporting_status === "generating_report") {
        intervalId = setInterval(async () => {
          setReportingStatus(data.scan_report.reporting_status);
          await refetch();
          if (data) {
            if (data.scan_report.reporting_status === "report_generated") {
              clearInterval(intervalId);
            }
          }
        }, 2000);
      }
    };

    refetchTillScanComplete();
    return () => {
      clearInterval(intervalId);
    };
  }, [refetch]);

  const generateReport = async (projectId: string) => {
    const { data } = await API.post("/api-generate-report-block/", {
      project_id: projectId,
    });
    if (data.success) {
      setReportingStatus("generating_report");
      setInterval(async () => {
        await refetch();
      }, 2000);
    }
  };

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
      {isLoading || isProfileLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        data &&
        profile && (
          <>
            {" "}
            <Flex
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                <Text as="span" fontSize="14px" ml={3} color="gray.500">
                  {data.scan_report?.contract_address}
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
                          {data.scan_report.contractname
                            ? data.scan_report.contractname
                            : data.scan_report.contract_address}
                        </Text>
                        <Flex
                          as={"div"}
                          flexDirection={"row"}
                          justifyContent="flex-end"
                          alignItems={"center"}
                          width={"fit-content"}
                          height="fit-content"
                        >
                          {data.scan_report.reporting_status ===
                            "report_generated" && (
                            <Button variant="accent-ghost" onClick={() => {}}>
                              Publish Report
                            </Button>
                          )}
                          {data.scan_report.scan_status !== "scanning" && (
                            <Button
                              variant={"accent-outline"}
                              isDisabled={
                                reportingStatus === "generating_report"
                              }
                              onClick={() => {
                                if (reportingStatus === "not_generated") {
                                  generateReport(data.scan_report.project_id);
                                } else if (
                                  reportingStatus === "report_generated"
                                ) {
                                  // window.open(
                                  //   `http://${document.location.host}/report/${projectId}/${data?.scan_report.latest_report_id}`,
                                  //   "_blank"
                                  // );
                                }
                              }}
                            >
                              {reportingStatus === "generating_report" && (
                                <Spinner color="#806CCF" size="xs" mr={3} />
                              )}
                              {reportingStatus === "not_generated"
                                ? "Generate Report"
                                : reportingStatus === "generating_report"
                                ? "Generating report..."
                                : "View Report"}
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
                                `${data.scan_report.contract_url}`,
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
                              src={
                                data.scan_report.contract_platform ===
                                "polygonscan"
                                  ? "/polygon.svg"
                                  : data.scan_report.contract_platform ===
                                    "etherscan"
                                  ? "/etherscan.svg"
                                  : "/bscscan.svg"
                              }
                              alt="Product screenshot"
                              mx="auto"
                            />
                            <Text
                              fontWeight={"700"}
                              width={"100%"}
                              as="p"
                              fontSize="18px"
                            >
                              {data.scan_report.contract_platform}
                            </Text>
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
                              {data?.scan_report.contractname}
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
                              {data?.scan_report.compilerversion}
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
                              {data?.scan_report.evmversion}
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
                              {data?.scan_report.licensetype}
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
                              {data?.scan_report.value}{" "}
                              {data.scan_report.currency}
                            </Text>
                          </VStack>
                        </Flex>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Tabs variant="soft-rounded" colorScheme="green">
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
                  {/* <Tab mx={2}>Advanced Scan(Beta)</Tab> */}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {data.scan_report.scan_summary && (
                      <Overview data={data.scan_report.scan_summary} />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {
                      // profile.current_package === "trial" ? (
                      //   <TrialWall />
                      // ) :
                      data.scan_report.scan_details &&
                        data.scan_report.scan_summary && (
                          <Result
                            scanSummary={data.scan_report.scan_summary}
                            scanDetails={data.scan_report.scan_details}
                            type="block"
                          />
                        )
                    }
                  </TabPanel>
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
                  px={5}
                  py={3}
                  mb={4}
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
                    Project Name
                  </Text>
                  <HStack
                    alignItems="center"
                    spacing={3}
                    width={"70%"}
                    bgColor={"white"}
                    borderRadius={"16px"}
                  >
                    <AiOutlineProject color="" />

                    <Text fontSize="md" fontWeight={"600"}>
                      projectName
                    </Text>
                  </HStack>
                </HStack>
                <HStack
                  alignItems="center"
                  spacing={3}
                  px={5}
                  py={3}
                  mb={4}
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
                    Link to the repository{" "}
                  </Text>
                  <HStack
                    alignItems="center"
                    spacing={3}
                    width={"70%"}
                    bgColor={"white"}
                    borderRadius={"16px"}
                  >
                    <FaFileCode />

                    <Text fontSize="md" fontWeight={"600"}>
                      repoUrl
                    </Text>
                  </HStack>
                </HStack>

                <HStack
                  alignItems="center"
                  spacing={3}
                  px={5}
                  py={3}
                  mb={4}
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
                    Git commit hash{" "}
                  </Text>
                  <HStack
                    alignItems="center"
                    spacing={3}
                    width={"70%"}
                    bgColor={"white"}
                    borderRadius={"16px"}
                  >
                    <FaGithub />

                    <Text fontSize="md" fontWeight={"600"}>
                      commitHash
                    </Text>
                  </HStack>
                </HStack>

                <HStack
                  alignItems="center"
                  spacing={3}
                  px={5}
                  py={3}
                  mb={4}
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
                    <FaCalendarAlt />

                    <Text fontSize="md" fontWeight={"600"}>
                      lastTimeUpdate
                    </Text>
                  </HStack>
                </HStack>

                <HStack
                  alignItems="center"
                  spacing={3}
                  px={5}
                  py={3}
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
                    <FaRegCalendarCheck />

                    <Text fontSize="md" fontWeight={"600"}>
                      datePublished
                    </Text>
                  </HStack>
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
                      // value={pubName}
                      // onChange={(e) => {
                      //   setPubName(e.target.value);
                      // }}
                    />
                  </InputGroup>
                  <Text>Private</Text>
                  <SwitchComp
                    // isChecked={nameSwitch}
                    // onChange={() => {
                    //   setNameSwitch(!nameSwitch);
                    // }}
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
                      // value={pubEmail}
                      // onChange={(e) => {
                      //   setPubEmail(e.target.value);
                      // }}
                    />
                  </InputGroup>
                  <Text>Private</Text>
                  <SwitchComp
                    // isChecked={emailSwitch}
                    // onChange={() => {
                    //   setEmailSwitch(!emailSwitch);
                    // }}
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
                      // value={pubWeb}
                      // onChange={(e) => {
                      //   setPubWeb(e.target.value);
                      // }}
                    />
                  </InputGroup>
                  <Text>Private</Text>
                  <SwitchComp
                    // isChecked={webSwitch}
                    // onChange={() => {
                    //   setWebSwitch(!webSwitch);
                    // }}
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
                      // value={pubOrg}
                      // onChange={(e) => {
                      //   setPubOrg(e.target.value);
                      // }}
                    />
                  </InputGroup>
                  <Text>Private</Text>
                  <SwitchComp
                    // isChecked={orgSwitch}
                    // onChange={() => {
                    //   setOrgSwitch(!orgSwitch);
                    // }}
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
                  // publishReport();
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

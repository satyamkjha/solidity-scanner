import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";

import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link as ChakraLink,
  useDisclosure,
  HStack,
  VStack,
  Input,
  CircularProgressLabel,
  CircularProgress,
  Divider,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import {
  ScheduleScan,
  VulnCheck,
  Integration,
  User,
  File,
  Work,
  Smile,
  PublishReport,
  SeverityIcon,
  PassIcon,
  FailIcon,
} from "components/icons";

import Header from "components/header";
import Footer from "components/footer";
import ContactUs from "components/contactus";
import Select from "react-select";
import API from "helpers/api";
import { QuickScanResult } from "common/types";
import { sentenceCapitalize } from "helpers/helperFunction";
import PieChart from "components/pieChart";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const pieData = (
  critical: number,
  high: number,
  medium: number,
  low: number,
  informational: number,
  gas: number
) => [
  {
    id: "critical",
    label: "Critical",
    value: critical,
    color: "#FF5C00",
  },
  {
    id: "high",
    label: "High",
    value: high,
    color: "#FF5C00",
  },
  {
    id: "medium",
    label: "Medium",
    value: medium,
    color: "#FFE600",
  },
  {
    id: "low",
    label: "Low",
    value: low,
    color: "#38CB89",
  },
  {
    id: "informational",
    label: "Informational",
    value: informational,
    color: "#A0AEC0",
  },
  {
    id: "gas",
    label: "Gas",
    value: gas,
    color: "#F795B4",
  },
];

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
  icon: string;
}> = ({ label, icon }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    {icon !== "" && (
      <Image h={"20px"} w={"20px"} mr={3} src={`/blockscan/${icon}.svg`} />
    )}
    <div>{label}</div>
  </div>
);

const QuickScan: React.FC = () => {
  const contractChain: {
    [key: string]: { label: string; value: string; icon: string }[];
  } = {
    etherscan: [
      { value: "mainnet", label: "Ethereum Mainnet", icon: "" },
      { value: "ropsten", label: "Ropsten Testnet", icon: "" },
      { value: "kovan", label: "Kovan Testnet", icon: "" },
      { value: "rinkeby", label: "Rinkeby Testnet", icon: "" },
      { value: "goerli", label: "Goerli Testnet", icon: "" },
    ],
    bscscan: [
      { value: "mainnet", label: "Bsc Mainnet", icon: "" },
      { value: "testnet", label: "Bsc Testnet", icon: "" },
    ],
    polygonscan: [
      { value: "mainnet", label: "Polygon Mainnet", icon: "" },
      { value: "testnet", label: "Polygon Testnet", icon: "" },
    ],
    avalanche: [
      { value: "mainnet", label: "Avalanche Mainnet", icon: "" },
      { value: "testnet", label: "Avalanche Fuji Testnet", icon: "" },
    ],
    fantom: [
      { value: "mainnet", label: "FTM Mainnet", icon: "" },
      { value: "testnet", label: "FTM Testnet", icon: "" },
    ],
    cronos: [
      { value: "mainnet", label: "Cronos Mainnet", icon: "" },
      { value: "testnet", label: "Cronos Testnet", icon: "" },
    ],
    celo: [
      { value: "mainnet", label: "Celo Mainnet", icon: "" },
      { value: "testnet", label: "Alfajores Testnet", icon: "" },
    ],
    aurora: [
      { value: "mainnet", label: "Aurora Mainnet", icon: "" },
      { value: "testnet", label: "Aurora Testnet", icon: "" },
    ],
  };

  const options = [
    { value: "etherscan", icon: "etherscan", label: "Ethereum" },
    { value: "bscscan", icon: "bscscan", label: "Binance" },
    {
      value: "polygonscan",
      icon: "polygonscan",
      label: "Polygon",
    },
    {
      value: "fantom",
      icon: "fantom",
      label: "Fantom",
    },
    {
      value: "cronos",
      icon: "cronos",
      label: "Cronos",
    },
    {
      value: "avalanche",
      icon: "avalanche",
      label: "Avalanche C-Chain",
    },
    {
      value: "celo",
      icon: "celo",
      label: "Celo",
    },
    {
      value: "aurora",
      icon: "aurora",
      label: "Aurora",
    },
  ];

  const customStylesPlatform = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      backgroundColor: state.isSelected
        ? "#FFFFFF"
        : state.isFocused
        ? "#E6E6E6"
        : "#FFFFFF",
      color: "#000000",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuColor,
      borderRadius: 10,
      border: "0px solid #ffffff",
      overflowY: "hidden",
      width: "280px",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      width: "280px",
      padding: 5,
      margin: 0,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const customStylesChain = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      backgroundColor: state.isSelected
        ? "#FFFFFF"
        : state.isFocused
        ? "#E6E6E6"
        : "#FFFFFF",
      color: "#000000",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuColor,
      borderRadius: 10,
      border: "0px solid #ffffff",
      overflowY: "hidden",
      width: "250px",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      width: "250px",
      padding: 5,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginLeft: -2,
      marginRight: -2,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const { blockAddress, blockPlatform, blockChain } = useParams<{
    blockAddress: string;
    blockPlatform: string;
    blockChain: string;
  }>();

  const toast = useToast();

  const [address, setAddress] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [chain, setChain] = React.useState("");
  const [chainList, setChainList] = React.useState<
    { label: string; value: string; icon: string }[]
  >(contractChain["etherscan"]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [scanReport, setScanReport] = React.useState<QuickScanResult | null>(
    null
  );

  useEffect(() => {
    if (blockAddress) setAddress(blockAddress);
    if (blockChain) setChain(blockChain);
    if (blockPlatform) setPlatform(blockPlatform);
    if (blockAddress && blockChain && blockPlatform) {
      setIsLoading(true);
      API.get(`/api-quick-scan-sse/?contract_address=${blockAddress}&contract_platform=${blockPlatform}&contract_chain=${blockChain}`).then(
        (res) => {
          if (res.status === 200) {
            setScanReport(res.data.scan_report);
          } else {
            toast({
              title: "Quick Scan Failed",
              description:
                "Scan has failed. Please check the values and re-scan.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        },
        (err) => {
          toast({
            title: "Quick Scan Failed",
            description:
              "Scan has failed. Please check the values and re-scan.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
    }
  }, []);

  const generateQuickScan = () => {
    if (platform === "") {
      toast({
        title: "Platform not selected",
        description: "Please select a Platform to perform the scan",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (chain === "") {
      toast({
        title: "Chain not selected",
        description: "Please select a Chain to perform the scan",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (address === "") {
      toast({
        title: "Address not selected",
        description: "Please enter an address to perform the scan",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
   
    setIsLoading(true);
    
    API.get(`/api-quick-scan-sse/?contract_address=${address}&contract_platform=${platform}&contract_chain=${chain}`)
      .then(
      (res) => {
        if (res.status === 200) {
          setScanReport(res.data.scan_report);
        } else {
          toast({
            title: "Quick Scan Failed",
            description:
              "Scan has failed. Please check the values and re-scan.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      },
      (err) => {
        toast({
          title: "Quick Scan Failed",
          description: "Scan has failed. Please check the values and re-scan.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
    setTimeout(() => setIsLoading(false), 2000)   
  };

  return (
    <>
      <Header />
      <Container maxW="100vw" p={0} color="black">
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          p={0}
          textAlign={["center", "center"]}
          flexDir="column"
        >
          <Box
            flexDir={"column"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            px={[0, 0, 10]}
            py={20}
            pb={"200px"}
            background={"url('/background/quickscan_bg.jpeg')"}
            backgroundSize="cover"
            backgroundPosition={"center"}
            backgroundRepeat="no-repeat"
          >
            <Heading color={"white"} fontSize={["3xl", "4xl"]} mb={8}>
              SolidityScan{" "}
              <span style={{ color: "#52FF00" }}> Quick Scan </span>
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <HStack mt={20} justify="center" w={"70%"} spacing={0}>
              <Select
                formatOptionLabel={formatOptionLabel}
                options={options}
                value={options.find((item) => platform === item.value)}
                placeholder="Select Contract Platform"
                styles={customStylesPlatform}
                onChange={(newValue) => {
                  if (newValue) {
                    // setAction(newValue.value)
                    setPlatform(newValue.value);
                    setChainList(contractChain[newValue.value]);
                  }
                }}
              />
              <Select
                formatOptionLabel={formatOptionLabel}
                isDisabled={platform === ""}
                value={chainList.find((item) => chain === item.value)}
                options={chainList}
                placeholder="Select Contract Chain"
                styles={customStylesChain}
                onChange={(newValue) => {
                  if (newValue) {
                    setChain(newValue.value);
                  }
                }}
              />
              <Input
                isRequired
                placeholder="Type or paste your contract address here..."
                variant="brand"
                size="lg"
                height={50}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </HStack>

            <Button
            isLoading={isLoading}
            loadingText='Scanning'
              mt={20}
              w={"300px"}
              type="submit"
              variant="brand"
              onClick={generateQuickScan}
            >

              Start Scan
            </Button>
          </Box>
          {isLoading ? (
            <Flex
              background={"#FFFFFF"}
              mt={"-120px"}
              w="90%"
              h="70vh"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner />
            </Flex>
          ) : (
            scanReport !== null && (
              <Box
                display={"flex"}
                flexDir="column"
                alignItems="center"
                justifyContent={"flex-start"}
                w={"90%"}
                px={[0, 0, 10]}
                mt={"-120px"}
                py={10}
                borderRadius={20}
                background={"#FFFFFF"}
              >
                <HStack w={"100%"} spacing={"5%"}>
                  <Box
                    w={"20%"}
                    h={"250px"}
                    borderRadius={15}
                    px={5}
                    py={5}
                    background={
                      parseFloat(scanReport.multi_file_scan_summary.score) < 2.5
                        ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                        : parseFloat(
                            scanReport.multi_file_scan_summary.score
                          ) >= 4.5
                        ? "linear-gradient(96.27deg, #EFFFED 0.75%, #E6FFE2 96.71%)"
                        : "linear-gradient(96.27deg, #FFFAF2 0.75%, #FFF4E1 96.71%)"
                    }
                  >
                    <Text fontSize="md" mb={5}>
                      Solidity Score
                    </Text>
                    <CircularProgress
                      value={60}
                      color="accent"
                      thickness="8px"
                      size="100px"
                      capIsRound
                      trackColor={"white"}
                    >
                      <CircularProgressLabel
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Box>
                          <Text fontSize="2xl" fontWeight={900} color="accent">
                            {scanReport.multi_file_scan_summary.score}
                          </Text>
                        </Box>
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontWeight={300} fontSize="sm" mt={5}>
                      Your Solidity Score Low
                    </Text>
                  </Box>
                  <Box
                    w={"75%"}
                    borderRadius={15}
                    p={5}
                    h={"250px"}
                    background={" #FAFBFC "}
                    display="flex"
                    flexDir={"column"}
                    alignItems="flex-start"
                    justifyContent={"flex-start"}
                  >
                    <Text fontSize="md">VULNERABILITIES DETECTED</Text>
                    <HStack mt={5} width={"100%"} justify={"space-between"}>
                      {Object.keys(
                        scanReport.multi_file_scan_summary
                          .issue_severity_distribution
                      ).map((key, index) => (
                        <Box
                          w={"15%"}
                          borderRadius={15}
                          p={5}
                          h={"160px"}
                          background={" #FFFFFF "}
                          display="flex"
                          flexDir={"column"}
                          alignItems="center"
                          justifyContent={"center"}
                        >
                          <Text fontWeight={300} fontSize="md">
                            {sentenceCapitalize(key)}
                          </Text>
                          <Text fontSize="xl" my={3}>
                            {
                              scanReport.multi_file_scan_summary
                                .issue_severity_distribution[key]
                            }
                          </Text>
                          <SeverityIcon size={10} variant={key} />
                        </Box>
                      ))}
                    </HStack>
                  </Box>
                </HStack>

                <HStack w={"100%"} mt={10} spacing={"5%"}>
                  <Box
                    w={"47.5%"}
                    borderRadius={15}
                    p={5}
                    background={" #FAFBFC "}
                    display="flex"
                    flexDir={"column"}
                    alignItems="flex-start"
                    justifyContent={"flex-start"}
                  >
                    <Text fontSize="md">SCAN STATISTICS</Text>
                    <Box
                      w={"100%"}
                      borderRadius={15}
                      p={5}
                      mt={5}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <HStack my={4} width={"100%"} justify={"space-between"}>
                        <Text fontSize="sm">Score</Text>
                        <Text fontSize="sm">
                          {scanReport.multi_file_scan_summary.score + "/5"}
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack my={4} width={"100%"} justify={"space-between"}>
                        <Text fontSize="sm">Duration</Text>
                        <Text fontSize="sm">
                          {scanReport.multi_file_scan_summary.scan_time_taken} seconds
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack my={4} width={"100%"} justify={"space-between"}>
                        <Text fontSize="sm">Lines of Code</Text>
                        <Text fontSize="sm">
                          {
                            scanReport.multi_file_scan_summary
                              .lines_analyzed_count
                          }
                        </Text>
                      </HStack>
                      <Divider />
                    </Box>
                  </Box>
                  {scanReport.is_approved ? (
                    <Box
                      w={"47.5%"}
                      borderRadius={15}
                      p={8}
                      backgroundColor={"#02070E"}
                      backgroundImage={"url('/background/verifiedAuditbg.png')"}
                      display="flex"
                      height={"280px"}
                      flexDir={"row"}
                      alignItems="flex-start"
                      justifyContent={"flex-start"}
                    >
                      <Image
                        mr={10}
                        src="/common/verifiedAuditSeal.svg"
                        height={"130px"}
                        width={"130px"}
                        borderRadius={"5px"}
                      />
                      <VStack alignItems={"flex-start"}>
                        <Heading color={"white"} fontSize="2xl">
                          {" "}
                          Verified Contract
                        </Heading>

                        <Text textAlign={"left"} color={"white"} fontSize="md">
                        This contract has been manually verified by SolidityScan's internal security team as per the highest smart contract security standards.{" "}
                        </Text>

                        <Button
                          alignSelf={"flex-end"}
                          type="submit"
                          variant="brand"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `http://${document.location.host}/published-report/project/${scanReport.latest_report_id}`,
                              "_blank"
                            );
                          }}
                        >
                          VIEW PUBLISHED REPORT
                        </Button>
                      </VStack>
                    </Box>
                  ) : (
                    <Box
                      w={"47.5%"}
                      borderRadius={15}
                      p={5}
                      background={" #FAFBFC "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="flex-start"
                      justifyContent={"flex-start"}
                    >
                      <Text fontSize="md">DETAILED RESULT</Text>
                      <Box
                        w={"100%"}
                        borderRadius={15}
                        p={5}
                        mt={5}
                        background={" #FFFFFF "}
                        display="flex"
                        flexDir={"row"}
                        alignItems="flex-start"
                        justifyContent={"flex-start"}
                      >
                        <Box
                          w={"200px"}
                          display="flex"
                          justifyContent="center"
                          alignItems={"center"}
                          h="180px"
                        >
                          {scanReport.multi_file_scan_summary.issues_count ===
                          0 ? (
                            <Image src="/nobug.svg" alt="No Bugs Found" />
                          ) : (
                            <PieChart
                              data={pieData(
                                scanReport.multi_file_scan_summary
                                  .issue_severity_distribution.critical,
                                scanReport.multi_file_scan_summary
                                  .issue_severity_distribution.high,
                                scanReport.multi_file_scan_summary
                                  .issue_severity_distribution.medium,
                                scanReport.multi_file_scan_summary
                                  .issue_severity_distribution.low,
                                scanReport.multi_file_scan_summary
                                  .issue_severity_distribution.informational,
                                scanReport.multi_file_scan_summary
                                  .issue_severity_distribution.gas
                              )}
                            />
                          )}
                        </Box>
                        <VStack ml={10} w={"calc(100% - 200px)"}>
                          <Text textAlign={"left"} fontSize="sm">
                          This contract has been analyzed by more than 110 proprietary vulnerability patterns of SolidityScan. Vulnerability details and mechanisms to remediate the risks tailored specific to the contract are now available in the link below.

                          </Text>
                          <Button
                            onClick={() =>
                              window.open(
                                "https://solidityscan.com/signup/?utm_source=quickscan&utm_medium=quickscan&utm_campaign=quickscan",
                                "_blank"
                              )
                            }
                            variant="accent-ghost"
                          >
                            View Detailed Result <ArrowForwardIcon ml={5} />
                          </Button>
                        </VStack>
                      </Box>
                    </Box>
                  )}
                </HStack>

                <Box
                  w={"100%"}
                  borderRadius={15}
                  p={5}
                  mt={10}
                  background={" #FAFBFC "}
                  display="flex"
                  flexDir={"column"}
                  alignItems="flex-start"
                  justifyContent={"flex-start"}
                >
                  <Text fontSize="md">QUICK AUDIT SUMMARY</Text>
                  <Box
                    w={"100%"}
                    borderRadius={15}
                    p={10}
                    mt={5}
                    background={" #FFFFFF "}
                    display="flex"
                    flexDir={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    {scanReport.quick_file_scan_details.map((item) => (
                      <>
                        <HStack my={5} width={"100%"}>
                          <Image src={`/icons/${item.issue_status}.svg`} />
                          <VStack
                            ml={"30px !important"}
                            alignItems={"flex-start"}
                          >
                            <Heading fontSize="md">
                              {item.issue_name}
                            </Heading>
                            <DescriptionWrapper>
              <Box
                dangerouslySetInnerHTML={{
                  __html: item.issue_description,
                }}
              />
            </DescriptionWrapper>
                          </VStack>
                        </HStack>
                        <Divider />
                      </>
                    ))}
                  </Box>
                </Box>
              </Box>
            )
          )}
        </Flex>
      </Container>
    </>
  );
};

export default QuickScan;


const DescriptionWrapper = styled.div`
  p {
    text-align: left;
  }

  code {
    background: #cbd5e0;
    padding: 2px 4px;
    border-radius: 5px;
  }

  a {
    color: #4299e1;
    text-decoration: underline;
    transition: 0.2s color;
    &:hover {
      color: #2b6cb0;
    }
  }
`;
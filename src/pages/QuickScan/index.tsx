import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";

import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link,
  useDisclosure,
  HStack,
  VStack,
  Input,
  CircularProgressLabel,
  CircularProgress,
  Divider,
  useToast,
  Spinner,
  Stack,
  useMediaQuery,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
} from "components/icons";

import Header from "components/header";
import Footer from "components/footer";
import ContactUs from "components/contactus";
import Select from "react-select";
import API from "helpers/api";
import { QuickScanResult } from "common/types";
import { sentenceCapitalize } from "helpers/helperFunction";
import PieChart from "components/pieChart";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { monthNames } from "common/values";
import SignupBox from "components/signupBox";
import Infographics from "components/infographics";
import { blockScans } from "common/values";
import { useRecentQuickScans } from "hooks/useRecentQuickScans";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";

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
      { value: "sepolia", label: "Sepolia Testnet", icon: "" },
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
    arbiscan: [
      { value: "mainnet", label: "Arbiscan Mainnet", icon: "" },
      { value: "goerli", label: "Arbiscan Goerli", icon: "" },
    ],
  };

  const options = [
    {
      value: "etherscan",
      icon: "etherscan",
      label: "Ethereum - (etherscan.io)",
    },
    { value: "bscscan", icon: "bscscan", label: "Binance - (bscscan.com)" },
    {
      value: "polygonscan",
      icon: "polygonscan",
      label: "Polygon - (polygonscan.com)",
    },
    {
      value: "fantom",
      icon: "fantom",
      label: "Fantom - (ftmscan.com)",
    },
    {
      value: "cronos",
      icon: "cronos",
      label: "Cronos - (cronoscan.com)",
    },
    {
      value: "avalanche",
      icon: "avalanche",
      label: "Avalanche C-Chain - (snowtrace.io)",
    },
    {
      value: "arbiscan",
      icon: "arbiscan",
      label: "Arbiscan - (arbiscan.io)",
    },
    {
      value: "celo",
      icon: "celo",
      label: "Celo - (celoscan.io)",
    },
    {
      value: "aurora",
      icon: "aurora",
      label: "Aurora - (aurorascan.dev)",
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
      width: "300px",
      textAlign: "left",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      width: isDesktopView ? "300px" : "95%",
      padding: 5,
      margin: 0,
      marginBottom: isDesktopView ? 0 : 10,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      borderTopRightRadius: isDesktopView ? 0 : 15,
      borderBottomRightRadius: isDesktopView ? 0 : 15,
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
      width: isDesktopView ? "250px" : "95%",
      padding: 5,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: isDesktopView ? 0 : 15,
      marginLeft: isDesktopView ? -2 : 0,
      marginRight: isDesktopView ? -2 : 0,
      marginBottom: isDesktopView ? 0 : 10,
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
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

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
  const { data: recentScans, isLoading: recentScansLoading } =
    useRecentQuickScans();

  let d = new Date();

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blockAddress) setAddress(blockAddress);

    if (blockPlatform) {
      setPlatform(blockPlatform);
      setChainList(contractChain[blockPlatform]);
    }

    if (blockChain) {
      setChain(blockChain);
    }

    if (blockAddress && blockChain && blockPlatform) {
      setIsLoading(true);
      runQuickScan(blockAddress, blockPlatform, blockChain)
    }
  }, []);

  const runQuickScan = async (address: string, platform: string, chain: string) => {
    const { data } = await API.post<{
      contract_verified: boolean;
      message: string;
      status: string;
    }>("/api-get-contract-status/", {
      contract_address: address,
      contract_platform: platform,
      contract_chain: chain,
    }); 
    if(data.contract_verified){
      API.get(
        `/api-quick-scan-sse/?contract_address=${address}&contract_platform=${platform}&contract_chain=${chain}`
      )
        .then(
          (res) => {
            if (res.status === 200) {
              setScanReport(res.data.scan_report);
              d = new Date(res.data.scan_report.published_date);
            }
          },
          (err) => {
            return;
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const submitQuickScan = () => {
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
    setScanReport(null);
    runQuickScan(address, platform, chain)
  };

  useEffect(() => {
    if (scanReport !== null) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      scrollToElement();
    }
  }, [scanReport]);

  const scrollToElement = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
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
            <Heading
              w={["90%", "90%", "80%", "60%"]}
              color={"white"}
              fontSize={["3xl", "4xl"]}
              mb={8}
            >
              SolidityScan{" "}
              <Box
                as="span"
                sx={{
                  background:
                    "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                QuickScan
              </Box>
            </Heading>
            <Text
              w={["90%", "90%", "80%", "60%"]}
              fontSize="xl"
              color="subtle"
              mb={8}
            >
              An open to all quick scanning extension designed to view results
              in simple terms. Initiate a smart contract scan by selecting from
              a wide range of supported protocols and get a quick analysis
              report within seconds.
            </Text>
            <Stack
              mt={20}
              ml={[4, 4, 4, 0]}
              justify="center"
              w={["80%", "80%", "70%"]}
              direction={["column", "column", "column", "row"]}
              spacing={0}
            >
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
                borderTopLeftRadius={[15, 15, 15, 0]}
                borderBottomLeftRadius={[15, 15, 15, 0]}
                width={["95%", "95%", "95%", "100%"]}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Stack>

            <Button
              isLoading={isLoading}
              loadingText="Scanning"
              mt={20}
              w={"300px"}
              type="submit"
              variant="brand"
              onClick={generateQuickScan}
            >
              Start Scan
            </Button>
          </Box>

          {scanReport !== null && (
            <Box
              ref={elementRef}
              display={"flex"}
              flexDir="column"
              alignItems="center"
              justifyContent={"flex-start"}
              w={"90%"}
              px={[0, 0, 10]}
              mt={"-120px"}
              py={[0, 0, 0, 10]}
              borderRadius={20}
              background={"#FFFFFF"}
            >
              <Stack
                w={"100%"}
                spacing={"5%"}
                direction={["column", "column", "column", "row"]}
              >
                <Box
                  w={["100%", "100%", "100%", "20%"]}
                  h={"250px"}
                  borderRadius={15}
                  px={[0, 0, 0, 5]}
                  py={5}
                  background={
                    parseFloat(scanReport.multi_file_scan_summary.score) < 2.5
                      ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                      : parseFloat(scanReport.multi_file_scan_summary.score) >=
                        4.5
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
                    Your Solidity Score is{" "}
                    {parseFloat(scanReport.multi_file_scan_summary.score) < 2.5
                      ? " LOW"
                      : parseFloat(scanReport.multi_file_scan_summary.score) >=
                        4.5
                      ? " GREAT"
                      : " AVERAGE"}
                  </Text>
                </Box>
                <Box
                  w={["100%", "100%", "100%", "75%"]}
                  borderRadius={15}
                  p={5}
                  h={["fit-content", "fit-content", "250px"]}
                  background={" #FAFBFC "}
                  display="flex"
                  flexDir={"column"}
                  alignItems={["center", "center", "center", "flex-start"]}
                  justifyContent={"flex-start"}
                >
                  <Text fontSize="md">VULNERABILITIES DETECTED</Text>
                  <HStack
                    mt={5}
                    width={["100%"]}
                    justify={"space-between"}
                    flexWrap="wrap"
                    spacing={0}
                  >
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text fontWeight={300} fontSize="md">
                        Critical
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {
                          scanReport.multi_file_scan_summary
                            .issue_severity_distribution.critical
                        }
                      </Text>
                      <SeverityIcon size={10} variant={"critical"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text fontWeight={300} fontSize="md">
                        High
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {
                          scanReport.multi_file_scan_summary
                            .issue_severity_distribution.high
                        }
                      </Text>
                      <SeverityIcon size={10} variant={"high"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text
                        fontWeight={300}
                        fontSize={["sm", "sm", "sm", "md"]}
                      >
                        Medium
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {
                          scanReport.multi_file_scan_summary
                            .issue_severity_distribution.medium
                        }
                      </Text>
                      <SeverityIcon size={10} variant={"medium"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text
                        fontWeight={300}
                        fontSize={["sm", "sm", "sm", "md"]}
                      >
                        Low
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {
                          scanReport.multi_file_scan_summary
                            .issue_severity_distribution.low
                        }
                      </Text>
                      <SeverityIcon size={10} variant={"low"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text
                        fontWeight={300}
                        fontSize={["sm", "sm", "sm", "md"]}
                      >
                        Informational
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {
                          scanReport.multi_file_scan_summary
                            .issue_severity_distribution.informational
                        }
                      </Text>
                      <SeverityIcon size={10} variant={"informational"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text fontWeight={300} fontSize="md">
                        Gas
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {
                          scanReport.multi_file_scan_summary
                            .issue_severity_distribution.gas
                        }
                      </Text>
                      <SeverityIcon size={10} variant={"gas"} />
                    </Box>
                  </HStack>
                </Box>
              </Stack>

              <Stack
                w={"100%"}
                mt={10}
                spacing={"5%"}
                direction={["column", "column", "column", "row"]}
              >
                <Box
                  w={["100%", "100%", "100%", "47.5%"]}
                  borderRadius={15}
                  p={5}
                  background={" #FAFBFC "}
                  display="flex"
                  flexDir={"column"}
                  alignItems={["center", "center", "center", "flex-start"]}
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
                        {scanReport.multi_file_scan_summary.scan_time_taken}{" "}
                        seconds
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
                    w={["100%", "100%", "100%", "47.5%"]}
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
                        This contract has been manually verified by
                        SolidityScan's internal security team as per the highest
                        smart contract security standards as of{" "}
                        {`${d.getDate()} ${
                          monthNames[d.getMonth()]
                        } ${d.getFullYear()}`}
                        .{" "}
                      </Text>

                      <Button
                        alignSelf={"flex-end"}
                        type="submit"
                        variant="brand"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `http://${document.location.host}/published-report/block/${scanReport.latest_report_id}`,
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
                    w={["100%", "100%", "100%", "47.5%"]}
                    borderRadius={15}
                    p={5}
                    background={" #FAFBFC "}
                    display="flex"
                    flexDir={"column"}
                    alignItems={["center", "center", "center", "flex-start"]}
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
                      flexDir={["column", "column", "column", "row"]}
                      alignItems={["center", "center", "center", "flex-start"]}
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
                      <VStack
                        ml={[0, 0, 0, 10]}
                        mt={[2, 2, 2, 0]}
                        w={["100%", "100%", "100%", "calc(100% - 200px)"]}
                      >
                        <Text textAlign={"left"} fontSize="sm">
                          This contract has been analyzed by more than 110
                          proprietary vulnerability patterns of SolidityScan.
                          Vulnerability details and mechanisms to remediate the
                          risks tailored specific to the contract are now
                          available in the link below.
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
              </Stack>

              <Box
                w={"100%"}
                borderRadius={15}
                p={5}
                mt={10}
                background={" #FAFBFC "}
                display="flex"
                flexDir={"column"}
                alignItems={["center", "center", "center", "flex-start"]}
                justifyContent={"flex-start"}
              >
                <Text fontSize="md">THREAT SCAN SUMMARY</Text>
                <Text fontSize="sm" my={5} color={'gray.400'} textAlign='left'>ThreatScan, a smart contract analysis tool, is built by the SolidityScan team. It is designed to assist users in identifying potential rug pull scams by providing an in-depth analysis of a smart contract's code and highlighting any potential red flags that may indicate a scam.</Text>
                <Box
                  w={"100%"}
                  borderRadius={15}
                  p={[4, 4, 4, 10]}
                  mt={5}
                  background={" #FFFFFF "}
                  display="flex"
                  flexDir={"column"}
                  alignItems={[
                    "flex-start",
                    "flex-start",
                    "flex-start",
                    "center",
                  ]}
                  justifyContent={"center"}
                >
                  {scanReport.quick_file_scan_details.map((item) =>
                    isDesktopView ? (
                      <>
                        <HStack my={5} width={"100%"}>
                          <Image src={`/icons/${item.issue_status}.svg`} />
                          <VStack
                            ml={"30px !important"}
                            alignItems={"flex-start"}
                          >
                            <Heading fontSize="md">{item.issue_name}</Heading>
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
                    ) : (
                      <>
                        <VStack my={5} width={"100%"} alignItems={"flex-start"}>
                          <HStack mb={2}>
                            <Image src={`/icons/${item.issue_status}.svg`} />
                            <Heading fontSize="md">{item.issue_name}</Heading>
                          </HStack>
                          <DescriptionWrapper>
                            <Box
                              dangerouslySetInnerHTML={{
                                __html: item.issue_description,
                              }}
                            />
                          </DescriptionWrapper>
                        </VStack>
                        <Divider />
                      </>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          )}

          {scanReport === null && (
            <Box
              ref={elementRef}
              display={"flex"}
              flexDir="column"
              alignItems="center"
              justifyContent={"flex-start"}
              w={["90%"]}
              px={[0, 0, 0, 10]}
              mt={"-120px"}
              py={[0, 0, 0, 10]}
              borderRadius={20}
              background={"#FFFFFF"}
            >
              <Stack
                w={"100%"}
                spacing={"5%"}
                mb={20}
                direction={["column", "column", "column", "row"]}
              >
                <Box
                  w={["100%", "100%", "100%", "20%"]}
                  h={"250px"}
                  borderRadius={15}
                  px={[0, 0, 0, 5]}
                  py={5}
                  background={
                    parseFloat("0.0") < 2.5
                      ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                      : parseFloat("0.0") >= 4.5
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
                          {0.0}
                        </Text>
                      </Box>
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text fontWeight={300} fontSize="sm" mt={5}>
                    Your Solidity Score Low
                  </Text>
                </Box>
                <Box
                  w={["100%", "100%", "100%", "75%"]}
                  borderRadius={15}
                  p={5}
                  h={["fit-content", "fit-content", "250px"]}
                  background={" #FAFBFC "}
                  display="flex"
                  flexDir={"column"}
                  alignItems={["center", "center", "center", "flex-start"]}
                  justifyContent={"flex-start"}
                >
                  <Text fontSize="md">VULNERABILITIES DETECTED</Text>
                  <HStack
                    mt={5}
                    width={["100%"]}
                    justify={"space-between"}
                    alignContent="space-between"
                    flexWrap="wrap"
                    spacing={0}
                    h={"350px"}
                  >
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text fontWeight={300} fontSize="md">
                        Critical
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {0}
                      </Text>
                      <SeverityIcon size={10} variant={"critical"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text fontWeight={300} fontSize="md">
                        High
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {0}
                      </Text>
                      <SeverityIcon size={10} variant={"high"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text
                        fontWeight={300}
                        fontSize={["sm", "sm", "sm", "md"]}
                      >
                        Medium
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {0}
                      </Text>
                      <SeverityIcon size={10} variant={"medium"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text
                        fontWeight={300}
                        fontSize={["sm", "sm", "sm", "md"]}
                      >
                        Low
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {0}
                      </Text>
                      <SeverityIcon size={10} variant={"low"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text
                        fontWeight={300}
                        fontSize={["sm", "sm", "sm", "md"]}
                      >
                        Informational
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {0}
                      </Text>
                      <SeverityIcon size={10} variant={"informational"} />
                    </Box>
                    <Box
                      w={["30%", "30%", "15%"]}
                      borderRadius={15}
                      h={"160px"}
                      background={" #FFFFFF "}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Text fontWeight={300} fontSize="md">
                        Gas
                      </Text>
                      <Text fontSize="xl" my={3}>
                        {0}
                      </Text>
                      <SeverityIcon size={10} variant={"gas"} />
                    </Box>
                  </HStack>
                </Box>
              </Stack>
              <Heading mt={10} as="h1" fontSize="3xl" mb={4}>
                Recent Scanned
                <Box ml={2} as="span" color="#3300FF">
                  Contracts
                </Box>{" "}
              </Heading>

              <Box
                w={"100%"}
                borderRadius={15}
                p={[0, 0, 5]}
                mt={[0, 0, 10]}
                background={["#FFFFFF", "#FFFFFF", "#FAFBFC"]}
                display="flex"
                flexDir={"column"}
                alignItems={["center", "center", "center", "flex-start"]}
                justifyContent={"flex-start"}
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  w="100%"
                  p={5}
                  py={0}
                  spacing={0}
                  display={["none", "none", "flex"]}
                >
                  <Text
                    fontWeight={600}
                    textAlign={"left"}
                    w={"25%"}
                    fontSize="sm"
                  >
                    Contract Address
                  </Text>
                  <Text
                    fontWeight={600}
                    textAlign={"left"}
                    w={"10%"}
                    fontSize="sm"
                  >
                    Security Score
                  </Text>
                  <Text
                    fontWeight={600}
                    textAlign={"left"}
                    w={"20%"}
                    fontSize="sm"
                  >
                    Blockscan
                  </Text>
                  <Text
                    fontWeight={600}
                    textAlign={"left"}
                    w={"35%"}
                    fontSize="sm"
                  >
                    Actions
                  </Text>
                </HStack>
                <Box
                  w={"100%"}
                  borderRadius={15}
                  p={5}
                  mt={5}
                  background={" #FFFFFF "}
                  display="flex"
                  flexDir={"column"}
                  alignItems={[
                    "flex-start",
                    "flex-start",
                    "flex-start",
                    "center",
                  ]}
                  justifyContent={"center"}
                >
                  <VStack
                    width={"100%"}
                    justifyContent="flex-start"
                    alignItems={"flex-start"}
                    spacing={4}
                  >
                    {recentScansLoading ? (
                      <Flex
                        w={"100%"}
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Spinner />
                      </Flex>
                    ) : (
                      recentScans.scans.map((item: any) => (
                        <>
                          <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            w="100%"
                            spacing={0}
                          >
                            <Image
                              display={["block", "block", "none"]}
                              height={"20px"}
                              width={"20px"}
                              src={`/blockscan/${item.contract_platform}.svg`}
                            />
                            <Text
                              color={"#8A94A6"}
                              textAlign={"left"}
                              w={["50%", "50%", "25%"]}
                              fontSize="sm"
                              isTruncated
                            >
                              {item.contract_address}
                            </Text>
                            <Text
                              color={"#3300FF"}
                              textAlign={"center"}
                              w={["20%", "20%", "10%"]}
                              fontSize="md"
                              fontWeight={700}
                            >
                              {item.score}
                              <Box as={"span"} color="gray.500" fontSize={"xs"}>
                                /5
                              </Box>
                            </Text>
                            <HStack
                              display={["none", "none", "flex"]}
                              w={"20%"}
                              justifyContent="flex-start"
                              alignItems={"center"}
                              spacing={3}
                            >
                              <Image
                                height={"20px"}
                                width={"20px"}
                                src={`/blockscan/${item.contract_platform}.svg`}
                              />
                              <Text
                                color={"#8A94A6"}
                                textAlign={"left"}
                                fontSize="sm"
                              >
                                {blockScans[item.contract_platform]}
                              </Text>
                            </HStack>
                            <HStack
                              display={["none", "none", "flex"]}
                              w={"35%"}
                              justifyContent="flex-start"
                              alignItems={"center"}
                              spacing={3}
                            >
                              <Link
                                variant="subtle-without-underline"
                                href={item.scanner_reference_url}
                                isExternal
                              >
                                <Button
                                  fontWeight={100}
                                  fontSize={13}
                                  height={9}
                                  borderColor="#000000"
                                  variant={"outline"}
                                  color="#000000"
                                >
                                  View Scan
                                </Button>
                              </Link>
                              <Link href={item.contract_url} isExternal>
                                <HStack>
                                  <Text
                                    color={"#323B4B"}
                                    textAlign={"left"}
                                    fontSize="sm"
                                  >
                                    View Contract
                                  </Text>
                                  <ExternalLinkIcon color={"#323B4B"} />
                                </HStack>
                              </Link>
                            </HStack>
                            <Menu isLazy>
                              <MenuButton
                                display={["block", "block", "none"]}
                                aria-label="Options"
                              >
                                <FaEllipsisV color={"#8A94A6"} />
                              </MenuButton>
                              <MenuList p={2}>
                                <Link
                                  href={item.scanner_reference_url}
                                  isExternal
                                >
                                  <MenuItem>View Scan</MenuItem>
                                </Link>
                                <Divider my={1} />
                                <Link href={item.contract_url} isExternal>
                                  <MenuItem>View Contract</MenuItem>
                                </Link>
                              </MenuList>
                            </Menu>
                          </HStack>
                          <Divider />
                        </>
                      ))
                    )}
                  </VStack>
                </Box>
              </Box>
            </Box>
          )}

          <Box
            ref={elementRef}
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={"90%"}
            px={[0, 0, 10]}
            py={10}
            borderRadius={20}
            background={"#FFFFFF"}
          >
            <Heading as="h1" fontSize="3xl" mb={4}>
              Why{" "}
              <Box as="span" color="#3300FF">
                SolidityScan ?
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <Infographics />
            <SignupBox />
          </Box>
        </Flex>

        <Footer />
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

import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { getAssetsURL, getReCaptchaHeaders } from "helpers/helperFunction";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link,
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
  Tooltip,
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
import { QuickScanResult, RecentQSItem, Pagination, Page } from "common/types";
import { sentenceCapitalize } from "helpers/helperFunction";
import PieChart from "components/pieChart";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { monthNames } from "common/values";
import SignupBox from "components/signupBox";
import Infographics from "components/infographics";
import { blockScans } from "common/values";
import { useRecentQuickScans } from "hooks/useRecentQuickScans";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { API_PATH } from "helpers/routeManager";
import { ThreatScoreMeter } from "components/threatScoreMeter";
import reCAPTCHA from "helpers/reCAPTCHA";
import { useConfig } from "hooks/useConfig";
import PaginationNav from "components/common/PaginationNav";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";

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
    color: "#960D00",
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
}> = ({ value, label, icon }) => {
  const assetsURL = getAssetsURL();

  return (
    <div id={value} style={{ display: "flex", flexDirection: "row" }}>
      {icon !== "" && (
        <Image
          h={"20px"}
          w={"20px"}
          mr={3}
          src={`${assetsURL}blockscan/${icon}.svg`}
        />
      )}
      <div>{label}</div>
    </div>
  );
};

const QuickScan: React.FC = () => {
  const contractChain: {
    [key: string]: {
      label: string;
      value: string;
      icon: string;
      isDisabled: boolean;
    }[];
  } = {
    etherscan: [
      {
        value: "mainnet",
        label: "Ethereum Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "sepolia",
        label: "Sepolia Testnet",
        icon: "",
        isDisabled: false,
      },
      { value: "goerli", label: "Goerli Testnet", icon: "", isDisabled: false },
    ],
    bscscan: [
      { value: "mainnet", label: "Bsc Mainnet", icon: "", isDisabled: false },
      { value: "testnet", label: "Bsc Testnet", icon: "", isDisabled: false },
    ],
    polygonscan: [
      {
        value: "mainnet",
        label: "Polygon Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Polygon Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    avalanche: [
      {
        value: "mainnet",
        label: "Avalanche Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Avalanche Fuji Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    fantom: [
      { value: "mainnet", label: "FTM Mainnet", icon: "", isDisabled: false },
      { value: "testnet", label: "FTM Testnet", icon: "", isDisabled: false },
    ],
    cronos: [
      {
        value: "mainnet",
        label: "Cronos Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Cronos Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    celo: [
      { value: "mainnet", label: "Celo Mainnet", icon: "", isDisabled: false },
      {
        value: "testnet",
        label: "Alfajores Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    aurora: [
      {
        value: "mainnet",
        label: "Aurora Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Aurora Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    arbiscan: [
      {
        value: "mainnet",
        label: "Arbiscan Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "goerli",
        label: "Arbiscan Goerli",
        icon: "",
        isDisabled: false,
      },
    ],
    reefscan: [
      {
        value: "mainnet",
        label: "ReefScan Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "ReefScan Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    optimism: [
      {
        value: "mainnet",
        label: "Optimism Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "goerli",
        label: "Optimism Goerli Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    xdc: [
      {
        value: "mainnet",
        label: "XDC Mainnet",
        icon: "",
        isDisabled: false,
      },
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
    {
      value: "reefscan",
      icon: "reefscan",
      label: "ReefScan - (reefscan.io)",
    },
    {
      value: "buildbear",
      icon: "buildbear",
      label: "Buildbear - (buildbear.io)",
    },
    {
      value: "optimism",
      icon: "optimism",
      label: "Optimism - (optimism.io)",
    },
    {
      value: "xdc",
      icon: "xdc",
      label: "XDC - (xdc.blocksscan.io)",
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
      width: isDesktopView ? "300px" : "95%",
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
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");

  const [address, setAddress] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [node_id, setNodeId] = React.useState("");
  const [chain, setChain] = React.useState<{
    label: string;
    value: string;
    icon: string;
  } | null>(null);
  const [chainList, setChainList] = React.useState<
    { label: string; value: string; icon: string }[]
  >(contractChain["etherscan"]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [scanReport, setScanReport] = React.useState<QuickScanResult | null>(
    null
  );
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const ref = query.get("ref");
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: 1,
    perPageCount: 10,
  });
  const [recentScans, setRecentScans] = useState<RecentQSItem[]>([]);
  const [isRecentScansLoading, setIsRecentScansLoading] =
    useState<boolean>(false);

  let d = new Date();

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref) {
      localStorage.setItem("campaign_type", ref);
      localStorage.setItem("campaign_id", ref);
      sessionStorage.setItem("ref", ref);
    } else if (
      !localStorage.getItem("campaign_id") &&
      !localStorage.getItem("campaign_type")
    ) {
      const campaign_type = query.get("utm_source") || "quickscan";
      const campaign_id = query.get("utm_campaign") || "quickscan";
      localStorage.setItem("campaign_type", campaign_type);
      localStorage.setItem("campaign_id", campaign_id);
    }

    if (blockAddress) setAddress(blockAddress);

    if (blockPlatform) {
      setPlatform(blockPlatform);
      setChainList(contractChain[blockPlatform]);
      setChain(null);
    }

    if (blockPlatform === "buildbear") {
      setNodeId(blockChain);
    } else {
      if (blockChain) {
        contractChain[blockPlatform].forEach((item) => {
          if (item.value === blockChain) {
            setChain(item);
          }
        });
      }
    }

    if (blockAddress && blockChain && blockPlatform) {
      setIsLoading(true);
      runQuickScan(blockAddress, blockPlatform, blockChain, ref);
    }

    if (ref) {
      runRecentQuickScan(ref);
    } else {
      const refSession = sessionStorage.getItem("ref");
      runRecentQuickScan(refSession);
    }
  }, []);

  const runRecentQuickScan = async (
    ref: string | null,
    page: number = 1,
    perPageCount: number = pagination.perPageCount
  ) => {
    setIsRecentScansLoading(true);
    let api_url = `${API_PATH.API_GET_LATEST_QS}?page=${page}&per_page=${perPageCount}`;
    if (ref) {
      api_url = api_url + `&ref=${ref}`;
    }
    const { data } = await API.get<{ data: RecentQSItem[]; page: Page }>(
      api_url
    );
    if (data) {
      setRecentScans(data.data);
      if (!pagination.totalPages)
        setPagination({ ...pagination, totalPages: data.page.total_pages });
    }
    setIsRecentScansLoading(false);
  };

  const runQuickScan = async (
    address: string,
    platform: string,
    chain: string,
    ref: string | null
  ) => {
    let reqHeaders1 = await getReCaptchaHeaders("quickScan_verify");
    let reqHeaders2 = await getReCaptchaHeaders("quickScan");

    const req = {
      contract_address: address,
      contract_platform: platform,
      [platform === "buildbear" ? "node_id" : "contract_chain"]: chain,
    };
    API.post<{
      contract_verified: boolean;
      message: string;
      status: string;
    }>(API_PATH.API_GET_CONTRACT_STATUS, req, {
      headers: reqHeaders1,
    }).then(
      (res) => {
        if (res.data.contract_verified) {
          let api_url = `${
            API_PATH.API_QUICK_SCAN_SSE
          }?contract_address=${address}&contract_platform=${platform}&${
            platform === "buildbear" ? "node_id" : "contract_chain"
          }=${chain}`;

          if (ref) {
            api_url = api_url + `&ref=${ref}`;
          }
          API.get(api_url, {
            headers: reqHeaders2,
          })
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
      },
      (err) => {
        setIsLoading(false);
      }
    );
  };

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
    if (chain && chain.value === "") {
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
    if (platform === "buildbear") {
      runQuickScan(address, platform, node_id, ref);
    } else {
      if (chain) {
        runQuickScan(address, platform, chain.value, ref);
      }
    }
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

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, pageNo: page });
    runRecentQuickScan(ref, page);
  };

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

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
            background={`url('${assetsURL}quickscan/quickscan_bg_lg.svg')`}
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
              spacing={isDesktopView ? 0 : 2}
            >
              <Select
                formatOptionLabel={formatOptionLabel}
                options={options}
                isSearchable={true}
                value={options.find((item) => platform === item.value)}
                placeholder="Select Contract Platform"
                styles={customStylesPlatform}
                onChange={(newValue) => {
                  if (newValue) {
                    // setAction(newValue.value)
                    setPlatform(newValue.value);
                    setChainList(contractChain[newValue.value]);
                    setChain(null);
                  }
                }}
              />

              {platform === "buildbear" ? (
                <Input
                  isRequired
                  placeholder="Node ID"
                  variant="brand"
                  size="lg"
                  height={50}
                  borderRadius={[15, 15, 15, 0]}
                  width={["95%", "95%", "95%", "300px"]}
                  value={node_id}
                  onChange={(e) => {
                    setNodeId(e.target.value);
                  }}
                />
              ) : (
                <Select
                  formatOptionLabel={formatOptionLabel}
                  isDisabled={platform === ""}
                  isSearchable={false}
                  value={chain}
                  options={chainList}
                  placeholder="Select Contract Chain"
                  styles={customStylesChain}
                  onChange={(newValue) => {
                    if (newValue) {
                      setChain(newValue);
                    }
                  }}
                />
              )}
              <Input
                isRequired
                placeholder="Contract Address"
                variant="brand"
                size="lg"
                height={50}
                borderTopLeftRadius={[15, 15, 15, 0]}
                borderBottomLeftRadius={[15, 15, 15, 0]}
                width={["95%", "95%", "95%", "500px"]}
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

          <Box
            ref={elementRef}
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={"90%"}
            px={[0, 0, 10]}
            mt={"-120px"}
            py={[0, 0, 10]}
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
                  scanReport
                    ? parseFloat(scanReport.multi_file_scan_summary.score) < 2.5
                      ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                      : parseFloat(scanReport.multi_file_scan_summary.score) >=
                        4.5
                      ? "linear-gradient(96.27deg, #EFFFED 0.75%, #E6FFE2 96.71%)"
                      : "linear-gradient(96.27deg, #FFFAF2 0.75%, #FFF4E1 96.71%)"
                    : "linear-gradient(96.27deg, #FFFAF2 0.75%, #FFF4E1 96.71%)"
                }
              >
                <Text fontSize="md" fontWeight={600} mb={5}>
                  Solidity Score
                </Text>
                <SolidityScoreProgress
                  score={
                    scanReport ? scanReport.multi_file_scan_summary.score : "0"
                  }
                  size={"100px"}
                  thickness={"8px"}
                />
                <Text fontWeight={300} fontSize="sm" mt={5}>
                  Your Solidity Score is{" "}
                  {scanReport
                    ? parseFloat(scanReport.multi_file_scan_summary.score) < 2.5
                      ? " LOW"
                      : parseFloat(scanReport.multi_file_scan_summary.score) >=
                        4.5
                      ? " GREAT"
                      : " AVERAGE"
                    : "Low"}
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
                <Text fontSize="md" fontWeight={600}>
                  VULNERABILITIES DETECTED
                </Text>
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
                      {scanReport
                        ? scanReport.multi_file_scan_summary
                            .issue_severity_distribution.critical
                        : 0}
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
                      {scanReport
                        ? scanReport.multi_file_scan_summary
                            .issue_severity_distribution.high
                        : 0}
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
                    <Text fontWeight={300} fontSize={["sm", "sm", "sm", "md"]}>
                      Medium
                    </Text>
                    <Text fontSize="xl" my={3}>
                      {scanReport
                        ? scanReport.multi_file_scan_summary
                            .issue_severity_distribution.medium
                        : 0}
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
                    <Text fontWeight={300} fontSize={["sm", "sm", "sm", "md"]}>
                      Low
                    </Text>
                    <Text fontSize="xl" my={3}>
                      {scanReport
                        ? scanReport.multi_file_scan_summary
                            .issue_severity_distribution.low
                        : 0}
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
                    <Text fontWeight={300} fontSize={["sm", "sm", "sm", "md"]}>
                      Informational
                    </Text>
                    <Text fontSize="xl" my={3}>
                      {scanReport
                        ? scanReport.multi_file_scan_summary
                            .issue_severity_distribution.informational
                        : 0}
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
                      {scanReport
                        ? scanReport.multi_file_scan_summary
                            .issue_severity_distribution.gas
                        : 0}
                    </Text>
                    <SeverityIcon size={10} variant={"gas"} />
                  </Box>
                </HStack>
              </Box>
            </Stack>

            {scanReport === null ? (
              <>
                <Heading mt={20} as="h1" fontSize="3xl" mb={4}>
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
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    w="100%"
                    px={[0, 0, 0, 6]}
                    py={0}
                    ml={[0, 0, 20, 2]}
                    spacing={4}
                    display={["none", "none", "flex"]}
                  >
                    <Text
                      fontWeight={600}
                      textAlign={"left"}
                      w={"30%"}
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
                      w={"15%"}
                      fontSize="sm"
                    >
                      ThreatScore
                    </Text>
                    <Text
                      fontWeight={600}
                      textAlign={"left"}
                      w={"25%"}
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
                      {isRecentScansLoading && !recentScans.length ? (
                        <Flex
                          w={"100%"}
                          alignItems={"center"}
                          justifyContent="center"
                        >
                          <Spinner />
                        </Flex>
                      ) : (
                        <Box w="100%" px={[0, 0, 0, 4]}>
                          {recentScans.map((item: any, index: number) => (
                            <>
                              <HStack
                                justifyContent="flex-start"
                                alignItems="center"
                                w="100%"
                                spacing={[5, 5, 5, 6]}
                              >
                                {!isDesktopView && (
                                  <Image
                                    display={["block", "block", "none"]}
                                    height={"20px"}
                                    width={"20px"}
                                    src={`${assetsURL}blockscan/${item.contract_platform}.svg`}
                                  />
                                )}
                                <Tooltip label={item.contract_address}>
                                  <Text
                                    color={"#8A94A6"}
                                    textAlign={"left"}
                                    w={["50%", "50%", "30%"]}
                                    fontSize="sm"
                                    isTruncated
                                  >
                                    {item.contract_address}
                                  </Text>
                                </Tooltip>
                                <Text
                                  color={"#3300FF"}
                                  textAlign={"left"}
                                  w={["20%", "20%", "10%"]}
                                  fontSize="md"
                                  fontWeight={700}
                                >
                                  {item.score}
                                  <Box
                                    as={"span"}
                                    color="gray.500"
                                    fontSize={"xs"}
                                  >
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
                                    src={`${assetsURL}blockscan/${item.contract_platform}.svg`}
                                  />
                                  <Tooltip
                                    label={blockScans[item.contract_platform]}
                                  >
                                    <Text
                                      color={"#8A94A6"}
                                      textAlign={"left"}
                                      fontSize="sm"
                                      isTruncated
                                    >
                                      {blockScans[item.contract_platform]}
                                    </Text>
                                  </Tooltip>
                                </HStack>
                                <Flex w={"15%"} pt={3} pb={4}>
                                  {isDesktopView ? (
                                    <ThreatScoreMeter
                                      percentage={Math.round(item.threat_score)}
                                      diameter={85}
                                      strokeWidth={4}
                                      fontSize="md"
                                      subtleFontSize="xx-small"
                                      textMarginTop={-5}
                                    />
                                  ) : (
                                    <Text
                                      textAlign={"left"}
                                      fontSize="md"
                                      fontWeight={700}
                                      pr={2}
                                    >
                                      {Math.round(item.threat_score)}
                                      <Box
                                        as={"span"}
                                        color="gray.500"
                                        fontSize={"xs"}
                                      >
                                        /100
                                      </Box>
                                    </Text>
                                  )}
                                </Flex>
                                <Flex
                                  display={["none", "none", "none", "flex"]}
                                  w={"25%"}
                                  justifyContent="flex-start"
                                  alignItems={"center"}
                                  ml={4}
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
                                  <Link
                                    href={item.contract_url}
                                    isExternal
                                    ml="8"
                                  >
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
                                </Flex>
                                <Menu isLazy>
                                  <MenuButton
                                    display={[
                                      "block",
                                      "block",
                                      "block",
                                      "none",
                                    ]}
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
                              {index !== recentScans.length - 1 && <Divider />}
                            </>
                          ))}
                          {isRecentScansLoading && (
                            <Flex
                              w={"100%"}
                              h={"100%"}
                              position={"absolute"}
                              top={0}
                              left={0}
                              alignItems={"center"}
                              justifyContent="center"
                              sx={{
                                backdropFilter: "blur(2px)",
                              }}
                            >
                              <Spinner />
                            </Flex>
                          )}
                        </Box>
                      )}
                    </VStack>
                  </Box>
                  <Flex
                    w={"100%"}
                    alignItems={"center"}
                    justifyContent="center"
                    mt={10}
                    mb={6}
                  >
                    {pagination.totalPages && (
                      <PaginationNav
                        currentPage={pagination.pageNo}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </Flex>
                </Box>
              </>
            ) : (
              <>
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
                    <Text fontSize="md" fontWeight={600}>
                      SCAN STATISTICS
                    </Text>
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
                    </Box>
                  </Box>
                  {scanReport.is_approved ? (
                    <Box
                      w={["100%", "100%", "100%", "47.5%"]}
                      borderRadius={15}
                      p={8}
                      backgroundColor={"#02070E"}
                      backgroundImage={`url('${assetsURL}background/verifiedAuditbg.png')`}
                      display="flex"
                      height={"280px"}
                      flexDir={"row"}
                      alignItems="flex-start"
                      justifyContent={"flex-start"}
                    >
                      <Image
                        mr={10}
                        src={`${assetsURL}common/verifiedAuditSeal.svg`}
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
                          SolidityScan's internal security team as per the
                          highest smart contract security standards as of{" "}
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
                      <Text fontSize="md" fontWeight={600}>
                        DETAILED RESULT
                      </Text>
                      <Box
                        w={"100%"}
                        borderRadius={15}
                        p={5}
                        mt={5}
                        background={" #FFFFFF "}
                        display="flex"
                        flexDir={["column", "column", "column", "row"]}
                        alignItems={[
                          "center",
                          "center",
                          "center",
                          "flex-start",
                        ]}
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
                            This contract has been analyzed by more than{" "}
                            {no_of_vuln_detectors}&nbsp; proprietary
                            vulnerability patterns of SolidityScan.
                            Vulnerability details and mechanisms to remediate
                            the risks tailored specific to the contract are now
                            available in the link below.
                          </Text>
                          <RouterLink to="/signup">
                            <Button variant="accent-ghost">
                              View Detailed Result <ArrowForwardIcon ml={5} />
                            </Button>
                          </RouterLink>
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
                  <Text fontSize="md" fontWeight={600}>
                    THREAT SCAN SUMMARY
                  </Text>
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
                    <Stack
                      direction={["column", "column", "column", "row"]}
                      alignItems="center"
                      mt={4}
                      mb={10}
                      spacing={10}
                    >
                      <VStack>
                        <ThreatScoreMeter
                          percentage={
                            scanReport.multi_file_scan_summary.threat_score
                          }
                        />
                        <Text color={"detail"} fontWeight="600">
                          Threat Score
                        </Text>
                      </VStack>
                      <Text fontSize="md" textAlign="left">
                        ThreatScan, a smart contract analysis tool, is built by
                        the SolidityScan team. It is designed to assist users in
                        identifying potential rug pull scams by providing an
                        in-depth analysis of a smart contract's code and
                        highlighting any potential red flags that may indicate a
                        scam.
                      </Text>
                    </Stack>
                    <Divider />
                    {scanReport.quick_file_scan_details.map((item, index) =>
                      isDesktopView ? (
                        <>
                          <HStack my={5} width={"100%"}>
                            <Image
                              src={`${assetsURL}icons/${item.issue_status}.svg`}
                            />
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
                          {index !==
                            scanReport.quick_file_scan_details.length - 1 && (
                            <Divider />
                          )}
                        </>
                      ) : (
                        <>
                          <VStack
                            my={5}
                            width={"100%"}
                            alignItems={"flex-start"}
                          >
                            <HStack mb={2}>
                              <Image
                                src={`${assetsURL}icons/${item.issue_status}.svg`}
                              />
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
              </>
            )}
          </Box>

          <Box
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={"95%"}
            px={[0, 0, 10]}
            py={20}
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
    color: #4e5d78;
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

import React, { lazy, useEffect, useRef, useState, Suspense } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { getAssetsURL, getReCaptchaHeaders } from "helpers/helperFunction";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  HStack,
  Input,
  useToast,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";

import { SeverityIcon } from "components/icons";
import Select from "react-select";
import API from "helpers/api";
import { QuickScanResult } from "common/types";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";

const RecentScans = lazy(() => import("components/quickscan/RecentScans"));
const QuickScanDetails = lazy(
  () => import("components/quickscan/QuickScanDetails")
);

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
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

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
  }, []);

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

  return (
    <>
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
                    ? parseFloat(scanReport.multi_file_scan_summary.score_v2) <
                      50
                      ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                      : parseFloat(
                          scanReport.multi_file_scan_summary.score_v2
                        ) >= 90
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
                    scanReport
                      ? scanReport.multi_file_scan_summary.score_v2
                      : "0"
                  }
                  size={"100px"}
                  thickness={"8px"}
                />
                <Text fontWeight={300} fontSize="sm" mt={5}>
                  Your Solidity Score is{" "}
                  {scanReport
                    ? parseFloat(scanReport.multi_file_scan_summary.score_v2) <
                      50
                      ? " LOW"
                      : parseFloat(
                          scanReport.multi_file_scan_summary.score_v2
                        ) >= 90
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
              <Suspense fallback={""}>
                <RecentScans />
              </Suspense>
            ) : (
              <Suspense fallback={""}>
                <QuickScanDetails scanReport={scanReport} />
              </Suspense>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default QuickScan;

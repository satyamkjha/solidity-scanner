import React, {
  lazy,
  useEffect,
  useRef,
  Suspense,
  PropsWithChildren,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getReCaptchaHeaders,
  checkContractAddress,
} from "helpers/helperFunction";
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
import Select, { StylesConfig, GroupBase } from "react-select";
import API from "helpers/api";
import { QuickScanResult, OptionTypeWithIcon } from "common/types";
import { API_PATH } from "helpers/routeManager";

import SolidityScoreProgress from "components/common/SolidityScoreProgress";
import Loader from "components/styled-components/Loader";
import QuickScanForm from "components/quickscan/QuickScanForm";
import { Header } from "components/header";

const RecentScans = lazy(() => import("components/quickscan/RecentScans"));
const QuickScanDetails = lazy(
  () => import("components/quickscan/QuickScanDetails")
);

const QuickScan: React.FC = () => {
  const toast = useToast();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [scanReport, setScanReport] = React.useState<QuickScanResult | null>(
    null
  );

  const elementRef = useRef<HTMLDivElement>(null);

  const runQuickScan = async (
    address: string,
    platform: string,
    chain: string,
    ref: string | null
  ) => {
    const reqHeaders1 = await getReCaptchaHeaders("quickScan_verify");
    const reqHeaders2 = await getReCaptchaHeaders("quickScan");
    setScanReport(null);
    if (platform !== "buildbear" && !checkContractAddress(address)) {
      toast({
        title: "Contract Adddress not Valid",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const req = {
      contract_address: address,
      contract_platform: platform,
      [platform === "buildbear" ? "node_id" : "contract_chain"]: chain,
    };
    setIsLoading(true);
    API.post<{
      contract_verified: boolean;
      message: string;
      status: string;
    }>(API_PATH.API_GET_CONTRACT_STATUS, req, {
      headers: reqHeaders1,
    })
      .then(
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
                  }
                },
                () => {
                  return;
                }
              )
              .finally(() => {
                setIsLoading(false);
              });
          }
        },
        () => {
          setIsLoading(false);
        }
      )
      .catch(() => {
        setIsLoading(false);
      });
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
        inline: "center",
      });
    }
  };

  return (
    <Flex
      as="section"
      w="100%"
      justifyContent="flex-start"
      alignItems="center"
      p={0}
      textAlign={"center"}
      flexDir="column"
    >
      <Box
        w={"100%"}
        bg={"linear-gradient(180deg, #04080D -50.31%, #2900DE 282.02%)"}
      >
        <Header theme={"dark"} />
        <QuickScanForm
          view="quickscan"
          runQuickScan={runQuickScan}
          isLoading={isLoading}
        />
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
        zIndex={10}
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
                ? parseFloat(scanReport.multi_file_scan_summary.score_v2) < 50
                  ? "linear-gradient(96.27deg, #FFF3F0 0.75%, #FFE0D9 96.71%)"
                  : parseFloat(scanReport.multi_file_scan_summary.score_v2) >=
                    90
                  ? "linear-gradient(96.27deg, #EFFFED 0.75%, #E6FFE2 96.71%)"
                  : "linear-gradient(96.27deg, #FFFAF2 0.75%, #FFF4E1 96.71%)"
                : "linear-gradient(96.27deg, #FFFAF2 0.75%, #FFF4E1 96.71%)"
            }
          >
            <Text fontSize="md" fontWeight={600} mb={5}>
              Security Score
            </Text>
            <SolidityScoreProgress
              score={
                scanReport ? scanReport.multi_file_scan_summary.score_v2 : "0"
              }
              size={"100px"}
              thickness={"8px"}
            />
            <Text fontWeight={300} fontSize="sm" mt={5}>
              Your Security Score is{" "}
              {scanReport
                ? parseFloat(scanReport.multi_file_scan_summary.score_v2) < 50
                  ? " LOW"
                  : parseFloat(scanReport.multi_file_scan_summary.score_v2) >=
                    90
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
  );
};

export default QuickScan;

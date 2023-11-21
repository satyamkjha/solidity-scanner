import React, { lazy, useEffect, useRef, Suspense } from "react";
import {
  getReCaptchaHeaders,
  checkContractAddress,
} from "helpers/helperFunction";
import {
  Flex,
  Box,
  Text,
  HStack,
  useToast,
  Stack,
  VStack,
  Image,
  CloseButton,
} from "@chakra-ui/react";

import { SeverityIcon } from "components/icons";
import API from "helpers/api";
import { QuickScanResult } from "common/types";
import { API_PATH } from "helpers/routeManager";

import SolidityScoreProgress from "components/common/SolidityScoreProgress";
import QuickScanForm from "components/quickscan/QuickScanForm";
import { Header } from "components/header";
import Loader from "components/styled-components/Loader";
import { useParams, useLocation } from "react-router-dom";
import { QuickScanResultContainer } from "components/quickscan/QuickScanResult";

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

  const { blockAddress, blockPlatform, blockChain } = useParams<{
    blockAddress: string;
    blockPlatform: string;
    blockChain: string;
  }>();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const ref = query.get("ref");

  useEffect(() => {
    if (blockAddress && blockChain && blockPlatform) {
      runQuickScan(blockAddress, blockPlatform, blockChain, ref);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // useEffect(() => {
  //   if (scanReport !== null) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  //     scrollToElement();
  //   }
  // }, [scanReport]);

  // const scrollToElement = () => {
  //   if (elementRef.current) {
  //     elementRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //       inline: "center",
  //     });
  //   }
  // };

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
      <Flex
        alignItems="center"
        flexDir="column"
        w={"100%"}
        bg={"linear-gradient(180deg, #060606 -45.59%, #414141 255.55%)"}
      >
        <Header theme={"dark"} />
        {isLoading ? (
          <Flex
            w="100%"
            h={["90vh", "90vh", "90vh", "750px"]}
            justifyContent="center"
            alignItems="center"
          >
            <Loader />
          </Flex>
        ) : scanReport === null ? (
          <QuickScanForm
            view="quickscan"
            runQuickScan={runQuickScan}
            isLoading={isLoading}
          />
        ) : (
          <HStack justifyContent="center" alignItems="flex-start">
            <QuickScanResultContainer scanReport={scanReport} />
            <CloseButton onClick={() => setScanReport(null)} />
          </HStack>
        )}
      </Flex>

      <Box
        ref={elementRef}
        display={"flex"}
        flexDir="column"
        alignItems="center"
        justifyContent={"flex-start"}
        w={"90%"}
        px={[0, 0, 10]}
        zIndex={10}
        py={[0, 0, 10]}
        borderRadius={20}
        background={"#FFFFFF"}
      >
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

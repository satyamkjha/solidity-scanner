import React, { lazy, useEffect, useRef, Suspense, useState } from "react";
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
import { QSScanResultSkeleton } from "components/quickscan/QSScanResultSkeleton";

import ssIconAnimation from "../../common/ssIconAnimation.json";
import Lottie from "lottie-react";

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

  const [tempQSData, setTempQSData] = useState<{
    blockAddress: string;
    blockPlatform: string;
    blockChain: string;
  } | null>(null);

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
      setIsLoading(true);
      if (blockPlatform === "fuse") {
        runQuickScan(blockAddress, "blockscout", `fuse-${blockChain}`, ref);
      } else {
        runQuickScan(blockAddress, blockPlatform, blockChain, ref);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runQuickScan = async (
    address: string,
    platform: string,
    chain: string,
    ref: string | null
  ) => {
    setIsLoading(true);
    const reqHeaders1 = await getReCaptchaHeaders("quickScan_verify");
    const reqHeaders2 = await getReCaptchaHeaders("quickScan");
    setTempQSData({
      blockAddress: address,
      blockPlatform: platform,
      blockChain: chain,
    });
    setScanReport(null);
    if (platform !== "buildbear" && !checkContractAddress(address)) {
      toast({
        title: "Contract Adddress not Valid",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
      setTempQSData(null);
      return;
    }
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
                setTempQSData(null);
              });
          }
        },
        () => {
          setIsLoading(false);
          setTempQSData(null);
        }
      )
      .catch(() => {
        setIsLoading(false);
        setTempQSData(null);
      });
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
      <Flex
        alignItems="center"
        flexDir="column"
        w={"100%"}
        bg={"linear-gradient(180deg, #060606 -45.59%, #414141 255.55%)"}
      >
        <Header theme={"dark"} />
        {isLoading && tempQSData ? (
          <VStack
            w="90%"
            maxW="1800px"
            alignItems="center"
            justify="flex-start"
            mb="150px"
            spacing={10}
          >
            <QSScanResultSkeleton
              blockAddress={tempQSData.blockAddress}
              blockPlatform={tempQSData.blockPlatform}
              blockChain={tempQSData.blockChain}
            />

            <HStack>
              {ssIconAnimation && (
                <Lottie
                  style={{
                    height: "30px",
                    width: "30px",
                  }}
                  animationData={ssIconAnimation}
                />
              )}
              <Text color="white" fontSize="lg" fontWeight={700}>
                {" "}
                Your contract is being scanned ...
              </Text>
            </HStack>
          </VStack>
        ) : isLoading ? (
          <Flex
            w="90%"
            maxW="1800px"
            alignItems="center"
            justify="flex-start"
            h="90vh"
          ></Flex>
        ) : scanReport === null ? (
          <QuickScanForm
            view="quickscan"
            runQuickScan={runQuickScan}
            isLoading={isLoading}
          />
        ) : (
          <VStack
            w="90%"
            maxW="1800px"
            alignItems="center"
            justify="flex-start"
            mb={"150px"}
          >
            <CloseButton
              alignSelf="flex-end"
              color="white"
              _hover={{
                bgColor: "#222222",
              }}
              onClick={() => {
                setScanReport(null);
                setTempQSData(null);
              }}
            />
            <QuickScanResultContainer scanReport={scanReport} />
          </VStack>
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

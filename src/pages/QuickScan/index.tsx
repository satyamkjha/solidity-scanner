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
import { useConfig } from "hooks/useConfig";
import { useWebSocket } from "hooks/useWebhookData";

const RecentScans = lazy(() => import("components/quickscan/RecentScans"));
const QuickScanDetails = lazy(
  () => import("components/quickscan/QuickScanDetails")
);

const QuickScan: React.FC = () => {
  const toast = useToast();
  const config: any = useConfig();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showSkeleton, setShowSkeletion] = useState(false);
  const [scanReport, setScanReport] = React.useState<QuickScanResult | null>(
    null
  );
  const { sendMessage, setKeepWSOpen, updateMessageQueue, messageQueue } =
    useWebSocket();
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
    setIsLoading(true);
    setTempQSData({
      blockAddress: address,
      blockPlatform: platform,
      blockChain: chain,
    });
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
            if (
              config &&
              config.REACT_APP_FEATURE_GATE_CONFIG.websockets_enabled
            ) {
              let req: any = {
                contract_address: address,
                contract_platform: platform,
              };
              if (platform === "buildbear") {
                req = { ...req, node_id: chain };
              } else {
                req = { ...req, contract_chain: chain };
              }
              if (ref) {
                req = { ...req, ref };
              }
              setKeepWSOpen(true);
              sendMessage({
                type: "quick_scan_initiate",
                body: req,
              });
            } else {
              setShowSkeletion(true);
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
                  setShowSkeletion(false);
                  setIsLoading(false);
                  setTempQSData(null);
                });
            }
          }
        },
        () => {
          setShowSkeletion(false);
          setIsLoading(false);
          setTempQSData(null);
        }
      )
      .catch(() => {
        setShowSkeletion(false);
        setIsLoading(false);
        setTempQSData(null);
      });
  };

  useEffect(() => {
    if (
      messageQueue.length > 0 &&
      messageQueue.some((msgItem: any) =>
        ["quick_scan_status", "quick_scan_acknowledge"].includes(msgItem.type)
      )
    ) {
      messageQueue.forEach((msgItem: any) => {
        console.log(msgItem.type);
        console.log(msgItem.payload.scan_status);
        if (
          msgItem.type === "quick_scan_status" &&
          msgItem.payload.scan_status === "scan_done"
        ) {
          console.log(msgItem.payload.scan_status);
          setScanReport(msgItem.payload.scan_details.scan_report);
          setShowSkeletion(false);
          setIsLoading(false);
          setKeepWSOpen(false);
        } else if (msgItem.type && msgItem.type === "quick_scan_acknowledge") {
          setShowSkeletion(true);
        }
      });
      let tempMsgQueue = messageQueue;
      tempMsgQueue = tempMsgQueue.filter(
        (msg: any) =>
          !["quick_scan_status", "quick_scan_acknowledge"].includes(msg.type)
      );
      updateMessageQueue(tempMsgQueue);
    }
  }, [messageQueue]);

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
        {showSkeleton && tempQSData ? (
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

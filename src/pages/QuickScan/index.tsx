import React, { lazy, useEffect, useRef, Suspense, useState } from "react";
import {
  getReCaptchaHeaders,
  checkContractAddress,
} from "helpers/helperFunction";
import { Flex, Box, useToast, VStack, CloseButton } from "@chakra-ui/react";

import API from "helpers/api";
import { QuickScanResult, RecaptchaHeader } from "common/types";
import { API_PATH } from "helpers/routeManager";
import QuickScanForm from "components/quickscan/QuickScanForm";
import { Header } from "components/header";
import { useParams, useLocation } from "react-router-dom";
import { QuickScanResultContainer } from "components/quickscan/QuickScanResult";
import { QSScanResultSkeleton } from "components/quickscan/QSScanResultSkeleton";

import { useConfig } from "hooks/useConfig";
import { useWebSocket } from "hooks/useWebhookData";

const RecentScans = lazy(() => import("components/quickscan/RecentScans"));
const QuickScanDetails = lazy(
  () => import("components/quickscan/QuickScanDetails")
);

const QuickScan: React.FC = () => {
  const toast = useToast();
  const config: any = useConfig();
  const [scanReport, setScanReport] = React.useState<QuickScanResult | null>(
    null
  );
  const [projectId, setProjectId] = useState("");
  const [scanId, setScanId] = useState("");
  const {
    sendMessage,
    setKeepWSOpen,
    updateMessageQueue,
    messageQueue,
    setNeedAuthToken,
  } = useWebSocket();
  const elementRef = useRef<HTMLDivElement>(null);
  const { blockAddress, blockPlatform, blockChain } = useParams<{
    blockAddress: string;
    blockPlatform: string;
    blockChain: string;
  }>();
  const [isLoading, setIsLoading] = React.useState<boolean>(
    blockAddress && blockChain && blockPlatform ? true : false
  );
  const [tempQSData, setTempQSData] = useState<{
    blockAddress: string;
    blockPlatform: string;
    blockChain: string;
  } | null>(
    blockAddress && blockChain && blockPlatform
      ? {
          blockAddress,
          blockPlatform,
          blockChain,
        }
      : null
  );
  const [qsStatus, setQSStatus] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const ref = query.get("ref");
  // const [reqHeaders_QS_Verify, setReqHeaders_QS_Verify] = useState<
  //   RecaptchaHeader | undefined
  // >();
  // const [reqHeaders_QS, setReqHeaders_QS] = useState<
  //   RecaptchaHeader | undefined
  // >();

  // const getRecapthaTokens = async () => {
  //   const reqHeaders_qs_verify = await getReCaptchaHeaders("quickScan_verify");
  //   const reqHeaders_qs = await getReCaptchaHeaders("quickScan");
  //   setReqHeaders_QS_Verify(reqHeaders_qs_verify);
  //   setReqHeaders_QS(reqHeaders_qs);
  // };

  useEffect(() => {
    if (blockAddress && blockChain && blockPlatform) {
      setQSStatus("Validated");
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
    setTempQSData({
      blockAddress: address,
      blockPlatform: platform,
      blockChain: chain,
    });
    setQSStatus("Validated");
    setIsLoading(true);
    setNeedAuthToken(true);
    setScanReport(null);
    const reqHeaders_qs = await getReCaptchaHeaders("quickScan");
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
      setKeepWSOpen(false);
      return;
    }
    let req = {
      contract_address: address,
      contract_platform: platform,
      [platform === "buildbear" ? "node_id" : "contract_chain"]: chain,
    };

    if (ref) {
      req = { ...req, ref };
    }
    setKeepWSOpen(true);
    setNeedAuthToken(false);
    reqHeaders_qs &&
      sendMessage({
        type: "quick_scan_initiate",
        body: req,
        recaptcha_token: reqHeaders_qs.Recaptchatoken,
      });
  };

  const reset = () => {
    setIsLoading(false);
    setQSStatus("");
    setKeepWSOpen(false);
  };

  useEffect(() => {
    if (
      messageQueue.length > 0 &&
      messageQueue.some((msgItem: any) =>
        ["quick_scan_status", "quick_scan_acknowledge", "error"].includes(
          msgItem.type
        )
      )
    ) {
      messageQueue.forEach((msgItem: any) => {
        if (
          msgItem.type === "quick_scan_status" &&
          msgItem.payload.scan_status === "scan_done"
        ) {
          setScanReport(
            msgItem.payload.scan_details.scan_report ||
              msgItem.payload.scan_details
          );
          setProjectId(msgItem.payload.project_id);
          setScanId(msgItem.payload.scan_id);
          reset();
        } else if (msgItem.type && msgItem.type === "quick_scan_acknowledge") {
          setQSStatus("Scanned");
        } else if (msgItem.type === "error") {
          reset();
        }
      });
      let tempMsgQueue = messageQueue;
      tempMsgQueue = tempMsgQueue.filter(
        (msg: any) =>
          !["quick_scan_status", "quick_scan_acknowledge", "error"].includes(
            msg.type
          )
      );
      updateMessageQueue(tempMsgQueue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              qsStatus={qsStatus}
              blockAddress={tempQSData.blockAddress}
              blockPlatform={tempQSData.blockPlatform}
              blockChain={tempQSData.blockChain}
            />
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
            <QuickScanResultContainer
              scanReport={scanReport}
              scanId={scanId}
              projectId={projectId}
            />
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
        px={[0, 0, 0, 10]}
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

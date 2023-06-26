import { CheckCircleIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import {
  useToast,
  Flex,
  Box,
  HStack,
  IconButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { ReportsListItem, Profile, Scan, Report } from "common/types";
import React, { useState, useRef, useEffect } from "react";
import { AiFillCopy, AiOutlineLock } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useReactToPrint } from "react-to-print";
import { getPublicReport } from "hooks/usePublicReport";
import { PrintContainer } from "pages/Report/PrintContainer";
import Loader from "./styled-components/Loader";

const ReportBlock: React.FC<{
  report: ReportsListItem;
  profile: Profile;
  type: string;
}> = ({ report, profile, type }) => {
  const toast = useToast();

  const [summaryReport, setSummaryReport] = useState<Report | null>(null);
  const [printLoading, setPrintLoading] = useState<boolean>(false);
  const componentRef = useRef();

  const generatePDF = async () => {
    setPrintLoading(true);
    const publishReportData = await getPublicReport(type, report.report_id);

    if (publishReportData.summary_report) {
      setSummaryReport(publishReportData.summary_report);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [isMobileView] = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    if (summaryReport) {
      setTimeout(() => {
        handlePrint();
        setPrintLoading(false);
      }, 100);
    }
  }, [summaryReport]);

  return (
    <Flex
      alignItems={["flex-start", "center"]}
      justifyContent="space-between"
      sx={{
        cursor: "pointer",
        w: "100%",
        bg: "white",
        my: 2,
        p: 3,
        px: [3, 5],
        borderRadius: "10px",
        transition: "0.3s box-shadow",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        _hover: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      height="fit-content"
    >
      <Box
        display={isMobileView ? "none" : "block"}
        sx={{
          width: "60px",
          height: "60px",
          p: 2,
          bg: "#F7F7F7",
          color: "#4E5D78",
          borderRadius: "50%",
          textAlign: "center",
          mr: 7,
          mt: 2,
        }}
      >
        <Text fontSize="xl" fontWeight="600">
          {report.date_published.slice(0, 2)}
        </Text>
        <Text fontSize="12px" mt="-4px">
          {report.date_published.slice(3, 6)}
        </Text>
      </Box>
      <Flex
        justifyContent={"flex-start"}
        width={["calc(100% - 60px)", "calc(100% - 60px)", "calc(100% - 120px)"]}
        alignItems="center"
        flexWrap={"wrap"}
        height="fit-content"
      >
        <HStack width={["210px"]} my={3}>
          {report.is_approved ? (
            <CheckCircleIcon color={"#03C04A"} />
          ) : (
            <TimeIcon color={"#FF5C00"} />
          )}
          <Text
            color={report.is_approved ? "#03C04A" : "#FF5C00"}
            sx={{ fontSize: "md", fontWeight: 600, ml: 2 }}
          >
            {report.is_approved ? "Approved" : "Waiting for Approval"}
          </Text>
        </HStack>

        <HStack width={["130px"]} my={3}>
          {report.is_approved ? <BsPeople /> : <AiOutlineLock />}
          <Text sx={{ fontSize: "md", fontWeight: 600, ml: 2 }}>
            {report.is_approved ? "Public" : "Private"}
          </Text>
        </HStack>
        {report.is_approved && (
          <HStack my={3} width={["260px"]} mr={5}>
            <AiFillCopy color="#3E15F4" />
            <Text
              align="left"
              fontSize="md"
              color="#3E15F4"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard
                  .writeText(
                    `http://${document.location.host}/published-report/${type}/${report.report_id}`
                  )
                  .then(
                    () =>
                      toast({
                        title: "Copied Report URL",
                        description: "",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                      }),
                    () =>
                      toast({
                        title: "Could not Copy Report URL",
                        description: "",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      })
                  );
              }}
            >
              Copy link to Published Report
            </Text>
          </HStack>
        )}
      </Flex>
      <Flex
        flexDir={["column"]}
        justifyContent={"flex-start"}
        alignItems={"center"}
        width={["60px", "60px", "120px"]}
        height={"100%"}
      >
        <Box
          display={isMobileView ? "block" : "none"}
          sx={{
            width: "60px",
            height: "60px",
            p: 2,
            bg: "#F7F7F7",
            color: "#4E5D78",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          <Text fontSize="xl" fontWeight="600">
            {report.date_published.slice(0, 2)}
          </Text>
          <Text fontSize="12px" mt="-4px">
            {report.date_published.slice(3, 6)}
          </Text>
        </Box>
        <Flex
          flexDir={["column", "column", "row"]}
          width="100%"
          alignItems="center"
          justifyContent={["flex-start", "flex-start", "flex-end"]}
        >
          {report.is_approved && (
            <IconButton
              my={[2, 2, 5]}
              mr={[0, 0, 5]}
              aria-label="View Report"
              backgroundColor={"#F5F2FF"}
              icon={
                printLoading ? (
                  <Loader size={25} color="#3E15F4" />
                ) : (
                  <ArrowDownIcon color="#3E15F4" />
                )
              }
              onClick={(e) => {
                generatePDF();
              }}
            />
          )}
          {summaryReport && printLoading && (
            <Box w={0} h={0} visibility={"hidden"} position="absolute">
              <Box w="100vw" ref={componentRef}>
                <PrintContainer summary_report={summaryReport} />
              </Box>
            </Box>
          )}
          <IconButton
            my={[2, 2, 5]}
            aria-label="View Report"
            backgroundColor={"#F5F2FF"}
            icon={<ViewIcon color={"#806CCF"} />}
            onClick={(e) => {
              e.stopPropagation();
              if (report.is_approved) {
                window.open(
                  `http://${document.location.host}/published-report/${type}/${report.report_id}`,
                  "_blank"
                );
              } else {
                window.open(
                  `http://${document.location.host}/report/${type}/${report.project_id}/${report.report_id}`,
                  "_blank"
                );
              }
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const PublishedReports: React.FC<{
  profile: Profile;
  scan_report: Scan;
  type: string;
  reportList: ReportsListItem[];
}> = ({ profile, type, reportList }) => {
  return (
    <Box
      sx={{
        w: "100%",
        borderRadius: "20px",
        px: [0, 0, 4],
        h: "63vh",
        overflowY: "scroll",
      }}
    >
      {reportList && reportList.length > 0 ? (
        reportList.map((report) => (
          <ReportBlock type={type} profile={profile} report={report} />
        ))
      ) : (
        <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
          You have not published any reports yet.
        </Flex>
      )}
    </Box>
  );
};

export default PublishedReports;

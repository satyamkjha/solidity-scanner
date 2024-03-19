import { CheckCircleIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import {
  useToast,
  Flex,
  Box,
  HStack,
  IconButton,
  Text,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import { ReportsListItem, Profile, Scan } from "common/types";
import React, { useState } from "react";
import { AiFillCopy, AiOutlineLock } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { ArrowDownIcon } from "@chakra-ui/icons";
import Loader from "./styled-components/Loader";
import { getAssetsURL } from "helpers/helperFunction";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const ReportBlock: React.FC<{
  report: ReportsListItem;
  profile: Profile;
  type: string;
}> = ({ report, type }) => {
  const toast = useToast();
  const assetsURL = getAssetsURL();

  const [printLoading, setPrintLoading] = useState<boolean>(false);

  const generatePDF = async () => {
    setPrintLoading(true);
    try {
      setPrintLoading(true);
      const { data } = await API.post(`${API_PATH.API_GET_REPORT_PDF}`, {
        project_id: report.project_id,
        report_id: report.report_id,
        scan_type: type,
      });
      setPrintLoading(false);
      if (data.status === "success" && data.download_url) {
        const link = document.createElement("a");
        link.href = data.download_url;
        link.click();
      }
    } catch (e) {
      console.log(e);
      setPrintLoading(false);
    }
  };

  const [isMobileView] = useMediaQuery("(max-width: 500px)");

  return (
    <Flex
      alignItems={["flex-start", "flex-start", "center"]}
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
        alignItems={["flex-start", "flex-start", "center"]}
        flexWrap={"wrap"}
        flexDir={["column", "column", "row"]}
        height="fit-content"
      >
        <HStack width={["210px"]} my={3}>
          {report.is_approved || report.report_type === "assisted" ? (
            <CheckCircleIcon color={"#03C04A"} />
          ) : report.report_type === "self_published" ? (
            <Image
              width="25px"
              height="25px"
              src={`${assetsURL}report/user.svg`}
            />
          ) : (
            <TimeIcon color={"#FF5C00"} />
          )}
          <Text
            color={
              report.is_approved || report.report_type === "assisted"
                ? "#03C04A"
                : report.report_type === "self_published"
                ? "black"
                : "#FF5C00"
            }
            sx={{ fontSize: "md", fontWeight: 600, ml: 2 }}
          >
            {report.is_approved || report.report_type === "assisted"
              ? "Approved"
              : report.report_type === "self_published"
              ? "Self-Published"
              : "Waiting for Approval"}
          </Text>
        </HStack>

        <HStack width={["130px"]} my={3}>
          {report.is_approved ||
          ["self_published", "assisted"].includes(report.report_type) ? (
            <BsPeople />
          ) : (
            <AiOutlineLock />
          )}
          <Text sx={{ fontSize: "md", fontWeight: 600, ml: 2 }}>
            {report.is_approved ||
            ["self_published", "assisted"].includes(report.report_type)
              ? "Public"
              : "Private"}
          </Text>
        </HStack>
        {(report.is_approved ||
          ["self_published", "assisted"].includes(report.report_type)) && (
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
        {isMobileView ? (
          <Flex
            flexDir={"row"}
            width="100%"
            alignItems="center"
            justifyContent={"flex-start"}
          >
            {(report.is_approved ||
              ["self_published", "assisted"].includes(report.report_type)) && (
              <IconButton
                my={3}
                mr={4}
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

            <IconButton
              my={[2, 2, 5]}
              aria-label="View Report"
              backgroundColor={"#F5F2FF"}
              icon={<ViewIcon color={"#806CCF"} />}
              onClick={(e) => {
                e.stopPropagation();
                if (report.is_approved || report.report_type === "assisted") {
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
        ) : null}
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
        {!isMobileView ? (
          <Flex
            flexDir={["column", "column", "row"]}
            width="100%"
            alignItems="center"
            justifyContent={["flex-start", "flex-start", "flex-end"]}
          >
            {(report.is_approved ||
              ["self_published", "assisted"].includes(report.report_type)) && (
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
        ) : null}
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

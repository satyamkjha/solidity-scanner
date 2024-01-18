import React, { useState, useEffect } from "react";
import {
  HStack,
  Text,
  VStack,
  Flex,
  Divider,
  Box,
  Button,
} from "@chakra-ui/react";
import { severityArrayInOrder } from "common/values";
import { sentenceCapitalize } from "helpers/helperFunction";
import { QuickScanResult } from "common/types";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";
import { useHistory } from "react-router-dom";
import QSErrorCountModal from "./QSErrorCountModal";
import ReportTag from "components/common/scans/ReportTag";
import ResultOverview from "components/common/scans/ResultOverview";
import VulnerabilityChart from "components/common/scans/VulnerabilityChart";

export const QuickScanResultContainer: React.FC<{
  scanReport: QuickScanResult;
}> = ({ scanReport }) => {
  const history = useHistory();

  const [errorData, setErrorData] = useState<{
    errorCount: number;
    errorType: string;
  } | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errorData !== null) {
      setOpen(true);
    }
  }, [errorData]);

  const vulnerabilityCount =
    scanReport.multi_file_scan_summary.issue_severity_distribution.critical +
    scanReport.multi_file_scan_summary.issue_severity_distribution.gas +
    scanReport.multi_file_scan_summary.issue_severity_distribution.high +
    scanReport.multi_file_scan_summary.issue_severity_distribution
      .informational +
    scanReport.multi_file_scan_summary.issue_severity_distribution.low +
    scanReport.multi_file_scan_summary.issue_severity_distribution.medium;

  return (
    <Flex
      w="100%"
      h="fit-content"
      flexDir={["column", "column", "row"]}
      justifyContent={["flex-start", "flex-start", "space-between"]}
      alignItems="center"
      mt={20}
    >
      <VStack
        spacing={5}
        borderRadius={10}
        padding={5}
        bgColor="#222222"
        justifyContent="flex-start"
        alignItems="center"
        h={["fit-content", "fit-content", "520px"]}
        w={["100%", "100%", "55%"]}
      >
        <ResultOverview
          scanReport={scanReport.multi_file_scan_summary}
          projectDetails={scanReport}
          spacing={5}
        />
        <Box
          bgColor="#272727"
          w="100%"
          px={[4, 4, 4, 8]}
          py={6}
          borderRadius={"15px"}
        >
          <Flex
            w="100%"
            justifyContent={["center", "center", "center", "flex-start"]}
            alignItems={["center", "center", "center", "flex-start"]}
            direction={["column", "column", "row"]}
          >
            <SolidityScoreProgress
              score={scanReport.multi_file_scan_summary.score_v2}
              size={"100px"}
              thickness={"7px"}
            />
            <VStack
              ml={5}
              mt={[3, 3, 3, 0]}
              textAlign={["center", "center", "center", "left"]}
              alignItems="flex-start"
              px={4}
            >
              <Text
                color="white"
                fontSize="18px"
                fontWeight={600}
                textAlign="center"
              >
                Your Security Score is
                {parseFloat(scanReport.multi_file_scan_summary.score_v2) < 50
                  ? " LOW"
                  : parseFloat(scanReport.multi_file_scan_summary.score_v2) >=
                    90
                  ? " GREAT"
                  : " AVERAGE"}
              </Text>
              <Text color="#B0B7C3" fontSize="14px" fontWeight={400}>
                The SolidityScan score is calculated based on lines of code and
                weights assigned to each issue depending on the severity and
                confidence. To improve your score, view the detailed result and
                leverage the remediation solutions provided.
              </Text>
            </VStack>
          </Flex>
        </Box>
        <ReportTag is_approved={scanReport.is_approved} />
      </VStack>
      <Flex
        w={["100%", "100%", "calc(45% - 40px)"]}
        bgColor="#222222"
        borderRadius={10}
        padding={5}
        flexDir={["column", "column", "row"]}
        alignItems={"center"}
        justifyContent={["flex-start", "flex-start", "space-between"]}
        h={["fit-content", "fit-content", "520px"]}
      >
        <VStack
          w={[
            "100%",
            "100%",
            "calc(100% - 150px)",
            "calc(100% - 180px)",
            "calc(100% - 220px)",
          ]}
          alignItems="center"
          justifyContent="center"
          h={["fit-content", "fit-content", "100%"]}
          spacing={10}
        >
          <VulnerabilityChart
            issue_count={
              scanReport.multi_file_scan_summary.issues_count ||
              vulnerabilityCount
            }
            issue_severity_distribution={
              scanReport.multi_file_scan_summary.issue_severity_distribution
            }
          />
          <Button
            display={["none", "none", "flex"]}
            variant="brand"
            w={"100%"}
            maxW={"300px"}
            onClick={() => history.push("/signin")}
          >
            View detailed Result
          </Button>
        </VStack>
        <Flex
          w={["100%", "100%", "120px", "150px", "180px"]}
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="row"
          flexWrap="wrap"
          columnGap={"20px"}
          rowGap={3}
          mt={[5, 10, 0]}
        >
          {severityArrayInOrder.map((item) => (
            <VStack
              w={["calc(50% - 10px)", "calc(50% - 10px)", "100%"]}
              h="fit-content"
              cursor="pointer"
              px={3}
              py={2}
              bgColor={"#3E3E3E"}
              _hover={{
                bgColor: "#4d4d4d",
              }}
              border="1px solid #3E3E3E"
              spacing={0}
              borderRadius={5}
              alignItems="flex-start"
              onClick={() =>
                setErrorData({
                  errorCount:
                    scanReport.multi_file_scan_summary
                      .issue_severity_distribution[item.value],
                  errorType: item.value,
                })
              }
            >
              <HStack>
                <Divider
                  h={3}
                  orientation="vertical"
                  borderColor={item.value}
                  borderWidth={2}
                />{" "}
                <Text color="#8A94A6" fontSize="sm">
                  {sentenceCapitalize(item.value)}
                </Text>
              </HStack>
              <Text color="white" fontSize="lg" fontWeight={700}>
                {
                  scanReport.multi_file_scan_summary
                    .issue_severity_distribution[item.value]
                }
              </Text>
            </VStack>
          ))}
        </Flex>
        <Button
          display={["flex", "flex", "none"]}
          variant="brand"
          w={"100%"}
          mt={5}
          maxW={"300px"}
          onClick={() => history.push("/signin")}
        >
          View detailed Result
        </Button>
      </Flex>
      <QSErrorCountModal
        isOpen={open}
        errorCount={errorData?.errorCount || 0}
        errorType={errorData?.errorType || ""}
        onClose={() => {
          setErrorData(null);
          setOpen(false);
        }}
      />
    </Flex>
  );
};

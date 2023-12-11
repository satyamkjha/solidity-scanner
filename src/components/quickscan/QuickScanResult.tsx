import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import {
  HStack,
  PinInput,
  PinInputField,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Flex,
  Image,
  Divider,
  Box,
  Input,
  Link,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import StyledButton from "components/styled-components/StyledButton";
import Loader from "components/styled-components/Loader";
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { contractChain, pieData, severityArrayInOrder } from "common/values";
import PieChart from "components/pieChart";
import {
  getAssetsURL,
  sentenceCapitalize,
  getContractChainLabel,
  getContractBlockchainId,
  getContractBlockChainLogoUrl,
} from "helpers/helperFunction";
import { StylesConfig, GroupBase } from "react-select";
import Select from "react-select";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { FaPen } from "react-icons/fa";
import RadioButton from "components/styled-components/RadioButton";
import { QuickScanResult } from "common/types";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";
import { useHistory } from "react-router-dom";
import { ManualAuditForm } from "components/modals/manualAuditForm";
import QSErrorCountModal from "./QSErrorCountModal";

export const QuickScanResultContainer: React.FC<{
  scanReport: QuickScanResult;
}> = ({ scanReport }) => {
  const assetsUrl = getAssetsURL();
  const history = useHistory();
  const { isOpen, onClose, onOpen } = useDisclosure();

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
        <Flex
          w="100%"
          justifyContent={["flex-start"]}
          alignItems={"center"}
          flexDir={["column", "column", "row"]}
        >
          <Flex
            w="60px"
            h="60px"
            backgroundColor={"#272727"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={["column", "column", "row"]}
          >
            <Image
              src={`${assetsUrl}${getContractBlockChainLogoUrl(
                scanReport.contract_platform || "",
                scanReport.contract_chain || ""
              )}.svg`}
              height="40px"
              width="40px"
            />
          </Flex>
          <VStack
            ml={5}
            alignItems={["center", "center", "flex-start"]}
            w={["100%", "100%", "calc(100% - 60px)"]}
            spacing={1}
            textAlign={["center", "center", "left"]}
          >
            <Text
              w="100%"
              overflowWrap="break-word"
              color="white"
              fontWeight={600}
              fontSize="lg"
            >
              {scanReport.contract_address}
            </Text>
            <Flex
              w="100%"
              justifyContent={["flex-start"]}
              alignItems={"center"}
              flexDir={["column", "column", "row"]}
            >
              <Text
                whiteSpace="nowrap"
                color="white"
                fontWeight={300}
                fontSize="md"
              >
                {scanReport.contract_platform === "buildbear"
                  ? "Buildbear"
                  : contractChain[
                      getContractBlockchainId(
                        scanReport.contract_platform || "",
                        scanReport.contract_chain || ""
                      )
                    ].blockchainName.toUpperCase()}{" "}
                {`(${getContractChainLabel(
                  scanReport.contract_platform || "",
                  scanReport.contract_chain || ""
                )})`}
              </Text>
              <Divider
                mx={5}
                h={7}
                borderColor="gray.200"
                orientation="vertical"
                display={["none", "none", "block"]}
              />
              <Text
                whiteSpace="nowrap"
                color="gray.400"
                fontWeight={300}
                fontSize="md"
                mr={2}
                cursor="pointer"
                onClick={() => window.open(scanReport.contract_url, "_blank")}
              >
                {`View on ${sentenceCapitalize(
                  scanReport.contract_platform || " "
                )}`}
                <ExternalLinkIcon ml={2} />
              </Text>
            </Flex>
          </VStack>
        </Flex>
        <Flex
          w="100%"
          justifyContent={["flex-start", "flex-start", "space-between"]}
          alignItems="center"
          flexDir={["column", "column", "row"]}
        >
          <HStack
            bgColor="#272727"
            w={["100%", "100%", "32%"]}
            borderRadius={5}
            p={3}
          >
            <Flex
              bgColor="#272727"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            >
              <Image
                src={`${assetsUrl}quickscan/qs_security_score.svg`}
                height="30px"
                width="30px"
              />
            </Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Security Score
              </Text>
              <HStack spacing={0}>
                <Text color="white" fontSize="lg" fontWeight={600}>
                  {scanReport.multi_file_scan_summary.score_v2}
                </Text>
                <Text color="white" fontSize="sm" fontWeight={400}>
                  /100
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack
            bgColor="#272727"
            w={["100%", "100%", "32%"]}
            mt={[5, 5, 0]}
            borderRadius={5}
            p={3}
          >
            <Flex
              padding={2}
              bgColor="#272727"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            >
              <Image
                src={`${assetsUrl}quickscan/qs_scan_duration.svg`}
                height="40px"
                width="40px"
              />
            </Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Scan duration
              </Text>
              <Text color="white" fontSize="lg" fontWeight={600}>
                {scanReport.multi_file_scan_summary.scan_time_taken} secs
              </Text>
            </VStack>
          </HStack>
          <HStack
            bgColor="#272727"
            w={["100%", "100%", "32%"]}
            mt={[5, 5, 0]}
            borderRadius={5}
            p={3}
          >
            <Flex
              padding={2}
              bgColor="#272727"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            >
              <Image
                src={`${assetsUrl}quickscan/qs_loc.svg`}
                height="40px"
                width="40px"
              />
            </Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Lines of code
              </Text>
              <Text color="white" fontSize="lg" fontWeight={600}>
                {scanReport.multi_file_scan_summary.lines_analyzed_count}
              </Text>
            </VStack>
          </HStack>
        </Flex>
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
        <HStack
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          bgColor="#272727"
          border={`1px dashed ${
            scanReport.is_approved ? "#52FF00" : "#8D8D8D"
          }`}
          p={5}
          borderRadius={10}
        >
          <Image
            src={`${assetsUrl}quickscan/ss_quickscan_report${
              scanReport.is_approved ? "" : "_not"
            }_approved.svg`}
            height="56px"
            width="56px"
          />
          <Text
            textAlign={["left", "left", "left"]}
            color={scanReport.is_approved ? "#52FF00" : "#8D8D8D"}
          >
            This audit report has {scanReport.is_approved ? "" : "not"} been
            verified by the SolidityScan team. To learn more about our published
            reports.{" "}
            <span
              style={{
                color: "white",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => onOpen()}
            >
              click here.
            </span>
          </Text>
        </HStack>
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
          <Box
            w={"330px"}
            p={"20px"}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            h="330px"
            position={"relative"}
          >
            {scanReport.multi_file_scan_summary.issues_count === 0 ||
            vulnerabilityCount === 0 ? (
              <Flex
                flexDir="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image src={`${assetsUrl}common/fixedIssueIcon.svg`} />
                <Text> No Bugs Found </Text>
              </Flex>
            ) : (
              <>
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
                  page={"quickscan"}
                />
                <Flex position={"absolute"} flexDir={"column"}>
                  <Heading color="white" fontWeight={900}>
                    {scanReport.multi_file_scan_summary
                      .issue_severity_distribution.critical +
                      scanReport.multi_file_scan_summary
                        .issue_severity_distribution.high +
                      scanReport.multi_file_scan_summary
                        .issue_severity_distribution.medium +
                      scanReport.multi_file_scan_summary
                        .issue_severity_distribution.low +
                      scanReport.multi_file_scan_summary
                        .issue_severity_distribution.informational +
                      scanReport.multi_file_scan_summary
                        .issue_severity_distribution.gas}
                  </Heading>
                  <Text color="white">
                    Total Vulnerabilities <br /> found
                  </Text>
                </Flex>
              </>
            )}
          </Box>
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
          columnGap={5}
          rowGap={3}
          mt={[5, 10, 0]}
        >
          {severityArrayInOrder.map((item) => (
            <VStack
              w={["45%", "30%", "100%"]}
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
          maxW={"300px"}
          onClick={() => history.push("/signin")}
        >
          View detailed Result
        </Button>
      </Flex>
      <ManualAuditForm isOpen={isOpen} onClose={onClose} />
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

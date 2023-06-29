import React from "react";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { getAssetsURL } from "helpers/helperFunction";
import {
  Box,
  Text,
  Heading,
  Button,
  Image,
  HStack,
  VStack,
  Divider,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { QuickScanResult } from "common/types";
import PieChart from "components/pieChart";
import { useConfig } from "hooks/useConfig";
import { monthNames } from "common/values";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { ThreatScoreMeter } from "components/threatScoreMeter";

const QuickScanDetails: React.FC<{ scanReport: QuickScanResult }> = ({
  scanReport,
}) => {
  let d = new Date();
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  const pieData = (
    critical: number,
    high: number,
    medium: number,
    low: number,
    informational: number,
    gas: number
  ) => [
    {
      id: "critical",
      label: "Critical",
      value: critical,
      color: "#960D00",
    },
    {
      id: "high",
      label: "High",
      value: high,
      color: "#FF5C00",
    },
    {
      id: "medium",
      label: "Medium",
      value: medium,
      color: "#FFE600",
    },
    {
      id: "low",
      label: "Low",
      value: low,
      color: "#38CB89",
    },
    {
      id: "informational",
      label: "Informational",
      value: informational,
      color: "#A0AEC0",
    },
    {
      id: "gas",
      label: "Gas",
      value: gas,
      color: "#F795B4",
    },
  ];

  return (
    <>
      <Stack
        w={"100%"}
        mt={10}
        spacing={"5%"}
        direction={["column", "column", "column", "row"]}
      >
        <Box
          w={["100%", "100%", "100%", "47.5%"]}
          borderRadius={15}
          p={5}
          background={" #FAFBFC "}
          display="flex"
          flexDir={"column"}
          alignItems={["center", "center", "center", "flex-start"]}
          justifyContent={"flex-start"}
        >
          <Text fontSize="md" fontWeight={600}>
            SCAN STATISTICS
          </Text>
          <Box
            w={"100%"}
            borderRadius={15}
            p={5}
            mt={5}
            background={" #FFFFFF "}
            display="flex"
            flexDir={"column"}
            alignItems="center"
            justifyContent={"center"}
          >
            <HStack my={4} width={"100%"} justify={"space-between"}>
              <Text fontSize="sm">Score</Text>
              <Text fontSize="sm">
                {scanReport.multi_file_scan_summary.score_v2 + "/100"}
              </Text>
            </HStack>
            <Divider />
            <HStack my={4} width={"100%"} justify={"space-between"}>
              <Text fontSize="sm">Duration</Text>
              <Text fontSize="sm">
                {scanReport.multi_file_scan_summary.scan_time_taken} seconds
              </Text>
            </HStack>
            <Divider />
            <HStack my={4} width={"100%"} justify={"space-between"}>
              <Text fontSize="sm">Lines of Code</Text>
              <Text fontSize="sm">
                {scanReport.multi_file_scan_summary.lines_analyzed_count}
              </Text>
            </HStack>
          </Box>
        </Box>
        {scanReport.is_approved ? (
          <Box
            w={["100%", "100%", "100%", "47.5%"]}
            borderRadius={15}
            p={8}
            backgroundColor={"#02070E"}
            backgroundImage={`url('${assetsURL}background/verifiedAuditbg.png')`}
            display="flex"
            height={"280px"}
            flexDir={"row"}
            alignItems="flex-start"
            justifyContent={"flex-start"}
          >
            <Image
              mr={10}
              src={`${assetsURL}common/verifiedAuditSeal.svg`}
              height={"130px"}
              width={"130px"}
              borderRadius={"5px"}
            />
            <VStack alignItems={"flex-start"}>
              <Heading color={"white"} fontSize="2xl">
                {" "}
                Verified Contract
              </Heading>

              <Text textAlign={"left"} color={"white"} fontSize="md">
                This contract has been manually verified by SolidityScan's
                internal security team as per the highest smart contract
                security standards as of{" "}
                {`${d.getDate()} ${
                  monthNames[d.getMonth()]
                } ${d.getFullYear()}`}
                .{" "}
              </Text>

              <Button
                alignSelf={"flex-end"}
                type="submit"
                variant="brand"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `http://${document.location.host}/published-report/block/${scanReport.latest_report_id}`,
                    "_blank"
                  );
                }}
              >
                VIEW PUBLISHED REPORT
              </Button>
            </VStack>
          </Box>
        ) : (
          <Box
            w={["100%", "100%", "100%", "47.5%"]}
            borderRadius={15}
            p={5}
            background={" #FAFBFC "}
            display="flex"
            flexDir={"column"}
            alignItems={["center", "center", "center", "flex-start"]}
            justifyContent={"flex-start"}
          >
            <Text fontSize="md" fontWeight={600}>
              DETAILED RESULT
            </Text>
            <Box
              w={"100%"}
              borderRadius={15}
              p={5}
              mt={5}
              background={" #FFFFFF "}
              display="flex"
              flexDir={["column", "column", "column", "row"]}
              alignItems={["center", "center", "center", "flex-start"]}
              justifyContent={"flex-start"}
            >
              <Box
                w={"200px"}
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                h="180px"
              >
                {scanReport.multi_file_scan_summary.issues_count === 0 ? (
                  <Image src="/nobug.svg" alt="No Bugs Found" />
                ) : (
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
                  />
                )}
              </Box>
              <VStack
                ml={[0, 0, 0, 10]}
                mt={[2, 2, 2, 0]}
                w={["100%", "100%", "100%", "calc(100% - 200px)"]}
              >
                <Text textAlign={"left"} fontSize="sm">
                  This contract has been analyzed by more than{" "}
                  {no_of_vuln_detectors}&nbsp; proprietary vulnerability
                  patterns of SolidityScan. Vulnerability details and mechanisms
                  to remediate the risks tailored specific to the contract are
                  now available in the link below.
                </Text>
                <RouterLink to="/signup">
                  <Button variant="accent-ghost">
                    View Detailed Result <ArrowForwardIcon ml={5} />
                  </Button>
                </RouterLink>
              </VStack>
            </Box>
          </Box>
        )}
      </Stack>
      <Box
        w={"100%"}
        borderRadius={15}
        p={5}
        mt={10}
        background={" #FAFBFC "}
        display="flex"
        flexDir={"column"}
        alignItems={["center", "center", "center", "flex-start"]}
        justifyContent={"flex-start"}
      >
        <Text fontSize="md" fontWeight={600}>
          THREAT SCAN SUMMARY
        </Text>
        <Box
          w={"100%"}
          borderRadius={15}
          p={[4, 4, 4, 10]}
          mt={5}
          background={" #FFFFFF "}
          display="flex"
          flexDir={"column"}
          alignItems={["flex-start", "flex-start", "flex-start", "center"]}
          justifyContent={"center"}
        >
          <Stack
            direction={["column", "column", "column", "row"]}
            alignItems="center"
            mt={4}
            mb={10}
            spacing={10}
          >
            <VStack>
              <ThreatScoreMeter
                percentage={scanReport.multi_file_scan_summary.threat_score}
              />
              <Text color={"detail"} fontWeight="600">
                Threat Score
              </Text>
            </VStack>
            <Text fontSize="md" textAlign="left">
              ThreatScan, a smart contract analysis tool, is built by the
              SolidityScan team. It is designed to assist users in identifying
              potential rug pull scams by providing an in-depth analysis of a
              smart contract's code and highlighting any potential red flags
              that may indicate a scam.
            </Text>
          </Stack>
          <Divider />
          {scanReport.quick_file_scan_details.map((item, index) =>
            isDesktopView ? (
              <>
                <HStack my={5} width={"100%"}>
                  <Image src={`${assetsURL}icons/${item.issue_status}.svg`} />
                  <VStack ml={"30px !important"} alignItems={"flex-start"}>
                    <Heading fontSize="md">{item.issue_name}</Heading>
                    <DescriptionWrapper>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: item.issue_description,
                        }}
                      />
                    </DescriptionWrapper>
                  </VStack>
                </HStack>
                {index !== scanReport.quick_file_scan_details.length - 1 && (
                  <Divider />
                )}
              </>
            ) : (
              <>
                <VStack my={5} width={"100%"} alignItems={"flex-start"}>
                  <HStack mb={2}>
                    <Image src={`${assetsURL}icons/${item.issue_status}.svg`} />
                    <Heading fontSize="md">{item.issue_name}</Heading>
                  </HStack>
                  <DescriptionWrapper>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: item.issue_description,
                      }}
                    />
                  </DescriptionWrapper>
                </VStack>
                <Divider />
              </>
            )
          )}
        </Box>
      </Box>
    </>
  );
};

export default QuickScanDetails;

const DescriptionWrapper = styled.div`
  p {
    text-align: left;
    color: #4e5d78;
  }

  code {
    background: #cbd5e0;
    padding: 2px 4px;
    border-radius: 5px;
  }

  a {
    color: #4299e1;
    text-decoration: underline;
    transition: 0.2s color;
    &:hover {
      color: #2b6cb0;
    }
  }
`;

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
  Flex,
} from "@chakra-ui/react";
import { QuickScanResult } from "common/types";
import PieChart from "components/pieChart";
import { useConfig } from "hooks/useConfig";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { ThreatScoreMeter } from "components/threatScoreMeter";
import { formattedDate } from "common/functions";

const QuickScanDetails: React.FC<{ scanReport: QuickScanResult }> = ({
  scanReport,
}) => {
  let d = new Date();
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  const vulnerabilityCount =
    scanReport.multi_file_scan_summary.issue_severity_distribution.critical +
    scanReport.multi_file_scan_summary.issue_severity_distribution.gas +
    scanReport.multi_file_scan_summary.issue_severity_distribution.high +
    scanReport.multi_file_scan_summary.issue_severity_distribution
      .informational +
    scanReport.multi_file_scan_summary.issue_severity_distribution.low +
    scanReport.multi_file_scan_summary.issue_severity_distribution.medium;

  return (
    <Box
      w={"100%"}
      borderRadius={15}
      p={5}
      mt={"-120px"}
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
              percentage={parseFloat(
                scanReport.multi_file_scan_summary.threat_score
              )}
            />
            <Text color={"detail"} fontWeight="600">
              Threat Score
            </Text>
          </VStack>
          <Text fontSize="md" textAlign="left">
            ThreatScan, a smart contract analysis tool, is built by the
            SolidityScan team. It is designed to assist users in identifying
            potential rug pull scams by providing an in-depth analysis of a
            smart contract's code and highlighting any potential red flags that
            may indicate a scam.
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
                  <Heading textAlign="left" fontSize="md">
                    {item.issue_name}
                  </Heading>
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

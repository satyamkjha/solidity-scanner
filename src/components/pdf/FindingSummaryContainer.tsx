import {
  Flex,
  Heading,
  HStack,
  Box,
  Text,
  Image,
  CircularProgress,
  CircularProgressLabel,
  Stack,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Report } from "common/types";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { GithubIcon, ProjectIcon, SeverityIcon } from "components/icons";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import React from "react";
import { VictoryPie } from "victory";

const FindingSummaryContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  let counter1 = 0;

  const victoryPieData = (
    critical: number,
    high: number,
    medium: number,
    low: number,
    informational: number,
    gas: number
  ) => [
    {
      x: critical > 0 ? `Critical: ${critical}` : " ",
      y: critical,
    },
    {
      x: high > 0 ? `High: ${high}` : " ",
      y: high,
    },
    {
      x: medium > 0 ? `Medium: ${medium}` : " ",
      y: medium,
    },
    {
      x: low > 0 ? `Low: ${low}` : "",
      y: low,
    },
    {
      x: informational > 0 ? `Informational: ${informational}` : " ",
      y: informational,
    },
    {
      x: gas > 0 ? `Gas: ${gas}` : " ",
      y: gas,
    },
  ];

  return (
    <>
      <h6></h6>
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        pt={5}
        pb={10}
        alignItems="center"
      >
        <Heading color={"#52FF00"} fontSize="4xl">
          Findings
        </Heading>
        <Text fontSize="4xl" fontWeight={400}>
          {" "}
          &nbsp;Summary{" "}
        </Text>
      </Flex>
      <Box
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        w="100%"
        border={"1px solid #D9D9D9;"}
      >
        <Flex
          as="div"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          flexDir={["row"]}
          py={3}
          px={[4, 4, 4, 10]}
          mb={[4, 4, 4, 0]}
          backgroundColor={"#FBFBFB"}
        >
          <VStack align={["flex-start"]} mb={[4, 4, 4, 0]}>
            <HStack>
              {summary_report.project_summary_report.project_url ? (
                <GithubIcon size={30} />
              ) : summary_report.project_summary_report.contract_platform ? (
                <Image
                  src={`/blockscan/${summary_report.project_summary_report.contract_platform}.svg`}
                  h={"30px"}
                  w={"30px"}
                />
              ) : (
                <ProjectIcon size={30} />
              )}
              <Text fontSize="xl" fontWeight={"bold"}>
                {summary_report.project_summary_report.project_name}
                {summary_report.project_summary_report.contract_name}
              </Text>
            </HStack>
            <Text fontSize="md" fontWeight={"normal"} wordBreak="break-all">
              {summary_report.project_summary_report.project_url}
              {summary_report.project_summary_report.contract_address}
            </Text>
            <HStack align={"flex-start"}>
              <Text
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                width={"100%"}
              >
                Lines of Code
              </Text>
              <Text fontSize="lg" fontWeight={"bold"}>
                {summary_report.scan_summary[0].lines_analyzed_count}
              </Text>
            </HStack>
          </VStack>

          <VStack align={"center"}>
            <CircularProgress
              value={
                summary_report.scan_summary[0].score_v2
                  ? parseFloat(summary_report.scan_summary[0].score_v2)
                  : parseFloat(
                      (
                        parseFloat(summary_report.scan_summary[0].score) * 20
                      ).toFixed(2)
                    )
              }
              color="accent"
              thickness="8px"
              size="90px"
              capIsRound
            >
              <CircularProgressLabel
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Flex flexDir="column" alignItems="center" w="100%">
                  <Text fontSize="lg" fontWeight={900} color="accent">
                    {summary_report.scan_summary[0].score_v2 ||
                      (
                        parseFloat(summary_report.scan_summary[0].score) * 20
                      ).toFixed(2)}
                  </Text>
                </Flex>
              </CircularProgressLabel>
            </CircularProgress>
            <Text
              fontSize="md"
              fontWeight={"600"}
              color={"accent"}
              width={"100%"}
            >
              Security Score
            </Text>
          </VStack>
        </Flex>
        <Flex
          as="div"
          w="100%"
          h="fit-content"
          alignItems="center"
          justifyContent="center"
        >
          <Box h="260px" w="100%">
            <VictoryPie
              data={victoryPieData(
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.critical,
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.high,
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.medium,
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.low,
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.informational,
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.gas
              )}
              innerRadius={70}
              cornerRadius={5}
              style={{
                labels: { fill: "black", fontSize: 20, fontWeight: "bold" },
              }}
              colorScale={[
                "#960D00",
                "#FF5C00",
                "#FFE600",
                "#38CB89",
                "#A0AEC0",
                "#F795B4",
              ]}
            ></VictoryPie>
          </Box>
        </Flex>
        <Flex
          as="div"
          w="100%"
          alignItems="center"
          justifyContent={["space-between", "space-between"]}
          flexDir={["row"]}
          flexWrap="wrap"
          mb={5}
        >
          <Box w={["50%"]} px={[0, 0, 0, 15]}>
            <VulnerabilityProgress
              label="Critical"
              variant="critical"
              count={
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.critical
              }
              total={summary_report.scan_summary[0].issues_count}
            />
            <VulnerabilityProgress
              label="High"
              variant="high"
              count={
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.high
              }
              total={summary_report.scan_summary[0].issues_count}
            />
            <VulnerabilityProgress
              label="Medium"
              variant="medium"
              count={
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.medium
              }
              total={summary_report.scan_summary[0].issues_count}
            />
          </Box>
          <Box w={["50%"]} px={[0, 0, 0, 15]}>
            <VulnerabilityProgress
              label="Low"
              variant="low"
              count={
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.low
              }
              total={summary_report.scan_summary[0].issues_count}
            />
            <VulnerabilityProgress
              label="Informational"
              variant="informational"
              count={
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.informational
              }
              total={summary_report.scan_summary[0].issues_count}
            />
            <VulnerabilityProgress
              label="Gas"
              variant="gas"
              count={
                summary_report.scan_summary[
                  summary_report.scan_summary.length - 1
                ].issue_severity_distribution.gas
              }
              total={summary_report.scan_summary[0].issues_count}
            />
          </Box>
        </Flex>
      </Box>
      <Flex
        as="div"
        w="100%"
        border={"1px solid #D9D9D9;"}
        alignItems={["center", "center", "center", "flex-start"]}
        justifyContent={["center", "center", "center", "flex-start"]}
        flexDir={"column"}
        px={[0, 0, 0, 6]}
        borderTopWidth={0}
        mt={0}
        sx={{
          pageBreakAfter: "always",
        }}
      >
        <Text
          fontSize="lg"
          fontWeight={"bold"}
          my={5}
          width={"100%"}
          textAlign={["center", "center", "center", "left"]}
        >
          ACTION TAKEN
        </Text>
        <Stack
          w="100%"
          spacing={0}
          direction={["column", "column", "column", "row"]}
        >
          <HStack spacing={[0, 0, 0, 10]} width={"100%"}>
            <VStack
              align={["center", "center", "center", "flex-start"]}
              textAlign={["center", "center", "center", "left"]}
              width={["100%", "100%", "100%", "40%"]}
              borderTop={["1px solid #F3F3F3", null, null, "none"]}
              borderRight={["1px solid #F3F3F3", null, null, "none"]}
              borderBottom={["1px solid #F3F3F3", null, null, "none"]}
              py={3}
            >
              <Text
                fontSize="md"
                fontWeight={"bold"}
                color={"gray.400"}
                mb={[0, 0, 0, 1]}
                width={"100%"}
              >
                Fixed
              </Text>
              <HStack
                width={["auto", "auto", "auto", "60%"]}
                px={3}
                py={0}
                alignItems={["center"]}
                border={["none", "none", "none", "1px solid #E6E6E6;"]}
              >
                <Image
                  height={7}
                  width={7}
                  src={`${assetsURL}icons/fixed_color.svg`}
                />
                <Text fontSize="2xl" fontWeight={"bold"} width={"100%"}>
                  {summary_report.scan_summary[0].fixed_count}
                </Text>
              </HStack>
            </VStack>
            <VStack
              align={["center", "center", "center", "flex-start"]}
              textAlign={["center", "center", "center", "left"]}
              width={["100%", "100%", "100%", "40%"]}
              borderTop={["1px solid #F3F3F3", null, null, "none"]}
              borderBottom={["1px solid #F3F3F3", null, null, "none"]}
              py={3}
            >
              <Text
                fontSize="md"
                fontWeight={"bold"}
                color={"gray.400"}
                mb={[0, 0, 0, 1]}
                width={"100%"}
              >
                False Positive
              </Text>
              <HStack
                width={["auto", "auto", "auto", "60%"]}
                px={3}
                py={0}
                alignItems={["center"]}
                border={["none", "none", "none", "1px solid #E6E6E6;"]}
              >
                <Image
                  height={7}
                  width={7}
                  src={`${assetsURL}report/false_positive_color.svg`}
                />
                <Text fontSize="2xl" fontWeight={"bold"} width={"100%"}>
                  {summary_report.scan_summary[0].false_positive_count}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack spacing={[0, 0, 0, 10]} width={"100%"}>
            <VStack
              align={["center", "center", "center", "flex-start"]}
              textAlign={["center", "center", "center", "left"]}
              width={["100%", "100%", "100%", "40%"]}
              borderRight={["1px solid #F3F3F3", null, null, "none"]}
              py={3}
            >
              <Text
                fontSize="md"
                fontWeight={"bold"}
                color={"gray.400"}
                mb={[0, 0, 0, 1]}
                width={"100%"}
              >
                Won't Fix
              </Text>
              <HStack
                width={["auto", "auto", "auto", "60%"]}
                px={3}
                py={0}
                alignItems={["center"]}
                border={["none", "none", "none", "1px solid #E6E6E6;"]}
              >
                <Image
                  height={7}
                  width={7}
                  src={`${assetsURL}report/wont_fix_color.svg`}
                />
                <Text fontSize="2xl" fontWeight={"bold"} mb={10} width={"100%"}>
                  {summary_report.scan_summary[0].wont_fix_count}
                </Text>
              </HStack>
            </VStack>
            <VStack
              align={["center", "center", "center", "flex-start"]}
              textAlign={["center", "center", "center", "left"]}
              width={["100%", "100%", "100%", "40%"]}
              py={3}
            >
              <Text
                fontSize="md"
                fontWeight={"bold"}
                color={"gray.400"}
                mb={[0, 0, 0, 1]}
                width={"100%"}
              >
                Pending Fix
              </Text>
              <HStack
                width={["auto", "auto", "auto", "60%"]}
                px={3}
                py={0}
                alignItems={["center"]}
                border={["none", "none", "none", "1px solid #E6E6E6;"]}
              >
                <Image
                  height={7}
                  width={7}
                  src={`${assetsURL}report/pending_fix_color.svg`}
                />
                <Text fontSize="2xl" fontWeight={"bold"} mb={10} width={"100%"}>
                  {summary_report.scan_summary[0].pending_fix_count}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Stack>
      </Flex>

      <h6></h6>
      <Flex
        as="div"
        w={"100%"}
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"row"}
        textAlign={["left", "left"]}
        py={5}
        px={2}
        mt={"50px"}
        border={"1px solid #D9D9D9;"}
        // px={[1, 1, 1, 10]}
        backgroundColor={"#F5F5F5"}
      >
        {isDesktopView && (
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={"17%"}
          >
            Bug ID
          </Text>
        )}
        <Text
          fontSize="md"
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={"20%"}
          pl={[2, 2, 2, 0]}
        >
          Severity
        </Text>
        <Text
          fontSize="md"
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={"45%"}
        >
          Bug Type
        </Text>
        <Text
          fontSize="md"
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={"18%"}
        >
          Status
        </Text>
      </Flex>
      {Object.keys(summary_report.issues).map((key) =>
        summary_report.issues[key].issue_details.map((issue) => {
          counter1++;
          return (
            <>
              <Flex
                as="section"
                w={"100%"}
                alignItems="flex-start"
                justifyContent="flex-start"
                flexDir={"row"}
                textAlign={["left", "left"]}
                py={5}
                px={2}
                // mt={counter1 % 13 === 0 ? 5 : 0}
                border={"1px solid #D9D9D9;"}
                sx={{
                  pageBreakAfter:
                    counter1 && counter1 % 10 === 0 ? "always" : "avoid",
                }}
                // borderBottomWidth={1}
                // borderBottomColor={"#E4E4E4"}
              >
                {isDesktopView && (
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.600"}
                    width={"17%"}
                  >
                    {issue.bug_id}
                  </Text>
                )}
                <Flex
                  as="div"
                  w={"20%"}
                  height={"30px"}
                  alignItems="center"
                  justifyContent="flex-start"
                  flexDir={"row"}
                  pl={[2, 2, 2, 0]}
                >
                  <SeverityIcon variant={issue.severity} />
                  <Text
                    fontSize={["sm", "sm", "sm", "md"]}
                    fontWeight={"normal"}
                    color={"gray.600"}
                    ml={2}
                    width={"100%"}
                  >
                    {sentenceCapitalize(issue.severity)}
                  </Text>
                </Flex>
                <Text
                  fontSize={["sm", "sm", "sm", "md"]}
                  fontWeight={"normal"}
                  color={"gray.600"}
                  width={"45%"}
                  pr={1}
                >
                  {issue.issue_name}
                </Text>
                <HStack width={"18%"}>
                  <Image
                    src={`${assetsURL}icons/${issue.bug_status}_color.svg`}
                  />
                  <Text
                    fontSize={["sm", "sm", "sm", "md"]}
                    fontWeight={"normal"}
                    color={"gray.600"}
                  >
                    {/* {sentenceCapitalize(
                            issue.status.toLowerCase().replace("_", " ")
                          )} */}

                    {issue.bug_status === "false_positive" && "False Positive"}
                    {issue.bug_status === "wont_fix" && "Won't Fix"}
                    {issue.bug_status === "pending_fix" && "Pending Fix"}
                    {issue.bug_status === "fixed" && "Fixed"}
                  </Text>
                </HStack>
              </Flex>
              {counter1 && counter1 % 10 === 0 && (
                <h6 style={{ marginBottom: "20px" }}></h6>
              )}
            </>
          );
        })
      )}
      <Box
        height={"1px"}
        width={"1px"}
        sx={{
          pageBreakAfter: "always",
        }}
      ></Box>
      <h6 style={{ marginBottom: "10px" }}></h6>
    </>
  );
};

export default FindingSummaryContainer;

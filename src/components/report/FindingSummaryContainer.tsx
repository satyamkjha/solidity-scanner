import {
  Flex,
  Heading,
  HStack,
  Box,
  Text,
  Image,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Stack,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { Report } from "common/types";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { GithubIcon, ProjectIcon, SeverityIcon } from "components/icons";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import React from "react";

const FindingSummaryContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

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
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      py={20}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        my={10}
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
      <Box w="100%" mb={6} border={"1px solid #D9D9D9;"}>
        <Flex
          as="div"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          flexDir={["column", "column", "column", "row"]}
          py={7}
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
                  src={`${assetsURL}blockscan/${summary_report.project_summary_report.contract_platform}.svg`}
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
          </VStack>
          <Stack
            spacing={[4, 4, 4, 20]}
            direction={[
              "column-reverse",
              "column-reverse",
              "column-reverse",
              "row",
            ]}
            align={["center", "center", "center", "flex-start"]}
          >
            <VStack align={["center", "center", "center", "flex-start"]}>
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
          </Stack>
        </Flex>
        <Flex
          as="div"
          w="100%"
          alignItems="center"
          justifyContent={["center", "center", "center", "space-between"]}
          flexDir={["column", "column", "column", "row"]}
          mb={5}
        >
          <Box
            w={["100%", "100%", "100%", "30%"]}
            h="300px"
            ml={[10, 10, 10, 0]}
          >
            <ResponsivePie
              data={pieData(
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
              margin={{ top: 40, right: 40, bottom: 40, left: 0 }}
              colors={{ datum: "data.color" }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
            />
          </Box>
          <Box w={["100%", "100%", "100%", "30%"]} px={[0, 0, 0, 15]}>
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
          <Box w={["100%", "100%", "100%", "30%"]} px={[0, 0, 0, 15]}>
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
        <Divider
          style={{
            borderWidth: 1,
            borderColor: "#d0d1cf",
            backgroundColor: "#d0d1cf",
          }}
          mb={20}
          mx={[0, 0, 0, 6]}
        />
        <Flex
          as="div"
          w="100%"
          alignItems={["center", "center", "center", "flex-start"]}
          justifyContent={["center", "center", "center", "flex-start"]}
          flexDir={"column"}
          px={[0, 0, 0, 6]}
        >
          <Text
            fontSize="lg"
            fontWeight={"bold"}
            mb={10}
            width={"100%"}
            textAlign={["center", "center", "center", "left"]}
          >
            ACTION TAKEN
          </Text>
          <Stack
            w="100%"
            mb={[4, 4, 4, 10]}
            spacing={0}
            direction={["column", "column", "column", "row"]}
          >
            <HStack spacing={[0, 0, 0, 10]} width={"100%"}>
              <VStack
                align={["center", "center", "center", "flex-start"]}
                textAlign={["center", "center", "center", "left"]}
                width={["100%", "100%", "100%", "40%"]}
                borderRight={["1px solid #F3F3F3", null, null, "none"]}
                borderBottom={["1px solid #F3F3F3", null, null, "none"]}
                py={[6, 6, 6, 0]}
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
                  py={[0, 0, 0, 2]}
                  alignItems={["center"]}
                  border={["none", "none", "none", "1px solid #E6E6E6;"]}
                >
                  <Image
                    height={7}
                    width={7}
                    src={`${assetsURL}report/fixed_color.svg`}
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
                borderBottom={["1px solid #F3F3F3", null, null, "none"]}
                py={[6, 6, 6, 0]}
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
                  py={[0, 0, 0, 2]}
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
                py={[6, 6, 6, 0]}
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
                  py={[0, 0, 0, 2]}
                  alignItems={["center"]}
                  border={["none", "none", "none", "1px solid #E6E6E6;"]}
                >
                  <Image
                    height={7}
                    width={7}
                    src={`${assetsURL}report/wont_fix_color.svg`}
                  />
                  <Text
                    fontSize="2xl"
                    fontWeight={"bold"}
                    mb={10}
                    width={"100%"}
                  >
                    {summary_report.scan_summary[0].wont_fix_count}
                  </Text>
                </HStack>
              </VStack>
              <VStack
                align={["center", "center", "center", "flex-start"]}
                textAlign={["center", "center", "center", "left"]}
                width={["100%", "100%", "100%", "40%"]}
                py={[6, 6, 6, 0]}
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
                  py={[0, 0, 0, 2]}
                  alignItems={["center"]}
                  border={["none", "none", "none", "1px solid #E6E6E6;"]}
                >
                  <Image
                    height={7}
                    width={7}
                    src={`${assetsURL}report/pending_fix_color.svg`}
                  />
                  <Text
                    fontSize="2xl"
                    fontWeight={"bold"}
                    mb={10}
                    width={"100%"}
                  >
                    {summary_report.scan_summary[0].pending_fix_count}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </Stack>
        </Flex>
      </Box>
      <Flex
        w="100%"
        pr={[4, 4, 4, 0]}
        overflow={["scroll", "scroll", "scroll", "auto"]}
        direction="column"
      >
        <Flex
          as="div"
          w={["170%", "170%", "170%", "100%"]}
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          textAlign={["left", "left"]}
          py={5}
          px={[1, 1, 1, 10]}
          backgroundColor={"#F5F5F5"}
        >
          {isDesktopView && (
            <Text
              fontSize="md"
              fontWeight={"extrabold"}
              color={"gray.600"}
              width={"15%"}
            >
              Bug ID
            </Text>
          )}
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={["50%", "50%", "50%", "20%"]}
            pl={[2, 2, 2, 0]}
          >
            Severity
          </Text>
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={["120%", "120%", "120%", "50%"]}
          >
            Bug Type
          </Text>
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={["50%", "50%", "50%", "15%"]}
          >
            Status
          </Text>
        </Flex>
        {Object.keys(summary_report.issues).map((key) =>
          summary_report.issues[key].issue_details.map((issue) => (
            <Flex
              as="section"
              w={["170%", "170%", "170%", "100%"]}
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDir={"row"}
              textAlign={["left", "left"]}
              py={5}
              px={[1, 10]}
              borderBottomWidth={1}
              borderBottomColor={"#E4E4E4"}
            >
              {isDesktopView && (
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  width={"15%"}
                >
                  {issue.bug_id}
                </Text>
              )}
              <Flex
                as="div"
                w={["50%", "50%", "50%", "20%"]}
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
                width={["120%", "120%", "120%", "50%"]}
              >
                {issue.issue_name}
              </Text>
              <HStack width={["50%", "50%", "50%", "15%"]}>
                <Image
                  src={`${assetsURL}report/${issue.bug_status}_color.svg`}
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
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default FindingSummaryContainer;

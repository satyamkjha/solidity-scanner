import {
  Container,
  Flex,
  Heading,
  Box,
  HStack,
  Divider,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Image,
  useMediaQuery,
  Stack,
} from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { Report } from "common/types";
import {
  Logo,
  SeverityIcon,
  GithubIcon,
  ProjectIcon,
  IssueDescriptionIcons,
  IssueRemediationIcons,
  ReportCoverDots,
} from "components/icons";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { sentenceCapitalize } from "helpers/helperFunction";
import React from "react";
import styled from "@emotion/styled";

export const ReportContainer: React.FC<{ summary_report: Report }> = ({
  summary_report,
}) => {
  let d = new Date();

  if (summary_report) {
    d = new Date(
      summary_report.project_summary_report.last_project_report_update_time
    );
  }

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
      color: "#FF5C00",
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

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Container
      maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
      color="black"
      overflow={"hidden"}
    >
      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        py={[4, 4, 4, 20]}
        pl={[6, 6, 6, 10]}
        marginTop={[6, 6, 6, "100px"]}
        marginBottom={[2, 2, 2, "400px"]}
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
        backgroundImage={[
          null,
          null,
          null,
          "url('/background/report_cover.png')",
        ]}
      >
        <Logo />
        <Text fontSize="2xl" color={"gray.400"} mt={[10, 10, 10, 20]} mb={5}>
          Security Assessment
        </Text>
        <Heading fontSize={["3xl", "4xl"]} mb={3}>
          {summary_report.project_summary_report.project_name}
        </Heading>
        <Text fontSize="xl" mb={20}>
          {`${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`}
        </Text>
        <Box
          w="100%"
          h={["50vh", "50vh", "50vh", "auto"]}
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          backgroundImage={[
            "url('/background/report_cover.svg')",
            null,
            null,
            null,
            "",
          ]}
        >
          <Text
            fontSize="lg"
            width={["100%", "100%", "100%", "60%"]}
            color={"gray.300"}
            mb={10}
          >
            This security assessment report was prepared by SolidityScan.com, a
            cloud-based Smart Contract Scanner.
          </Text>
          <ReportCoverDots />
        </Box>
      </Flex>
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
            Table of
          </Heading>
          <Text fontSize="4xl" fontWeight={400}>
            {" "}
            &nbsp;Contents.{" "}
          </Text>
        </Flex>
        <Text fontSize="xl" fontWeight={"bold"} mt={16} mb={4}>
          Project Summary
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Audit Summary
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Findings Summary
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Vulnerability Details
        </Text>
        {Object.keys(summary_report.issues).map((key, index) => (
          <>
            <HStack ml={5} my={1} spacing={5}>
              <SeverityIcon variant={"black"} />
              <Text fontSize={["md"]} fontWeight={"300"} lineHeight="1.5">
                {summary_report.issues[key].issue_name}
              </Text>
            </HStack>
            {index !== Object.keys(summary_report.issues).length - 1 && (
              <Divider />
            )}
          </>
        ))}
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Scan History
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Disclaimer
        </Text>
      </Flex>
      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        py={20}
        px={[2, 2, 2, 0]}
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
            Project
          </Heading>
          <Text fontSize="4xl" fontWeight={400}>
            {" "}
            &nbsp;Summary{" "}
          </Text>
        </Flex>
        <Text fontSize="lg" fontWeight={"300"} mt={[6, 6, 6, 12]} mb={4}>
          This report has been prepared for{" "}
          {summary_report.project_summary_report.project_name} using
          SolidityScan to scan and discover vulnerabilities and safe coding
          practices in their smart contract including the libraries used by the
          contract that are not officially recognized. The SolidityScan tool
          runs a comprehensive static analysis on the Solidity code and finds
          vulnerabilities ranging from minor gas optimizations to major
          vulnerabilities leading to the loss of funds. The coverage scope pays
          attention to all the informational and critical vulnerabilities with
          over (100+) modules. The scanning and auditing process covers the
          following areas:{" "}
        </Text>

        <Text fontSize="lg" fontWeight={"300"} mt={4} mb={4}>
          Various common and uncommon attack vectors will be investigated to
          ensure that the smart contracts are secure from malicious actors. The
          scanner modules find and flag issues related to Gas optimizations that
          help in reducing the overall Gas cost It scans and evaluates the
          codebase against industry best practices and standards to ensure
          compliance It makes sure that the officially recognized libraries used
          in the code are secure and up to date
        </Text>
        <Text fontSize="lg" fontWeight={"300"} mt={4} mb={4}>
          The SolidityScan Team recommends running regular audit scans to
          identify any vulnerabilities that are introduced after{" "}
          {summary_report.project_summary_report.project_name} introduces new
          features or refactors the code.
        </Text>
      </Flex>
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
            Audit
          </Heading>
          <Text fontSize="4xl" fontWeight={400}>
            {" "}
            &nbsp;Summary{" "}
          </Text>
        </Flex>
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          p={0}
          border={"1px solid #D9D9D9;"}
        >
          <Flex
            as="div"
            w={["100%", "100%", "100%", "25%"]}
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            px={5}
            py={3}
            backgroundColor={"#FBFBFB"}
          >
            {summary_report.project_summary_report.project_name && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                >
                  Project Name
                </Text>
                {!isDesktopView && (
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.project_name}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_name && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Name
                </Text>
                {!isDesktopView && (
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.contract_name}
                  </Text>
                )}
                <Divider />
              </>
            )}
            <Text
              fontSize="lg"
              fontWeight={"bold"}
              color={"gray.600"}
              my={[1, 1, 1, 4]}
              mt={[4, 4, 4, 4]}
            >
              Contract Type
            </Text>
            {!isDesktopView && (
              <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                {"Smart Contract"}
              </Text>
            )}
            <Divider />
            {summary_report.project_summary_report.contract_address && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Address
                </Text>
                {!isDesktopView && (
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.contract_address}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_platform && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Platform
                </Text>
                {!isDesktopView && (
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.contract_platform}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_chain && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Chain
                </Text>
                {!isDesktopView && (
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.contract_chain}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_url && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract URL
                </Text>
                {!isDesktopView && (
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.contract_url}
                  </Text>
                )}
                <Divider />
              </>
            )}
            <Text
              fontSize="lg"
              fontWeight={"bold"}
              color={"gray.600"}
              my={[1, 1, 1, 4]}
              mt={[4, 4, 4, 4]}
            >
              Language
            </Text>
            {!isDesktopView && (
              <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                {"Solidity"}
              </Text>
            )}
            <Divider />
            {summary_report.project_summary_report.project_url && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Codebase
                </Text>
                {!isDesktopView && (
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.project_url}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.git_commit_hash && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Commit Hash
                </Text>
                {!isDesktopView && (
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.git_commit_hash}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.website && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Website
                </Text>
                {!isDesktopView && (
                  <>
                    {" "}
                    <Text
                      fontSize="lg"
                      fontWeight={"normal"}
                      mb={4}
                      wordBreak="break-word"
                    >
                      {summary_report.project_summary_report.website}
                    </Text>
                    <Divider />
                  </>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.date_published && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Date Published
                </Text>
                {!isDesktopView && (
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.date_published}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.organization && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Organization
                </Text>
                {!isDesktopView && (
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.organization}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.report_owner && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Publishers/Owners Name
                </Text>
                {!isDesktopView && (
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.report_owner}
                  </Text>
                )}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.email && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contact Email
                </Text>
                {!isDesktopView && (
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.email}
                  </Text>
                )}
                <Divider />
              </>
            )}
            <Text
              fontSize="lg"
              fontWeight={"bold"}
              color={"gray.600"}
              my={[1, 1, 1, 4]}
              mt={[4, 4, 4, 4]}
            >
              Audit Methodology
            </Text>
            {!isDesktopView && (
              <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                {"Static Scanning"}
              </Text>
            )}
          </Flex>
          {isDesktopView && (
            <Flex
              as="div"
              w="75%"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDir={"column"}
              px={5}
              py={3}
              backgroundColor={"#FFFFFF"}
            >
              {summary_report.project_summary_report.project_name && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.project_name}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.contract_name && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.contract_name}
                  </Text>
                  <Divider />
                </>
              )}
              <Text fontSize="lg" fontWeight={"normal"} my={4}>
                {"Smart Contract"}
              </Text>
              <Divider />
              {summary_report.project_summary_report.contract_address && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.contract_address}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.contract_platform && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.contract_platform}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.contract_chain && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.contract_chain}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.contract_url && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.contract_url}
                  </Text>
                  <Divider />
                </>
              )}
              <Text fontSize="lg" fontWeight={"normal"} my={4}>
                {"Solidity"}
              </Text>
              <Divider />
              {summary_report.project_summary_report.project_url && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.project_url}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.git_commit_hash && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.git_commit_hash}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.website && (
                <>
                  {" "}
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.website}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.date_published && (
                <>
                  {" "}
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.date_published}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.organization && (
                <>
                  {" "}
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.organization}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.report_owner && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.report_owner}
                  </Text>
                  <Divider />
                </>
              )}
              {summary_report.project_summary_report.email && (
                <>
                  <Text fontSize="lg" fontWeight={"normal"} my={4}>
                    {summary_report.project_summary_report.email}
                  </Text>
                  <Divider />
                </>
              )}
              <Text fontSize="lg" fontWeight={"normal"} my={4}>
                {"Static Scanning"}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
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

              <CircularProgress
                value={
                  (parseInt(summary_report.scan_summary[0].score, 10) * 100) / 5
                }
                color="accent"
                thickness="8px"
                size="100px"
                capIsRound
              >
                <CircularProgressLabel
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box>
                    <Text fontSize="lg" fontWeight={900} color="accent">
                      {summary_report.scan_summary[0].score}
                    </Text>
                    <Text fontSize="sm" color="subtle" mt="-4px">
                      Score
                    </Text>
                  </Box>
                </CircularProgressLabel>
              </CircularProgress>
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
                    <Image height={7} width={7} src="/icons/fixed_color.svg" />
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
                      src="/icons/false_positive_color.svg"
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
                      src="/icons/wont_fix_color.svg"
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
                      src="/icons/pending_fix_color.svg"
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
          {Object.keys(summary_report.issues).map((key, index) =>
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
                  <Image src={`/icons/${issue.bug_status}_color.svg`} />
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
            Vulnerability
          </Heading>
          <Text fontSize="4xl" fontWeight={400}>
            {" "}
            &nbsp;Details{" "}
          </Text>
        </Flex>

        {Object.keys(summary_report.issues).map((key, index) =>
          summary_report.issues[key].issue_details.map((issue) => (
            <Flex
              p={5}
              flexDir="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              border={"1px solid #D9D9D9;"}
              my={5}
              width={"100%"}
            >
              <Text
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                width={"100%"}
                mb={1}
              >
                Bug ID
              </Text>
              <Text fontSize="xl" fontWeight={"bold"} mb={5} width={"100%"}>
                {issue.bug_id}
              </Text>
              <Flex width={"100%"} mb={3} flexWrap="wrap">
                <VStack
                  width={["50%", "50%", "50%", "15%"]}
                  mb={[4, 4, 4, 0]}
                  alignItems="flex-start"
                >
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                  >
                    Severity
                  </Text>
                  <HStack>
                    <SeverityIcon variant={issue.severity} />
                    <Text
                      fontSize="lg"
                      fontWeight={"bold"}
                      ml={2}
                      width={"100%"}
                    >
                      {sentenceCapitalize(issue.severity)}
                    </Text>
                  </HStack>
                </VStack>
                <VStack
                  width={["50%", "50%", "50%", "15%"]}
                  mb={[4, 4, 4, 0]}
                  alignItems="flex-start"
                >
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                  >
                    Confidence
                  </Text>
                  <HStack>
                    <Text
                      px={5}
                      py={1}
                      borderRadius={20}
                      color={
                        issue.issue_confidence === "2"
                          ? "#289F4C"
                          : issue.issue_confidence === "1"
                          ? "#ED9801"
                          : "#FF5630"
                      }
                      backgroundColor={
                        issue.issue_confidence === "2"
                          ? "#CFFFB8"
                          : issue.issue_confidence === "1"
                          ? "#FFF8EB"
                          : "#FFF5F3"
                      }
                      fontSize="lg"
                      fontWeight={"bold"}
                    >
                      {issue.issue_confidence === "2"
                        ? "Certain"
                        : issue.issue_confidence === "1"
                        ? "Firm"
                        : "Tentative"}
                    </Text>
                  </HStack>
                </VStack>
                <VStack
                  width={["50%", "50%", "50%", "15%"]}
                  my={[4, 4, 4, 0]}
                  alignItems="flex-start"
                >
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                  >
                    Line nos
                  </Text>
                  <Text fontSize="lg" fontWeight={"bold"}>
                    {issue.findings[0].line_nos_start}-
                    {issue.findings[0].line_nos_end}
                  </Text>
                </VStack>
                <VStack
                  width={["50%", "50%", "50%", "15%"]}
                  my={[4, 4, 4, 0]}
                  alignItems="flex-start"
                >
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                  >
                    Action Taken
                  </Text>
                  <HStack>
                    <Image src={`/icons/${issue.bug_status}_color.svg`} />
                    <Text
                      fontSize="md"
                      fontWeight={"normal"}
                      color={"gray.600"}
                    >
                      {/* {sentenceCapitalize(
                          issue.status.toLowerCase().replace("_", " ")
                        )} */}

                      {issue.bug_status === "false_positive" &&
                        "False Positive"}
                      {issue.bug_status === "wont_fix" && "Won't Fix"}
                      {issue.bug_status === "pending_fix" && "Pending Fix"}
                      {issue.bug_status === "fixed" && "Fixed"}
                    </Text>
                  </HStack>
                </VStack>
              </Flex>
              <Text
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                mb={1}
                width={"100%"}
              >
                Bug Type
              </Text>
              <Text fontSize="lg" fontWeight={"bols"} mb={5} width={"100%"}>
                {issue.issue_name}
              </Text>
              <Text
                fontSize="md"
                fontWeight={"normal"}
                color={"gray.400"}
                mb={1}
                width={"100%"}
              >
                File Location
              </Text>
              {issue.findings.map((finding) => (
                <Text fontSize="md" fontWeight={"bold"} mb={1} width={"100%"}>
                  {finding.file_path}
                </Text>
              ))}
              <Divider mt={5} />
              <HStack spacing={5} mt={5} mb={3}>
                <IssueDescriptionIcons size={40} />
                <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
                  Issue Description
                </Text>
              </HStack>
              <DescriptionWrapper>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: issue.issue_description,
                  }}
                />
              </DescriptionWrapper>
              <HStack spacing={5} mt={5} mb={3}>
                <IssueRemediationIcons size={40} />
                <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
                  Issue Remediation
                </Text>
              </HStack>
              <DescriptionWrapper>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: issue.issue_remediation,
                  }}
                />
              </DescriptionWrapper>
              {issue.comment !== "" && issue.bug_status === "wont_fix" && (
                <>
                  <HStack spacing={5} mt={10} mb={5}>
                    <IssueRemediationIcons size={40} />
                    <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
                      Comments
                    </Text>
                  </HStack>
                  <Text>{issue.comment}</Text>
                </>
              )}
            </Flex>
          ))
        )}
      </Flex>

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
            Scan
          </Heading>
          <Text fontSize="4xl" fontWeight={400}>
            {" "}
            &nbsp;History{" "}
          </Text>
        </Flex>
        {isDesktopView && (
          <Flex
            as="section"
            w="100%"
            alignItems="center"
            justifyContent="flex-end"
            flexDir={"row"}
            textAlign={["left", "left"]}
            py={2}
            px={[1, 10]}
          >
            <SeverityIcon variant={"critical"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              mr={5}
            >
              Critical
            </Text>
            <SeverityIcon variant={"high"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              mr={5}
            >
              High
            </Text>
            <SeverityIcon variant={"medium"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              mr={5}
            >
              Medium
            </Text>
            <SeverityIcon variant={"low"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              mr={5}
            >
              Low
            </Text>
            <SeverityIcon variant={"informational"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              mr={5}
            >
              Informational
            </Text>
            <SeverityIcon variant={"gas"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              mr={5}
            >
              Gas
            </Text>
          </Flex>
        )}
        <Flex
          as="section"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          textAlign={["left", "left"]}
          py={5}
          px={[1, 10]}
          backgroundColor={"#F5F5F5"}
        >
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={["30%", "30%", "30%", "10%"]}
            pl={[4, 4, 4, 0]}
          >
            No
          </Text>
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={["50%", "50%", "50%", "23%"]}
          >
            Date
          </Text>
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={"17%"}
          >
            Score
          </Text>
          {isDesktopView && (
            <Text
              fontSize="md"
              fontWeight={"extrabold"}
              color={"gray.600"}
              width={"50%"}
            >
              Scan Overview
            </Text>
          )}
        </Flex>

        {summary_report.scan_summary.map((scan, index) => (
          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"row"}
            textAlign={["left", "left"]}
            py={5}
            px={[1, 10]}
            borderBottomWidth={1}
            borderBottomColor={"#E4E4E4"}
          >
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              width={["30%", "30%", "30%", "10%"]}
              pl={[4, 4, 4, 0]}
            >
              {index + 1}.
            </Text>
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              width={["50%", "50%", "50%", "23%"]}
            >
              {scan.scan_time.slice(0, 10)}
            </Text>
            <Text
              fontSize="md"
              fontWeight={"extrabold"}
              color={"#3300FF"}
              width={["20%", "20%", "20%", "17%"]}
            >
              {scan.score}
            </Text>

            {isDesktopView && (
              <Flex
                as="div"
                w="50%"
                height={"30px"}
                alignItems="center"
                justifyContent="flex-start"
                flexDir={"row"}
              >
                <SeverityIcon variant={"critical"} />
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  ml={2}
                  width={"18%"}
                >
                  {scan.issue_severity_distribution.critical}
                </Text>
                <SeverityIcon variant={"high"} />
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  ml={2}
                  width={"18%"}
                >
                  {scan.issue_severity_distribution.high}
                </Text>
                <SeverityIcon variant={"medium"} />
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  ml={2}
                  width={"18%"}
                >
                  {scan.issue_severity_distribution.medium}
                </Text>
                <SeverityIcon variant={"low"} />
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  ml={2}
                  width={"18%"}
                >
                  {scan.issue_severity_distribution.low}
                </Text>
                <SeverityIcon variant={"informational"} />
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  ml={2}
                  width={"18%"}
                >
                  {scan.issue_severity_distribution.informational}
                </Text>
                <SeverityIcon variant={"gas"} />
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  ml={2}
                  width={"18%"}
                >
                  {scan.issue_severity_distribution.gas}
                </Text>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>

      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        py={20}
      >
        <Heading color={"#52FF00"} fontSize="4xl" my={10}>
          Disclaimer
        </Heading>

        <Text
          fontSize="lg"
          fontWeight={"normal"}
          color={"gray.500"}
          mt={8}
          mb={4}
        >
          The Reports neither endorse nor condemn any specific project or team,
          nor do they guarantee the security of any specific project. The
          contents of this report do not, and should not be interpreted as
          having any bearing on, the economics of tokens, token sales, or any
          other goods, services, or assets.
        </Text>

        <Text
          fontSize="lg"
          fontWeight={"normal"}
          color={"gray.500"}
          mt={8}
          mb={4}
        >
          The security audit is not meant to replace functional testing done
          before a software release.
        </Text>
        <Text
          fontSize="lg"
          fontWeight={"normal"}
          color={"gray.500"}
          mt={8}
          mb={4}
        >
          There is no warranty that all possible security issues of a particular
          smart contract(s) will be found by the tool, i.e., It is not
          guaranteed that there will not be any further findings based solely on
          the results of this evaluation.
        </Text>
        <Text
          fontSize="lg"
          fontWeight={"normal"}
          color={"gray.500"}
          mt={8}
          mb={4}
        >
          Emerging technologies such as Smart Contracts and Solidity carry a
          high level of technical risk and uncertainty. There is no warranty or
          representation made by this report to any Third Party in regards to
          the quality of code, the business model or the proprietors of any such
          business model, or the legal compliance of any business.
        </Text>
        <Text
          fontSize="lg"
          fontWeight={"normal"}
          color={"gray.500"}
          mt={8}
          mb={4}
        >
          In no way should a third party use these reports to make any decisions
          about buying or selling a token, product, service, or any other asset.
          It should be noted that this report is not investment advice, is not
          intended to be relied on as investment advice, and has no endorsement
          of this project or team. It does not serve as a guarantee as to the
          project's absolute security.
        </Text>
        <Text
          fontSize="lg"
          fontWeight={"normal"}
          color={"gray.500"}
          mt={8}
          mb={4}
        >
          The assessment provided by SolidityScan is subject to dependencies and
          under continuing development. You agree that your access and/or use,
          including but not limited to any services, reports, and materials,
          will be at your sole risk on an as-is, where-is, and as-available
          basis. SolidityScan owes no duty to any third party by virtue of
          publishing these Reports.
        </Text>
        <Text
          fontSize="lg"
          fontWeight={"normal"}
          color={"gray.500"}
          mt={8}
          mb={4}
        >
          As one audit-based assessment cannot be considered comprehensive, we
          always recommend proceeding with several independent manual audits
          including manual audit and a public bug bounty program to ensure the
          security of the smart contracts.
        </Text>
      </Flex>
    </Container>
  );
};

const DescriptionWrapper = styled.div`
  p {
    font-weight: 300;
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

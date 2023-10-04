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
  Link,
} from "@chakra-ui/react";
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
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import React from "react";
import styled from "@emotion/styled";
import { VictoryPie } from "victory";
import { useConfig } from "hooks/useConfig";

export const PrintContainer: React.FC<{ summary_report: Report }> = ({
  summary_report,
}) => {
  let d = new Date();

  if (summary_report) {
    d = new Date(
      summary_report.project_summary_report.last_project_report_update_time
    );
  }

  const [isDesktopView] = useMediaQuery(["(min-width: 1024px)"]);
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  let counter1 = 0;
  let counter2 = 0;

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
    <>
      <Container
        sx={{
          "@page": {
            margin: "30px",
            border: "1px solid #D9D9D9;",
            "@bottom-left": {
              display: "none",
            },
          },
        }}
        maxW={"900px"}
        color="black"
        overflow={"hidden"}
        position={"relative"}
      >
        {/* Cover Section */}
        <h6>.</h6>
        <Box
          sx={{
            pageBreakAfter: "always",
          }}
        >
          <Box
            position={"absolute"}
            w="100%"
            h={"100vh"}
            bg={
              "linear-gradient(90deg, #000000 -13.81%, rgba(0, 0, 0, 0.73) 35.37%, rgba(0, 0, 0, 0) 93.5%)"
            }
            zIndex={1}
          ></Box>
          <Box
            w="100%"
            h={"100vh"}
            bg={"black"}
            color={"white"}
            position={"relative"}
          >
            <Flex
              as="div"
              w="100%"
              h={"95%"}
              alignItems="flex-start"
              justifyContent={[
                "flex-start",
                "flex-start",
                "flex-start",
                "space-between",
              ]}
              flexDir={"row"}
              px={[6, 6, 6, 32]}
              py={[4, 4, 4, 20]}
              marginBottom={[2, 2, 2, "400px"]}
              backgroundSize="cover"
              backgroundRepeat={"no-repeat"}
              backgroundImage={[
                null,
                null,
                null,
                `url('${assetsURL}report/report_cover.svg')`,
              ]}
              position={"relative"}
            >
              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                flexDir={"column"}
                width={["100%", "100%", "100%", "80%", "70%"]}
                h={"100%"}
                zIndex={2}
              >
                <HStack justifyContent={"flex-start"} spacing={4}>
                  <Logo fill={"white"} />
                </HStack>
                <Text
                  fontSize="2xl"
                  fontWeight={400}
                  color={"subtle"}
                  mt={[10, 10, 10, 20]}
                  mb={3}
                >
                  Security Assessment
                </Text>
                <Heading fontSize={["3xl", "4xl"]} fontWeight={700} mb={3}>
                  {summary_report.project_summary_report.project_name}
                </Heading>
                <Text fontSize="2xl" mb={20} fontWeight={500}>
                  {`${d.getDate()} ${
                    monthNames[d.getMonth()]
                  } ${d.getFullYear()}`}
                </Text>
                <Box w="100%" h={["50vh", "50vh", "50vh", "auto"]}>
                  <Text
                    fontSize="lg"
                    fontWeight={400}
                    width={["100%", "100%", "80%", "60%"]}
                    color={"subtle"}
                    mb={10}
                  >
                    This security assessment report was prepared by
                    SolidityScan.com, a cloud-based Smart Contract Scanner.
                  </Text>
                  <ReportCoverDots />
                </Box>
                <Flex mt={"auto"} alignItems={"center"}>
                  <Image
                    src={
                      summary_report.project_summary_report.report_type ===
                      "self_published"
                        ? `${assetsURL}report/user-fill.svg`
                        : `${assetsURL}report/verified-fill.svg`
                    }
                  />
                  <VStack
                    alignItems={"flex-start"}
                    w={"60%"}
                    spacing={1}
                    ml={4}
                  >
                    <Text fontSize={"lg"}>
                      {summary_report.project_summary_report.report_type ===
                      "self_published"
                        ? "Self-published"
                        : "Verified Report"}
                    </Text>
                    <Text fontSize={"sm"} fontWeight={400}>
                      {summary_report.project_summary_report.report_type ===
                      "self_published"
                        ? "This audit report was Self-published by the user."
                        : "This audit report has been verified by the SolidityScan team."}{" "}
                      To learn more about our published reports{" "}
                      <Link
                        href="https://docs.solidityscan.com/report/"
                        isExternal
                        color={"accent"}
                      >
                        click here
                      </Link>
                      .
                    </Text>
                  </VStack>
                </Flex>
              </Flex>

              <Image
                height={[150, 150, 150, 250]}
                width={[150, 150, 150, 250]}
                src={
                  summary_report.project_summary_report.report_type ===
                  "self_published"
                    ? `${assetsURL}report/self_published_badge.svg`
                    : `${assetsURL}report/verified_report_badge.svg`
                }
              />
            </Flex>
          </Box>
        </Box>
        {/* Table of Contents */}
        <h6>.</h6>
        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          py={10}
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
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"column"}
          sx={{
            pageBreakAfter: "always",
          }}
          border={"1px solid #D9D9D9;"}
          py={[4, 4, 4, 20]}
          px={[6, 6, 6, 10]}
        >
          <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
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

        {/* Project Summary */}
        <h6>.</h6>
        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          py={10}
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
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"column"}
          sx={{
            pageBreakAfter: "always",
          }}
          border={"1px solid #D9D9D9;"}
          py={[4, 4, 4, 20]}
          px={[6, 6, 6, 10]}
        >
          <Text fontSize="lg" fontWeight={"300"} mt={[6, 6, 6, 12]} mb={4}>
            This report has been prepared for{" "}
            {summary_report.project_summary_report.project_name} using
            SolidityScan to scan and discover vulnerabilities and safe coding
            practices in their smart contract including the libraries used by
            the contract that are not officially recognized. The SolidityScan
            tool runs a comprehensive static analysis on the Solidity code and
            finds vulnerabilities ranging from minor gas optimizations to major
            vulnerabilities leading to the loss of funds. The coverage scope
            pays attention to all the informational and critical vulnerabilities
            with over ({no_of_vuln_detectors}+) modules. The scanning and
            auditing process covers the following areas:{" "}
          </Text>

          <Text fontSize="lg" fontWeight={"300"} mt={4} mb={4}>
            Various common and uncommon attack vectors will be investigated to
            ensure that the smart contracts are secure from malicious actors.
            The scanner modules find and flag issues related to Gas
            optimizations that help in reducing the overall Gas cost It scans
            and evaluates the codebase against industry best practices and
            standards to ensure compliance It makes sure that the officially
            recognized libraries used in the code are secure and up to date
          </Text>
          <Text fontSize="lg" fontWeight={"300"} mt={4} mb={4}>
            The SolidityScan Team recommends running regular audit scans to
            identify any vulnerabilities that are introduced after{" "}
            {summary_report.project_summary_report.project_name} introduces new
            features or refactors the code.
          </Text>
        </Flex>

        {/* Audit Summary */}
        <h6>.</h6>
        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          py={5}
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
          flexDir={"column"}
          sx={{
            pageBreakAfter: "always",
          }}
          border={"1px solid #D9D9D9;"}
          py={[4, 4, 4, 20]}
        >
          <Flex
            as="div"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"row"}
            p={0}
          >
            <Flex
              as="div"
              w={["100%", "100%", "100%", "25%"]}
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDir={"column"}
              px={5}
              py={3}
              // backgroundColor={"#FBFBFB"}
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
                  {/* {!isDesktopView && ( */}
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.project_name}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.contract_name}
                  </Text>
                  {/* )} */}
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
              {/* {!isDesktopView && ( */}
              <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                {"Smart Contract"}
              </Text>
              {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.contract_address}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.contract_platform}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.contract_chain}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.contract_url}
                  </Text>
                  {/* )} */}
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
              {/* {!isDesktopView && ( */}
              <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                {"Solidity"}
              </Text>
              {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.project_url}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.git_commit_hash}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
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
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.date_published}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.organization}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.report_owner}
                  </Text>
                  {/* )} */}
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
                  {/* {!isDesktopView && ( */}
                  <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                    {summary_report.project_summary_report.email}
                  </Text>
                  {/* )} */}
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
              {/* {!isDesktopView && ( */}
              <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                {"Static Scanning"}
              </Text>
              {/* )} */}
            </Flex>
            {/* {isDesktopView && (
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
            )} */}
          </Flex>
        </Flex>

        {/* Findings Summary */}
        <h6>.</h6>
        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          py={10}
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
          sx={{
            pageBreakAfter: "always",
          }}
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
            <Box h="300px" w="100%">
              {/* <ResponsivePie
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
              /> */}
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
        <h6>.</h6>
        <Flex
          as="div"
          w="100%"
          border={"1px solid #D9D9D9;"}
          alignItems={["center", "center", "center", "flex-start"]}
          justifyContent={["center", "center", "center", "flex-start"]}
          flexDir={"column"}
          px={[0, 0, 0, 6]}
          my={10}
        >
          <Text
            fontSize="lg"
            fontWeight={"bold"}
            my={10}
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
                borderTop={["1px solid #F3F3F3", null, null, "none"]}
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

        <Flex
          as="div"
          w={"100%"}
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          textAlign={["left", "left"]}
          py={5}
          px={2}
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

        {Object.keys(summary_report.issues).map((key, index) =>
          summary_report.issues[key].issue_details.map((issue) => {
            counter1++;
            return (
              <>
                {((counter1 - 1) / 6) % 2 === 1 && (
                  <h6 style={{ pageBreakAfter: "avoid" }}>.</h6>
                )}
                <Flex
                  as="section"
                  w={"100%"}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDir={"row"}
                  textAlign={["left", "left"]}
                  py={5}
                  px={2}
                  border={"1px solid #D9D9D9;"}
                  sx={{
                    pageBreakAfter:
                      (counter1 / 6) % 2 === 1 ? "always" : "avoid",
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
                      src={`${assetsURL}report/${issue.bug_status}_color.svg`}
                    />
                    <Text
                      fontSize={["sm", "sm", "sm", "md"]}
                      fontWeight={400}
                      color={"black"}
                      fontStyle={"italic"}
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
                </Flex>
              </>
            );
          })
        )}
        {(counter1 - 1) % 6 !== 0 && (
          <Box
            height={"1px"}
            width={"1px"}
            sx={{
              pageBreakAfter: "always",
            }}
          ></Box>
        )}

        {/* Vulnerability Details */}
        <h6>.</h6>

        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          py={10}
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

        {Object.keys(summary_report.issues).map((key) =>
          summary_report.issues[key].issue_details.map((issue) => {
            counter2++;
            return (
              <>
                {counter2 !== 1 && <h6>.</h6>}
                <Flex
                  p={5}
                  flexDir="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  border={"1px solid #D9D9D9;"}
                  my={5}
                  width={"100%"}
                  sx={{
                    pageBreakAfter: "always",
                  }}
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
                        <Image
                          src={`${assetsURL}report/${issue.bug_status}_color.svg`}
                        />
                        <Text
                          fontSize="md"
                          fontWeight={400}
                          color={"black"}
                          fontStyle={"italic"}
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
                    <Text
                      fontSize="md"
                      fontWeight={"bold"}
                      mb={1}
                      width={"100%"}
                    >
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
              </>
            );
          })
        )}

        {/* Scan History */}
        <h6>.</h6>
        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          py={10}
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
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"column"}
          sx={{
            pageBreakAfter: "always",
          }}
        >
          {isDesktopView && (
            <Flex
              as="section"
              w="100%"
              alignItems="center"
              justifyContent="flex-end"
              flexDir={"row"}
              textAlign={["left", "left"]}
              pt={7}
              pb={2}
              px={[1, 10]}
              border={"1px solid #D9D9D9;"}
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
            border={"1px solid #D9D9D9;"}
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
              Security Score
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
              border={"1px solid #D9D9D9;"}
              sx={{
                pageBreakAfter: index === 10 ? "always" : "avoid",
              }}
              // borderBottomWidth={1}
              // borderBottomColor={"#E4E4E4"}
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
                {scan.score_v2 || (parseFloat(scan.score) * 20).toFixed(2)}
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

        {/* Disclaimer */}
        <h6>.</h6>
        <Heading my={10} color={"#52FF00"} fontSize="4xl">
          Disclaimer
        </Heading>
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"column"}
          sx={{
            pageBreakAfter: "always",
          }}
          border={"1px solid #D9D9D9;"}
          py={[4, 4, 4, 20]}
          px={[6, 6, 6, 10]}
        >
          <Text
            fontSize="lg"
            fontWeight={"normal"}
            color={"gray.500"}
            mt={8}
            mb={4}
          >
            The Reports neither endorse nor condemn any specific project or
            team, nor do they guarantee the security of any specific project.
            The contents of this report do not, and should not be interpreted as
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
            There is no warranty that all possible security issues of a
            particular smart contract(s) will be found by the tool, i.e., It is
            not guaranteed that there will not be any further findings based
            solely on the results of this evaluation.
          </Text>
          <Text
            fontSize="lg"
            fontWeight={"normal"}
            color={"gray.500"}
            mt={8}
            mb={4}
          >
            Emerging technologies such as Smart Contracts and Solidity carry a
            high level of technical risk and uncertainty. There is no warranty
            or representation made by this report to any Third Party in regards
            to the quality of code, the business model or the proprietors of any
            such business model, or the legal compliance of any business.
          </Text>
          <Text
            fontSize="lg"
            fontWeight={"normal"}
            color={"gray.500"}
            mt={8}
            mb={4}
          >
            In no way should a third party use these reports to make any
            decisions about buying or selling a token, product, service, or any
            other asset. It should be noted that this report is not investment
            advice, is not intended to be relied on as investment advice, and
            has no endorsement of this project or team. It does not serve as a
            guarantee as to the project's absolute security.
          </Text>
        </Flex>
        <h6>.</h6>
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"column"}
          sx={{
            pageBreakAfter: "always",
          }}
          mt={5}
          border={"1px solid #D9D9D9;"}
          py={[4, 4, 4, 20]}
          px={[6, 6, 6, 10]}
        >
          <Text
            fontSize="lg"
            fontWeight={"normal"}
            color={"gray.500"}
            mt={8}
            mb={4}
          >
            The assessment provided by SolidityScan is subject to dependencies
            and under continuing development. You agree that your access and/or
            use, including but not limited to any services, reports, and
            materials, will be at your sole risk on an as-is, where-is, and
            as-available basis. SolidityScan owes no duty to any third party by
            virtue of publishing these Reports.
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
    </>
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

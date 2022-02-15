import React from "react";
import { Link, useParams } from "react-router-dom";
import MyResponsivePie from "components/pieChart";

import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useReport } from "hooks/useReport";
import { ResponsivePie } from "@nivo/pie";
import { Logo, SeverityIcon } from "components/icons";
import { IssueItem } from "common/types";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { useIssueDetail } from "hooks/useIssueDetail";
import { sentenceCapitalize } from "helpers/helperFunction";

const pieData = (
  critical: number,
  high: number,
  medium: number,
  low: number,
  informational: number
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
];

interface Props {
  issueId: string;
}

const IssueDataComp = (props: Props) => {
  console.log(props);
  const { data } = useIssueDetail(props.issueId);

  return (
    <>
      {data && (
        <>
          <Text
            fontSize="xl"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={"100%"}
            mt={12}
            mb={4}
          >
            Vulnerability Description:
          </Text>
          <Box
            color={"gray.600"}
            dangerouslySetInnerHTML={{
              __html: data.issue_details.issue_description,
            }}
          />
          <Text
            fontSize="xl"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={"100%"}
            mt={8}
            mb={4}
          >
            Recommendation:
          </Text>
          <Box
            color={"gray.600"}
            dangerouslySetInnerHTML={{
              __html: data.issue_details.issue_description,
            }}
          />
        </>
      )}
    </>
  );
};

export default function ReportPage() {
  const { reportId, projectId } =
    useParams<{ reportId: string; projectId: string }>();
  const { data } = useReport(projectId, reportId);

  const issues: IssueItem[] = [];

  data &&
    Object.keys(data.summary_report.issues).forEach((key, index) => {
      data.summary_report.issues[key].forEach((issue) => {
        issues.push(issue);
      });
    });

  return (
    <>
      {data && (
        <Container
          py={12}
          maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
          color="black"
        >
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
            textAlign={["left", "left"]}
            mb={10}
          >
            <Logo />
            <Box
              ml={10}
              height={"10px"}
              width="calc(100% - 250px)"
              backgroundColor={"#38CB89"}
            />
          </Flex>
          <Flex
            as="section"
            w="100%"
            minH={"540px"}
            alignItems="center"
            justifyContent="center"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["center", "center"]}
            py={36}
            px={[2, 2, 10]}
            backgroundColor={"#292929"}
            borderRadius={"16px"}
            backgroundImage={"url(./report-bg.png)"}
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center"}
          >
            <HStack width={"fit-content"}>
              <Image
                src="/logo.svg"
                alt="Product screenshot"
                mx="auto"
                height={"100px"}
                width={"100px"}
              />
              <Heading fontSize={["4xl", "5xl"]} color={"white"} mb={8}>
                Solidity Scan
              </Heading>
            </HStack>
            <Text fontSize="xl" color={"white"} mt={36} mb={4}>
              Security Assessment
            </Text>
            <Heading fontSize={["3xl", "4xl"]} color={"white"} mb={24}>
              {data?.summary_report?.project_summary_report?.project_name!}
            </Heading>
            <Text fontSize="xl" color={"white"} mt={24} mb={4}>
              {data.summary_report.project_summary_report.last_project_report_update_time.slice(
                0,
                10
              )}
            </Text>
          </Flex>

          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["left", "left"]}
            py={36}
            px={[0, 0, 10]}
          >
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              flexDir={"row"}
              my={[10, 10, 20]}
              textAlign={["left", "left"]}
            >
              <Logo />
              <Box
                ml={10}
                height={"10px"}
                width="calc(100% - 250px)"
                backgroundColor={"#38CB89"}
              />
            </Flex>
            <Heading fontSize="4xl" mb={8}>
              Table of{" "}
              <Box
                as="span"
                sx={{
                  color: "#38CB89",
                  mx: 1,
                }}
              >
                Contents.
              </Box>
            </Heading>
            <Box height={"10px"} width={"250px"} backgroundColor={"#38CB89"} />
            <Text
              fontSize="xl"
              fontWeight={"extrabold"}
              textDecoration={"underline"}
              mt={16}
              mb={4}
            >
              Summary
            </Text>
            <Text
              fontSize="xl"
              fontWeight={"extrabold"}
              textDecoration={"underline"}
              mt={4}
              mb={4}
            >
              Audit Overview
            </Text>
            <Text
              fontSize="xl"
              fontWeight={"normal"}
              color={"gray.500"}
              textDecoration={"underline"}
              ml={12}
              mt={4}
              mb={1}
            >
              Project Overview
            </Text>
            <Text
              fontSize="xl"
              fontWeight={"normal"}
              color={"gray.500"}
              textDecoration={"underline"}
              ml={12}
              mt={1}
              mb={1}
            >
              Findings Summary
            </Text>
            <Text
              fontSize="xl"
              fontWeight={"normal"}
              color={"gray.500"}
              textDecoration={"underline"}
              ml={12}
              mt={1}
              mb={4}
            >
              Scan History
            </Text>
            <Text
              fontSize="xl"
              fontWeight={"extrabold"}
              textDecoration={"underline"}
              mt={4}
              mb={4}
            >
              Vulnerability Details
            </Text>

            {issues.map((issue) => (
              <Text
                fontSize="xl"
                fontWeight={"normal"}
                color={"gray.500"}
                textDecoration={"underline"}
                ml={12}
                mt={1}
                mb={1}
              >
                {`${issue.bug_id} - ${issue.issue_name}`}
              </Text>
            ))}

            <Text
              fontSize="xl"
              fontWeight={"extrabold"}
              textDecoration={"underline"}
              mt={4}
              mb={4}
            >
              Disclaimer
            </Text>
          </Flex>

          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["left", "left"]}
            py={12}
            px={[0, 0, 10]}
          >
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              flexDir={"row"}
              my={[10, 10, 20]}
              textAlign={["left", "left"]}
            >
              <Logo />
              <Box
                ml={10}
                height={"10px"}
                width="calc(100% - 250px)"
                backgroundColor={"#38CB89"}
              />
            </Flex>
            <Heading fontSize="4xl" mb={8}>
              Summary
            </Heading>
            <Box height={"10px"} width={"150px"} backgroundColor={"#38CB89"} />

            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={24}
              mb={4}
            >
              This report has been prepared for{" "}
              {data?.summary_report.project_summary_report.project_name} using
              SolidityScan to scan and discover vulnerabilities and safe coding
              practices in company_name’s smart contract including the libraries
              used by the contract that are not officially recognized. The
              SolidityScan tool runs a comprehensive static analysis on the
              Solidity code and finds vulnerabilities ranging from minor gas
              optimizations to major vulnerabilities leading to the loss of
              funds. The coverage scope pays attention to all the informational
              and critical vulnerabilities with over (100+) modules. The
              scanning and auditing process covers the following areas:{" "}
            </Text>

            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              Various common and uncommon attack vectors will be investigated to
              ensure that the smart contracts are secure from malicious actors.
              The scanner modules find and flag issues related to Gas
              optimizations that help in reducing the overall Gas cost It scans
              and evaluates the codebase against industry best practices and
              standards to ensure compliance It makes sure that the officially
              recognized libraries used in the code are secure and up to date
            </Text>
            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              The SolidityScan Team recommends running regular audit scans to
              identify any vulnerabilities that are introduced after{" "}
              {data?.summary_report.project_summary_report.project_name}
              introduces new features or refactors the code.
            </Text>
          </Flex>

          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["left", "left"]}
            py={24}
            px={[0, 0, 10]}
          >
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              flexDir={"row"}
              my={[10, 10, 20]}
              textAlign={["left", "left"]}
            >
              <Logo />
              <Box
                ml={10}
                height={"10px"}
                width="calc(100% - 250px)"
                backgroundColor={"#38CB89"}
              />
            </Flex>
            <Heading fontSize="4xl" mb={8}>
              Audit{" "}
              <Box
                as="span"
                sx={{
                  color: "#38CB89",
                  mx: 1,
                }}
              >
                Overview.
              </Box>
            </Heading>
            <Box
              height={"10px"}
              mb={24}
              width={"150px"}
              backgroundColor={"#38CB89"}
            />
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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Project Name
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                {data?.summary_report.project_summary_report.project_name}
              </Text>
            </Flex>
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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Website
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                {data?.summary_report.project_summary_report.project_url}
              </Text>
            </Flex>

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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Contract Type
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                {data?.summary_report.project_summary_report.project_name}
              </Text>
            </Flex>
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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Language
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                Solidity
              </Text>
            </Flex>
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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Codebase
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                {data?.summary_report.project_summary_report.project_url}
              </Text>
            </Flex>
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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Commit Hash
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                Solidity
              </Text>
            </Flex>
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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Date Published
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                {data?.summary_report.project_summary_report.last_project_report_update_time.slice(
                  0,
                  10
                )}
              </Text>
            </Flex>
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
                fontSize="lg"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"30%"}
              >
                Audit Methodology
              </Text>
              <Text
                fontSize="lg"
                fontWeight={"normal"}
                color={"gray.600"}
                width={"70%"}
              >
                Static Scanning
              </Text>
            </Flex>
          </Flex>

          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["left", "left"]}
            py={24}
            px={[0, 0, 10]}
          >
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              flexDir={"row"}
              my={[10, 10, 20]}
              textAlign={["left", "left"]}
            >
              <Logo />
              <Box
                ml={10}
                height={"10px"}
                width="calc(100% - 250px)"
                backgroundColor={"#38CB89"}
              />
            </Flex>
            <Heading fontSize="4xl" mb={8}>
              Findings{" "}
              <Box
                as="span"
                sx={{
                  color: "#38CB89",
                  mx: 1,
                }}
              >
                Summary.
              </Box>
            </Heading>
            <Box
              height={"10px"}
              mb={8}
              width={"150px"}
              backgroundColor={"#38CB89"}
            />
            <Flex
              as="div"
              w="100%"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDir={"row"}
              marginBottom={10}
            >
              <Box w={"50%"} h="300px">
                <ResponsivePie
                  data={pieData(
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.critical,
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.high,
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.medium,
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.low,
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.informational
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
              <Box w={"50%"} h="300px" px={15}>
                <VulnerabilityProgress
                  label="Critical"
                  variant="critical"
                  count={
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.critical
                  }
                  total={data?.summary_report.scan_summary[0].issues_count}
                />
                <VulnerabilityProgress
                  label="High"
                  variant="high"
                  count={
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.high
                  }
                  total={data?.summary_report.scan_summary[0].issues_count}
                />
                <VulnerabilityProgress
                  label="Medium"
                  variant="medium"
                  count={
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.medium
                  }
                  total={data?.summary_report.scan_summary[0].issues_count}
                />
                <VulnerabilityProgress
                  label="Low"
                  variant="low"
                  count={
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.low
                  }
                  total={data?.summary_report.scan_summary[0].issues_count}
                />
                <VulnerabilityProgress
                  label="Informational"
                  variant="informational"
                  count={
                    data?.summary_report.scan_summary[0]
                      .issue_severity_distribution.informational
                  }
                  total={data?.summary_report.scan_summary[0].issues_count}
                />
              </Box>
            </Flex>

            <Flex
              as="div"
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
                width={"15%"}
              >
                Bug ID
              </Text>
              <Text
                fontSize="md"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"50%"}
              >
                Title
              </Text>
              <Text
                fontSize="md"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"20%"}
              >
                Severity
              </Text>
              <Text
                fontSize="md"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"15%"}
              >
                Status
              </Text>
            </Flex>

            {issues.map((issue) => (
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
                  width={"15%"}
                >
                  {issue.bug_id}
                </Text>
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  width={"50%"}
                >
                  {issue.issue_name}
                </Text>
                <Flex
                  as="div"
                  w="20%"
                  height={"30px"}
                  alignItems="center"
                  justifyContent="flex-start"
                  flexDir={"row"}
                >
                  <SeverityIcon variant={issue.severity} />
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.600"}
                    ml={2}
                    width={"100%"}
                  >
                    {sentenceCapitalize(issue.severity)}
                  </Text>
                </Flex>
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  width={"15%"}
                >
                  {sentenceCapitalize(issue.status.toLowerCase())}
                </Text>
              </Flex>
            ))}
          </Flex>

          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["left", "left"]}
            py={24}
            px={[0, 0, 10]}
          >
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              flexDir={"row"}
              my={[10, 10, 20]}
              textAlign={["left", "left"]}
            >
              <Logo />
              <Box
                ml={10}
                height={"10px"}
                width="calc(100% - 250px)"
                backgroundColor={"#38CB89"}
              />
            </Flex>
            <Heading fontSize="4xl" mb={8}>
              Scan{" "}
              <Box
                as="span"
                sx={{
                  color: "#38CB89",
                  mx: 1,
                }}
              >
                History.
              </Box>
            </Heading>
            <Box
              height={"10px"}
              mb={24}
              width={"150px"}
              backgroundColor={"#38CB89"}
            />

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
            </Flex>
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
                width={"10%"}
              >
                No
              </Text>
              <Text
                fontSize="md"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"23%"}
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
              <Text
                fontSize="md"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"50%"}
              >
                Scan Overview
              </Text>
            </Flex>

            {data.summary_report.scan_summary.map((scan, index) => (
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
                  width={"10%"}
                >
                  {index + 1}.
                </Text>
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  width={"23%"}
                >
                  {scan.scan_time.slice(0, 10)}
                </Text>
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.600"}
                  width={"17%"}
                >
                  {scan.score}
                </Text>

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
                </Flex>
              </Flex>
            ))}
          </Flex>

          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["left", "left"]}
            py={24}
            px={[0, 0, 10]}
          >
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              flexDir={"row"}
              my={[10, 10, 20]}
              textAlign={["left", "left"]}
            >
              <Logo />
              <Box
                ml={10}
                height={"10px"}
                width="calc(100% - 250px)"
                backgroundColor={"#38CB89"}
              />
            </Flex>
            <Heading fontSize="4xl" mb={8}>
              Vulnerability{" "}
              <Box
                as="span"
                sx={{
                  color: "#38CB89",
                  mx: 1,
                }}
              >
                Details.
              </Box>
            </Heading>
            <Box
              height={"10px"}
              mb={8}
              width={"150px"}
              backgroundColor={"#38CB89"}
            />
            {data &&
              Object.keys(data.summary_report.issues).map((key, index) => (
                <>
                  <Text
                    fontSize="xl"
                    fontWeight={"extrabold"}
                    color={"gray.600"}
                    width={"100%"}
                    mt={12}
                    mb={8}
                  >
                    {`${index + 1}. ${
                      data.summary_report.issues[key][0].issue_name
                    }`}
                  </Text>
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
                      fontSize="lg"
                      fontWeight={"extrabold"}
                      color={"gray.600"}
                      width={"15%"}
                    >
                      Bug ID
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight={"extrabold"}
                      color={"gray.600"}
                      width={"30%"}
                    >
                      Title
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight={"extrabold"}
                      color={"gray.600"}
                      width={"15%"}
                    >
                      Line No
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight={"extrabold"}
                      color={"gray.600"}
                      width={"20%"}
                    >
                      Severity
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight={"extrabold"}
                      color={"gray.600"}
                      width={"20%"}
                    >
                      Status
                    </Text>
                  </Flex>
                  {data.summary_report.issues[key].map((issue) => (
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
                        fontSize="lg"
                        fontWeight={"normal"}
                        color={"gray.600"}
                        width={"15%"}
                      >
                        {issue.bug_id}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight={"normal"}
                        color={"gray.600"}
                        width={"30%"}
                      >
                        {issue.file_path}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight={"normal"}
                        color={"gray.600"}
                        width={"15%"}
                      >
                        {`L${issue.line_number_start} - L${issue.line_number_end}`}
                      </Text>
                      <Flex
                        as="div"
                        w="20%"
                        height={"30px"}
                        alignItems="center"
                        justifyContent="flex-start"
                        flexDir={"row"}
                      >
                        <SeverityIcon variant={issue.severity} />
                        <Text
                          fontSize="lg"
                          fontWeight={"normal"}
                          color={"gray.600"}
                          ml={2}
                          width={"100%"}
                        >
                          {sentenceCapitalize(issue.severity)}
                        </Text>
                      </Flex>
                      <Text
                        fontSize="lg"
                        fontWeight={"normal"}
                        color={"gray.600"}
                        width={"20%"}
                      >
                        {sentenceCapitalize(issue.status.toLowerCase())}
                      </Text>
                    </Flex>
                  ))}

                  <IssueDataComp issueId={key} />
                </>
              ))}
          </Flex>

          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            my={[10, 10, 0]}
            textAlign={["left", "left"]}
            py={24}
            px={[0, 0, 10]}
          >
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              flexDir={"row"}
              my={[10, 10, 20]}
              textAlign={["left", "left"]}
            >
              <Logo />
              <Box
                ml={10}
                height={"10px"}
                width="calc(100% - 250px)"
                backgroundColor={"#38CB89"}
              />
            </Flex>
            <Heading fontSize="4xl" mb={8}>
              Disclaimer
            </Heading>
            <Box height={"10px"} width={"150px"} backgroundColor={"#38CB89"} />

            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={24}
              mb={4}
            >
              The Reports neither endorse nor condemn any specific project or
              team, nor do they guarantee the security of any specific project.
              The contents of this report do not, and should not be interpreted
              as having any bearing on, the economics of tokens, token sales, or
              any other goods, services, or assets.
            </Text>

            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              The security audit is not meant to replace functional testing done
              before a software release.
            </Text>
            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              There is no warranty that all possible security issues of a
              particular smart contract(s) will be found by the tool, i.e., It
              is not guaranteed that there will not be any further findings
              based solely on the results of this evaluation.
            </Text>
            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              Emerging technologies such as Smart Contracts and Solidity carry a
              high level of technical risk and uncertainty. There is no warranty
              or representation made by this report to any Third Party in
              regards to the quality of code, the business model or the
              proprietors of any such business model, or the legal compliance of
              any business.
            </Text>
            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              In no way should a third party use these reports to make any
              decisions about buying or selling a token, product, service, or
              any other asset. It should be noted that this report is not
              investment advice, is not intended to be relied on as investment
              advice, and has no endorsement of this project or team. It does
              not serve as a guarantee as to the project's absolute security.
            </Text>
            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              The assessment provided by SolidityScan is subject to dependencies
              and under continuing development. You agree that your access
              and/or use, including but not limited to any services, reports,
              and materials, will be at your sole risk on an as-is, where-is,
              and as-available basis. SolidityScan owes no duty to any third
              party by virtue of publishing these Reports.
            </Text>
            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={4}
              mb={4}
            >
              As one audit-based assessment cannot be considered comprehensive,
              we always recommend proceeding with several independent manual
              audits including manual audit and a public bug bounty program to
              ensure the security of the smart contracts.
            </Text>
          </Flex>

          {/* Section 2 */}
        </Container>
      )}
    </>
  );
}

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyResponsivePie from "components/pieChart";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Image,
  HStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useToast,
  Spinner,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { Checkbox } from "react-input-checkbox";
import { useReport } from "hooks/useReport";
import { ResponsivePie } from "@nivo/pie";
import {
  IssueDescriptionIcons,
  IssueRemediationIcons,
  Logo,
  SeverityIcon,
} from "components/icons";
import { IssueItem } from "common/types";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { useIssueDetail } from "hooks/useIssueDetail";
import { sentenceCapitalize } from "helpers/helperFunction";
import { AiOutlineProject } from "react-icons/ai";
import { FaFileCode, FaInternetExplorer } from "react-icons/fa";
import API from "helpers/api";
import styled from "@emotion/styled";

// interface UpdateProps {
//   issue: IssueItem;
//   wontfix: String[];
//   falsePositive: String[];
//   setFalsePositive: React.Dispatch<React.SetStateAction<String[]>>;
//   setWontFix: React.Dispatch<React.SetStateAction<String[]>>;
// }

// const UpdateRowComp = ({
//   issue,
//   wontfix,
//   falsePositive,
//   setWontFix,
//   setFalsePositive,
// }: UpdateProps) => {
//   const [fps, setFps] = useState<boolean>(issue.status === "FALSE_POSITIVE");
//   const [wntFx, setwntFx] = useState<boolean>(issue.status === "WONT_FIX");

//   return (
//     <>
//       <Flex
//         as="div"
//         w="100%"
//         alignItems="flex-start"
//         justifyContent="flex-start"
//         flexDir={"column"}
//         textAlign={["left", "left"]}
//         py={3}
//         px={[1, 10]}
//         borderBottomWidth={1}
//         borderBottomColor={"#E4E4E4"}
//       >
//         <Flex
//           as="div"
//           w="100%"
//           alignItems="flex-start"
//           justifyContent="flex-start"
//           flexDir={"row"}
//           textAlign={["left", "left"]}
//         >
//           <Text
//             fontSize="md"
//             fontWeight={"normal"}
//             color={"gray.600"}
//             width={"10%"}
//           >
//             {issue.bug_id}
//           </Text>
//           <Text
//             mr={2}
//             fontSize="md"
//             fontWeight={"normal"}
//             color={"gray.600"}
//             width={"35%"}
//           >
//             {issue.file_path}
//           </Text>
//           <Text
//             fontSize="md"
//             fontWeight={"normal"}
//             color={"gray.600"}
//             width={"11%"}
//           >
//             {`L${issue.line_number_start} - L${issue.line_number_end}`}
//           </Text>
//           <Flex
//             as="div"
//             width={"14%"}
//             height={"30px"}
//             alignItems="center"
//             justifyContent="flex-start"
//             flexDir={"row"}
//           >
//             <SeverityIcon variant={issue.severity} />
//             <Text
//               fontSize="md"
//               fontWeight={"normal"}
//               color={"gray.600"}
//               ml={2}
//               width={"100%"}
//             >
//               {sentenceCapitalize(issue.severity)}
//             </Text>
//           </Flex>
//           <Text
//             fontSize="md"
//             fontWeight={"normal"}
//             color={"gray.600"}
//             width={"14%"}
//           >
//             {/* {sentenceCapitalize(issue.status.toLowerCase().replace("_", " "))} */}
//             {issue.status === "FALSE_POSITIVE" && "False Positive"}
//             {issue.status === "WONT_FIX" && "Won't Fix"}
//             {issue.status === "DISCOVERED" && "Discovered"}
//             {issue.status === "FIXED" && "Fixed"}
//           </Text>

//           <Flex
//             as="div"
//             width={"10%"}
//             height={"30px"}
//             alignItems="center"
//             justifyContent="flex-start"
//             flexDir={"row"}
//           >
//             {issue.status !== "FIXED" && (
//               <Checkbox
//                 theme="material-checkbox"
//                 value={fps}
//                 onChange={() => {
//                   if (wntFx) {
//                     setwntFx(!wntFx);
//                   }
//                   setFps(!fps);
//                   let newfalsePositive = falsePositive.filter(
//                     (hash) => hash !== issue.issue_hash
//                   );
//                   let newwontfix = wontfix.filter(
//                     (hash) => hash !== issue.issue_hash
//                   );
//                   newfalsePositive.push(issue.issue_hash);
//                   setFalsePositive([...newfalsePositive]);
//                   setWontFix([...newwontfix]);
//                 }}
//               />
//             )}
//           </Flex>
//           <Flex
//             as="div"
//             width={"6%"}
//             height={"30px"}
//             alignItems="center"
//             justifyContent="flex-start"
//             flexDir={"row"}
//           >
//             {issue.status !== "FIXED" && (
//               <Checkbox
//                 theme="material-checkbox"
//                 value={wntFx}
//                 onChange={() => {
//                   if (fps) {
//                     setFps(!fps);
//                   }
//                   setwntFx(!wntFx);
//                   let newfalsePositive = falsePositive.filter(
//                     (hash) => hash !== issue.issue_hash
//                   );
//                   let newwontfix = wontfix.filter(
//                     (hash) => hash !== issue.issue_hash
//                   );
//                   newwontfix.push(issue.issue_hash);
//                   setFalsePositive([...newfalsePositive]);
//                   setWontFix([...newwontfix]);
//                 }}
//               />
//             )}
//           </Flex>
//         </Flex>
//         {/* {wntFx && (

//             <Flex
//               as="div"
//               w="100%"
//               alignItems="flex-start"
//               justifyContent="flex-start"
//               flexDir={"column"}
//               textAlign={["left", "left"]}
//               pt={8}
//             >
//               <Textarea placeholder='Put your comments here' />
//               <Flex
//               as="div"
//               w="100%"
//               alignItems="flex-start"
//               justifyContent="flex-end"
//               flexDir={"row"}
//               pt={2}
//             ><Button>Comment</Button></Flex>
//             </Flex>

//         )} */}
//       </Flex>
//     </>
//   );
// };

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

export default function ReportPage() {
  const { reportId, projectId } =
    useParams<{ reportId: string; projectId: string }>();
  const { data, refetch } = useReport(projectId, reportId);

  console.log(data?.summary_report.issues);
  let d = new Date();

  if (data) {
    d = new Date(
      data.summary_report.project_summary_report.last_project_report_update_time
    );
  }

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
      {data ? (
        <Container
          maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
          color="black"
        >
          <Flex
            as="div"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            py={20}
          >
            <Logo />
            <Text fontSize="2xl" color={"gray.400"} mt={20} mb={5}>
              Security Assessment
            </Text>
            <Heading fontSize={["3xl", "4xl"]} mb={3}>
              {data.summary_report.project_summary_report.project_name}
            </Heading>
            <Text fontSize="xl" mb={20}>
              {`${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`}
            </Text>
            <Text fontSize="lg" width={"60%"} color={"gray.300"} mb={10}>
              Tristique.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vel varius eu sollicitudin integer nulla viverra. Tellus sit a a
              eleifend quam habitasse. Pulvinar odio risus, integer ante leo.
            </Text>
            <Image src="/report-image.svg" />
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
              Table of{" "}
              <Box
                as="span"
                sx={{
                  color: "#000000",
                  mx: 1,
                }}
              >
                Contents.
              </Box>
            </Heading>
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
            {Object.keys(data.summary_report.issues).map((key, index) => (
              <HStack ml={5} my={1} spacing={5}>
                <SeverityIcon variant={"gray.400"} />
                <Text fontSize="xl" fontWeight={"500"} color={"gray.400"}>
                  {data.summary_report.issues[key].issue_name}
                </Text>
              </HStack>
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
          >
            <Heading color={"#52FF00"} fontSize="4xl" my={10}>
              Project{" "}
              <Box
                as="span"
                sx={{
                  color: "#000000",
                  mx: 1,
                }}
              >
                Summary
              </Box>
            </Heading>
            <Text
              fontSize="lg"
              fontWeight={"normal"}
              color={"gray.500"}
              mt={12}
              mb={4}
            >
              This report has been prepared for{" "}
              {data.summary_report.project_summary_report.project_name} using
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
              {data.summary_report.project_summary_report.project_name}
              introduces new features or refactors the code.
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
            <Heading color={"#52FF00"} fontSize="4xl" my={10}>
              Audit{" "}
              <Box
                as="span"
                sx={{
                  color: "#000000",
                  mx: 1,
                }}
              >
                Summary
              </Box>
            </Heading>
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
                w="25%"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexDir={"column"}
                px={5}
                py={3}
                backgroundColor={"#FBFBFB"}
              >
                {data.summary_report.project_summary_report.project_name && (
                  <>
                    <Text
                      fontSize="lg"
                      fontWeight={"bold"}
                      color={"gray.600"}
                      my={4}
                    >
                      Project Name
                    </Text>
                    <Divider />
                  </>
                )}
                {data.summary_report.project_summary_report.contract_name && (
                  <>
                    <Text
                      fontSize="lg"
                      fontWeight={"bold"}
                      color={"gray.600"}
                      my={4}
                    >
                      Project Name
                    </Text>
                    <Divider />
                  </>
                )}
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Contract Type
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Contract Address
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Contract Platform
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Contract Chain
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Contract URL
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Language
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Codebase
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Commit Hash
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Website
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Publishers/Owners Name
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={4}
                >
                  Audit Methodology
                </Text>
              </Flex>
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
                <Text fontSize="lg" fontWeight={"normal"} my={4}>
                  {data.summary_report.project_summary_report.project_name}
                </Text>
                <Divider />
                <Text fontSize="lg" fontWeight={"normal"} my={4}>
                  {"Smart Contract"}
                </Text>
                <Divider />
              </Flex>
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
            <Heading color={"#52FF00"} fontSize="4xl" my={10}>
              Findings{" "}
              <Box
                as="span"
                sx={{
                  color: "#000000",
                  mx: 1,
                }}
              >
                Summary
              </Box>
            </Heading>
            <Flex
              as="div"
              w="100%"
              alignItems="center"
              justifyContent="space-between"
              flexDir={"row"}
              marginBottom={10}
            >
              <Box w={"30%"} h="300px">
                <ResponsivePie
                  data={pieData(
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.critical,
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.high,
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.medium,
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.low,
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.informational,
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
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
              <Box w={"30%"} h="300px" px={15}>
                <VulnerabilityProgress
                  label="Critical"
                  variant="critical"
                  count={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.critical
                  }
                  total={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].latest_bug_count
                  }
                />
                <VulnerabilityProgress
                  label="High"
                  variant="high"
                  count={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.high
                  }
                  total={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].latest_bug_count
                  }
                />
                <VulnerabilityProgress
                  label="Medium"
                  variant="medium"
                  count={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.medium
                  }
                  total={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].latest_bug_count
                  }
                />
              </Box>
              <Box w={"33%"} h="300px" px={15}>
                <VulnerabilityProgress
                  label="Low"
                  variant="low"
                  count={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.low
                  }
                  total={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].latest_bug_count
                  }
                />
                <VulnerabilityProgress
                  label="Informational"
                  variant="informational"
                  count={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.informational
                  }
                  total={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].latest_bug_count
                  }
                />
                <VulnerabilityProgress
                  label="Gas"
                  variant="gas"
                  count={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].issue_severity_distribution.gas
                  }
                  total={
                    data.summary_report.scan_summary[
                      data.summary_report.scan_summary.length - 1
                    ].latest_bug_count
                  }
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
                width={"20%"}
              >
                Severity
              </Text>
              <Text
                fontSize="md"
                fontWeight={"extrabold"}
                color={"gray.600"}
                width={"50%"}
              >
                Bug Type
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
            {Object.keys(data.summary_report.issues).map((key, index) =>
              data.summary_report.issues[key].issue_details.map((issue) => (
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
                    width={"50%"}
                  >
                    {issue.issue_name}
                  </Text>

                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.600"}
                    width={"15%"}
                  >
                    {/* {sentenceCapitalize(
                      issue.status.toLowerCase().replace("_", " ")
                    )} */}
                    {issue.bug_status === "fps" && "False Positive"}
                    {issue.bug_status === "wp" && "Won't Fix"}
                    {issue.bug_status === "discovered" && "Discovered"}
                    {issue.bug_status === "fixed" && "Fixed"}
                  </Text>
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
            <Heading color={"#52FF00"} fontSize="4xl" my={10}>
              Vulnerability{" "}
              <Box
                as="span"
                sx={{
                  color: "#000000",
                  mx: 1,
                }}
              >
                Details.
              </Box>
            </Heading>

            {Object.keys(data.summary_report.issues).map((key, index) =>
              data.summary_report.issues[key].issue_details.map((issue) => (
                <Flex
                  p={5}
                  flexDir="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  border={"1px solid #D9D9D9;"}
                  my={5}
                  width={'100%'}
                >
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                    width={"100%"}
                  >
                    Bug ID
                  </Text>
                  <Text
                    fontSize="xl"
                    fontWeight={"bold"}
                    mb={10}
                    width={"100%"}
                  >
                    {issue.bug_id}
                  </Text>
                  <HStack width={"100%"} mb={1}>
                    <Text
                      fontSize="md"
                      fontWeight={"normal"}
                      color={"gray.400"}
                      mb={1}
                      width={"15%"}
                    >
                      Severity
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight={"normal"}
                      color={"gray.400"}
                      mb={1}
                      width={"15%"}
                    >
                      Confidence
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight={"normal"}
                      color={"gray.400"}
                      mb={1}
                      width={"15%"}
                    >
                      Line nos
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight={"normal"}
                      color={"gray.400"}
                      mb={1}
                      width={"15%"}
                    >
                      Action Taken
                    </Text>
                  </HStack>
                  <HStack width={"100%"} mb={10}>
                    <HStack width={"15%"}>
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
                    <HStack width={"15%"}>
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
                    <Text w={"15%"} fontSize="lg" fontWeight={"bold"}>
                      {issue.findings[0].line_nos_start}-
                      {issue.findings[0].line_nos_end}
                    </Text>
                    <Text w={"15%"} fontSize="lg" fontWeight={"bold"}>
                      {issue.bug_status === "fps" && "False Positive"}
                      {issue.bug_status === "wp" && "Won't Fix"}
                      {issue.bug_status === "discovered" && "Discovered"}
                      {issue.bug_status === "fixed" && "Fixed"}
                    </Text>
                  </HStack>
                  <Text
                    fontSize="md"
                    fontWeight={"normal"}
                    color={"gray.400"}
                    mb={1}
                    width={"100%"}
                  >
                    Bug Type
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight={"bols"}
                    mb={10}
                    width={"100%"}
                  >
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

                  <Divider my={10} />

                  <HStack spacing={5} mb={5}>
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
                  <HStack spacing={5} mt={10} mb={5}>
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
            <Heading color={"#52FF00"} fontSize="4xl" my={10}>
              Scan{" "}
              <Box
                as="span"
                sx={{
                  color: "#000000",
                  mx: 1,
                }}
              >
                History
              </Box>
            </Heading>
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
                  fontWeight={"extrabold"}
                  color={"#3300FF"}
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
              </Flex>
            ))}
          </Flex>
        </Container>
      ) : (
        <Container
          py={12}
          h="90vh"
          maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
          color="black"
        >
          <Flex
            as="div"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            flexDir={"row"}
            textAlign={["left", "left"]}
            mb={10}
          >
            <Spinner />
          </Flex>
        </Container>
      )}
    </>
  );
}

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

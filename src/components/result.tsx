import {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  createRef,
  useRef,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Flex,
  VStack,
  Box,
  Text,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Button,
  useToast,
  Image,
  Stack,
  HStack,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiCodeCurly } from "react-icons/bi";
import { AiOutlineCaretRight, AiFillGithub } from "react-icons/ai";

import { CodeBlock, atomOneLight } from "react-code-blocks";

import VulnerabilityDistribution, {
  VulnerabilityDistributionFilter,
} from "components/vulnDistribution";
import { MultifileBadge, MultifileIcon, SeverityIcon } from "components/icons";

import { useFileContent } from "hooks/useFileContent";
import { useIssueDetail } from "hooks/useIssueDetail";
import Select, { components } from "react-select";
import {
  FilesState,
  MultiFileScanDetail,
  MultiFileScanSummary,
  MultiFileTemplateDetail,
  Profile,
  ScanDetail,
  ScanSummary,
} from "common/types";
import { severityPriority } from "common/values";
import API from "helpers/api";
import { useMutation } from "react-query";
import { useProfile } from "hooks/useProfile";
import { WarningIcon } from "@chakra-ui/icons";
import React from "react";
import { access } from "fs";
import TrialWallCode, { TrialWall, TrialWallIssue } from "./trialWall";
import useDynamicRefs from "use-dynamic-refs";
import DetailedResult from "./detailedResult";

type FileState = {
  issue_id: string;
  file_path: string;
  line_nos_start: number[];
  line_nos_end: number[];
};

export const Result: React.FC<{
  scanSummary: ScanSummary;
  scanDetails: ScanDetail[];
  type: "project" | "block";
  profileData: Profile;
  details_enabled: boolean;
}> = ({ scanSummary, scanDetails, type, profileData, details_enabled }) => {
  const [file, setFile] = useState<FileState | null>(null);
  const {
    issue_severity_distribution: {
      critical,
      high,
      medium,
      low,
      informational,
      gas,
    },
  } = scanSummary;

  return (
    <>
      <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }} py={2}>
        <VStack
          w={["100%", "100%", "40%"]}
          spacing={8}
          mb={[8, 8, 0]}
          alignItems="flex-start"
        >
          <Flex w="100%" justifyContent="space-around">
            <Box width="80%">
              <VulnerabilityDistribution
                critical={critical}
                high={high}
                medium={medium}
                low={low}
                informational={informational}
                gas={gas}
              />
            </Box>
            {/* <Score score={score} /> */}
          </Flex>
          <Box w="100%" minH="50vh">
            <Issues issues={scanDetails} file={file} setFile={setFile} />
          </Box>
        </VStack>
        <VStack
          w={["100%", "100%", "60%"]}
          h={["100%"]}
          alignItems="flex-start"
          spacing={5}
          px={4}
        >
          <Box
            sx={{
              w: "100%",
              h: "100%",
              position: "sticky",
              top: 8,
            }}
          >
            {!details_enabled ? (
              <TrialWall />
            ) : file ? (
              <>
                <FileDetails file={file} type={type} />
              </>
            ) : (
              <Flex
                sx={{
                  w: "100%",
                  bg: "bg.subtle",
                  flexDir: "column",
                  alignItems: "center",
                }}
                py={36}
              >
                <Icon as={BiCodeCurly} fontSize="40px" color="subtle" mb={4} />
                <Text color="subtle">
                  Please select a file from an issue to see vulnerability
                  details.
                </Text>
              </Flex>
            )}
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

type IssuesProps = {
  issues: ScanDetail[];
  file: FileState | null;
  setFile: Dispatch<SetStateAction<FileState | null>>;
};
const Issues: React.FC<IssuesProps> = ({ issues, file, setFile }) => {
  return (
    <Accordion allowMultiple>
      {Array.from(issues)
        .sort((issue1, issue2) =>
          severityPriority[issue1.template_details.issue_severity] >
          severityPriority[issue2.template_details.issue_severity]
            ? -1
            : 1
        )
        .map(({ issue_id, findings, template_details }) => (
          <AccordionItem id={issue_id} key={issue_id}>
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  _hover={{
                    bg: "rgba(47, 248, 107, 0.07)",
                  }}
                  _expanded={{
                    bg: "rgba(47, 248, 107, 0.1)",
                  }}
                >
                  <Flex
                    sx={{
                      w: "100%",
                      my: 2,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Flex sx={{ alignItems: "center" }}>
                      <SeverityIcon variant={template_details.issue_severity} />
                      <Text
                        sx={{
                          ml: 3,
                          fontWeight: 600,
                          color: "#4E5D78",
                          maxW: 250,
                          fontSize: "sm",
                        }}
                        isTruncated
                      >
                        {template_details.issue_name}
                      </Text>
                    </Flex>
                    <Text
                      sx={{
                        mr: 3,
                        fontSize: "sm",
                        fontWeight: 600,
                        color: "subtle",
                      }}
                    >
                      {findings.length} file{findings.length > 1 && "s"}
                    </Text>
                  </Flex>
                  <Icon
                    as={AiOutlineCaretRight}
                    mr={2}
                    color="subtle"
                    fontSize="14px"
                    transition="transform 0.2s"
                    transform={isExpanded ? "rotate(90deg)" : "rotate(0deg)"}
                  />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {findings.map(
                    ({ file_path, line_nos_start, line_nos_end }) => (
                      <Box
                        key={file_path}
                        id={file_path}
                        sx={{
                          cursor: "pointer",
                          bg:
                            file_path === file?.file_path
                              ? "gray.200"
                              : "gray.50",
                          p: 4,
                          my: 2,
                          color: "text",
                          fontSize: "sm",
                          borderRadius: 15,
                          transition: "0.2s background",
                          _hover: {
                            bg:
                              file_path === file?.file_path
                                ? "gray.200"
                                : "gray.100",
                          },
                        }}
                        onClick={() =>
                          setFile({
                            issue_id,
                            file_path,
                            line_nos_start,
                            line_nos_end,
                          })
                        }
                      >
                        <Text>{file_path}</Text>
                      </Box>
                    )
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
    </Accordion>
  );
};

type FileDetailsProps = { file: FileState; type: "project" | "block" };
const FileDetails: React.FC<FileDetailsProps> = ({ file, type }) => {
  const { scanId: scan_id } = useParams<{ scanId: string }>();
  const toast = useToast();
  const { file_path, issue_id, line_nos_end, line_nos_start } = file;
  const mutation = useMutation(() =>
    API.post("/api-create-github-issue/", {
      scan_id,
      file_path,
      issue_id,
      integration_service: "github",
    })
  );
  const { data: profileData } = useProfile();
  let highlightArray: string[] = [];
  line_nos_start.map((number, index) => {
    if (number.toString().length === line_nos_end[index].toString().length) {
      highlightArray.push(`${number}-${line_nos_end[index]}`);
    } else {
      highlightArray.push(
        `${number}-${Math.pow(10, number.toString().length) - 1}`
      );
      highlightArray.push(
        `${Math.pow(10, number.toString().length)}-${line_nos_end[index]}`
      );
    }
  });
  let highlightString = highlightArray.join(",");
  let codeObjArray = [];
  line_nos_start.forEach((number, index) => {
    codeObjArray.push({
      lineStart: number,
      lineEnd: line_nos_end[index],
      code: "",
    });
  });
  const createGithubIssue = async () => {
    await mutation.mutateAsync();
    toast({
      title: "Issue created.",
      description: "You can find the issue on the github repo.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };
  const history = useHistory();
  const { data, isLoading } = useFileContent(scan_id, file_path, type);
  return (
    <>
      <Box
        sx={{
          borderRadius: 15,
          bg: "bg.subtle",
          p: 4,
          my: 2,
        }}
      >
        <Flex
          sx={{
            w: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            h: "100%",
          }}
        >
          <Text
            text="subtle"
            fontSize="sm"
            color="subtle"
            mb={2}
            maxW="70%"
            isTruncated
          >
            {file_path}
          </Text>
        </Flex>
        {isLoading && !profileData && (
          <Flex
            sx={{
              w: "100%",
              justifyContent: "center",
              alignItems: "center",
              h: "35vh",
            }}
          >
            <Spinner />
          </Flex>
        )}
        {data && (
          <pre>
            <CodeBlock
              customStyle={{
                height: "35vh",
                fontSize: "14px",
                overflow: "scroll",
              }}
              theme={atomOneLight}
              showLineNumbers
              text={data.file_contents}
              highlight={highlightString}
            />
          </pre>
        )}
      </Box>
      <Box
        sx={{
          borderRadius: 15,
          bg: "bg.subtle",
          p: 4,
          my: 4,
        }}
      >
        <Box fontSize="sm" mb={2}>
          <IssueDetail
            current_file_name=""
            issue_id={issue_id}
            context="single_file"
            description_details={{}}
          />
        </Box>
      </Box>
    </>
  );
};

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
  icon: string;
}> = ({ label, icon }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <Image mr={3} src={`/icons/${icon}.svg`} />
    <div>{label}</div>
  </div>
);

export const MultifileResult: React.FC<{
  type: "block" | "project";
  is_latest_scan: boolean;
  scanSummary: MultiFileScanSummary;
  scanDetails: MultiFileScanDetail[];
  profileData: Profile;
  details_enabled: boolean;
}> = ({
  scanSummary,
  scanDetails,
  is_latest_scan,
  type,
  profileData,
  details_enabled,
}) => {
  const [files, setFiles] = useState<FilesState | null>(null);

  const [issues, setIssues] = useState<MultiFileScanDetail[]>(scanDetails);

  const { projectId, scanId } =
    useParams<{ projectId: string; scanId: string }>();
  const {
    issue_severity_distribution: {
      critical,
      high,
      medium,
      low,
      informational,
      gas,
    },
  } = scanSummary;

  const [confidence, setConfidence] = useState([true, true, true]);

  const [vulnerability, setVulnerability] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  // const [action, setAction] = useState("");
  const toast = useToast();

  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");


  const updateBugStatus = async (action: string) => {
    if (files) {
      const { data } = await API.post("/api-update-bug-status/", {
        bug_ids: [files?.bug_hash],
        scan_id: scanId,
        project_id: projectId,
        bug_status: action,
      });
      if (data.status === "success") {
        toast({
          title: "Bug Status Updated",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      setIssues((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.issue_id === files.issue_id) {
            const newList = obj.metric_wise_aggregated_findings.map((item) => {
              if (item.bug_id === files.bug_id) {
                return { ...item, bug_status: action };
              }
              return item;
            });
            return { ...obj, metric_wise_aggregated_findings: newList };
          }
          // 👇️ otherwise return object as is
          return obj;
        });
        return newState;
      });
      setFiles({
        ...files,
        bug_status: action,
      });
    }
  };

  return (
    <>
      <Flex w="100%" sx={{ flexDir: ["column", "column", "column", "row"] }} py={2}>
        <VStack
          w={["100%", "100%", "100%", "40%"]}
          spacing={8}
          mb={[8, 8, 0]}
          alignItems="flex-start"
        >
          <Flex w="100%" justifyContent="space-around">
            <Box width="100%">
              <VulnerabilityDistributionFilter
                critical={critical}
                high={high}
                medium={medium}
                low={low}
                informational={informational}
                gas={gas}
                vulnerability={vulnerability}
                setVulnerability={setVulnerability}
              />
            </Box>
            {/* <Score score={score} /> */}
          </Flex>
          <VStack
            width={"100%"}
            justify={"center"}
            display={["flex", "flex", "flex", "none"]}
          >
            <Text fontWeight={600}>Confidence Parameter</Text>
            <HStack>
              <Button
                variant={confidence[2] ? "solid" : "outline"}
                py={0}
                fontWeight="400"
                borderRadius={"27px"}
                onClick={() =>
                  setConfidence([confidence[0], confidence[1], !confidence[2]])
                }
              >
                <WarningIcon color={"low"} mr={2} /> Certain
              </Button>
              <Button
                variant={confidence[1] ? "solid" : "outline"}
                py={0}
                fontWeight="400"
                borderRadius={"27px"}
                onClick={() =>
                  setConfidence([confidence[0], !confidence[1], confidence[2]])
                }
              >
                <WarningIcon color={"medium"} mr={2} /> Firm
              </Button>
              <Button
                variant={confidence[0] ? "solid" : "outline"}
                py={0}
                fontWeight="400"
                borderRadius={"27px"}
                onClick={() =>
                  setConfidence([!confidence[0], confidence[1], confidence[2]])
                }
              >
                <WarningIcon color={"high"} mr={2}/> Tentative
              </Button>
            </HStack>
          </VStack>
          <Box w="100%" h={["100%", "100%", "100%", "100vh"]} overflowY="scroll">
            <MultifileIssues
              type={type}
              profileData={profileData}
              details_enabled={details_enabled}
              is_latest_scan={is_latest_scan}
              issues={issues}
              files={files}
              setFiles={setFiles}
              confidence={confidence}
              setConfidence= {setConfidence}
              vulnerability={vulnerability}
              updateBugStatus={updateBugStatus}
            />
          </Box>
        </VStack>

        {isDesktopView &&
          <DetailedResult
            type={type}
            is_latest_scan={is_latest_scan}
            files={files}
            confidence={confidence}
            setConfidence={setConfidence}
            details_enabled={details_enabled}
            updateBugStatus={updateBugStatus}
          />}
      </Flex>
    </>
  );
};

type MultifileIssuesProps = {
  type: "block" | "project";
  issues: MultiFileScanDetail[];
  files: FilesState | null;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  confidence: boolean[];
  setConfidence: Dispatch<SetStateAction<boolean[]>>;
  vulnerability: boolean[];
  profileData: Profile;
  details_enabled: boolean;
  is_latest_scan: boolean;
  updateBugStatus: any
};

const MultifileIssues: React.FC<MultifileIssuesProps> = ({
  type,
  issues,
  files,
  is_latest_scan,
  setFiles,
  confidence,
  setConfidence,
  vulnerability,
  profileData,
  details_enabled,
  updateBugStatus
}) => {
  const getVulnerabilityNumber = (issue_severity: string) => {
    switch (issue_severity) {
      case "critical":
        return 0;
      case "high":
        return 1;
      case "medium":
        return 2;
      case "low":
        return 3;
      case "informational":
        return 4;
      case "gas":
        return 5;
      default:
        return 0;
    }
  };
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  return (
    <Accordion allowMultiple={isDesktopView} allowToggle>
      {Array.from(issues)
        .sort((issue1, issue2) =>
          severityPriority[issue1.template_details.issue_severity] >
          severityPriority[issue2.template_details.issue_severity]
            ? -1
            : 1
        )
        .map(
          ({
            issue_id,
            metric_wise_aggregated_findings,
            template_details,
            no_of_findings,
          }, index) => {
            return (
              <>
                {confidence[parseInt(template_details.issue_confidence)] &&
                vulnerability[
                  getVulnerabilityNumber(template_details.issue_severity)
                ] ? (
                  <AccordionItem id={issue_id} key={issue_id}>
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton
                          pr={[2, 2, 2, 4]}
                          _hover={{
                            bg: "rgba(47, 248, 107, 0.07)",
                          }}
                          _expanded={{
                            bg: "rgba(47, 248, 107, 0.1)",
                          }}
                        >
                          <Flex
                            sx={{
                              w: "100%",
                              my: 2,
                              alignItems: "center",
                            }}
                          >
                            <Flex sx={{ alignItems: "center" }} w="90%">
                              <SeverityIcon
                                variant={template_details.issue_severity}
                              />
                              <Text
                                sx={{
                                  ml: 3,
                                  fontWeight: 600,
                                  color: "#4E5D78",
                                  maxW: ["100%", "100%", "100%", 250],
                                  fontSize: "sm",
                                }}
                                isTruncated
                              >
                                {template_details.issue_name}
                              </Text>
                            </Flex>
                            <Text
                              sx={{
                                mr: 3,
                                fontSize: "sm",
                                fontWeight: 600,
                                color: "subtle",
                              }}
                            >
                              {no_of_findings}
                            </Text>
                          </Flex>
                          <Icon
                            as={AiOutlineCaretRight}
                            mr={[0, 0, 0, 2]}
                            color="subtle"
                            fontSize="14px"
                            transition="transform 0.2s"
                            transform={
                              isExpanded ? "rotate(90deg)" : "rotate(0deg)"
                            }
                          />
                        </AccordionButton>
                        <AccordionPanel p={[0, 0, 0, 4]} pb={4}>
                          {!details_enabled ? (
                            <TrialWallIssue
                              severity={template_details.issue_severity}
                              no_of_issue={no_of_findings}
                            />
                          ) : (
                                <>
                                  <Accordion
                                    allowMultiple={false}
                                    allowToggle
                                  >
                                    {metric_wise_aggregated_findings.map((item, index) => (
                                      <IssueBox
                                        key={index}
                                        type={type}
                                        bug_id={item.bug_id}
                                        files={files}
                                        issue_id={issue_id}
                                        metric_wise_aggregated_finding={{
                                          description_details:
                                            item.description_details,
                                          findings: item.findings,
                                          bug_id: item.bug_id,
                                          bug_hash: item.bug_hash,
                                          bug_status: item.bug_status,
                                          issue_id: issue_id,
                                          template_details: template_details,
                                        }}
                                        template_details={template_details}
                                        is_latest_scan={is_latest_scan}
                                        confidence={confidence}
                                        setConfidence={setConfidence}
                                        setFiles={setFiles}
                                        updateBugStatus={updateBugStatus}
                                      />
                                    ))}
                                  </Accordion>
                                </>
                          )}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ) : (
                  <></>
                )}
              </>
            );
          }
        )}
    </Accordion>
  );
};

const IssueBox: React.FC<{
  type: "block" | "project";
  bug_id: string;
  files: FilesState | null;
  issue_id: string;
  is_latest_scan: boolean;
  metric_wise_aggregated_finding: FilesState;
  template_details: MultiFileTemplateDetail;
  confidence: boolean[];
  setConfidence: Dispatch<SetStateAction<boolean[]>>;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  updateBugStatus: any
}> = ({
  type,
  bug_id,
  files,
  issue_id,
  is_latest_scan,
  metric_wise_aggregated_finding,
  confidence,
  setConfidence,
  template_details,
  setFiles,
  updateBugStatus,
}) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      {isDesktopView
        ? <Box
          key={bug_id}
          id={bug_id}
          opacity={
            metric_wise_aggregated_finding.bug_status === "pending_fix" ? 1 : 0.5
          }
          p={[0, 0, 0, 3]}
          borderRadius={[0, 0, 0, 15]}
          sx={{
            cursor: "pointer",
            bg:
              bug_id === files?.bug_id &&
                metric_wise_aggregated_finding.bug_status === "pending_fix"
                ? "gray.300"
                : "gray.100",
            my: 2,
            color: "text",
            fontSize: "sm",
            transition: "0.2s background",
            _hover: {
              bg: bug_id === files?.bug_id ? "gray.300" : "gray.200",
            },
          }}
          onClick={() =>
            setFiles({
              bug_id: bug_id,
              issue_id: issue_id,
              bug_hash: metric_wise_aggregated_finding.bug_hash,
              bug_status: metric_wise_aggregated_finding.bug_status,
              findings: metric_wise_aggregated_finding.findings,
              description_details:
                metric_wise_aggregated_finding.description_details,
              template_details: template_details,
            })
          }
        >
          <HStack justify={"space-between"}>
            <Text isTruncated color={"gray.700"}>
              {bug_id}
            </Text>
            <HStack>
              {metric_wise_aggregated_finding.findings.length > 1 && (
                <HStack
                  mr={
                    metric_wise_aggregated_finding.bug_status == "pending_fix"
                      ? 8
                      : 0
                  }
                  py={1}
                  px={3}
                  borderRadius={20}
                  backgroundColor={"white"}
                >
                  <MultifileIcon size={20} /> <Text>MULTIFILE</Text>
                </HStack>
              )}

              {metric_wise_aggregated_finding.bug_status !== "pending_fix" && (
                <Image
                  src={`/icons/${metric_wise_aggregated_finding.bug_status}.svg`}
                />
              )}
            </HStack>
          </HStack>
        </Box>
        : <AccordionItem
            onClick={() =>
              setFiles({
                bug_id: bug_id,
                issue_id: issue_id,
                bug_hash: metric_wise_aggregated_finding.bug_hash,
                bug_status: metric_wise_aggregated_finding.bug_status,
                findings: metric_wise_aggregated_finding.findings,
                description_details:
                  metric_wise_aggregated_finding.description_details,
                template_details: template_details,
              })
            }
          >
            <AccordionButton  bg={"#F8FAFC"} p={0}>
              <HStack justify={"space-between"} p={4} w="100%">
                <Text isTruncated color={"gray.700"}>
                  {bug_id}
                </Text>
                <HStack>
                  {metric_wise_aggregated_finding.findings.length > 1 && (
                    <HStack
                      mr={
                        metric_wise_aggregated_finding.bug_status == "pending_fix"
                          ? 8
                          : 0
                      }
                      py={1}
                      px={3}
                      borderRadius={20}
                      backgroundColor={"white"}
                    >
                      <MultifileIcon size={20} /> <Text>MULTIFILE</Text>
                    </HStack>
                  )}

                  {metric_wise_aggregated_finding.bug_status !== "pending_fix" && (
                    <Image
                      src={`/icons/${metric_wise_aggregated_finding.bug_status}.svg`}
                    />
                  )}
                </HStack>
              </HStack>
            </AccordionButton>
            <AccordionPanel p={0}>
              <DetailedResult
                type={type}
                is_latest_scan={is_latest_scan}
                files={files}
                confidence={confidence}
                setConfidence={setConfidence}
                details_enabled={true}
                updateBugStatus={updateBugStatus}
              />
            </AccordionPanel>
          </AccordionItem>
      }
    </>
  );
};

type FileDataContProps = { file: FileState; type: "project" | "block" };
const FileDataCont: React.FC<FileDataContProps> = ({ file, type }) => {
  const { scanId: scan_id } = useParams<{ scanId: string }>();
  const { file_path, line_nos_end, line_nos_start } = file;

  let highlightArray: string[] = [];

  line_nos_start.map((number, index) => {
    if (number.toString().length === line_nos_end[index].toString().length) {
      highlightArray.push(`${number}-${line_nos_end[index]}`);
    } else {
      highlightArray.push(
        `${number}-${Math.pow(10, number.toString().length) - 1}`
      );
      highlightArray.push(
        `${Math.pow(10, number.toString().length)}-${line_nos_end[index]}`
      );
    }
  });
  let highlightString = highlightArray.join(",");

  const { data, isLoading } = useFileContent(scan_id, file_path, type);

  return (
    <>
      {isLoading && (
        <Flex
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
            h: "35vh",
          }}
        >
          <Spinner />
        </Flex>
      )}
      {data && (
        <pre>
          <CodeBlock
            customStyle={{
              height: "35vh",
              fontSize: "14px",
              overflow: "scroll",
              bg: "gray.100",
            }}
            theme={atomOneLight}
            showLineNumbers
            text={data.file_contents}
            highlight={highlightString}
          />
        </pre>
      )}
    </>
  );
};

const FileDataContTest: React.FC<FileDataContProps> = ({ file, type }) => {
  const { scanId: scan_id } = useParams<{ scanId: string }>();
  const { file_path, line_nos_end, line_nos_start } = file;
  const { data, isLoading } = useFileContent(scan_id, file_path, type);

  const [fileContent, setFileContent] = useState<string[] | undefined>();

  useEffect(() => {
    if (data) {
      let dataArray = data.file_contents.split("\n");
      setFileContent([...dataArray]);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Flex
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
            h: "50vh",
            mt: 10,
          }}
        >
          <Spinner />
        </Flex>
      ) : (
        fileContent && (
          <CodeExplorer
            file_content={fileContent}
            line_nos_start={line_nos_start}
            line_nos_end={line_nos_end}
          />
        )
      )}
    </>
  );
};

const CodeExplorer: React.FC<{
  file_content: string[];
  line_nos_start: number[];
  line_nos_end: number[];
}> = ({ file_content, line_nos_start, line_nos_end }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  };

  let count: number = 0;

  useEffect(() => {
    scrollToBottom();
  }, [line_nos_start, line_nos_end, file_content]);

  return (
    <Flex
      sx={{
        w: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDir: "column",
        h: "50vh",
        overflow: "scroll",
      }}
    >
      <Flex
      sx={{
        w: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDir: "column",
        h: "fit-content",
        
      }}
    >
      {file_content.map((item, index) => {
        if (index + 1 > line_nos_end[count] && count <= line_nos_end.length)
          count++;

        return (
          <React.Fragment key={index}>
            {index + 1 === line_nos_start[count] ? (
              <HStack
                as={"div"}
                key={index}
                ref={elementRef}
                align={"flex-start"}
                spacing={5}
              >
                <Text color={"gray.600"} fontSize='13px' fontWeight="normal">
                  {index + 1}
                </Text>
                <pre
                  style={{
                    fontSize: '13px',
                    color:
                      index + 1 <= line_nos_end[count] + 1 &&
                      index + 1 >= line_nos_start[count]
                        ? "#000000"
                        : "#A0AEC0",
                  }}
                  key={index}
                >
                  {item}
                </pre>
              </HStack>
            ) : (
              <HStack as={"div"} key={index} align={"flex-start"} spacing={5}>
                <Text color={"gray.600"} fontSize='13px' fontWeight="normal">
                  {index + 1}
                </Text>
                <pre
                  style={{
                    fontSize: '13px',
                    color:
                      index + 1 <= line_nos_end[count] + 1 &&
                      index + 1 >= line_nos_start[count]
                        ? "#000000"
                        : "#A0AEC0",
                  }}
                  key={index}
                >
                  {item}
                </pre>
              </HStack>
            )}
          </React.Fragment>
        );
      })}
      </Flex>
    </Flex>
  );
};

type MultiFileExplorerProps = { files: FilesState; type: "project" | "block" };
export const MultiFileExplorer: React.FC<MultiFileExplorerProps> = ({
  files,
  type,
}) => {
  const { data: profileData } = useProfile();
  const history = useHistory();

  const [currentFileName, setCurrentFileName] = useState(
    files.findings[0].file_path
  );

  return (
    <>
      <Box
        sx={{
          borderRadius: 15,
          bg: "bg.subtle",
          p: 4,
          my: 2,
        }}
      >
        {files.bug_status === "fixed" ? (
          <Flex
            sx={{
              w: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              h: ["35vh", "35vh", "35vh", "60vh"],
              flexDir: "column",
            }}
          >
            <VStack mb={[8, 8, 8, "10vh"]}>
              <Image src="/common/fixedIssueIcon.svg" />
              <Text fontWeight={600}>This Issue has been fixed</Text>
            </VStack>
          </Flex>
        ) : (
          <Flex
            sx={{
              w: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              h: "100%",
            }}
          >
            <Tabs
              defaultIndex={0}
              width={"100%"}
              variant="soft-rounded"
              colorScheme="messenger"
            >
              <Flex
                width={"100%"}
                overflowX="scroll"
                flexDir={"row"}
                justifyContent="flex-start"
                align={"center"}
                background={"gray.100"}
                borderRadius={10}
                px={3}
                mb={2}
              >
                <TabList my={3} width={"fit-content"}>
                  {files.findings.map((file, index) => (
                    <Tab
                      key={index}
                      onClick={() => setCurrentFileName(file.file_path)}
                      mx={1}
                      background={"white"}
                    >
                      <Tooltip label={file.file_path} aria-label="A tooltip">
                        <Text fontSize={"xs"} width={100} isTruncated>
                          {file.file_path.length < 16
                            ? file.file_path
                            : file.file_path.slice(0, 6) +
                              "..." +
                              file.file_path.slice(
                                file.file_path.length - 10,
                                file.file_path.length
                              )}
                        </Text>
                      </Tooltip>
                    </Tab>
                  ))}
                </TabList>
              </Flex>
              <TabPanels>
                {files.findings.map((file, index) => (
                  <TabPanel  key={index} px={2} pt={2} pb={0} >
                    <FileDataContTest
                      type={type}
                      file={{
                        issue_id: files.issue_id,
                        file_path: file.file_path,
                        line_nos_start: file.line_nos_start,
                        line_nos_end: file.line_nos_end,
                      }}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Flex>
        )}
      </Box>
      <Box
        sx={{
          borderRadius: 15,
          bg: "bg.subtle",
          p: 4,
          my: 4,
        }}
      >
        <Box fontSize="sm" mb={2}>
          <IssueDetail
            current_file_name={currentFileName}
            files={files}
            issue_id={files.issue_id}
            context="multi_file"
            description_details={files.description_details}
          />
        </Box>
      </Box>
    </>
  );
};

const IssueDetail: React.FC<{
  current_file_name: string;
  files?: FilesState;
  issue_id: string;
  context: string;
  description_details: any;
}> = ({ issue_id, context, description_details, files, current_file_name }) => {
  const { data, isLoading } = useIssueDetail(issue_id, context);

  let variableData = description_details;

  return (
    <Tabs size="sm" variant="soft-rounded" colorScheme="green" w={["100%", "100%","100%", "auto"]}>
      <Flex
        w={["100%", "100%","100%", "auto"]}
        overflowX={["scroll", "scroll", "scroll", "visible"]}
      >
        <TabList
          sx={{
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderColor: "border",
            pb: 4,
          }}
          px={[0, 0, 0, 4]}
        >
          <Tab minW={"200px"} mx={[0, 0, 0, 2]}>Vulnerability Description</Tab>
          <Tab minW={"150px"} mx={[0, 0, 0, 2]}>Remediation</Tab>
        </TabList>
      </Flex>
      {isLoading && (
        <Flex
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
            h: "20vh",
          }}
        >
          <Spinner />
        </Flex>
      )}
      {data && (
        <TabPanels>
          <TabPanel
            sx={{ w: "100%", overflowY: "scroll" }}
            h={["fit-content", "fit-content", "fit-content", "20vh"]}
          >
            <DescriptionWrapper>
              {files && (
                <Text
                  px={5}
                  py={2}
                  mb={3}
                  fontWeight="600"
                  fontSize={17}
                  borderRadius={12}
                  color={"gray.600"}
                  bg={"gray.200"}
                  width="fit-content"
                >
                  {files.template_details.issue_confidence === "0" ? (
                    <>
                      <WarningIcon color={"high"} mr={2} /> {"Tentative"}
                    </>
                  ) : files.template_details.issue_confidence === "1" ? (
                    <>
                      <WarningIcon color={"medium"} mr={2} /> {"Firm"}
                    </>
                  ) : (
                    <>
                      <WarningIcon color={"low"} mr={2} /> {"Certain"}
                    </>
                  )}
                </Text>
              )}
              <Text fontWeight={500} fontSize="md" pb={4}>
                {data.issue_details.issue_name}
              </Text>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data.issue_details.issue_description.format({
                    ...variableData,
                    current_file_name,
                  }),
                }}
              />
            </DescriptionWrapper>
          </TabPanel>
          <TabPanel sx={{ h: "20vh", w: "100%", overflowY: "scroll" }}>
            <DescriptionWrapper>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data.issue_details.issue_remediation.format({
                    ...variableData,
                    current_file_name,
                  }),
                }}
              />
            </DescriptionWrapper>
          </TabPanel>
        </TabPanels>
      )}
    </Tabs>
  );
};

const DescriptionWrapper = styled.div`
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

export default Result;

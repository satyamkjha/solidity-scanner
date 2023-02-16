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
  Checkbox,
  Divider,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { BiCodeCurly } from "react-icons/bi";
import { AiOutlineCaretRight, AiFillGithub } from "react-icons/ai";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import { FiFilter, FiCheck } from "react-icons/fi";
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
  MetricWiseAggregatedFinding,
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
import {
  ArrowUpIcon,
  CloseIcon,
  EditIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import React from "react";
import { access } from "fs";
import TrialWallCode, { TrialWall, TrialWallIssue } from "./trialWall";
import useDynamicRefs from "use-dynamic-refs";
import DetailedResult from "./detailedResult";
import { DetailFilter } from "./detailFilter";
import { IssueContainer } from "./issueContainer";
import { sentenceCapitalize } from "helpers/helperFunction";
import { FaCompressAlt, FaExpandAlt } from "react-icons/fa";

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
                <FileDetails
                  file={file}
                  type={type}
                  profileData={profileData}
                />
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

type FileDetailsProps = {
  file: FileState;
  type: "project" | "block";
  profileData: Profile;
};
const FileDetails: React.FC<FileDetailsProps> = ({
  file,
  type,
  profileData,
}) => {
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
  refetch(): any;
}> = ({
  scanSummary,
  scanDetails,
  is_latest_scan,
  type,
  profileData,
  details_enabled,
  refetch,
}) => {
  const [files, setFiles] = useState<FilesState | null>(null);

  const [issues, setIssues] = useState<MultiFileScanDetail[]>(scanDetails);

  const { projectId, scanId } = useParams<{
    projectId: string;
    scanId: string;
  }>();
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

  const [selectedBugs, setSelectedBugs] = useState<string[]>([]);

  // const [action, setAction] = useState("");
  const toast = useToast();

  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const updateBugStatus = async (action: string, comment?: string) => {
    if (files) {
      const { data } = await API.post("/api-update-bug-status/", {
        bug_ids: selectedBugs,
        scan_id: scanId,
        bug_status: action,
        comment: comment,
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
              if (selectedBugs.includes(item.bug_hash)) {
                return { ...item, bug_status: action, comment: comment };
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
        comment: comment,
      });
      setSelectedBugs([]);
    }
    refetch();
  };

  useEffect(() => {
    if (files) {
      setIssues((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.issue_id === files.issue_id) {
            const newList = obj.metric_wise_aggregated_findings.map((item) => {
              if (
                files.bug_id === item.bug_id &&
                files.bug_status === "wont_fix"
              ) {
                return { ...item, comment: files.comment };
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
    }
  }, [files]);

  useEffect(() => {
    if (!selectedBugs) setIssues(issues);
  }, [selectedBugs]);

  return (
    <>
      <Flex
        w="100%"
        sx={{ flexDir: ["column", "column", "column", "row"] }}
        pb={2}
      >
        <VStack
          w={["100%", "100%", "100%", "40%"]}
          spacing={4}
          mb={[8, 8, 0]}
          alignItems="flex-start"
        >
          <DetailFilter
            critical={critical}
            high={high}
            medium={medium}
            low={low}
            informational={informational}
            gas={gas}
            vulnerability={vulnerability}
            setVulnerability={setVulnerability}
            confidence={confidence}
            setConfidence={setConfidence}
          />
          <Box w="100%" h={["100%", "100%", "100%", "47vh"]} overflowY="scroll">
            <MultifileIssues
              type={type}
              profileData={profileData}
              details_enabled={details_enabled}
              is_latest_scan={is_latest_scan}
              issues={issues}
              files={files}
              setFiles={setFiles}
              selectedBugs={selectedBugs}
              setSelectedBugs={setSelectedBugs}
              confidence={confidence}
              vulnerability={vulnerability}
              updateBugStatus={updateBugStatus}
            />
          </Box>
        </VStack>

        {isDesktopView && (
          <DetailedResult
            type={type}
            is_latest_scan={is_latest_scan}
            files={files}
            setFiles={setFiles}
            details_enabled={details_enabled}
            selectedBugs={selectedBugs}
            updateBugStatus={updateBugStatus}
          />
        )}
      </Flex>
    </>
  );
};

type MultifileIssuesProps = {
  type: "block" | "project";
  issues: MultiFileScanDetail[];
  files: FilesState | null;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  selectedBugs: string[];
  setSelectedBugs: Dispatch<SetStateAction<string[]>>;
  confidence: boolean[];
  vulnerability: boolean[];
  profileData: Profile;
  details_enabled: boolean;
  is_latest_scan: boolean;
  updateBugStatus: any;
};

const MultifileIssues: React.FC<MultifileIssuesProps> = ({
  type,
  issues,
  files,
  is_latest_scan,
  setFiles,
  selectedBugs,
  setSelectedBugs,
  confidence,
  vulnerability,
  profileData,
  details_enabled,
  updateBugStatus,
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
          (
            {
              issue_id,
              metric_wise_aggregated_findings,
              template_details,
              no_of_findings,
            },
            index
          ) => {
            return (
              <>
                {confidence[parseInt(template_details.issue_confidence)] &&
                vulnerability[
                  getVulnerabilityNumber(template_details.issue_severity)
                ] ? (
                  <IssueContainer
                    key={issue_id + index}
                    type={type}
                    files={files}
                    issue_id={issue_id}
                    metric_wise_aggregated_findings={
                      metric_wise_aggregated_findings
                    }
                    template_details={template_details}
                    no_of_findings={no_of_findings}
                    is_latest_scan={is_latest_scan}
                    details_enabled={details_enabled}
                    setFiles={setFiles}
                    selectedBugs={selectedBugs}
                    setSelectedBugs={setSelectedBugs}
                    updateBugStatus={updateBugStatus}
                  />
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
            h: "100%",
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
            h: "100%",
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
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const scrollToBottom = () => {
    setTimeout(
      () => {
        if (elementRef.current) {
          elementRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      },
      isDesktopView ? 0 : 500
    );
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
        pl: "15px",
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
                  <Text color={"gray.600"} fontSize="13px" fontWeight="normal">
                    {index + 1}
                  </Text>
                  <pre
                    style={{
                      fontSize: "13px",
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
                  <Text color={"gray.600"} fontSize="13px" fontWeight="normal">
                    {index + 1}
                  </Text>
                  <pre
                    style={{
                      fontSize: "13px",
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

type MultiFileExplorerProps = {
  files: FilesState;
  type: "project" | "block";
  handleTabsChange: (index: number) => void;
  tabIndex: number;
  openIssueBox: boolean;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  setOpenIssueBox: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MultiFileExplorer: React.FC<MultiFileExplorerProps> = ({
  files,
  type,
  handleTabsChange,
  tabIndex,
  openIssueBox,
  setOpenIssueBox,
  setFiles,
}) => {
  const [currentFileName, setCurrentFileName] = useState(
    files.findings[0].file_path
  );

  const [fullScreen, setFullScreen] = useState(false);

  const getFileIndex = () => {
    files.findings.forEach((elem, index) => {
      if (elem.file_path === currentFileName) {
        return index;
      }
    });

    return 0;
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: 15,
          bg: "bg.subtle",
          position: "relative",
          h: "57vh",
        }}
      >
        {files.bug_status === "fixed" ? (
          <Flex
            sx={{
              w: "100%",
              justifyContent: "center",
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
          <>
            <Flex
              sx={{
                w: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                h: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
              }}
            >
              <Tabs
                defaultIndex={0}
                width={"calc(100%)"}
                variant="soft-rounded"
                colorScheme="messenger"
              >
                <Flex
                  width={"100%"}
                  overflowX="scroll"
                  flexDir={"row"}
                  justifyContent="flex-start"
                  align={"center"}
                  background={"#FAFBFC"}
                  borderRadius={10}
                  p={0}
                >
                  <TabList
                    px={0}
                    my={0}
                    width={"fit-content"}
                    w="100%"
                    borderColor={"#C4C4C4"}
                    borderBottomWidth={"1px"}
                  >
                    {files.findings.map((file, index) => (
                      <Tab
                        key={index}
                        onClick={() => setCurrentFileName(file.file_path)}
                        background={"gray.100"}
                        borderRadius="0px"
                        borderRightWidth={"1px"}
                        borderColor={"#C4C4C4"}
                        _selected={{
                          background: "white",
                          borderBottomColor: "#3300FF",
                          borderBottomWidth: "2px",
                        }}
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
                    <TabPanel key={index} px={2} pt={2} pb={0}>
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
            {openIssueBox && (
              <Box
                sx={{
                  borderRadius: 15,
                  bg: "white",
                  p: 3,
                  pb: 1,
                  w: "calc(100% - 20px)",
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDir: "column",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <HStack
                  width={"100%"}
                  justifyContent={"space-between"}
                  alignItems="flex-start"
                  mb={1}
                >
                  <HStack width={"80%"}>
                    <VStack width={"23%"} alignItems="flex-start">
                      <Text
                        fontSize="xs"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={1}
                      >
                        Severity
                      </Text>
                      <HStack>
                        <SeverityIcon
                          variant={files.template_details.issue_severity}
                        />
                        <Text
                          fontSize="sm"
                          fontWeight={"bold"}
                          ml={2}
                          width={"100%"}
                        >
                          {sentenceCapitalize(
                            files.template_details.issue_severity
                          )}
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack
                      width={"23%"}
                      mb={[4, 4, 4, 0]}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="xs"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={0}
                      >
                        Confidence
                      </Text>
                      <Text
                        px={3}
                        py={1}
                        borderRadius={20}
                        color={
                          files.template_details.issue_confidence === "2"
                            ? "#289F4C"
                            : files.template_details.issue_confidence === "1"
                            ? "#ED9801"
                            : "#FF5630"
                        }
                        backgroundColor={
                          files.template_details.issue_confidence === "2"
                            ? "#CFFFB8"
                            : files.template_details.issue_confidence === "1"
                            ? "#FFF8EB"
                            : "#FFF5F3"
                        }
                        fontSize="xs"
                        fontWeight={"bold"}
                      >
                        {files.template_details.issue_confidence === "2"
                          ? "Certain"
                          : files.template_details.issue_confidence === "1"
                          ? "Firm"
                          : "Tentative"}
                      </Text>
                    </VStack>
                    <VStack
                      width={"23%"}
                      my={[4, 4, 4, 0]}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="xs"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={1}
                      >
                        Line nos
                      </Text>
                      <Text fontSize="sm" fontWeight={"bold"}>
                        {files.findings[getFileIndex()].line_nos_start}-
                        {files.findings[getFileIndex()].line_nos_end}
                      </Text>
                    </VStack>
                    <VStack
                      width={"31%"}
                      my={[4, 4, 4, 0]}
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="xs"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={1}
                      >
                        Action Taken
                      </Text>
                      <HStack>
                        <Image src={`/icons/${files.bug_status}_color.svg`} />
                        <Text
                          fontSize="sm"
                          fontWeight={"normal"}
                          color={"gray.600"}
                        >
                          {/* {sentenceCapitalize(
                          issue.status.toLowerCase().replace("_", " ")
                        )} */}

                          {files.bug_status === "false_positive" &&
                            "False Positive"}
                          {files.bug_status === "wont_fix" && "Won't Fix"}
                          {files.bug_status === "pending_fix" && "Pending Fix"}
                          {files.bug_status === "fixed" && "Fixed"}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <HStack justifyContent={"flex-end"} alignItems="flex-start">
                    <Tooltip
                      label={fullScreen ? "Minimize" : "Expand"}
                      fontSize="md"
                    >
                      <IconButton
                        fontSize={"lg"}
                        p={0}
                        onClick={() => {
                          setFullScreen(!fullScreen);
                        }}
                        bgColor="white"
                        aria-label="Handle Size"
                        icon={
                          fullScreen ? (
                            <FaCompressAlt color="#8A94A6" />
                          ) : (
                            <FaExpandAlt color="#8A94A6" />
                          )
                        }
                      />
                    </Tooltip>
                    <Tooltip label="Close Box" fontSize="md">
                      <IconButton
                        fontSize={"lg"}
                        p={0}
                        onClick={() => setOpenIssueBox(false)}
                        bgColor="white"
                        aria-label="Close Box"
                        icon={<CloseIcon color="#8A94A6" />}
                      />
                    </Tooltip>
                  </HStack>
                </HStack>
                <Divider mb={2} />
                <Box fontSize="sm" w="100%" mb={2}>
                  <IssueDetail
                    handleTabsChange={handleTabsChange}
                    tabIndex={tabIndex}
                    fullScreen={fullScreen}
                    current_file_name={currentFileName}
                    files={files}
                    issue_id={files.issue_id}
                    context="multi_file"
                    setFiles={setFiles}
                    description_details={files.description_details}
                  />
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

const IssueDetail: React.FC<{
  current_file_name: string;
  files: FilesState;
  issue_id: string;
  context: string;
  description_details: any;
  fullScreen?: boolean;
  handleTabsChange?: (index: number) => void;
  tabIndex?: number;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
}> = ({
  issue_id,
  context,
  description_details,
  files,
  current_file_name,
  setFiles,
  fullScreen,
  handleTabsChange,
  tabIndex,
}) => {
  const { data, isLoading } = useIssueDetail(issue_id, context);

  let variableData = description_details;

  const { scanId, projectId } = useParams<{
    scanId: string;
    projectId: string;
  }>();

  const height = fullScreen ? "35vh" : "15vh";

  const [editComment, setEditComment] = React.useState(false);

  const [comment, setComment] = React.useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    setEditComment(false);
    console.log(files.comment);
    console.log(files);
  }, [files]);

  const updateComment = async () => {
    if (comment && comment !== "") {
      const { data } = await API.post("/api-update-bug-status/", {
        bug_ids: [files?.bug_hash],
        scan_id: scanId,
        bug_status: files?.bug_status,
        comment: comment,
      });
      if (data.status === "success") {
        toast({
          title: "Comment Updated",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFiles({
          ...files,
          comment: comment,
        });
      }
    }
  };

  return (
    <Tabs
      onChange={handleTabsChange}
      index={tabIndex}
      size="sm"
      variant="soft-rounded"
      colorScheme="green"
      w={["100%", "100%", "100%", "100%"]}
    >
      <Flex
        w={["100%", "100%", "100%", "100%"]}
        overflowX={["scroll", "scroll", "scroll", "visible"]}
      >
        <TabList
          sx={{
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderColor: "border",
            pb: 2,
            w: "100%",
          }}
          px={[0, 0, 0, 0]}
        >
          <Tab
            bgColor={"#FFFFFF"}
            _selected={{
              bgColor: "#4E5D78",
              color: "#FFFFFF",
            }}
            color="#4E5D78"
            minW={"200px"}
            mx={[0, 0, 0, 2]}
          >
            Vulnerability Description
          </Tab>
          <Tab
            bgColor={"#FFFFFF"}
            _selected={{
              bgColor: "#4E5D78",
              color: "#FFFFFF",
            }}
            color="#4E5D78"
            minW={"150px"}
            mx={[0, 0, 0, 2]}
          >
            Remediation
          </Tab>
          <Tab
            bgColor={"#FFFFFF"}
            _selected={{
              bgColor: "#4E5D78",
              color: "#FFFFFF",
            }}
            color="#4E5D78"
            minW={"150px"}
            mx={[0, 0, 0, 2]}
          >
            Comments
          </Tab>
        </TabList>
      </Flex>
      {isLoading && (
        <Flex
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
            h: height,
          }}
        >
          <Spinner />
        </Flex>
      )}
      {data && (
        <TabPanels w="100%">
          <TabPanel
            sx={{ w: "100%", overflowY: "scroll" }}
            h={["fit-content", "fit-content", "fit-content", height]}
          >
            <DescriptionWrapper>
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
          <TabPanel
            sx={{
              h: ["fit-content", "fit-content", "fit-content", height],
              w: "100%",
              overflowY: "scroll",
            }}
          >
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
          <TabPanel
            sx={{
              h: ["fit-content", "fit-content", "fit-content", height],
              w: "100%",
              overflowY: "scroll",
              justifyContent: "space-between",
              alignItems: "flex-start",
              display: "flex",
              flexDir: "row",
            }}
          >
            {editComment ? (
              <VStack
                w="100%"
                bgColor={"#F6F6F6"}
                borderRadius={"16px"}
                height={"130px"}
                alignItems="flex-end"
              >
                <Textarea
                  placeholder="Add Comments"
                  fontSize={"12px"}
                  bgColor={"#F6F6F6"}
                  borderWidth={0}
                  noOfLines={3}
                  borderRadius={"16px"}
                  value={comment}
                  _selected={{
                    borderWidth: "0px",
                  }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  height={"60px"}
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{
                    boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.0)",
                  }}
                />
                <IconButton
                  fontSize={"lg"}
                  p={0}
                  mt={0}
                  borderRadius="50%"
                  onClick={() => {
                    if (comment !== "" && comment) {
                      updateComment();
                    }
                  }}
                  bgColor={comment !== "" && comment ? "#3300FF" : "#B8B8B8"}
                  aria-label="Edit Comment"
                  color={comment !== "" && comment ? "#FFFFFF" : "#000000"}
                  icon={<ArrowUpIcon />}
                />
              </VStack>
            ) : (
              files.comment && (
                <>
                  <Text w="90%" fontSize={"xs"}>
                    {files.comment}
                  </Text>
                  <Tooltip label="Edit Comment" fontSize="md">
                    <IconButton
                      fontSize={"lg"}
                      p={0}
                      onClick={() => {
                        setEditComment(true);
                        if (files.comment) {
                          setComment(files.comment);
                        }
                      }}
                      bgColor="white"
                      aria-label="Edit Comment"
                      icon={<EditIcon />}
                    />
                  </Tooltip>
                </>
              )
            )}
          </TabPanel>
        </TabPanels>
      )}
    </Tabs>
  );
};

const DescriptionWrapper = styled.div`
p {
  font-size: 12px;
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

  
`;

export default Result;

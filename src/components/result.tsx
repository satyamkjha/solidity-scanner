import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
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
  useToast,
  Image,
  HStack,
  Tooltip,
  useMediaQuery,
  Divider,
  IconButton,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { BiCodeCurly } from "react-icons/bi";
import { AiOutlineCaretRight } from "react-icons/ai";
import { CodeBlock, atomOneLight } from "react-code-blocks";

import VulnerabilityDistribution from "components/vulnDistribution";
import { SeverityIcon } from "components/icons";

import { useFileContent } from "hooks/useFileContent";
import { useIssueDetail } from "hooks/useIssueDetail";
import Select from "react-select";
import {
  FilesState,
  MetricWiseAggregatedFinding,
  MultiFileScanDetail,
  MultiFileScanSummary,
  Profile,
  ScanDetail,
  ScanSummary,
} from "common/types";
import { issueActions, severityPriority } from "common/values";
import API from "helpers/api";
import { useMutation } from "react-query";
import { ArrowUpIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import React from "react";
import { TrialWall } from "./trialWall";
import DetailedResult from "./detailedResult";
import { DetailFilter } from "./detailFilter";
import { IssueContainer } from "./issueContainer";
import { sentenceCapitalize } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import CommentForm from "./commentForm";
import { getBugStatusNumber } from "common/functions";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
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
            type={type}
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

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid #f3f3f3",
    backgroundColor: state.isSelected
      ? "#FFFFFF"
      : state.isFocused
      ? "#E6E6E6"
      : "#FFFFFF",
    color: "#000000",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    color: state.selectProps.menuColor,
    borderRadius: 10,
    border: "0px solid #ffffff",
    overflowY: "hidden",
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FAFBFC",
    padding: 4,
    borderRadius: 20,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.3 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  container: (provided: any, state: any) => ({
    ...provided,
    width: "100%",
  }),
};

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

  const [bugStatusFilter, setBugStatusFilter] = useState([
    true,
    true,
    true,
    true,
  ]);
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

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [bugStatus, setBugStatus] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [filterExpanded, setFilterExpanded] = useState<boolean>(false);

  // const [action, setAction] = useState("");
  const toast = useToast();

  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const updateBugStatus = async (action: string, comment?: string) => {
    if (files) {
      const { data } = await API.post(API_PATH.API_UPDATE_BUG_STATUS, {
        bug_ids: selectedBugs,
        scan_id: scanId,
        project_id: projectId,
        bug_status: action,
        comment: comment,
        scan_type: type,
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
    setIssues(scanDetails);
  }, [scanDetails]);

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
    if (selectedBugs && selectedBugs.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
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
          h={["100%", "100%", "100%", "62vh"]}
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
            setFilterExpanded={setFilterExpanded}
            setVulnerability={setVulnerability}
            setConfidence={setConfidence}
            setBugStatusFilter={setBugStatusFilter}
          />
          {details_enabled && (
            <HStack
              display={["flex", "flex", "flex", "none"]}
              position={"sticky"}
              top={filterExpanded ? "285px" : "50px"}
              background="white"
              zIndex={1}
              w={"100%"}
              py={2}
            >
              <Text fontWeight={600} ml={2} mr={5} whiteSpace="nowrap">
                Take Action
              </Text>
              <Select
                formatOptionLabel={formatOptionLabel}
                options={issueActions}
                value={issueActions.find(
                  (item) => files?.bug_status === item.value
                )}
                placeholder="Select Action"
                styles={customStyles}
                isDisabled={isDisabled}
                onChange={(newValue) => {
                  if (newValue) {
                    if (newValue.value === "wont_fix") {
                      onOpen();
                      setBugStatus(newValue.value);
                    } else {
                      updateBugStatus(newValue.value);
                    }
                  }
                }}
              />
            </HStack>
          )}
          <Box w="100%" h={["100%", "100%", "100%", "auto"]} overflowY="scroll">
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
              bugStatusFilter={bugStatusFilter}
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
      <CommentForm
        isOpen={isOpen}
        onClose={onClose}
        updateBugStatus={updateBugStatus}
        status={bugStatus}
        selectedBugs={selectedBugs}
      />
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
  bugStatusFilter: boolean[];
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
  bugStatusFilter,
  details_enabled,
  updateBugStatus,
}) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  let issue_count: number;

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

  const checkBugStatusFilter = (
    metric_wise_aggregated_findings: MetricWiseAggregatedFinding[]
  ) => {
    const conditionMet = metric_wise_aggregated_findings.filter(
      (bug) => bugStatusFilter[getBugStatusNumber(bug.bug_status)]
    );
    if (conditionMet && conditionMet.length) {
      issue_count = conditionMet.length;
      return true;
    } else return false;
  };

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
                ] &&
                checkBugStatusFilter(metric_wise_aggregated_findings) ? (
                  <IssueContainer
                    key={issue_id + index}
                    type={type}
                    files={files}
                    issue_id={issue_id}
                    metric_wise_aggregated_findings={
                      metric_wise_aggregated_findings
                    }
                    template_details={template_details}
                    no_of_findings={issue_count ? issue_count : no_of_findings}
                    is_latest_scan={is_latest_scan}
                    details_enabled={details_enabled}
                    setFiles={setFiles}
                    selectedBugs={selectedBugs}
                    setSelectedBugs={setSelectedBugs}
                    bugStatusFilter={bugStatusFilter}
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
    if (isDesktopView) {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      }
    } else {
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.scrollIntoView({
            block: "end",
            inline: "start",
            behavior: "smooth",
          });
        }
      }, 500);
    }
  };

  let count: number = 0;

  const start = file_content.length;

  const values = [];

  for (let i = 0; i < 25; i++) {
    const currentValue = start + i;
    values.push(currentValue);
  }

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
        h: ["62vh", "62vh", "62vh", "50vh"],
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
        <>
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
                    sx={{
                      scrollMarginTop: isDesktopView ? 20 : "-60vh",
                    }}
                  >
                    <Text
                      color={"gray.600"}
                      fontSize="13px"
                      fontWeight="normal"
                    >
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
                  <HStack
                    as={"div"}
                    key={index}
                    align={"flex-start"}
                    spacing={5}
                  >
                    <Text
                      color={"gray.600"}
                      fontSize="13px"
                      fontWeight="normal"
                    >
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
          {values.map((value) => (
            <HStack as={"div"} key={value} align={"flex-start"} spacing={5}>
              <pre
                style={{
                  fontSize: "13px",
                  color: "#A0AEC0",
                }}
                key={value}
              >
                {" "}
              </pre>
            </HStack>
          ))}
        </>
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
          bg: "rgba(243, 243, 243, 0.75)",
          position: "relative",
          mb: 2,
          h:
            files.bug_status === "fixed"
              ? "fit-content"
              : ["70vh", "70vh", "70vh", "56vh"],
        }}
      >
        {files.bug_status === "fixed" ? (
          <Flex
            sx={{
              w: "100%",
              justifyContent: "center",
              alignItems: "center",
              h: ["35vh", "35vh", "35vh", "55vh"],
              flexDir: "column",
            }}
          >
            <VStack mb={4}>
              <Image src="/common/fixedIssueIcon.svg" />
              <Text fontWeight={600}>This Issue has been fixed</Text>
            </VStack>
          </Flex>
        ) : (
          <>
            <Tabs
              defaultIndex={0}
              width={"calc(100%)"}
              variant="soft-rounded"
              colorScheme="messenger"
            >
              <Flex
                width={"100%"}
                overflowX="auto"
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
                  w="100%"
                  h="100%"
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
            {openIssueBox && (
              <Box
                sx={{
                  borderRadius: 15,
                  bg: "white",
                  p: 3,
                  pr: 2,
                  pb: 1,
                  w: "calc(100% - 20px)",
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDir: "column",
                }}
              >
                <HStack
                  width={"100%"}
                  justifyContent={"space-between"}
                  alignItems="flex-start"
                  mb={3}
                >
                  <Flex
                    gridColumnGap={4}
                    gridRowGap={0}
                    flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
                    width={"80%"}
                  >
                    <VStack
                      width={["40%", "40%", "40%", "23%"]}
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={[0, 0, 0, 1]}
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
                      width={["40%", "40%", "40%", "23%"]}
                      alignItems="flex-start"
                      spacing={1}
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
                      width={["40%", "40%", "40%", "23%"]}
                      my={[4, 4, 4, 0]}
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={[0, 0, 0, 1]}
                      >
                        Line nos
                      </Text>
                      <Text fontSize="sm" fontWeight={"bold"}>
                        {files.findings[getFileIndex()].line_nos_start}-
                        {files.findings[getFileIndex()].line_nos_end}
                      </Text>
                    </VStack>
                    <VStack
                      width={["40%", "40%", "40%", "31%"]}
                      my={[4, 4, 4, 0]}
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight={"normal"}
                        color={"gray.400"}
                        mb={[0, 0, 0, 1]}
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
                  </Flex>
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
                            <BsArrowsAngleContract
                              strokeWidth={1}
                              color="#8A94A6"
                            />
                          ) : (
                            <BsArrowsAngleExpand
                              strokeWidth={1}
                              color="#8A94A6"
                            />
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
                    type={type}
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
  type: "project" | "block";
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
  type,
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

  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const [editComment, setEditComment] = React.useState(false);

  const [comment, setComment] = React.useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const toast = useToast();

  useEffect(() => {
    setEditComment(false);
  }, [files]);

  useEffect(() => {
    if (tabIndex !== undefined && !isDesktopView) {
      tabRefs.current[tabIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [tabIndex]);

  const updateComment = async () => {
    if (comment && comment !== "") {
      const { data } = await API.post(API_PATH.API_UPDATE_BUG_STATUS, {
        bug_ids: [files?.bug_hash],
        scan_id: scanId,
        project_id: projectId,
        bug_status: files?.bug_status,
        comment: comment,
        scan_type: type,
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
        overflowX={["scroll", "scroll", "scroll", "scroll"]}
      >
        <TabList
          sx={{
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderColor: "border",
            pb: 2,
            w: "fit-content",
          }}
          px={[0, 0, 0, 0]}
        >
          <Tab
            ref={(el) => (tabRefs.current[0] = el)}
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
            ref={(el) => (tabRefs.current[1] = el)}
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
            ref={(el) => (tabRefs.current[2] = el)}
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
          <TabPanel sx={{ w: "100%", overflowY: "scroll" }} h={[height]}>
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
              h: height,
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
              h: height,
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
                height={"110px"}
                alignItems="flex-end"
                spacing={-4}
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
                <Flex px={1}>
                  <IconButton
                    fontSize={"lg"}
                    p={0}
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
                </Flex>
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

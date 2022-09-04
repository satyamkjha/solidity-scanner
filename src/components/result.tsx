import { useState, Dispatch, SetStateAction, useEffect } from "react";
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
  FormControl,
  FormLabel,
  background,
  ButtonGroup,
} from "@chakra-ui/react";
import { BiCodeCurly } from "react-icons/bi";
import { AiOutlineCaretRight, AiFillGithub } from "react-icons/ai";

import { CodeBlock, atomOneLight } from "react-code-blocks";

import VulnerabilityDistribution, {
  VulnerabilityDistributionFilter,
} from "components/vulnDistribution";
import { MultifileBadge, SeverityIcon } from "components/icons";

import { useFileContent } from "hooks/useFileContent";
import { useIssueDetail } from "hooks/useIssueDetail";
import Select, { components } from "react-select";
import {
  Finding,
  MultiFileScanDetail,
  MultiFileScanSummary,
  MultiFileTemplateDetail,
  ScanDetail,
  ScanSummary,
  TemplateDetails,
} from "common/types";
import { severityPriority } from "common/values";
import API from "helpers/api";
import { useMutation } from "react-query";
import { useProfile } from "hooks/useProfile";
import { WarningIcon } from "@chakra-ui/icons";
import React from "react";
import { access } from "fs";
import { sentenceCapitalize } from "helpers/helperFunction";

type FileState = {
  issue_id: string;
  file_path: string;
  line_nos_start: number[];
  line_nos_end: number[];
};

type FilesState = {
  description_details: {
    context_version?: string;
    mostly_used_version?: string;
    version_file_count?: string;
    function_name?: string;
  };
  findings: Finding[];
  bug_id: string;
  bug_hash: string;
  bug_status: string;
  issue_id: string;
  template_details: MultiFileTemplateDetail;
};

export const Result: React.FC<{
  scanSummary: ScanSummary;
  scanDetails: ScanDetail[];
  type: "project" | "block";
}> = ({ scanSummary, scanDetails, type }) => {
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
          {file ? (
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
                Please select a file from an issue to see vulnerability details.
              </Text>
            </Flex>
          )}
        </Box>
      </VStack>
    </Flex>
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
    <Box w="100%" position={"relative"} h={"100%"}>
      <Box
        zIndex={-1}
        top={0}
        left={0}
        h={"100%"}
        w="100%"
        position={"absolute"}
      >
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
            {/* <Button
            size="sm"
            isDisabled={mutation.isLoading}
            isLoading={mutation.isLoading}
            onClick={createGithubIssue}
          >
            <Icon as={AiFillGithub} color="subtle" mr={2} />
            Create issue
          </Button> */}
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
              issue_id={issue_id}
              context="single_file"
              description_details={{}}
            />
          </Box>
        </Box>
      </Box>
      {profileData && profileData.current_package === "trial" && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          zIndex={"10"}
          w={"100%"}
          h={"76vh"}
        >
          <Flex
            as={"div"}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(8px)",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            mt={5}
            w={"95%"}
            h={"93%"}
            borderRadius={5}
            flexDir="column"
          >
            <Image src="/trial-lock.svg" alt="Trial Lock" zIndex={"15"} />
            <Text
              mt={10}
              textAlign={"center"}
              w={"80%"}
              fontWeight={700}
              fontSize="md"
              color="black"
              mb={4}
            >
              Upgrade to use this feature
            </Text>
            <Text
              textAlign={"center"}
              w={"80%"}
              fontWeight={300}
              fontSize="sm"
              color="black"
              mb={8}
            >
              Upgrade from the trial plan to use this feature and much more.
            </Text>
            <Button
              variant="brand"
              onClick={() => {
                history.push("/billing");
              }}
            >
              Upgrade
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
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
}> = ({ scanSummary, scanDetails, is_latest_scan, type }) => {
  const [files, setFiles] = useState<FilesState | null>(null);

  const [issues, setIssues] = useState<MultiFileScanDetail[]>(scanDetails);

  console.log(scanDetails);

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
  const options = [
    {
      value: "discovered",
      icon: "",
      label: "Please Select an action",
      isDisabled: true,
    },
    { value: "wont_fix", icon: "wont_fix", label: "Won't Fix" },
    {
      value: "false_positive",
      icon: "false_positive",
      label: "False Positive",
    },
    { value: "discovered", icon: "discovered", label: "Reset Bug Status" },
  ];
  const toast = useToast();

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
      width: 300,
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FAFBFC",
      padding: 5,
      borderRadius: 20,
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  // useEffect(() => {
  //   if(files){
  //     setAction(files.bug_status)
  //   }
  // }, [files])

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
        console.log(issues);
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
    <Flex w="100%" sx={{ flexDir: ["column", "column", "row"] }} py={2}>
      <VStack
        w={["100%", "100%", "40%"]}
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
        <Box w="100%" minH="50vh">
          <MultifileIssues
            issues={issues}
            files={files}
            setFiles={setFiles}
            confidence={confidence}
            vulnerability={vulnerability}
          />
        </Box>
      </VStack>
      <VStack
        w={["100%", "100%", "60%"]}
        h={["100%"]}
        alignItems="flex-start"
        spacing={5}
        pl={10}
      >
        <HStack width={"100%"} justify={"space-between"}>
          <Text fontWeight={600}>Confidence Parameter</Text>

          <HStack>
            <Button
              variant={confidence[2] ? "solid" : "outline"}
              py={0}
              onClick={() =>
                setConfidence([confidence[0], confidence[1], !confidence[2]])
              }
            >
              <WarningIcon color={"low"} mr={2} /> Certain
            </Button>
            <Button
              variant={confidence[1] ? "solid" : "outline"}
              py={0}
              onClick={() =>
                setConfidence([confidence[0], !confidence[1], confidence[2]])
              }
            >
              <WarningIcon color={"medium"} mr={2} /> Firm
            </Button>
            <Button
              variant={confidence[0] ? "solid" : "outline"}
              py={0}
              onClick={() =>
                setConfidence([!confidence[0], confidence[1], confidence[2]])
              }
            >
              <WarningIcon color={"high"} mr={2} /> Tentative
            </Button>
          </HStack>
        </HStack>
        {files && files.bug_status !== "fixed" && is_latest_scan && (
          <HStack justify="space-between" width={"100%"}>
            <Text fontWeight={600}>Take Action</Text>

            <Select
              formatOptionLabel={formatOptionLabel}
              options={options}
              value={options.find((item) => files?.bug_status === item.value)}
              placeholder="Select Action"
              styles={customStyles}
              onChange={(newValue) => {
                if (newValue) {
                  // setAction(newValue.value)
                  updateBugStatus(newValue.value);
                }
              }}
            />
          </HStack>
        )}
        {files &&
          ((files.bug_status !== "discovered" && !is_latest_scan) ||
            files.bug_status === "fixed") && (
            <HStack justify="flex-end" width={"100%"}>
              <HStack bg={"gray.100"} px={10} py={2} borderRadius={30}>
                <Text mr={2} color={"gray.600"} fontWeight={500}>
                  The issue has been marked as
                </Text>
                <Image mr={3} src={`/icons/${files.bug_status}.svg`} />
                <Text fontWeight={700}>
                  {sentenceCapitalize(
                    files.bug_status.toLowerCase().replace("_", " ")
                  )}
                </Text>
              </HStack>
            </HStack>
          )}

        <Box
          sx={{
            w: "100%",
            h: "100%",
            position: "sticky",
            top: 8,
          }}
        >
          {files ? (
            <MultiFileExplorer files={files} type={type} />
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
                Please select a file from an issue to see vulnerability details.
              </Text>
            </Flex>
          )}
        </Box>
      </VStack>
    </Flex>
  );
};

type MultifileIssuesProps = {
  issues: MultiFileScanDetail[];
  files: FilesState | null;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  confidence: boolean[];
  vulnerability: boolean[];
};

const MultifileIssues: React.FC<MultifileIssuesProps> = ({
  issues,
  files,
  setFiles,
  confidence,
  vulnerability,
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

  return (
    <Accordion allowMultiple>
      {Array.from(issues)
        .sort((issue1, issue2) =>
          severityPriority[issue1.template_details.issue_severity] >
          severityPriority[issue2.template_details.issue_severity]
            ? -1
            : 1
        )
        .map(
          ({ issue_id, metric_wise_aggregated_findings, template_details }) => {
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
                              <SeverityIcon
                                variant={template_details.issue_severity}
                              />
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
                              {metric_wise_aggregated_findings.length}
                            </Text>
                          </Flex>
                          <Icon
                            as={AiOutlineCaretRight}
                            mr={2}
                            color="subtle"
                            fontSize="14px"
                            transition="transform 0.2s"
                            transform={
                              isExpanded ? "rotate(90deg)" : "rotate(0deg)"
                            }
                          />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          {metric_wise_aggregated_findings.map((item) => (
                            <IssueBox
                              key={item.bug_id}
                              bug_id={item.bug_id}
                              files={files}
                              issue_id={issue_id}
                              metric_wise_aggregated_finding={{
                                description_details: item.description_details,
                                findings: item.findings,
                                bug_id: item.bug_id,
                                bug_hash: item.bug_hash,
                                bug_status: item.bug_status,
                                issue_id: issue_id,
                                template_details: template_details,
                              }}
                              template_details={template_details}
                              setFiles={setFiles}
                            />
                          ))}
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
  bug_id: string;
  files: FilesState | null;
  issue_id: string;
  metric_wise_aggregated_finding: FilesState;
  template_details: MultiFileTemplateDetail;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
}> = ({
  bug_id,
  files,
  issue_id,
  metric_wise_aggregated_finding,
  template_details,
  setFiles,
}) => {
  return (
    <Box
      key={bug_id}
      id={bug_id}
      opacity={
        metric_wise_aggregated_finding.bug_status === "discovered" ? 1 : 0.5
      }
      sx={{
        cursor: "pointer",
        bg:
          bug_id === files?.bug_id &&
          metric_wise_aggregated_finding.bug_status === "discovered"
            ? "gray.300"
            : "gray.100",
        p: 3,
        my: 2,
        color: "text",
        fontSize: "sm",
        borderRadius: 15,
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
        <Text w={"50%"} isTruncated color={"gray.700"}>
          {bug_id}
        </Text>
        {metric_wise_aggregated_finding.bug_status !== "discovered" && (
          <Image
            mr={3}
            src={`/icons/${metric_wise_aggregated_finding.bug_status}.svg`}
          />
        )}
      </HStack>
    </Box>
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

  let codeObjArray = [];

  line_nos_start.forEach((number, index) => {
    codeObjArray.push({
      lineStart: number,
      lineEnd: line_nos_end[index],
      code: "",
    });
  });

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
      {data && <pre>{data.file_contents}</pre>}
    </>
  );
};

type MultiFileExplorerProps = { files: FilesState; type: "project" | "block" };
const MultiFileExplorer: React.FC<MultiFileExplorerProps> = ({
  files,
  type,
}) => {
  const { data: profileData } = useProfile();
  const history = useHistory();

  return (
    <Box w="100%" position={"relative"} h={"100%"}>
      <Box
        zIndex={-1}
        top={0}
        left={0}
        h={"100%"}
        w="100%"
        position={"absolute"}
      >
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
                    <Tab mx={1} background={"white"}>
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
                  <TabPanel key={index} p={2}>
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
              files={files}
              issue_id={files.issue_id}
              context="multi_file"
              description_details={files.description_details}
            />
          </Box>
        </Box>
      </Box>
      {profileData && profileData.current_package === "trial" && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          zIndex={"10"}
          w={"100%"}
          h={"76vh"}
        >
          <Flex
            as={"div"}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(8px)",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            mt={5}
            w={"95%"}
            h={"93%"}
            borderRadius={5}
            flexDir="column"
          >
            <Image src="/trial-lock.svg" alt="Trial Lock" zIndex={"15"} />
            <Text
              mt={10}
              textAlign={"center"}
              w={"80%"}
              fontWeight={700}
              fontSize="md"
              color="black"
              mb={4}
            >
              Upgrade to use this feature
            </Text>
            <Text
              textAlign={"center"}
              w={"80%"}
              fontWeight={300}
              fontSize="sm"
              color="black"
              mb={8}
            >
              Upgrade from the trial plan to use this feature and much more.
            </Text>
            <Button
              variant="brand"
              onClick={() => {
                history.push("/billing");
              }}
            >
              Upgrade
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

const IssueDetail: React.FC<{
  files?: FilesState;
  issue_id: string;
  context: string;
  description_details: {
    context_version?: string;
    mostly_used_version?: string;
    version_file_count?: string;
    function_name?: string;
  };
}> = ({ issue_id, context, description_details, files }) => {
  const { data, isLoading } = useIssueDetail(issue_id, context);

  const { context_version, mostly_used_version, version_file_count } =
    description_details;

  return (
    <Tabs size="sm" variant="soft-rounded" colorScheme="green">
      <TabList
        sx={{
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderColor: "border",
          pb: 4,
          px: 4,
        }}
      >
        <Tab mx={2}>Vulnerability Description</Tab>
        <Tab mx={2}>Remediation</Tab>
      </TabList>
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
          <TabPanel sx={{ h: "20vh", w: "100%", overflowY: "scroll" }}>
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
                  __html: data.issue_details.issue_description,
                }}
              />
            </DescriptionWrapper>
          </TabPanel>
          <TabPanel sx={{ h: "20vh", w: "100%", overflowY: "scroll" }}>
            <DescriptionWrapper>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data.issue_details.issue_remediation.format({
                    ...description_details,
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

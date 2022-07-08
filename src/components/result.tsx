import React, { useState, Dispatch, SetStateAction } from "react";
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
} from "@chakra-ui/react";
import { BiCodeCurly } from "react-icons/bi";
import { AiOutlineCaretRight, AiFillGithub } from "react-icons/ai";

import { CodeBlock, atomOneLight } from "react-code-blocks";

import VulnerabilityDistribution from "components/vulnDistribution";
import { MultifileBadge, SeverityIcon } from "components/icons";

import { useFileContent } from "hooks/useFileContent";
import { useIssueDetail } from "hooks/useIssueDetail";

import {
  Finding,
  MetricWiseAggregatedFinding,
  MultiFileScanDetail,
  MultiFileScanSummary,
  MultiFileTemplateDetail,
  ScanDetail,
  ScanSummary,
} from "common/types";
import { severityPriority } from "common/values";
import API from "helpers/api";
import { useMutation } from "react-query";
import { useProfile } from "hooks/useProfile";
import { WarningIcon } from "@chakra-ui/icons";

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
  };
  findings: Finding[];
  issue_key: string;
  template_details: MultiFileTemplateDetail;
};

export const Result: React.FC<{
  scanSummary: ScanSummary;
  scanDetails: ScanDetail[];
  type: "project" | "block";
}> = ({ scanSummary, scanDetails, type }) => {
  const [file, setFile] = useState<FileState | null>(null);
  const {
    issue_severity_distribution: { critical, high, medium, low, informational },
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

  console.log(data);
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
            <IssueDetail issue_id={issue_id} />
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

export const MultifileResult: React.FC<{
  scanSummary: MultiFileScanSummary;
  scanDetails: MultiFileScanDetail[];
}> = ({ scanSummary, scanDetails }) => {
  const [files, setFiles] = useState<FilesState | null>(null);
  const {
    issue_severity_distribution: { critical, high, medium, low, informational },
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
            />
          </Box>
          {/* <Score score={score} /> */}
        </Flex>
        <Box w="100%" minH="50vh">
          <MultifileIssues
            issues={scanDetails}
            files={files}
            setFiles={setFiles}
          />
        </Box>
      </VStack>
      <VStack
        w={["100%", "100%", "60%"]}
        h={["100%"]}
        alignItems="flex-start"
        spacing={5}
        px={4}
      >
        <HStack mx={5} width={"100%"} justify={"space-between"}>
          <Text fontWeight={600}>Confidence Parameter</Text>
          {files && (
            <HStack mr={10}>
              <Text
                fontSize={"sm"}
                px={4}
                py={3}
                borderRadius={15}
                backgroundColor={
                  files?.template_details.issue_confidence === "2"
                    ? "#F5F2FF"
                    : "bg.subtle"
                }
                border={ files?.template_details.issue_confidence === "2" ? '1px solid #C1B1FF': ''}
              >
                <WarningIcon color={"low"} mr={2} /> Certain
              </Text>
              <Text
                fontSize={"sm"}
                px={4}
                py={3}
                borderRadius={15}
                backgroundColor={
                  files?.template_details.issue_confidence === "1"
                    ? "#F5F2FF"
                    : "bg.subtle"
                }
                border={ files?.template_details.issue_confidence === "1" ? '1px solid #C1B1FF': ''}

              >
                <WarningIcon color={"medium"} mr={2} /> Firm
              </Text>
              <Text
                fontSize={"sm"}
                px={4}
                py={3}
                borderRadius={15}
                backgroundColor={
                  files?.template_details.issue_confidence === "0"
                    ? "#F5F2FF"
                    : "bg.subtle"
                }
                border={ files?.template_details.issue_confidence === "0" ? '1px solid #C1B1FF': ''}
              >
                <WarningIcon color={"high"} mr={2} /> Tentative
              </Text>
            </HStack>
          )}
        </HStack>

        <Box
          sx={{
            w: "100%",
            h: "100%",
            position: "sticky",
            top: 8,
          }}
        >
          {files ? (
            <MultiFileExplorer files={files} type={"project"} />
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
};

const MultifileIssues: React.FC<MultifileIssuesProps> = ({
  issues,
  files,
  setFiles,
}) => {
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
            console.log(metric_wise_aggregated_findings);

            return (
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
                      {Object.keys(metric_wise_aggregated_findings).map(
                        (key, index) =>
                          Object.keys(
                            metric_wise_aggregated_findings[index]
                          ).map((key, item) => (
                            <Box
                              key={key}
                              id={key}
                              sx={{
                                cursor: "pointer",
                                bg:
                                  key === files?.issue_key
                                    ? "gray.200"
                                    : "gray.50",
                                p: 3,
                                my: 2,
                                color: "text",
                                fontSize: "sm",
                                borderRadius: 15,
                                transition: "0.2s background",
                                _hover: {
                                  bg:
                                    key === files?.issue_key
                                      ? "gray.200"
                                      : "gray.100",
                                },
                              }}
                              onClick={() =>
                                setFiles({
                                  issue_key: key,
                                  findings:
                                    metric_wise_aggregated_findings[index][key]
                                      .findings,
                                  description_details:
                                    metric_wise_aggregated_findings[index][key]
                                      .description_details,
                                  template_details: template_details,
                                })
                              }
                            >
                              <HStack justify={"space-between"}>
                                <Text w={"50%"} isTruncated color={"gray.700"}>
                                  {key}
                                </Text>
                                {metric_wise_aggregated_findings[index][key]
                                  .findings.length > 1 && <MultifileBadge />}
                              </HStack>
                            </Box>
                          ))
                      )}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            );
          }
        )}
    </Accordion>
  );
};

type FileDataContProps = { file: FileState };
const FileDataCont: React.FC<FileDataContProps> = ({ file }) => {
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

  const { data, isLoading } = useFileContent(scan_id, file_path, "project");

  console.log(data);
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

type MultiFileExplorerProps = { files: FilesState };
const MultiFileExplorer: React.FC<MultiFileExplorerProps> = ({ files }) => {
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
            <Tabs width={"100%"} variant="soft-rounded" colorScheme="messenger">
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
                  {files.findings.map((file) => (
                    <Tab mx={1} background={"white"}>
                      <Tooltip label={file.file_path} aria-label="A tooltip">
                        <Text width={100} isTruncated>
                          {file.file_path}
                        </Text>
                      </Tooltip>
                    </Tab>
                  ))}
                </TabList>
              </Flex>
              <TabPanels>
                {files.findings.map((file) => (
                  <TabPanel p={2}>
                    <FileDataCont
                      file={{
                        issue_id: files.issue_key,
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
            <IssueDetail issue_id={files.issue_key} />
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

const IssueDetail: React.FC<{ issue_id: string }> = ({ issue_id }) => {
  const { data, isLoading } = useIssueDetail(issue_id);
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
            <Text fontWeight={500} fontSize="md" pb={4}>
              {data.issue_details.issue_name}
            </Text>
            <DescriptionWrapper>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data.issue_details.issue_description,
                }}
              />
            </DescriptionWrapper>
            {/* <pre>{data.issue_details.issue_description}</pre> */}
          </TabPanel>
          <TabPanel sx={{ h: "20vh", w: "100%", overflowY: "scroll" }}>
            <DescriptionWrapper>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data.issue_details.issue_remediation,
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

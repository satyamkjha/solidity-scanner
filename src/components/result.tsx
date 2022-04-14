import React, { useState, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import { BiCodeCurly } from "react-icons/bi";
import { AiOutlineCaretRight, AiFillGithub } from "react-icons/ai";

import { CodeBlock, atomOneLight } from "react-code-blocks";

import VulnerabilityDistribution from "components/vulnDistribution";
import { SeverityIcon } from "components/icons";

import { useFileContent } from "hooks/useFileContent";
import { useIssueDetail } from "hooks/useIssueDetail";

import { ScanDetail, ScanSummary } from "common/types";
import { severityPriority } from "common/values";
import API from "helpers/api";
import { useMutation } from "react-query";

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
        alignItems="flex-start"
        spacing={5}
        px={4}
      >
        <Box
          sx={{
            w: "100%",
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

  let highlightArray : string[] = [];

  line_nos_start.map((number, index) => {
    if(number.toString().length === line_nos_end[index].toString().length){
      highlightArray.push(`${number}-${line_nos_end[index]}`)
    } else {
      highlightArray.push(`${number}-${Math.pow(10, number.toString.length) - 1}`)
      highlightArray.push(`${Math.pow(10, number.toString.length)}-${line_nos_end[index]}`)
    }
  }) 
  let highlightString = highlightArray.join(',')


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

  const { data, isLoading } = useFileContent(scan_id, file_path, type);
  return (
    <Box w="100%">
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
          <IssueDetail issue_id={issue_id} />
        </Box>
      </Box>
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
            h: "35vh",
          }}
        >
          <Spinner />
        </Flex>
      )}
      {data && (
        <TabPanels>
          <TabPanel sx={{ h: "35vh", w: "100%", overflowY: "scroll" }}>
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
          <TabPanel sx={{ h: "35vh", w: "100%", overflowY: "scroll" }}>
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

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Flex,
  VStack,
  Box,
  Text,
  Image,
  HStack,
  Tooltip,
  Divider,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { SeverityIcon } from "components/icons";
import { FilesState, Finding } from "common/types";
import React from "react";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import FileNameTab from "./FileNameTab";
import FileDataContainer from "./FileDataContainer";
import IssueDetail from "./IssueDetail";
import { useConfig } from "hooks/useConfig";
import { RxCross2 } from "react-icons/rx";

type MultipleFileExplorerProps = {
  files: FilesState;
  type: "project" | "block";
  handleTabsChange: (index: number) => void;
  tabIndex: number;
  openIssueBox: boolean;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  setOpenIssueBox: React.Dispatch<React.SetStateAction<boolean>>;
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  branchName?: string;
  contract_address?: string;
};
const MultipleFileExplorer: React.FC<MultipleFileExplorerProps> = ({
  files,
  type,
  handleTabsChange,
  tabIndex,
  openIssueBox,
  setOpenIssueBox,
  setFiles,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
}) => {
  const [currentFile, setCurrentFile] = useState<Finding>(files.findings[0]);
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  useEffect(() => {
    setCurrentFile(files.findings[0]);
  }, [files]);

  const [fullScreen, setFullScreen] = useState(false);

  const getFileIndex = () => {
    files.findings.forEach((elem, index) => {
      if (elem.file_path === currentFile.file_path) {
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
          w: "100%",
          h: ["650px", "650px", "650px", "565px"],
          mb: [3, 3, 3, 0],
        }}
      >
        {files.bug_status === "fixed" ? (
          <Flex
            sx={{
              w: "100%",
              justifyContent: "center",
              alignItems: "center",
              h: "100%",
              flexDir: "column",
            }}
          >
            <VStack mb={4}>
              <Image src={`${assetsURL}common/fixedIssueIcon.svg`} />
              <Text fontWeight={600}>This Issue has been fixed</Text>
            </VStack>
          </Flex>
        ) : (
          <>
            <Flex
              width={"100%"}
              overflowX="hidden"
              mb={"7px"}
              _hover={{
                overflowX: "scroll",
                mb: 0,
              }}
              flexDir={"row"}
              justifyContent="flex-start"
              align={"center"}
              background={"#FAFBFC"}
              borderRadius={10}
              p={0}
            >
              <Flex
                px={0}
                my={0}
                w="fit-content"
                h="fit-content"
                borderColor={"#C4C4C4"}
                borderBottomWidth={"1px"}
              >
                {files.findings.map((file) => (
                  <FileNameTab
                    file={file}
                    type={type}
                    currentFile={currentFile}
                    setCurrentFile={setCurrentFile}
                    project_url={project_url}
                    contract_url={contract_url}
                    contract_platform={contract_platform}
                    branchName={branchName}
                    contract_address={contract_address}
                  />
                ))}
              </Flex>
            </Flex>
            <Flex width={"100%"} height={"100%"} px={2} pt={2}>
              <FileDataContainer
                type={type}
                file={currentFile}
                wait_to_scroll={files.wait_to_scroll}
              />
            </Flex>
            {/* <TabPanels>
                {files.findings.map((file, index) => (
                  <TabPanel key={index}>
                    <FileDataContainer
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
              </TabPanels> */}

            {openIssueBox && (
              <Box
                sx={{
                  borderRadius: 15,
                  bg: "white",
                  px: 3,
                  w: "calc(100% - 20px)",
                  position: "absolute",
                  bottom: "15px",
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
                  alignItems="center"
                  py={1}
                >
                  <Flex
                    gridColumnGap={4}
                    gridRowGap={0}
                    flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
                    width={"80%"}
                  >
                    <HStack
                      my={[2, 2, 2, 0]}
                      width={["40%", "40%", "40%", "23%"]}
                    >
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
                    <Flex width={["40%", "40%", "40%", "23%"]}>
                      <Text
                        width="fit-content"
                        px={3}
                        py={1}
                        my={[2, 2, 2, 0]}
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
                    </Flex>
                    <Text
                      width={["40%", "40%", "40%", "23%"]}
                      my={[2, 2, 2, 0]}
                      fontSize="sm"
                      fontWeight={"bold"}
                    >
                      {files.findings[getFileIndex()].line_nos_start}-
                      {files.findings[getFileIndex()].line_nos_end}
                    </Text>
                    <HStack
                      width={["40%", "40%", "40%", "31%"]}
                      my={[2, 2, 2, 0]}
                    >
                      <Image
                        src={`${assetsURL}icons/${files.bug_status}_color.svg`}
                      />
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
                            <Icon
                              as={BsArrowsAngleContract}
                              strokeWidth={0.8}
                              color="#8A94A6"
                              fontSize={"15px"}
                            />
                          ) : (
                            <Icon
                              as={BsArrowsAngleExpand}
                              strokeWidth={0.8}
                              color="#8A94A6"
                              fontSize={"15px"}
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
                        icon={
                          <Icon
                            as={RxCross2}
                            color="#8A94A6"
                            fontSize={"2xl"}
                          />
                        }
                      />
                    </Tooltip>
                  </HStack>
                </HStack>
                <Divider mb={[3, 3, 3, 2]} />
                <Box fontSize="sm" w="100%">
                  <IssueDetail
                    type={type}
                    handleTabsChange={handleTabsChange}
                    tabIndex={tabIndex}
                    fullScreen={fullScreen}
                    current_file_name={currentFile.file_path}
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

export default MultipleFileExplorer;

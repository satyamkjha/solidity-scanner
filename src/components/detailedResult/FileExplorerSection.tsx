import {
  HStack,
  VStack,
  Text,
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  IconButton,
  Tooltip,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FilesState, Issues } from "../../common/types";
import { issueActions } from "../../common/values";
import MultipleFileExplorer from "./MultipleFileExplorer";
import {
  sentenceCapitalize,
  getAssetsURL,
  getProjectType,
} from "../../helpers/helperFunction";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiBulb, BiCodeCurly, BiComment } from "react-icons/bi";
import TrialWall from "./TrialWall";

import Select from "react-select";
import { HiOutlineDocumentText } from "react-icons/hi";
import ConfirmActionForm from "../modals/confirmActionForm";
import FormatOptionLabelWithImage from "../../components/FormatOptionLabelWithImage";
import { customStylesForTakeAction } from "../../common/stylesForCustomSelect";
import { FileIssue } from "components/icons";

export const FileExplorerSection: React.FC<{
  type: "block" | "project";
  is_latest_scan: boolean;
  files: FilesState | null;
  details_enabled: boolean;
  selectedIssues: Issues[];
  selectedBugs: string[];
  updateBugStatus: any;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  branchName?: string;
  contract_address?: string;
  isViewer: boolean;
}> = ({
  type,
  is_latest_scan,
  files,
  details_enabled,
  selectedIssues,
  selectedBugs,
  updateBugStatus,
  setFiles,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
  isViewer,
}) => {
  const assetsURL = getAssetsURL();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [bugStatus, setBugStatus] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [openIssueBox, setOpenIssueBox] = React.useState(true);
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    if (selectedBugs && selectedBugs.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedBugs]);

  const handleTabsChange = (index: number) => {
    setOpenIssueBox(true);
    setTabIndex(index);
  };

  const onActionConfirm = (comment?: string) => {
    bugStatus && updateBugStatus(bugStatus, comment);
  };

  const createGithubIssue = () => {
    onOpen();
    setBugStatus("create_github_issue");
  };

  const isFileIssueDisabled = () => {
    if (isViewer) return true;
    return isDisabled || (selectedIssues && selectedIssues.length > 1);
  };

  return (
    <VStack
      w={["100%", "100%", "100%", "60%"]}
      h={["100%"]}
      alignItems="flex-start"
      spacing={2}
      pl={[0, 0, 0, 10]}
    >
      {files && files.bug_status !== "fixed" && is_latest_scan && (
        <Stack
          justify="space-between"
          alignItems={"center"}
          width={"100%"}
          direction={["column", "column", "column", "row"]}
          mt={[4, 4, 4, 1]}
          mb={[0, 0, 0, 1]}
        >
          <HStack
            display={["none", "none", "none", "flex"]}
            width={"100%"}
            spacing={3}
          >
            <Select
              formatOptionLabel={FormatOptionLabelWithImage}
              options={issueActions}
              value={issueActions.find(
                (item) => files?.bug_status === item.value
              )}
              placeholder="Take Action"
              styles={customStylesForTakeAction}
              isDisabled={isDisabled || isViewer}
              onChange={(newValue: any) => {
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
            {project_url && project_url !== "File Scan" && (
              <Tooltip
                label={"Please select only one issue"}
                isDisabled={selectedIssues.length < 2}
                shouldWrapChildren
              >
                <Button
                  background={isFileIssueDisabled() ? "#FAFBFC" : "white"}
                  color={isFileIssueDisabled() ? "#8A94A6" : "#806CCF"}
                  border={isFileIssueDisabled() ? "none" : "1px solid #C1B1FF"}
                  isDisabled={isFileIssueDisabled()}
                  _hover={{
                    background: "#f7f5ff",
                  }}
                  onClick={createGithubIssue}
                >
                  <FileIssue active={!isFileIssueDisabled()} />
                  <Text fontSize={"sm"} ml={2}>
                    File Issue
                  </Text>
                </Button>
              </Tooltip>
            )}
          </HStack>
          <HStack>
            <Tooltip label="View Issue Description" fontSize="md">
              <IconButton
                fontSize={"lg"}
                background="#FAFBFC"
                aria-label="Issue Description"
                onClick={() => handleTabsChange(0)}
                icon={
                  <HiOutlineDocumentText
                    color={tabIndex === 0 ? "#3300FF" : "#8A94A6"}
                  />
                }
              />
            </Tooltip>
            <Tooltip label="View Issue Remediation" fontSize="md">
              <IconButton
                fontSize={"lg"}
                background="#FAFBFC"
                onClick={() => handleTabsChange(1)}
                aria-label="Issue Remediation"
                icon={<BiBulb color={tabIndex === 1 ? "#3300FF" : "#8A94A6"} />}
              />
            </Tooltip>
            <Tooltip label="View Issue Comments" fontSize="md">
              <IconButton
                fontSize={"lg"}
                background="#FAFBFC"
                onClick={() => handleTabsChange(2)}
                aria-label="Issue Comments"
                icon={
                  <BiComment color={tabIndex === 2 ? "#3300FF" : "#8A94A6"} />
                }
              />
            </Tooltip>
          </HStack>
        </Stack>
      )}
      {files &&
        ((files.bug_status !== "pending_fix" && !is_latest_scan) ||
          files.bug_status === "fixed") && (
          <HStack justify="flex-end" width={"100%"} mt={[4, 4, 4, 0]}>
            <HStack bg={"gray.100"} px={10} py={1} borderRadius={30}>
              <Text mr={2} color={"gray.600"} fontWeight={500}>
                The issue has been marked as
              </Text>
              <Image mr={3} src={`${assetsURL}icons/${files.bug_status}.svg`} />
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
          top: 5,
        }}
      >
        {!details_enabled &&
        files?.template_details.issue_severity !== "gas" ? (
          <TrialWall />
        ) : files ? (
          <MultipleFileExplorer
            handleTabsChange={handleTabsChange}
            tabIndex={tabIndex}
            openIssueBox={openIssueBox}
            setOpenIssueBox={setOpenIssueBox}
            files={files}
            type={type}
            setFiles={setFiles}
            project_url={project_url}
            contract_url={contract_url}
            contract_platform={contract_platform}
            branchName={branchName}
            contract_address={contract_address}
          />
        ) : (
          <Flex
            sx={{
              w: "100%",
              bg: "bg.subtle",
              justifyContent: "center",
              flexDir: "column",
              alignItems: "center",
              h: "625px",
              borderRadius: 15,
            }}
          >
            <Icon as={BiCodeCurly} fontSize="40px" color="subtle" mb={4} />
            <Text color="subtle">
              Please select a file from an issue to see vulnerability details.
            </Text>
          </Flex>
        )}
      </Box>
      {bugStatus && bugStatus === "wont_fix" ? (
        <ConfirmActionForm
          isOpen={isOpen}
          onClose={onClose}
          onActionConfirm={onActionConfirm}
          addComment={true}
          modalHeader={"Confirm Action"}
          modelText={
            <Text my={4} color="subtle" w={["100%"]}>
              You are about to confirm the{" "}
              <Text as={"span"} color="black" fontWeight={"bold"}>
                Won’t Fix
              </Text>{" "}
              action on{" "}
              <Text as={"span"} color="black" fontWeight={"bold"}>
                {selectedBugs.length}
              </Text>{" "}
              bug(s).{" "}
              <Text color="subtle" w={["100%"]}>
                Please add your comment below and click on confirm to continue.
              </Text>
            </Text>
          }
        />
      ) : (
        bugStatus === "create_github_issue" && (
          <ConfirmActionForm
            isOpen={isOpen}
            onClose={onClose}
            onActionConfirm={onActionConfirm}
            addComment={false}
            modalHeader={"Confirm Action"}
            modelText={
              <VStack>
                <Text my={4} w={["100%"]} fontSize={"lg"} fontWeight={600}>
                  {`Are you sure you want to update the Issue to ${
                    project_url ? getProjectType(project_url) : "Github"
                  }?`}
                </Text>
                <Text my={4} color="detail" fontWeight={400} w={["100%"]}>
                  You are about to create a{" "}
                  <Text as={"span"} color="black" fontWeight={"bold"}>
                    {`${
                      project_url ? getProjectType(project_url) : "Github"
                    } Issue`}
                  </Text>{" "}
                  for selected{" "}
                  <Text as={"span"} color="black" fontWeight={"bold"}>
                    {selectedBugs.length}
                  </Text>{" "}
                  bug(s). Please click on confirm to create an issue.
                </Text>
              </VStack>
            }
          />
        )
      )}
    </VStack>
  );
};

export default FileExplorerSection;

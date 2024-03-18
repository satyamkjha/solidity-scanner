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
  useToast,
} from "@chakra-ui/react";
import { FilesState, Issues } from "../../common/types";
import MultipleFileExplorer from "./MultipleFileExplorer";
import {
  sentenceCapitalize,
  getAssetsURL,
  getProjectType,
} from "../../helpers/helperFunction";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiBulb, BiCodeCurly, BiComment } from "react-icons/bi";
import TrialWall from "./TrialWall";

import { HiOutlineDocumentText } from "react-icons/hi";
import ConfirmActionForm from "../modals/confirmActionForm";
import { FileIssue } from "components/icons";
import { useUserRole } from "hooks/useUserRole";
import { RestartTrialScanView } from "./RestartTrialScanView";
import { TakeAction } from "./TakeAction";

export const FileExplorerSection: React.FC<{
  type: "block" | "project";
  is_latest_scan: boolean;
  files: FilesState | null;
  details_enabled: boolean;
  selectedIssues: Issues[];
  selectedBugs: string[];
  updateBugStatus: any;
  restrictedBugIds: string[];
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  project_name?: string;
  project_url?: string;
  contract_url?: string;
  contract_chain?: string;
  contract_platform?: string;
  branchName?: string;
  contract_address?: string;
  isViewer: boolean;
  is_trial_scan: boolean;
  setRestrictedBugIds: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({
  type,
  is_latest_scan,
  files,
  details_enabled,
  selectedIssues,
  selectedBugs,
  updateBugStatus,
  setFiles,
  is_trial_scan,
  restrictedBugIds,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
  isViewer,
  setRestrictedBugIds,
  project_name,
  contract_chain,
}) => {
  const assetsURL = getAssetsURL();
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [bugStatus, setBugStatus] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { profileData } = useUserRole();
  const [openIssueBox, setOpenIssueBox] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [markedAction, setMarkedAction] = useState({
    placeholder: "Take Action",
    disabled: "",
  });

  useEffect(() => {
    if (selectedBugs && selectedBugs.length) {
      if (selectedIssues.length === 1 && selectedIssues[0].bugs) {
        const statusList = selectedIssues[0].bugs.map((bug) => bug.bug_status);
        const uniqueStatusList = Array.from(new Set(statusList));
        if (
          uniqueStatusList.length === 1 &&
          uniqueStatusList[0] !== "pending_fix"
        ) {
          setMarkedAction({
            placeholder: uniqueStatusList[0],
            disabled: uniqueStatusList[0],
          });
        } else if (uniqueStatusList.length > 1) {
          setMarkedAction({
            placeholder: "Take Action",
            disabled: "",
          });
        } else {
          setMarkedAction({
            placeholder: "Take Action",
            disabled: "pending_fix",
          });
        }
      } else {
        setMarkedAction({
          placeholder: "Take Action",
          disabled: "",
        });
      }
      setIsDisabled(false);
    } else {
      setMarkedAction({
        placeholder: "Take Action",
        disabled: "pending_fix",
      });
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onBugSelect = (item: any) => {
    if (selectedBugs.some((bug) => restrictedBugIds.includes(bug))) {
      toast({
        description:
          "Bug Status update in progress for the selected bugs. Please try after some time.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (item.value === "wont_fix") {
        onOpen();
        setBugStatus(item.value);
      } else {
        updateBugStatus(item.value);
      }
    }
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
            <TakeAction
              markedAction={markedAction}
              isDisabled={isDisabled || isViewer}
              onBugSelect={onBugSelect}
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
        files?.template_details.issue_severity !== "gas" &&
        is_trial_scan ? (
          profileData?.current_package === "trial" ? (
            <TrialWall />
          ) : (
            <RestartTrialScanView
              type={type}
              project_url={project_url}
              project_name={project_name}
              contract_chain={contract_chain}
              contract_url={contract_url}
              contract_address={contract_address}
              contract_platform={contract_platform}
            />
          )
        ) : files ? (
          <MultipleFileExplorer
            handleTabsChange={handleTabsChange}
            tabIndex={tabIndex}
            openIssueBox={openIssueBox}
            setOpenIssueBox={setOpenIssueBox}
            files={files}
            type={type}
            restrictedBugIds={restrictedBugIds}
            setFiles={setFiles}
            project_url={project_url}
            contract_url={contract_url}
            contract_platform={contract_platform}
            branchName={branchName}
            setRestrictedBugIds={setRestrictedBugIds}
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

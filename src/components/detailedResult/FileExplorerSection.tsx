import {
  HStack,
  VStack,
  Text,
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  useMediaQuery,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FilesState } from "common/types";
import { issueActions } from "common/values";
import MultipleFileExplorer from "./MultipleFileExplorer";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiBulb, BiCodeCurly, BiComment } from "react-icons/bi";
import TrialWall from "./TrialWall";

import Select from "react-select";
import { HiOutlineDocumentText } from "react-icons/hi";
import CommentForm from "./CommentForm";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { customStylesForTakeAction } from "common/stylesForCustomSelect";

export const FileExplorerSection: React.FC<{
  type: "block" | "project";
  is_latest_scan: boolean;
  files: FilesState | null;
  details_enabled: boolean;
  selectedBugs: string[];
  updateBugStatus: any;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
}> = ({
  type,
  is_latest_scan,
  files,
  details_enabled,
  selectedBugs,
  updateBugStatus,
  setFiles,
}) => {
  const assetsURL = getAssetsURL();
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
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
          <HStack display={["none", "none", "none", "flex"]} width={"100%"}>
            <Text fontWeight={600} mr={5}>
              Take Action
            </Text>
            <Select
              formatOptionLabel={FormatOptionLabelWithImage}
              options={issueActions}
              value={issueActions.find(
                (item) => files?.bug_status === item.value
              )}
              placeholder="Select Action"
              styles={customStylesForTakeAction}
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
        {!details_enabled ? (
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
      {bugStatus && (
        <CommentForm
          isOpen={isOpen}
          onClose={onClose}
          updateBugStatus={updateBugStatus}
          status={bugStatus}
          selectedBugs={selectedBugs}
        />
      )}
    </VStack>
  );
};

export default FileExplorerSection;

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
import { sentenceCapitalize } from "helpers/helperFunction";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiBulb, BiCodeCurly, BiComment } from "react-icons/bi";
import { MultiFileExplorer } from "./result";
import TrialWall from "./trialWall";

import Select from "react-select";
import { HiOutlineDocumentText } from "react-icons/hi";
import ConfirmActionForm from "./confirmActionForm";

export const DetailedResult: React.FC<{
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

  const onActionConfirm = (comment: string) => {
    updateBugStatus(bugStatus, comment);
  };

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
      width: isDesktopView ? 270 : "100%",
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
      width: isDesktopView ? "auto" : "80%",
    }),
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
          <HStack display={["none", "none", "none", "flex"]}>
            <Text fontWeight={600} mr={5}>
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
          top: 5,
        }}
      >
        {!details_enabled ? (
          <TrialWall />
        ) : files ? (
          <MultiFileExplorer
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
    </VStack>
  );
};

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
  icon: string;
}> = ({ label, icon }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    {icon !== "" && <Image mr={3} src={`/icons/${icon}.svg`} />}
    <div>{label}</div>
  </div>
);

export default DetailedResult;

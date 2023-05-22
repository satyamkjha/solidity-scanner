import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  VStack,
  Box,
  Text,
  useToast,
  HStack,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import Select from "react-select";
import {
  FilesState,
  MultiFileScanDetail,
  MultiFileScanSummary,
  Profile,
} from "common/types";
import { issueActions } from "common/values";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import DetailFilter from "./DetailFilter";
import MultifileIssues from "./MultifileIssues";
import FileExplorerSection from "./FileExplorerSection";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import {
  customStylesForReactSelect,
  customStylesForTakeAction,
} from "common/stylesForCustomSelect";
import ConfirmActionForm from "../confirmActionForm"

const MultifileResult: React.FC<{
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

  const onActionConfirm = (comment: string) => {
    bugStatus && updateBugStatus(bugStatus, comment);
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
      <Flex w="100%" sx={{ flexDir: ["column", "column", "column", "row"] }}>
        <VStack
          w={["100%", "100%", "100%", "40%"]}
          h={["100%", "100%", "100%", "625px"]}
          spacing={4}
          mb={[8, 8, 0]}
          pr={[0, 0, 0, 4]}
          alignItems="flex-start"
          borderRight="1px solid #E2E8F0"
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
              top={filterExpanded ? "455px" : "50px"}
              background="white"
              zIndex={1}
              w={"100%"}
              py={2}
            >
              <Text fontWeight={600} ml={2} mr={5} whiteSpace="nowrap">
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
          )}
          <Box
            w="100%"
            h={["100%", "100%", "100%", "auto"]}
            overflowY="hidden"
            pr={"7px"}
            _hover={{
              overflowY: "scroll",
              pr: "0px",
            }}
          >
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
          <FileExplorerSection
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
      {bugStatus && (
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
      )}
    </>
  );
};

export default MultifileResult;

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
  Issues,
} from "common/types";
import { issueActions } from "common/values";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import DetailFilter from "./DetailFilter";
import MultifileIssues from "./MultifileIssues";
import FileExplorerSection from "./FileExplorerSection";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { customStylesForTakeAction } from "common/stylesForCustomSelect";
import ConfirmActionForm from "../confirmActionForm";
import { useUserRole } from "hooks/useUserRole";

const MultifileResult: React.FC<{
  type: "block" | "project";
  is_latest_scan: boolean;
  scanSummary: MultiFileScanSummary;
  scanDetails: MultiFileScanDetail[];
  profileData: Profile;
  details_enabled: boolean;
  contract_address?: string;
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  branchName?: string;
  refetch(): any;
}> = ({
  scanSummary,
  scanDetails,
  is_latest_scan,
  type,
  profileData,
  details_enabled,
  refetch,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
}) => {
  const [files, setFiles] = useState<FilesState | null>(null);
  const role: string = useUserRole();

  const sortIssuesBasedonPriority = (issueArray: MultiFileScanDetail[]) => {
    const issuePriority = {
      critical: 6,
      high: 5,
      medium: 4,
      low: 3,
      informational: 2,
      gas: 1,
    };

    issueArray.sort((a, b) => {
      // First, sort by priority in descending order
      if (
        issuePriority[a.template_details.issue_severity] >
        issuePriority[b.template_details.issue_severity]
      )
        return -1;
      if (
        issuePriority[a.template_details.issue_severity] <
        issuePriority[b.template_details.issue_severity]
      )
        return 1;

      // If priorities are equal, sort by the object's original order in the array
      return 0;
    });

    return issueArray;
  };

  const [issues, setIssues] = useState<MultiFileScanDetail[]>(
    sortIssuesBasedonPriority(scanDetails)
  );

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

  const [selectedIssues, setSelectedIssues] = useState<Issues[]>([]);
  const [selectedBugs, setSelectedBugs] = useState<string[]>([]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [bugStatus, setBugStatus] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [filterExpanded, setFilterExpanded] = useState<boolean>(false);

  const isViewer = role === "viewer";

  // const [action, setAction] = useState("");
  const toast = useToast();

  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const updateBugStatus = async (action: string, comment?: string) => {
    if (files) {
      if (action === "create_github_issue") {
        createGithubIssue();
      } else {
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
      }
      setSelectedBugs([]);
    }
    refetch();
  };

  const createGithubIssue = () => {
    console.log(selectedIssues);
  };

  const onActionConfirm = (comment: string) => {
    bugStatus && updateBugStatus(bugStatus, comment);
  };

  useEffect(() => {
    setIssues(scanDetails);
  }, [scanDetails]);

  useEffect(() => {
    const bugHashList: string[] = selectedIssues
      .flatMap((issue) => issue.bugs || [])
      .map((finding) => finding.bug_hash);
    setSelectedBugs(bugHashList);
  }, [selectedIssues]);

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
      const issue = selectedIssues.find((item) => item.issue_id === files.issue_id);
      if (issue) {
        setSelectedIssues((currentList) => {
          let newList = currentList.filter((item) => item.issue_id !== files.issue_id);
          issue.bugs.
            newList.push(issue);
          return newList;
        });
      }

    }
  }, [files]);

  useEffect(() => {
    if (!selectedBugs) setIssues(issues);
    const isViewer = role === "viewer";
    if (selectedBugs && selectedBugs.length && !isViewer) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                isDisabled={isDisabled || isViewer}
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
              setSelectedIssues={setSelectedIssues}
              confidence={confidence}
              vulnerability={vulnerability}
              updateBugStatus={updateBugStatus}
              bugStatusFilter={bugStatusFilter}
              project_url={project_url}
              contract_url={contract_url}
              contract_platform={contract_platform}
              branchName={branchName}
              isViewer={isViewer}
              contract_address={contract_address}
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
            project_url={project_url}
            contract_url={contract_url}
            contract_platform={contract_platform}
            branchName={branchName}
            contract_address={contract_address}
            profileData={profileData}
            isViewer={isViewer}
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

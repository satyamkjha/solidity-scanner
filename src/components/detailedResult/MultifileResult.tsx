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
  Button,
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
import ConfirmActionForm from "../modals/confirmActionForm";
import { useUserRole } from "hooks/useUserRole";
import {
  getProjectFileUrl,
  formatString,
  getProjectType,
} from "helpers/helperFunction";
import { FileIssue } from "components/icons";
import { DetailResultContext } from "common/contexts";
import { useWebSocket } from "hooks/useWebhookData";
import { useConfig } from "hooks/useConfig";

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
  const { role } = useUserRole();
  const config: any = useConfig();

  const sortIssuesBasedonPriority = (issueArray: MultiFileScanDetail[]) => {
    const issuePriority: {
      [key: string]: number;
    } = {
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

  const [openIssueIndex, setOpenIssueIndex] = useState<number[] | undefined>();
  const [selectedIssues, setSelectedIssues] = useState<Issues[]>([]);
  const [selectedBugs, setSelectedBugs] = useState<string[]>([]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [bugStatus, setBugStatus] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [filterExpanded, setFilterExpanded] = useState<boolean>(false);
  const [filterHeight, setFilterHeight] = useState<number>();

  const isViewer = role === "viewer";
  const toast = useToast();

  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const { sendMessage, messageQueue, updateMessageQueue, setKeepWSOpen } =
    useWebSocket();

  const [restrictedBugIds, setRestrictedBugIds] = useState<string[]>([]);

  useEffect(() => {
    if (
      messageQueue.length > 0 &&
      messageQueue.some((msgItem: any) =>
        ["scan_update"].includes(msgItem.type)
      )
    ) {
      let tempRestrictedBugIds = restrictedBugIds;
      messageQueue.map((msgItem: any) => {
        if (msgItem.type && msgItem.type === "scan_update") {
          tempRestrictedBugIds = tempRestrictedBugIds.filter(
            (bugId) => !msgItem.payload.scan_updates.bug_ids.includes(bugId)
          );
        } else return msgItem;
      });
      setRestrictedBugIds(tempRestrictedBugIds);
      let tempMessageQueue = messageQueue.filter(
        (item: any) => item.type !== "scan_update"
      );
      updateMessageQueue(tempMessageQueue);
    } else {
      if (messageQueue.length === 0 && restrictedBugIds.length === 0) {
        setKeepWSOpen(false);
      }
    }
  }, [messageQueue]);

  const updateBugStatus = async (action: string, comment?: string) => {
    if (files) {
      if (action === "create_github_issue") {
        createGithubIssue();
      } else {
        if (config && config.REACT_APP_FEATURE_GATE_CONFIG.websockets_enabled) {
          sendMessage({
            type: "scan_update",
            body: {
              bug_ids: selectedBugs,
              scan_id: scanId,
              project_id: projectId,
              bug_status: action,
              comment: comment,
              scan_type: type,
            },
          });
          toast({
            title: "Bug Status Updated",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setRestrictedBugIds([...restrictedBugIds, ...selectedBugs]);

          let tempIssues = issues.map((item) => {
            let tempArray = item.metric_wise_aggregated_findings;
            tempArray = tempArray.map((arrItem) => {
              if (selectedBugs.includes(arrItem.bug_hash)) {
                return {
                  ...arrItem,
                  bug_status: action,
                };
              } else return arrItem;
            });
            return {
              ...item,
              metric_wise_aggregated_findings: tempArray,
            };
          });
          setIssues(tempIssues);
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
          let tempIssues = issues.map((item) => {
            let tempArray = item.metric_wise_aggregated_findings;
            tempArray = tempArray.map((arrItem) => {
              if (selectedBugs.includes(arrItem.bug_hash)) {
                return {
                  ...arrItem,
                  bug_status: action,
                };
              } else return arrItem;
            });
            return {
              ...item,
              metric_wise_aggregated_findings: tempArray,
            };
          });
          setIssues(tempIssues);
        }
      }
      setSelectedBugs([]);
    }
  };

  const createGithubIssue = async () => {
    if (selectedIssues && selectedIssues.length === 1) {
      const payload = {
        issue_id: selectedIssues[0].issue_id,
        issue_title: selectedIssues[0].template_details.issue_name,
        repo_url: project_url,
        bugs: selectedIssues[0].bugs?.map((bug) => {
          return {
            id: bug.bug_id,
            description: selectedIssues[0].template_details.issue_description
              ? formatString(
                  selectedIssues[0].template_details.issue_description,
                  {
                    ...bug.description_details,
                  }
                )
              : "",
            remediation: selectedIssues[0].template_details.issue_remediation
              ? formatString(
                  selectedIssues[0].template_details.issue_remediation,
                  {
                    ...bug.description_details,
                  }
                )
              : "",
            code_snapshot:
              project_url && branchName
                ? bug.findings
                    .map((file) =>
                      getProjectFileUrl(project_url, branchName, file)
                    )
                    .join(", ")
                : "",
          };
        }),
      };
      const { data } = await API.post(API_PATH.API_CREATE_BUGS_ISSUE, payload);

      if (data && data.issue_id && project_url) {
        toast({
          title: `Issue created successfully on ${getProjectType(project_url)}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const onActionConfirm = (comment: string) => {
    bugStatus && updateBugStatus(bugStatus, comment);
  };

  useEffect(() => {
    if (profileData.current_package === "trial") {
      const gasIssuesIndex = scanDetails.findIndex(
        (issue) => issue.template_details.issue_severity === "gas"
      );
      if (scanDetails && scanDetails.length && gasIssuesIndex !== -1) {
        setOpenIssueIndex([gasIssuesIndex]);
        setFiles({
          bug_id:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .bug_id,
          issue_id: scanDetails[gasIssuesIndex].issue_id,
          bug_hash:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .bug_hash,
          bug_status:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .bug_status,
          findings:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .findings,
          description_details:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .description_details,
          template_details: scanDetails[gasIssuesIndex].template_details,
          comment:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .comment,
          issue_description:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .issue_description,
          issue_remediation:
            scanDetails[gasIssuesIndex].metric_wise_aggregated_findings[0]
              .issue_remediation,

          wait_to_scroll: 1000,
        });
      }
    } else if (
      scanDetails &&
      scanDetails.length &&
      scanDetails[0].metric_wise_aggregated_findings
    ) {
      setOpenIssueIndex([0]);
      setFiles({
        bug_id: scanDetails[0].metric_wise_aggregated_findings[0].bug_id,
        issue_id: scanDetails[0].issue_id,
        bug_hash: scanDetails[0].metric_wise_aggregated_findings[0].bug_hash,
        bug_status:
          scanDetails[0].metric_wise_aggregated_findings[0].bug_status,
        findings: scanDetails[0].metric_wise_aggregated_findings[0].findings,
        description_details:
          scanDetails[0].metric_wise_aggregated_findings[0].description_details,
        template_details: scanDetails[0].template_details,
        comment: scanDetails[0].metric_wise_aggregated_findings[0].comment,
        issue_description:
          scanDetails[0].metric_wise_aggregated_findings[0].issue_description,
        issue_remediation:
          scanDetails[0].metric_wise_aggregated_findings[0].issue_remediation,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (filterExpanded)
      setTimeout(() => {
        const height = document
          .getElementById("detailed_filter")
          ?.getBoundingClientRect().height;
        setFilterHeight(height);
      }, 300);
  }, [filterExpanded]);

  const isFileIssueDisabled = () => {
    if (isViewer) return true;
    return isDisabled || (selectedIssues && selectedIssues.length > 1);
  };

  return (
    <DetailResultContext.Provider
      value={{
        issues,
        scanSummary,
        setFiles,
        openIssueIndex,
        setOpenIssueIndex,
      }}
    >
      <Flex w="100%" sx={{ flexDir: ["column", "column", "column", "row"] }}>
        <VStack
          w={["100%", "100%", "100%", "40%"]}
          h={["100%", "100%", "100%", "625px"]}
          spacing={4}
          mb={[8, 8, 8, 0]}
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
              top={filterExpanded ? filterHeight : "50px"}
              background="white"
              zIndex={1}
              w={"100%"}
              py={2}
              p={2}
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
                  if (
                    selectedBugs.some((bug) => restrictedBugIds.includes(bug))
                  ) {
                    toast({
                      description:
                        "Bug Status update in progress for the selected bugs. Please try after some time.",
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  } else {
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
                <Button
                  background={isFileIssueDisabled() ? "#FAFBFC" : "white"}
                  color={isFileIssueDisabled() ? "#8A94A6" : "#806CCF"}
                  border={isFileIssueDisabled() ? "none" : "1px solid #C1B1FF"}
                  isDisabled={isFileIssueDisabled()}
                  p={2}
                  _hover={{
                    background: "#f7f5ff",
                  }}
                  onClick={() => {
                    onOpen();
                    setBugStatus("create_github_issue");
                  }}
                >
                  <FileIssue active={!isFileIssueDisabled()} />
                  <Text fontSize={"sm"} ml={2}>
                    File Issue
                  </Text>
                </Button>
              )}
            </HStack>
          )}
          <Box
            w="100%"
            h={["100%", "100%", "100%", "auto"]}
            overflowY="hidden"
            px={2}
            _hover={{
              overflowY: "auto",
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
              selectedIssues={selectedIssues}
              setSelectedIssues={setSelectedIssues}
              confidence={confidence}
              vulnerability={vulnerability}
              updateBugStatus={updateBugStatus}
              restrictedBugIds={restrictedBugIds}
              setRestrictedBugIds={setRestrictedBugIds}
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
            setRestrictedBugIds={setRestrictedBugIds}
            details_enabled={details_enabled}
            selectedIssues={selectedIssues}
            selectedBugs={selectedBugs}
            updateBugStatus={updateBugStatus}
            restrictedBugIds={restrictedBugIds}
            project_url={project_url}
            contract_url={contract_url}
            contract_platform={contract_platform}
            branchName={branchName}
            contract_address={contract_address}
            isViewer={isViewer}
          />
        )}
      </Flex>
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
    </DetailResultContext.Provider>
  );
};

export default MultifileResult;

import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
  Checkbox,
  Box,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import {
  FilesState,
  MetricWiseAggregatedFinding,
  MultiFileTemplateDetail,
  Issues,
} from "common/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FileExplorerSection } from "./FileExplorerSection";
import { MultifileIcon } from "../icons";
import InputCheckbox from "../styled-components/inputCheckbox";
import { getAssetsURL } from "helpers/helperFunction";
import { useUserRole } from "hooks/useUserRole";

const IssueBox: React.FC<{
  type: "block" | "project";
  bug_id: string;
  files: FilesState | null;
  issue_id: string;
  is_latest_scan: boolean;
  metric_wise_aggregated_finding: MetricWiseAggregatedFinding;
  template_details: MultiFileTemplateDetail;
  isSelected: boolean;
  selectedIssues: Issues[];
  selectedBugs: string[];
  updateBugHashList: any;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  updateBugStatus: any;
  restrictedBugIds: string[];
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  branchName?: string;
  contract_address?: string;
  isViewer: boolean;
}> = ({
  type,
  bug_id,
  files,
  issue_id,
  is_latest_scan,
  metric_wise_aggregated_finding,
  template_details,
  isSelected,
  selectedIssues,
  selectedBugs,
  updateBugHashList,
  setFiles,
  updateBugStatus,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
  restrictedBugIds,
  isViewer,
}) => {
  const assetsURL = getAssetsURL();
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const { role } = useUserRole();
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(isSelected);

  useEffect(() => {
    updateBugHashList(metric_wise_aggregated_finding.bug_hash, isChecked);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  return (
    <>
      {isDesktopView ? (
        <Box
          key={bug_id}
          id={bug_id}
          p={[0, 0, 3]}
          mb={0.5}
          sx={{
            cursor: "pointer",
            bg:
              bug_id === files?.bug_id
                ? "gray.300"
                : metric_wise_aggregated_finding.bug_status === "pending_fix"
                ? "gray.100"
                : "gray.50",
            color: "text",
            fontSize: "sm",
            transition: "0.2s background",
            _hover: {
              bg: "gray.200",
            },
          }}
          onClick={() => {
            setFiles({
              bug_id: bug_id,
              issue_id: issue_id,
              bug_hash: metric_wise_aggregated_finding.bug_hash,
              bug_status: metric_wise_aggregated_finding.bug_status,
              findings: metric_wise_aggregated_finding.findings,
              description_details:
                metric_wise_aggregated_finding.description_details,
              template_details: template_details,
              comment: metric_wise_aggregated_finding.comment,
              issue_description:
                metric_wise_aggregated_finding.issue_description,
              issue_remediation:
                metric_wise_aggregated_finding.issue_remediation,
            });
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HStack justify={"space-between"} ml={2}>
            <HStack w={"fit-content"} maxW={"50%"}>
              {(isHovered || isChecked) &&
                !isViewer &&
                metric_wise_aggregated_finding.bug_status !== "fixed" && (
                  <InputCheckbox
                    checked={isChecked}
                    checkedColor={"#8A94A6"}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                )}
              <Text
                isTruncated
                color={"gray.700"}
                fontSize={["sm", "sm", "md"]}
              >
                {bug_id}
              </Text>
            </HStack>
            <HStack>
              {metric_wise_aggregated_finding.findings.length > 1 && (
                <HStack
                  mr={
                    metric_wise_aggregated_finding.bug_status === "pending_fix"
                      ? 8
                      : 0
                  }
                  py={1}
                  px={3}
                  borderRadius={20}
                  backgroundColor={"white"}
                >
                  <MultifileIcon size={20} /> <Text>MULTIFILE</Text>
                </HStack>
              )}

              {metric_wise_aggregated_finding.bug_status !== "pending_fix" && (
                <HStack
                  alignItems={["flex-start", "flex-start", "center"]}
                  spacing={2}
                >
                  <Image
                    src={`${assetsURL}report/${metric_wise_aggregated_finding.bug_status}_color.svg`}
                  />
                  {metric_wise_aggregated_finding.findings.length === 1 && (
                    <Text
                      fontSize={"xs"}
                      fontWeight={"400"}
                      color={"black"}
                      fontStyle={"italic"}
                    >
                      {metric_wise_aggregated_finding.bug_status ===
                        "false_positive" && "False Positive"}
                      {metric_wise_aggregated_finding.bug_status ===
                        "wont_fix" && "Won't Fix"}
                      {metric_wise_aggregated_finding.bug_status === "fixed" &&
                        "Fixed"}
                    </Text>
                  )}
                </HStack>
              )}
            </HStack>
          </HStack>
        </Box>
      ) : (
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                bg={"#F8FAFC"}
                p={0}
                onClick={() => {
                  setFiles({
                    bug_id: bug_id,
                    issue_id: issue_id,
                    bug_hash: metric_wise_aggregated_finding.bug_hash,
                    bug_status: metric_wise_aggregated_finding.bug_status,
                    findings: metric_wise_aggregated_finding.findings,
                    description_details:
                      metric_wise_aggregated_finding.description_details,
                    template_details: template_details,
                    comment: metric_wise_aggregated_finding.comment,
                    issue_description:
                      metric_wise_aggregated_finding.issue_description,
                    issue_remediation:
                      metric_wise_aggregated_finding.issue_remediation,
                  });
                }}
              >
                <HStack justify={"space-between"} p={4} w="100%">
                  <HStack
                    w={"fit-content"}
                    maxW={
                      metric_wise_aggregated_finding.findings.length > 1
                        ? "50%"
                        : "80%"
                    }
                  >
                    {(isHovered || isChecked || !isDesktopView) &&
                      metric_wise_aggregated_finding.bug_status !== "fixed" && (
                        <Checkbox
                          name={bug_id}
                          colorScheme={"gray"}
                          borderColor={"gray.500"}
                          isChecked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                        ></Checkbox>
                      )}
                    <Text
                      isTruncated
                      color={"gray.700"}
                      fontSize={["sm", "sm", "md"]}
                    >
                      {bug_id}
                    </Text>
                  </HStack>
                  <HStack>
                    {metric_wise_aggregated_finding.findings.length > 1 && (
                      <HStack
                        mr={
                          metric_wise_aggregated_finding.bug_status ===
                          "pending_fix"
                            ? 8
                            : 0
                        }
                        py={1}
                        px={3}
                        borderRadius={20}
                        backgroundColor={"white"}
                      >
                        <MultifileIcon size={20} /> <Text>MULTIFILE</Text>
                      </HStack>
                    )}

                    {metric_wise_aggregated_finding.bug_status !==
                      "pending_fix" && (
                      <HStack
                        alignItems={["flex-start", "flex-start", "center"]}
                        spacing={2}
                      >
                        <Image
                          src={`${assetsURL}report/${metric_wise_aggregated_finding.bug_status}_color.svg`}
                        />
                        {metric_wise_aggregated_finding.findings.length ===
                          1 && (
                          <Text
                            fontSize={"xs"}
                            fontWeight={"200"}
                            fontStyle={"italic"}
                          >
                            {metric_wise_aggregated_finding.bug_status ===
                              "false_positive" && "False Positive"}
                            {metric_wise_aggregated_finding.bug_status ===
                              "wont_fix" && "Won't Fix"}
                            {metric_wise_aggregated_finding.bug_status ===
                              "fixed" && "Fixed"}
                          </Text>
                        )}
                      </HStack>
                    )}
                  </HStack>
                </HStack>
              </AccordionButton>
              <AccordionPanel p={0}>
                {isExpanded && (
                  <FileExplorerSection
                    isViewer={role === "viewer"}
                    type={type}
                    is_latest_scan={is_latest_scan}
                    files={files}
                    setFiles={setFiles}
                    details_enabled={true}
                    selectedIssues={selectedIssues}
                    selectedBugs={selectedBugs}
                    updateBugStatus={updateBugStatus}
                    restrictedBugIds={restrictedBugIds}
                    project_url={project_url}
                    contract_url={contract_url}
                    contract_platform={contract_platform}
                    branchName={branchName}
                    contract_address={contract_address}
                  />
                )}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      )}
    </>
  );
};

export default IssueBox;

import { CheckIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { getBugStatusNumber } from "common/functions";
import {
  FilesState,
  MetricWiseAggregatedFinding,
  MultiFileTemplateDetail,
} from "common/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { SeverityIcon } from "../icons";
import { TrialWallIssue } from "./TrialWall";
import IssueBox from "./IssueBox";

const IssueContainer: React.FC<{
  type: "block" | "project";
  issue_id: string;
  template_details: MultiFileTemplateDetail;
  no_of_findings: number;
  metric_wise_aggregated_findings: MetricWiseAggregatedFinding[];
  files: FilesState | null;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  selectedBugs: string[];
  setSelectedBugs: Dispatch<SetStateAction<string[]>>;
  details_enabled: boolean;
  is_latest_scan: boolean;
  bugStatusFilter: boolean[];
  updateBugStatus: any;
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  branchName?: string;
  contract_address?: string;
}> = ({
  type,
  issue_id,
  metric_wise_aggregated_findings,
  template_details,
  no_of_findings,
  files,
  is_latest_scan,
  setFiles,
  selectedBugs,
  setSelectedBugs,
  details_enabled,
  bugStatusFilter,
  updateBugStatus,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
}) => {
  let pendingFixes;
  let bugHashList: string[];
  if (details_enabled) {
    pendingFixes = metric_wise_aggregated_findings.filter((item) => {
      if (item.bug_status !== "fixed") return item;
    });
    bugHashList = pendingFixes && pendingFixes.map((item) => item.bug_hash);
  }

  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedChildren, setCheckedChildren] = useState<
    (string | undefined)[]
  >([]);

  useEffect(() => {
    if (isChecked) {
      const updatedSet = new Set([...selectedBugs, ...bugHashList]);
      setCheckedChildren([...bugHashList]);
      setSelectedBugs(Array.from(updatedSet));
    } else if (checkedChildren.length === 0) {
      const filterdList = selectedBugs.filter(
        (item) => !bugHashList.includes(item)
      );
      setSelectedBugs(filterdList);
    }
  }, [isChecked]);

  useEffect(() => {
    if (selectedBugs && selectedBugs.length === 0) {
      setCheckedChildren([]);
      setIsChecked(false);
    } else {
      selectedBugs.forEach((bug, index) => {
        if (bugHashList.includes(bug) && !checkedChildren.includes(bug))
          setCheckedChildren([...checkedChildren, bug]);
      });
    }
  }, [selectedBugs]);

  useEffect(() => {
    if (checkedChildren?.length === metric_wise_aggregated_findings?.length) {
      setIsChecked(true);
    }
  }, [checkedChildren]);

  const onIssueCheck = () => {
    setCheckedChildren([]);
    setIsChecked(!isChecked);
  };

  const updateBugHashList = (hash: string, isBugChecked: boolean) => {
    if (isBugChecked) {
      if (!checkedChildren.includes(hash))
        setCheckedChildren([...checkedChildren, hash]);
      if (!selectedBugs.includes(hash))
        setSelectedBugs([...selectedBugs, hash]);
    } else {
      setCheckedChildren(checkedChildren.filter((item) => item !== hash));
      setSelectedBugs(selectedBugs.filter((item) => item !== hash));
      setIsChecked(false);
    }
  };
  return (
    <AccordionItem id={issue_id} key={issue_id} w={"98%"}>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            pr={2}
            pl={2}
            _hover={{
              bg: "rgba(47, 248, 107, 0.07)",
            }}
            _expanded={{
              bg: "rgba(47, 248, 107, 0.1)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <HStack
              sx={{
                w: "100%",
                my: 2,
                alignItems: "center",
              }}
            >
              <HStack w="90%">
                {details_enabled &&
                pendingFixes.length > 0 &&
                (isHovered ||
                  isChecked ||
                  isExpanded ||
                  checkedChildren.length > 0) ? (
                  <Checkbox
                    name={issue_id}
                    colorScheme={"purple"}
                    borderColor={"gray.500"}
                    icon={
                      isChecked ? (
                        <CheckIcon w={3} h={3} />
                      ) : checkedChildren.length > 0 ? (
                        <MinusIcon />
                      ) : (
                        <></>
                      )
                    }
                    isChecked={checkedChildren.length > 0 ? true : isChecked}
                    onChange={() => onIssueCheck()}
                  ></Checkbox>
                ) : (
                  <></>
                )}
                <SeverityIcon variant={template_details.issue_severity} />
                <Text
                  sx={{
                    ml: 3,
                    maxW: [230, 230, 400, 275],
                    fontWeight: 600,
                    color: "#4E5D78",
                    fontSize: "sm",
                    textAlign: "left",
                  }}
                  isTruncated
                >
                  {template_details.issue_name}
                </Text>
              </HStack>
              <Text
                sx={{
                  ml: "auto",
                  fontSize: "sm",
                  fontWeight: 600,
                  color: "subtle",
                }}
              >
                {no_of_findings}
              </Text>
            </HStack>
            <Icon
              as={AiOutlineCaretRight}
              mr={[0, 0, 0, 2]}
              color="subtle"
              fontSize="14px"
              transition="transform 0.2s"
              transform={isExpanded ? "rotate(90deg)" : "rotate(0deg)"}
            />
          </AccordionButton>
          <AccordionPanel p={0} pb={4}>
            {!details_enabled ? (
              <TrialWallIssue
                severity={template_details.issue_severity}
                no_of_issue={no_of_findings}
              />
            ) : (
              <>
                {isExpanded && (
                  <Accordion allowMultiple={false} allowToggle>
                    {metric_wise_aggregated_findings.map(
                      (item, index) =>
                        bugStatusFilter[
                          getBugStatusNumber(item.bug_status)
                        ] && (
                          <IssueBox
                            key={item.bug_id + index}
                            type={type}
                            bug_id={item.bug_id}
                            files={files}
                            issue_id={issue_id}
                            metric_wise_aggregated_finding={item}
                            template_details={template_details}
                            is_latest_scan={is_latest_scan}
                            isSelected={
                              isChecked ||
                              checkedChildren.includes(item.bug_hash)
                            }
                            selectedBugs={selectedBugs}
                            setFiles={setFiles}
                            updateBugHashList={updateBugHashList}
                            updateBugStatus={updateBugStatus}
                            project_url={project_url}
                            contract_url={contract_url}
                            contract_platform={contract_platform}
                            branchName={branchName}
                            contract_address={contract_address}
                          />
                        )
                    )}
                  </Accordion>
                )}
              </>
            )}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default IssueContainer;

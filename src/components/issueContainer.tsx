import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import {
  FilesState,
  MetricWiseAggregatedFinding,
  MultiFileTemplateDetail,
} from "common/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { SeverityIcon } from "./icons";
import { IssueBox } from "./result";
import { TrialWallIssue } from "./trialWall";

export const IssueContainer: React.FC<{
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
  updateBugStatus: any;
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
  updateBugStatus,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let bugHashList = metric_wise_aggregated_findings.map(
      (item) => item.bug_hash
    );
    if (isChecked) {
      const updatedSet = new Set([...selectedBugs, ...bugHashList]);
      setSelectedBugs(Array.from(updatedSet));
    } else {
      const filterdList = selectedBugs.filter(
        (item) => !bugHashList.includes(item)
      );
      setSelectedBugs(filterdList);
    }
  }, [isChecked]);

  useEffect(() => {
    if (selectedBugs && selectedBugs.length === 0) {
      setIsChecked(false);
    }
  }, [selectedBugs]);

  const updateBugHashList = (hash: string, isBugChecked: boolean) => {
    if (isBugChecked) {
      if (!selectedBugs.includes(hash)) {
        setSelectedBugs([...selectedBugs, hash]);
      }
    } else {
      setSelectedBugs(selectedBugs.filter((item) => item !== hash));
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
                {isHovered || isChecked ? (
                  <Checkbox
                    name={issue_id}
                    colorScheme={"purple"}
                    borderColor={"gray.500"}
                    checked={isChecked}
                    isChecked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  ></Checkbox>
                ) : (
                  <></>
                )}
                <SeverityIcon variant={template_details.issue_severity} />
                <Text
                  sx={{
                    ml: 3,
                    maxW: [230, 230, 400, 250],
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
                    {metric_wise_aggregated_findings.map((item, index) => (
                      <IssueBox
                        key={item.bug_id + index}
                        type={type}
                        bug_id={item.bug_id}
                        files={files}
                        issue_id={issue_id}
                        metric_wise_aggregated_finding={item}
                        template_details={template_details}
                        is_latest_scan={is_latest_scan}
                        isSelected={isChecked}
                        selectedBugs={selectedBugs}
                        setFiles={setFiles}
                        updateBugHashList={updateBugHashList}
                        updateBugStatus={updateBugStatus}
                      />
                    ))}
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

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
  Box,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import { getBugStatusNumber } from "common/functions";
import {
  FilesState,
  MetricWiseAggregatedFinding,
  MultiFileTemplateDetail,
} from "common/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import DetailedResult from "./detailedResult";
import { MultifileIcon, SeverityIcon } from "./icons";
import { TrialWallIssue } from "./trialWall";
import InputCheckbox from "./styled-components/inputCheckbox";
import { getAssetsURL } from "helpers/helperFunction";

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
  bugStatusFilter: boolean[];
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
  bugStatusFilter,
  updateBugStatus,
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

const IssueBox: React.FC<{
  type: "block" | "project";
  bug_id: string;
  files: FilesState | null;
  issue_id: string;
  is_latest_scan: boolean;
  metric_wise_aggregated_finding: MetricWiseAggregatedFinding;
  template_details: MultiFileTemplateDetail;
  isSelected: boolean;
  selectedBugs: string[];
  updateBugHashList: any;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  updateBugStatus: any;
}> = ({
  type,
  bug_id,
  files,
  issue_id,
  is_latest_scan,
  metric_wise_aggregated_finding,
  template_details,
  isSelected,
  selectedBugs,
  updateBugHashList,
  setFiles,
  updateBugStatus,
}) => {
  const assetsURL = getAssetsURL();
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(isSelected);

  useEffect(() => {
    updateBugHashList(metric_wise_aggregated_finding.bug_hash, isChecked);
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
          p={[0, 0, 0, 3]}
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
            <HStack w="50%">
              {(isHovered || isChecked) &&
                metric_wise_aggregated_finding.bug_status !== "fixed" && (
                  <InputCheckbox
                    checked={isChecked}
                    onChange={(e) => setIsChecked(!isChecked)}
                  />
                )}
              <Text isTruncated color={"gray.700"}>
                {bug_id}
              </Text>
            </HStack>
            <HStack>
              {metric_wise_aggregated_finding.findings.length > 1 && (
                <HStack
                  mr={
                    metric_wise_aggregated_finding.bug_status == "pending_fix"
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
                <Image
                  src={`${assetsURL}icons/${metric_wise_aggregated_finding.bug_status}.svg`}
                />
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
                    w={
                      metric_wise_aggregated_finding.findings.length > 1
                        ? "50%"
                        : "80%"
                    }
                  >
                    {(isHovered || isChecked || !isDesktopView) &&
                      metric_wise_aggregated_finding.bug_status !== "fixed" && (
                        <Checkbox
                          name={bug_id}
                          colorScheme={"purple"}
                          borderColor={"gray.500"}
                          isChecked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                        ></Checkbox>
                      )}
                    <Text isTruncated color={"gray.700"}>
                      {bug_id}
                    </Text>
                  </HStack>
                  <HStack>
                    {metric_wise_aggregated_finding.findings.length > 1 && (
                      <HStack
                        mr={
                          metric_wise_aggregated_finding.bug_status ==
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
                      <Image
                        src={`${assetsURL}icons/${metric_wise_aggregated_finding.bug_status}.svg`}
                      />
                    )}
                  </HStack>
                </HStack>
              </AccordionButton>
              <AccordionPanel p={0}>
                {isExpanded && (
                  <DetailedResult
                    type={type}
                    is_latest_scan={is_latest_scan}
                    files={files}
                    setFiles={setFiles}
                    details_enabled={true}
                    selectedBugs={selectedBugs}
                    updateBugStatus={updateBugStatus}
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

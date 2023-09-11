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
  Issues,
} from "common/types";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { SeverityIcon } from "../icons";
import { TrialWallIssue } from "./TrialWall";
import IssueBox from "./IssueBox";
import InputCheckbox from "components/styled-components/inputCheckbox";
import { DetailResultContext } from "common/contexts";

const IssueContainer: React.FC<{
  type: "block" | "project";
  index: number;
  issue_id: string;
  template_details: MultiFileTemplateDetail;
  no_of_findings: number;
  metric_wise_aggregated_findings: MetricWiseAggregatedFinding[];
  files: FilesState | null;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  selectedIssues: Issues[];
  selectedBugs: string[];
  setSelectedIssues: Dispatch<SetStateAction<Issues[]>>;
  details_enabled: boolean;
  is_latest_scan: boolean;
  bugStatusFilter: boolean[];
  updateBugStatus: any;
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  branchName?: string;
  contract_address?: string;
  isViewer: boolean;
  scrollIntoView: boolean;
}> = ({
  type,
  index,
  issue_id,
  metric_wise_aggregated_findings,
  template_details,
  no_of_findings,
  files,
  is_latest_scan,
  setFiles,
  selectedIssues,
  selectedBugs,
  setSelectedIssues,
  details_enabled,
  bugStatusFilter,
  updateBugStatus,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
  isViewer,
  scrollIntoView,
}) => {
  let pendingFixes;
  let bugHashList: string[] = [];
  if (details_enabled || template_details.issue_severity === "gas") {
    pendingFixes = metric_wise_aggregated_findings.filter(
      (item) => item.bug_status !== "fixed"
    );
    bugHashList = pendingFixes && pendingFixes.map((item) => item.bug_hash);
  }

  const scrollToElementRef = useRef<HTMLDivElement>(null);

  const { openIssueIndex, setOpenIssueIndex } = useContext(DetailResultContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedChildren, setCheckedChildren] = useState<
    (string | undefined)[]
  >([]);

  useEffect(() => {
    if (
      files &&
      scrollIntoView &&
      scrollToElementRef &&
      scrollToElementRef.current
    ) {
      console.log(issue_id);
      scrollToElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    if (isChecked) {
      const updatedSet = new Set([...selectedBugs, ...bugHashList]);
      setCheckedChildren([...bugHashList]);
      setSelectedIssueList(Array.from(updatedSet));
    } else if (checkedChildren.length === 0) {
      const filterdList = selectedBugs.filter(
        (item) => !bugHashList.includes(item)
      );
      setSelectedIssueList(filterdList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBugs]);

  useEffect(() => {
    if (checkedChildren?.length === metric_wise_aggregated_findings?.length) {
      setIsChecked(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setSelectedIssueList([...selectedBugs, hash]);
    } else {
      setCheckedChildren(checkedChildren.filter((item) => item !== hash));
      setSelectedIssueList(selectedBugs.filter((item) => item !== hash));
      setIsChecked(false);
    }
  };

  const setSelectedIssueList = (bugList: string[]) => {
    setSelectedIssues((currentList) => {
      let newList = currentList.filter((item) => item.issue_id !== issue_id);
      const bugs =
        metric_wise_aggregated_findings &&
        metric_wise_aggregated_findings.filter((item) =>
          bugList.includes(item.bug_hash)
        );
      if (bugList.length && bugs.length) {
        const issue = {
          issue_id,
          template_details,
          bugs,
        };
        newList.push(issue);
      }
      return newList;
    });
  };

  const onIssueClick = () => {
    if (!details_enabled && template_details.issue_severity !== "gas") {
      setFiles(null);
    }
  };

  return (
    <AccordionItem
      id={issue_id}
      key={issue_id}
      w={"98%"}
      ref={scrollToElementRef}
      sx={{
        scrollMarginTop: openIssueIndex === undefined ? "-40vh" : 0,
      }}
    >
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
            onClick={onIssueClick}
          >
            <HStack
              sx={{
                w: "100%",
                my: 2,
                alignItems: "center",
              }}
            >
              <HStack w="90%">
                {(details_enabled ||
                  template_details.issue_severity === "gas") &&
                pendingFixes.length > 0 &&
                (isHovered ||
                  isChecked ||
                  isExpanded ||
                  checkedChildren.length > 0) &&
                !isViewer ? (
                  <InputCheckbox
                    name={issue_id}
                    checked={checkedChildren.length > 0 ? true : isChecked}
                    checkedColor={"#8A94A6"}
                    checkedIcon={
                      isChecked
                        ? CheckIcon
                        : checkedChildren.length > 0
                        ? MinusIcon
                        : null
                    }
                    onChange={() => onIssueCheck()}
                  />
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
            {!details_enabled && template_details.issue_severity !== "gas" ? (
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
                            selectedIssues={selectedIssues}
                            selectedBugs={selectedBugs}
                            setFiles={setFiles}
                            updateBugHashList={updateBugHashList}
                            updateBugStatus={updateBugStatus}
                            project_url={project_url}
                            contract_url={contract_url}
                            contract_platform={contract_platform}
                            branchName={branchName}
                            contract_address={contract_address}
                            isViewer={isViewer}
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

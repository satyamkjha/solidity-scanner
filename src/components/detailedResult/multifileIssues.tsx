import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Flex,
  VStack,
  Box,
  Text,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  useToast,
  Image,
  HStack,
  Tooltip,
  useMediaQuery,
  Divider,
  IconButton,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { BiCodeCurly } from "react-icons/bi";
import { AiOutlineCaretRight } from "react-icons/ai";
import { CodeBlock, atomOneLight } from "react-code-blocks";

import VulnerabilityDistribution from "components/vulnDistribution";
import { SeverityIcon } from "components/icons";
import { AiOutlineCopy } from "react-icons/ai";

import { useFileContent } from "hooks/useFileContent";
import { useIssueDetail } from "hooks/useIssueDetail";
import Select from "react-select";
import {
  FilesState,
  MetricWiseAggregatedFinding,
  MultiFileScanDetail,
  MultiFileScanSummary,
  Profile,
  ScanDetail,
  ScanSummary,
} from "common/types";
import { issueActions, severityPriority } from "common/values";
import API from "helpers/api";
import { useMutation } from "react-query";
import { ArrowUpIcon, CloseIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import React from "react";
import { TrialWall } from "./trialWall";
import DetailedResult from "./detailedResult";
import { DetailFilter } from "./detailFilter";
import { IssueContainer } from "./issueContainer";
import { sentenceCapitalize } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import CommentForm from "./commentForm";
import { getBugStatusNumber } from "common/functions";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";

type MultifileIssuesProps = {
  type: "block" | "project";
  issues: MultiFileScanDetail[];
  files: FilesState | null;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  selectedBugs: string[];
  setSelectedBugs: Dispatch<SetStateAction<string[]>>;
  confidence: boolean[];
  vulnerability: boolean[];
  bugStatusFilter: boolean[];
  profileData: Profile;
  details_enabled: boolean;
  is_latest_scan: boolean;
  updateBugStatus: any;
};

const MultifileIssues: React.FC<MultifileIssuesProps> = ({
  type,
  issues,
  files,
  is_latest_scan,
  setFiles,
  selectedBugs,
  setSelectedBugs,
  confidence,
  vulnerability,
  bugStatusFilter,
  details_enabled,
  updateBugStatus,
}) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  let issue_count: number;

  const getVulnerabilityNumber = (issue_severity: string) => {
    switch (issue_severity) {
      case "critical":
        return 0;
      case "high":
        return 1;
      case "medium":
        return 2;
      case "low":
        return 3;
      case "informational":
        return 4;
      case "gas":
        return 5;
      default:
        return 0;
    }
  };

  const checkBugStatusFilter = (
    metric_wise_aggregated_findings: MetricWiseAggregatedFinding[]
  ) => {
    if (details_enabled) {
      const conditionMet = metric_wise_aggregated_findings.filter(
        (bug) => bugStatusFilter[getBugStatusNumber(bug.bug_status)]
      );
      if (conditionMet && conditionMet.length) {
        issue_count = conditionMet.length;
        return true;
      } else return false;
    } else {
      return true;
    }
  };

  return (
    <Accordion allowMultiple={isDesktopView} allowToggle>
      {Array.from(issues)
        .sort((issue1, issue2) =>
          severityPriority[issue1.template_details.issue_severity] >
          severityPriority[issue2.template_details.issue_severity]
            ? -1
            : 1
        )
        .map(
          (
            {
              issue_id,
              metric_wise_aggregated_findings,
              template_details,
              no_of_findings,
            },
            index
          ) => {
            return (
              <>
                {confidence[parseInt(template_details.issue_confidence)] &&
                vulnerability[
                  getVulnerabilityNumber(template_details.issue_severity)
                ] &&
                checkBugStatusFilter(metric_wise_aggregated_findings) ? (
                  <IssueContainer
                    key={issue_id + index}
                    type={type}
                    files={files}
                    issue_id={issue_id}
                    metric_wise_aggregated_findings={
                      metric_wise_aggregated_findings
                    }
                    template_details={template_details}
                    no_of_findings={issue_count ? issue_count : no_of_findings}
                    is_latest_scan={is_latest_scan}
                    details_enabled={details_enabled}
                    setFiles={setFiles}
                    selectedBugs={selectedBugs}
                    setSelectedBugs={setSelectedBugs}
                    bugStatusFilter={bugStatusFilter}
                    updateBugStatus={updateBugStatus}
                  />
                ) : (
                  <></>
                )}
              </>
            );
          }
        )}
    </Accordion>
  );
};

export default MultifileIssues;

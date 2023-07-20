import { Dispatch, SetStateAction } from "react";
import { Accordion, useMediaQuery } from "@chakra-ui/react";
import {
  FilesState,
  MetricWiseAggregatedFinding,
  MultiFileScanDetail,
  Profile,
} from "common/types";
import { severityPriority } from "common/values";
import React from "react";
import IssueContainer from "./IssueContainer";
import { getBugStatusNumber } from "common/functions";

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
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  branchName?: string;
  contract_address?: string;
  isViewer: boolean;
};

const MultifileIssues: React.FC<MultifileIssuesProps> = ({
  type,
  issues,
  files,
  is_latest_scan,
  setFiles,
  selectedBugs,
  setSelectedBugs,
  isViewer,
  confidence,
  vulnerability,
  bugStatusFilter,
  details_enabled,
  updateBugStatus,
  project_url,
  contract_url,
  contract_platform,
  branchName,
  contract_address,
}) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
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
                    project_url={project_url}
                    contract_url={contract_url}
                    contract_platform={contract_platform}
                    branchName={branchName}
                    contract_address={contract_address}
                    isViewer={isViewer}
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

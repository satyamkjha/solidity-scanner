import { Container, Flex } from "@chakra-ui/react";
import { Report } from "common/types";
import React, { lazy, Suspense } from "react";
import CoverPageContainer from "components/report/CoverPageContainer";
import TableContentContainer from "components/report/TableContentContainer";
import Loader from "components/styled-components/Loader";

const ProjectSummaryContainer = lazy(
  () => import("components/report/ProjectSummaryContainer")
);

const AuditSummaryContainer = lazy(
  () => import("components/report/AuditSummaryContainer")
);

const FindingSummaryContainer = lazy(
  () => import("components/report/FindingSummaryContainer")
);

const VulnerabililtyDetailsContainer = lazy(
  () => import("components/report/VulnerabililtyDetailsContainer")
);

const ScanHistoryContainer = lazy(
  () => import("components/report/ScanHistoryContainer")
);

const DisclaimerContainer = lazy(
  () => import("components/report/DisclaimerContainer")
);

export const ReportContainer: React.FC<{
  summary_report: Report;
  isPublicReport: boolean;
}> = ({ summary_report, isPublicReport }) => {
  let d = new Date();

  if (summary_report) {
    d = new Date(
      summary_report.project_summary_report.last_project_report_update_time
    );
  }

  return (
    <Container
      maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
      color="black"
      overflow={"hidden"}
    >
      <CoverPageContainer
        d={d}
        summary_report={summary_report}
        isPublicReport={isPublicReport}
      />
      <TableContentContainer summary_report={summary_report} />
      <Suspense fallback={<SpinnerContainer />}>
        <ProjectSummaryContainer summary_report={summary_report} />
        <AuditSummaryContainer summary_report={summary_report} />
        <FindingSummaryContainer summary_report={summary_report} />
        <VulnerabililtyDetailsContainer summary_report={summary_report} />
        <ScanHistoryContainer summary_report={summary_report} />
        <DisclaimerContainer />
      </Suspense>
    </Container>
  );
};

export function SpinnerContainer() {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Loader />
    </Flex>
  );
}

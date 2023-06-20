import { Container } from "@chakra-ui/react";
import { Report } from "common/types";
import React from "react";
import styled from "@emotion/styled";
import CoverPageContainer from "components/pdf/CoverPageContainer";
import TableContentContainer from "components/pdf/TableContentContainer";
import ProjectSummaryContainer from "components/pdf/ProjectSummaryContainer";
import AuditSummaryContainer from "components/pdf/AuditSummaryContainer";
import FindingSummaryContainer from "components/pdf/FindingSummaryContainer";
import VulnerabililtyDetailsContainer from "components/pdf/VulnerabililtyDetailsContainer";
import ScanHistoryContainer from "components/pdf/ScanHistoryContainer";
import DisclaimerContainer from "components/pdf/DisclaimerContainer";

export const PrintContainer: React.FC<{ summary_report: Report }> = ({
  summary_report,
}) => {
  let d = new Date();

  if (summary_report) {
    d = new Date(
      summary_report.project_summary_report.last_project_report_update_time
    );
  }

  return (
    <>
      <Container
        sx={{
          "@page": {
            margin: "30px",
            border: "1px solid #D9D9D9;",
            "@bottom-left": {
              display: "none",
            },
          },
        }}
        maxW={"900px"}
        color="black"
        overflow={"hidden"}
      >
        {/* Cover Section */}
        <CoverPageContainer
          d={d}
          summary_report={summary_report}
          isPublicReport={true}
        />

        {/* Table of Contents */}
        <TableContentContainer summary_report={summary_report} />

        {/* Project Summary */}
        <ProjectSummaryContainer summary_report={summary_report} />

        {/* Audit Summary */}
        <AuditSummaryContainer summary_report={summary_report} />

        {/* Findings Summary */}
        <FindingSummaryContainer summary_report={summary_report} />

        {/* Vulnerability Details */}
        <VulnerabililtyDetailsContainer summary_report={summary_report} />

        {/* Scan History */}
        <ScanHistoryContainer summary_report={summary_report} />

        {/* Disclaimer */}
        <DisclaimerContainer />
      </Container>
    </>
  );
};

const DescriptionWrapper = styled.div`
  p {
    font-weight: 300;
  }
  code {
    background: #cbd5e0;
    padding: 2px 4px;
    border-radius: 5px;
  }
  a {
    color: #4299e1;
    text-decoration: underline;
    transition: 0.2s color;
    &:hover {
      color: #2b6cb0;
    }
  }
`;

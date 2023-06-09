import {
  Container,
  Flex,
  Heading,
  Box,
  HStack,
  Divider,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Image,
  useMediaQuery,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { Report } from "common/types";
import {
  Logo,
  SeverityIcon,
  GithubIcon,
  ProjectIcon,
  IssueDescriptionIcons,
  IssueRemediationIcons,
  ReportCoverDots,
} from "components/icons";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import React from "react";
import styled from "@emotion/styled";
import { useConfig } from "hooks/useConfig";
import { actionTaken } from "common/values";
import DynamicContainer from "components/report/DynamicContainer";
import NonDynamicContainer from "components/report/NonDynamicContainer";
import CoverPageContainer from "components/report/CoverPageContainer";
import TableContentContainer from "components/report/TableContentContainer";
import ProjectSummaryContainer from "components/report/ProjectSummaryContainer";
import AuditSummaryContainer from "components/report/AuditSummaryContainer";
import FindingSummaryContainer from "components/report/FindingSummaryContainer";
import VulnerabililtyDetailsContainer from "components/report/VulnerabililtyDetailsContainer";
import ScanHistoryContainer from "components/report/ScanHistoryContainer";
import DisclaimerContainer from "components/report/DisclaimerContainer";

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

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

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
      <ProjectSummaryContainer summary_report={summary_report} />
      <AuditSummaryContainer summary_report={summary_report} />
      <FindingSummaryContainer summary_report={summary_report} />
      <VulnerabililtyDetailsContainer summary_report={summary_report} />
      <ScanHistoryContainer summary_report={summary_report} />
      <DisclaimerContainer />
    </Container>
  );
};

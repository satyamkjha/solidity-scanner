import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
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
import { TrialWall } from "components/trialWall";
import DetailedResult from "./detailedResult";
import { DetailFilter } from "./detailFilter";
import { IssueContainer } from "./issueContainer";
import { sentenceCapitalize } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import CommentForm from "./commentForm";
import { getBugStatusNumber } from "common/functions";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";

const MultifileResult: React.FC<{
  type: "block" | "project";
  is_latest_scan: boolean;
  scanSummary: MultiFileScanSummary;
  scanDetails: MultiFileScanDetail[];
  profileData: Profile;
  details_enabled: boolean;
  refetch(): any;
}> = ({
  scanSummary,
  scanDetails,
  is_latest_scan,
  type,
  profileData,
  details_enabled,
  refetch,
}) => {
  // const [files, setFiles] = useState<FilesState | null>(null);
  // const [issues, setIssues] = useState<MultiFileScanDetail[]>(scanDetails);
  // const { projectId, scanId } = useParams<{
  //   projectId: string;
  //   scanId: string;
  // }>();
  // const {
  //   issue_severity_distribution: {
  //     critical,
  //     high,
  //     medium,
  //     low,
  //     informational,
  //     gas,
  //   },
  // } = scanSummary;
  // const [bugStatusFilter, setBugStatusFilter] = useState([
  //   true,
  //   true,
  //   true,
  //   true,
  // ]);
  // const [confidence, setConfidence] = useState([true, true, true]);
  // const [vulnerability, setVulnerability] = useState([
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  // ]);
  // const [selectedBugs, setSelectedBugs] = useState<string[]>([]);
  // const { isOpen, onClose, onOpen } = useDisclosure();
  // const [bugStatus, setBugStatus] = useState<string | null>(null);
  // const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // const [filterExpanded, setFilterExpanded] = useState<boolean>(false);
  // // const [action, setAction] = useState("");
  // const toast = useToast();
  // const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  // const updateBugStatus = async (action: string, comment?: string) => {
  //   if (files) {
  //     const { data } = await API.post(API_PATH.API_UPDATE_BUG_STATUS, {
  //       bug_ids: selectedBugs,
  //       scan_id: scanId,
  //       project_id: projectId,
  //       bug_status: action,
  //       comment: comment,
  //       scan_type: type,
  //     });
  //     if (data.status === "success") {
  //       toast({
  //         title: "Bug Status Updated",
  //         description: data.message,
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     }
  //     setFiles({
  //       ...files,
  //       bug_status: action,
  //       comment: comment,
  //     });
  //     setSelectedBugs([]);
  //   }
  //   refetch();
  // };
  // useEffect(() => {
  //   setIssues(scanDetails);
  // }, [scanDetails]);
  // useEffect(() => {
  //   if (files) {
  //     setIssues((prevState) => {
  //       const newState = prevState.map((obj) => {
  //         if (obj.issue_id === files.issue_id) {
  //           const newList = obj.metric_wise_aggregated_findings.map((item) => {
  //             if (
  //               files.bug_id === item.bug_id &&
  //               files.bug_status === "wont_fix"
  //             ) {
  //               return { ...item, comment: files.comment };
  //             }
  //             return item;
  //           });
  //           return { ...obj, metric_wise_aggregated_findings: newList };
  //         }
  //         // 👇️ otherwise return object as is
  //         return obj;
  //       });
  //       return newState;
  //     });
  //   }
  // }, [files]);
  // useEffect(() => {
  //   if (!selectedBugs) setIssues(issues);
  //   if (selectedBugs && selectedBugs.length) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [selectedBugs]);

  return <></>;
};

export default MultifileResult;

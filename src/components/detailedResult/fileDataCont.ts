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

type FileDataContProps = { file: FileState; type: "project" | "block" };

const FileDataContainer: React.FC<FileDataContProps> = ({ file, type }) => {
  const { scanId: scan_id } = useParams<{ scanId: string }>();
  const { file_path, line_nos_end, line_nos_start } = file;
  const { data, isLoading } = useFileContent(scan_id, file_path, type);

  const [fileContent, setFileContent] = useState<string[] | undefined>();

  useEffect(() => {
    if (data) {
      let dataArray = data.file_contents.split("\n");
      setFileContent([...dataArray]);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Flex
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
            h: "100%",
          }}
        >
          <Spinner />
        </Flex>
      ) : (
        fileContent && (
          <CodeExplorer
            file_content={fileContent}
            line_nos_start={line_nos_start}
            line_nos_end={line_nos_end}
          />
        )
      )}
    </>
  );
};

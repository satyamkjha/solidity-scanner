import {
  Flex,
  Image,
  Text,
  HStack,
  VStack,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Report, IssueItem } from "common/types";
import React from "react";

import { SeverityIcon } from "components/icons";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";

const FindingBugListContainer: React.FC<{
  showActionTaken: boolean;
  summary_report: Report;
  issues: IssueItem[];
  isQSReport: boolean;
  download: boolean;
}> = ({ showActionTaken, issues, summary_report, isQSReport, download }) => {
  const assetsURL = getAssetsURL();

  let severityIconSize =
    useBreakpointValue({
      base: 5,
      sm: 6,
      md: 10,
    }) || 10;

  return (
    <Flex w="100%" py={8} direction="column">
      {showActionTaken ? (
        <Flex
          as="div"
          w="100%"
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          px={0}
        >
          <Text
            fontSize={download ? "lg" : ["sm", "md", "lg"]}
            fontWeight={"bold"}
            mb={download ? 6 : [2, 3, 6]}
            width={"100%"}
            textAlign={["center"]}
          >
            ACTION TAKEN
          </Text>
          <Stack
            w="100%"
            mb={download ? 8 : [3, 4, 8]}
            spacing={download ? 4 : [1, 2, 4]}
            direction={["row"]}
          >
            <ActionBox
              count={summary_report.scan_summary[0].fixed_count}
              name={"Fixed"}
              download={download}
              icon={"fixed_color"}
            />
            <ActionBox
              count={summary_report.scan_summary[0].false_positive_count}
              name={"False Positive"}
              download={download}
              icon={"false_positive_color"}
            />
            <ActionBox
              count={summary_report.scan_summary[0].wont_fix_count}
              name={"Won't Fix"}
              download={download}
              icon={"wont_fix_color"}
            />
            <ActionBox
              count={summary_report.scan_summary[0].pending_fix_count}
              name={"Pending Fix"}
              download={download}
              icon={"pending_fix_color"}
            />
          </Stack>
        </Flex>
      ) : null}
      <Flex
        as="div"
        w={"100%"}
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"row"}
        textAlign={["left", "left"]}
        py={3}
        px={2}
        backgroundColor={"#F5F5F5"}
        className={"ss-report-right-nav"}
        content={"Finding Summary"}
      >
        <Text
          fontSize={download ? "8px" : ["6px", "7px", "8px"]}
          fontWeight={600}
          color={"gray.600"}
          width={"13%"}
          ml={1}
        >
          Bug ID
        </Text>
        <Text
          fontSize={download ? "8px" : ["6px", "7px", "8px"]}
          fontWeight={600}
          color={"gray.600"}
          width={"14%"}
        >
          Severity
        </Text>
        <Text
          fontSize={download ? "8px" : ["6px", "7px", "8px"]}
          fontWeight={600}
          color={"gray.600"}
          width={"38%"}
        >
          Bug Type
        </Text>
        <Text
          fontSize={download ? "8px" : ["6px", "7px", "8px"]}
          fontWeight={600}
          color={"gray.600"}
          width={"13%"}
        >
          Detection Method
        </Text>
        {!isQSReport && (
          <Text
            fontSize={download ? "8px" : ["6px", "7px", "8px"]}
            fontWeight={600}
            color={"gray.600"}
            width={"10%"}
          >
            Line No
          </Text>
        )}
        <Text
          fontSize={download ? "8px" : ["6px", "7px", "8px"]}
          fontWeight={600}
          color={"gray.600"}
          width={"13%"}
        >
          Status
        </Text>
      </Flex>
      {issues.map((issue) => (
        <Flex
          as="section"
          w={"100%"}
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          textAlign={["left", "left"]}
          py={download ? 4 : ["5px", 2, 4]}
          pl={2}
          pr={1}
          borderBottomWidth={1}
          borderBottomColor={"#E4E4E4"}
        >
          <Text
            fontSize={download ? "10px" : ["5px", "6px", "10px"]}
            fontWeight={"500"}
            color={"subtle"}
            width={"13%"}
          >
            {issue.bug_id}
          </Text>
          <Flex
            as="div"
            w={"14%"}
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
          >
            <SeverityIcon
              size={download ? 10 : severityIconSize}
              variant={issue.severity}
            />
            <Text
              fontSize={download ? "10px" : ["5px", "6px", "10px"]}
              fontWeight={"500"}
              color={"subtle"}
              ml={download ? 2 : [1, 1, 2]}
              width={"100%"}
            >
              {sentenceCapitalize(issue.severity)}
            </Text>
          </Flex>
          <Text
            fontSize={download ? "10px" : ["5px", "6px", "10px"]}
            fontWeight={"500"}
            color={"subtle"}
            width={"38%"}
          >
            {issue.issue_name}
          </Text>
          <Text
            fontSize={download ? "10px" : ["5px", "6px", "10px"]}
            fontWeight={"500"}
            color={"subtle"}
            width={"13%"}
          >
            {issue.audit_type
              ? sentenceCapitalize(issue.audit_type)
              : "Automated"}
          </Text>
          {issue.findings && (
            <Text
              fontSize={download ? "10px" : ["5px", "6px", "10px"]}
              fontWeight={"500"}
              color={"subtle"}
              width={"10%"}
            >
              L{issue.findings[0].line_nos_start} - L
              {issue.findings[0].line_nos_end}
            </Text>
          )}

          <HStack width={"13%"} spacing={1.5}>
            <Image
              src={`${assetsURL}report/${issue.bug_status}_color.svg`}
              w={download ? "15px" : ["7px", "9px", "15px"]}
            />
            <Text
              fontSize={download ? "10px" : ["4px", "6px", "10px"]}
              fontWeight={"500"}
              color={"black"}
              fontStyle={"italic"}
            >
              {issue.bug_status === "false_positive" && "False Positive"}
              {issue.bug_status === "wont_fix" && "Won't Fix"}
              {issue.bug_status === "pending_fix" && "Pending Fix"}
              {issue.bug_status === "fixed" && "Fixed"}
            </Text>
          </HStack>
        </Flex>
      ))}
    </Flex>
  );
};

const ActionBox: React.FC<{
  count: number;
  icon: string;
  name: string;
  download: boolean;
}> = ({ count, icon, name, download }) => {
  const assetsURL = getAssetsURL();
  return (
    <VStack
      align={["center"]}
      textAlign={["center"]}
      width={["40%"]}
      border={["1px solid #E6E6E6"]}
      py={download ? 4 : [1, 2, 4]}
      px={download ? 6 : [1, 2, 6]}
      spacing={1}
      borderRadius={3}
    >
      <Text
        fontSize={download ? "xl" : ["md", "md", "xl"]}
        fontWeight={"bold"}
        color={"#323B4B"}
        width={"100%"}
      >
        {count}
      </Text>
      <HStack alignItems={["center"]}>
        <Image
          height={download ? 5 : [2, 3, 5]}
          width={download ? 5 : [2, 3, 5]}
          src={`${assetsURL}report/${icon}.svg`}
        />
        <Text
          fontSize={download ? "xs" : ["7px", "8px", "xs"]}
          fontWeight={"600"}
          width={"100%"}
          fontStyle={"italic"}
        >
          {name}
        </Text>
      </HStack>
    </VStack>
  );
};

export default FindingBugListContainer;

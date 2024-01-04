import { Flex, Image, Text, HStack, VStack, Stack } from "@chakra-ui/react";
import { Report, IssueItem } from "common/types";
import React from "react";

import { SeverityIcon } from "components/icons";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";

const FindingBugListContainer: React.FC<{
  showActionTaken: boolean;
  summary_report: Report;
  issues: IssueItem[];
}> = ({ showActionTaken, issues, summary_report }) => {
  const assetsURL = getAssetsURL();
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
            fontSize="lg"
            fontWeight={"bold"}
            mb={6}
            width={"100%"}
            textAlign={["center"]}
          >
            ACTION TAKEN
          </Text>
          <Stack w="100%" mb={[8]} spacing={4} direction={["row"]}>
            <ActionBox
              count={summary_report.scan_summary[0].fixed_count}
              name={"Fixed"}
              icon={"fixed_color"}
            />
            <ActionBox
              count={summary_report.scan_summary[0].false_positive_count}
              name={"False Positive"}
              icon={"false_positive_color"}
            />
            <ActionBox
              count={summary_report.scan_summary[0].wont_fix_count}
              name={"Won't Fix"}
              icon={"wont_fix_color"}
            />
            <ActionBox
              count={summary_report.scan_summary[0].pending_fix_count}
              name={"Pending Fix"}
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
          fontSize="8px"
          fontWeight={600}
          color={"gray.600"}
          width={"13%"}
          ml={1}
        >
          Bug ID
        </Text>
        <Text fontSize="8px" fontWeight={600} color={"gray.600"} width={"14%"}>
          Severity
        </Text>
        <Text fontSize="8px" fontWeight={600} color={"gray.600"} width={"38%"}>
          Bug Type
        </Text>
        <Text fontSize="8px" fontWeight={600} color={"gray.600"} width={"13%"}>
          Detection Method
        </Text>
        <Text fontSize="8px" fontWeight={600} color={"gray.600"} width={"10%"}>
          Line No
        </Text>
        <Text fontSize="8px" fontWeight={600} color={"gray.600"} width={"12%"}>
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
          py={4}
          pl={2}
          pr={1}
          borderBottomWidth={1}
          borderBottomColor={"#E4E4E4"}
        >
          <Text
            fontSize="10px"
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
            <SeverityIcon variant={issue.severity} />
            <Text
              fontSize="10px"
              fontWeight={"500"}
              color={"subtle"}
              ml={2}
              width={"100%"}
            >
              {sentenceCapitalize(issue.severity)}
            </Text>
          </Flex>
          <Text
            fontSize="10px"
            fontWeight={"500"}
            color={"subtle"}
            width={"38%"}
          >
            {issue.issue_name}
            {/* BYTES CONSTANT MORE EFFICIENT THAN STRING LITERAL */}
          </Text>
          <Text
            fontSize="10px"
            fontWeight={"500"}
            color={"subtle"}
            width={"13%"}
          >
            Automated
          </Text>
          <Text
            fontSize="10px"
            fontWeight={"500"}
            color={"subtle"}
            width={"10%"}
          >
            L{issue.findings[0].line_nos_start} - L
            {issue.findings[0].line_nos_end}
          </Text>
          <HStack width={"12%"} spacing={1.5}>
            <Image
              src={`${assetsURL}report/${issue.bug_status}_color.svg`}
              w={"15px"}
            />
            <Text
              fontSize="10px"
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

const ActionBox: React.FC<{ count: number; icon: string; name: string }> = ({
  count,
  icon,
  name,
}) => {
  const assetsURL = getAssetsURL();
  return (
    <VStack
      align={["center"]}
      textAlign={["center"]}
      width={["40%"]}
      border={["1px solid #E6E6E6"]}
      py={4}
      px={6}
      spacing={1}
      borderRadius={3}
    >
      <Text fontSize="xl" fontWeight={"bold"} color={"#323B4B"} width={"100%"}>
        {count}
      </Text>
      <HStack alignItems={["center"]}>
        <Image height={5} width={5} src={`${assetsURL}report/${icon}.svg`} />
        <Text
          fontSize="xs"
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

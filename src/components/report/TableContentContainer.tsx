import { Divider, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { IssueDetailObject } from "common/types";
import { SeverityIcon } from "components/icons";

import React from "react";
const TableContentContainer: React.FC<{
  issues: { [key: string]: IssueDetailObject };
  maxLength: number;
}> = ({ issues, maxLength }) => {
  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        alignItems="center"
      >
        <Heading color={"#52FF00"} fontSize={["xl", "2xl", "4xl"]}>
          Table of
        </Heading>
        <Text fontSize={["xl", "2xl", "4xl"]} fontWeight={400}>
          {" "}
          &nbsp;Contents.{" "}
        </Text>
      </Flex>

      <Flex w={"100%"}>
        <a href={"#project-summary"}>
          <Text
            fontSize={["xs", "sm", "md"]}
            fontWeight={600}
            mt={[8, 12, 16]}
            mb={[2, 3, 4]}
          >
            01 &nbsp;Vulnerability Classification and Severity
          </Text>
        </a>
      </Flex>

      <Flex w={"100%"}>
        <a href={"#executive-summary"}>
          <Text
            fontSize={["xs", "sm", "md"]}
            fontWeight={600}
            mt={[2, 3, 4]}
            mb={[2, 3, 4]}
          >
            02 &nbsp;Executive Summary
          </Text>
        </a>
      </Flex>

      <Flex w={"100%"}>
        <a href={"#finding-summary"}>
          <Text
            fontSize={["xs", "sm", "md"]}
            fontWeight={600}
            mt={[2, 3, 4]}
            mb={[2, 3, 4]}
          >
            03 &nbsp;Findings Summary
          </Text>
        </a>
      </Flex>

      <Flex w={"100%"}>
        <a href={"#vulnerability-detail"}>
          <Text
            fontSize={["xs", "sm", "md"]}
            fontWeight={600}
            mt={[2, 3, 4]}
            mb={[2, 3, 4]}
          >
            04 &nbsp;Vulnerability Details
          </Text>
        </a>
      </Flex>
      {Object.keys(issues)
        .slice(0, maxLength)
        .map((key, index) => (
          <IssueComponent key={index} issue={issues[key]} />
        ))}
      {Object.keys(issues).length === maxLength ? (
        <>
          <Flex w={"100%"}>
            <a href={"#scan-history"}>
              <Text
                fontSize={["xs", "sm", "md"]}
                fontWeight={600}
                mt={[2, 3, 4]}
                mb={[2, 3, 4]}
              >
                05 &nbsp;Scan History
              </Text>
            </a>
          </Flex>

          <Flex w={"100%"}>
            <a href={"#disclaimer"}>
              <Text
                fontSize={["xs", "sm", "md"]}
                fontWeight={600}
                mt={[2, 3, 4]}
                mb={[2, 3, 4]}
              >
                06 &nbsp;Disclaimer
              </Text>
            </a>
          </Flex>
        </>
      ) : null}
    </Flex>
  );
};

export const IssueComponent: React.FC<{
  issue: any;
}> = ({ issue }) => {
  return (
    <VStack w={"100%"} alignItems={"flex-start"} pl={[3, 4, 5]} mb={2}>
      <HStack spacing={[2, 3, 5]} w={"100%"}>
        <Flex alignItems={"center"} w={"80%"}>
          <SeverityIcon size={4} variant={"black"} />
          <Text
            fontSize={["8px", "10px", "xs"]}
            fontWeight={"300"}
            lineHeight="1.5"
            ml={2}
          >
            {issue.issue_name}
          </Text>
        </Flex>
      </HStack>
      <Divider />
    </VStack>
  );
};

export default TableContentContainer;

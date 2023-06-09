import { Divider, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Report } from "common/types";
import { SeverityIcon } from "components/icons";

import React from "react";

const TableContentContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  return (
    <>
      <h6></h6>
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        pb={10}
        alignItems="center"
      >
        <Heading color={"#52FF00"} fontSize="4xl">
          Table of
        </Heading>
        <Text fontSize="4xl" fontWeight={400}>
          {" "}
          &nbsp;Contents.{" "}
        </Text>
      </Flex>
      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        sx={{
          pageBreakAfter: "always",
        }}
        py={[4, 4, 4, 20]}
        px={[6, 6, 6, 10]}
      >
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Project Summary
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Audit Summary
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Findings Summary
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Vulnerability Details
        </Text>
        {Object.keys(summary_report.issues).map((key, index) => (
          <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
          >
            <HStack ml={5} my={1} spacing={5}>
              <SeverityIcon variant={"black"} />
              <Text fontSize={["md"]} fontWeight={"300"} lineHeight="1.5">
                {summary_report.issues[key].issue_name}
              </Text>
            </HStack>
            {index !== Object.keys(summary_report.issues).length - 1 && (
              <Divider />
            )}
          </Flex>
        ))}
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Scan History
        </Text>
        <Text fontSize="xl" fontWeight={"bold"} mt={4} mb={4}>
          Disclaimer
        </Text>
      </Flex>
    </>
  );
};

export default TableContentContainer;

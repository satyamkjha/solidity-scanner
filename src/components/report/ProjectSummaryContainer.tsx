import { Flex, Heading, Text } from "@chakra-ui/react";
import { Report } from "common/types";

import React from "react";

const ProjectSummaryContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      py={20}
      px={[2, 2, 2, 0]}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        my={10}
        alignItems="center"
      >
        <Heading color={"#52FF00"} fontSize="4xl">
          Project
        </Heading>
        <Text fontSize="4xl" fontWeight={400}>
          {" "}
          &nbsp;Summary{" "}
        </Text>
      </Flex>
      <Text fontSize="lg" fontWeight={"300"} mt={[6, 6, 6, 12]} mb={4}>
        This report has been prepared for{" "}
        {summary_report.project_summary_report.project_name} using SolidityScan
        to scan and discover vulnerabilities and safe coding practices in their
        smart contract including the libraries used by the contract that are not
        officially recognized. The SolidityScan tool runs a comprehensive static
        analysis on the Solidity code and finds vulnerabilities ranging from
        minor gas optimizations to major vulnerabilities leading to the loss of
        funds. The coverage scope pays attention to all the informational and
        critical vulnerabilities with over (100+) modules. The scanning and
        auditing process covers the following areas:{" "}
      </Text>

      <Text fontSize="lg" fontWeight={"300"} mt={4} mb={4}>
        Various common and uncommon attack vectors will be investigated to
        ensure that the smart contracts are secure from malicious actors. The
        scanner modules find and flag issues related to Gas optimizations that
        help in reducing the overall Gas cost It scans and evaluates the
        codebase against industry best practices and standards to ensure
        compliance It makes sure that the officially recognized libraries used
        in the code are secure and up to date
      </Text>
      <Text fontSize="lg" fontWeight={"300"} mt={4} mb={4}>
        The SolidityScan Team recommends running regular audit scans to identify
        any vulnerabilities that are introduced after{" "}
        {summary_report.project_summary_report.project_name} introduces new
        features or refactors the code.
      </Text>
    </Flex>
  );
};

export default ProjectSummaryContainer;

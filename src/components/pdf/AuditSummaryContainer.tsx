import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Report } from "common/types";

import React from "react";

const AuditSummaryContainer: React.FC<{
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
        py={5}
        alignItems="center"
      >
        <Heading color={"#52FF00"} fontSize="4xl">
          Audit
        </Heading>
        <Text fontSize="4xl" fontWeight={400}>
          {" "}
          &nbsp;Summary{" "}
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
        border={"1px solid #D9D9D9;"}
        py={[4, 4, 4, 20]}
      >
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          p={0}
        >
          <Flex
            as="div"
            w={["100%", "100%", "100%", "25%"]}
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            px={5}
            py={3}
            // backgroundColor={"#FBFBFB"}
          >
            {summary_report.project_summary_report.project_name && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                >
                  Project Name
                </Text>
                {/* {!isDesktopView && ( */}
                <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                  {summary_report.project_summary_report.project_name}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_name && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Name
                </Text>
                {/* {!isDesktopView && ( */}
                <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                  {summary_report.project_summary_report.contract_name}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            <Text
              fontSize="lg"
              fontWeight={"bold"}
              color={"gray.600"}
              my={[1, 1, 1, 4]}
              mt={[4, 4, 4, 4]}
            >
              Contract Type
            </Text>
            {/* {!isDesktopView && ( */}
            <Text fontSize="lg" fontWeight={"normal"} mb={4}>
              {"Smart Contract"}
            </Text>
            {/* )} */}
            <Divider />
            {summary_report.project_summary_report.contract_address && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Address
                </Text>
                {/* {!isDesktopView && ( */}
                <Text
                  fontSize="lg"
                  fontWeight={"normal"}
                  mb={4}
                  wordBreak="break-word"
                >
                  {summary_report.project_summary_report.contract_address}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_platform && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Platform
                </Text>
                {/* {!isDesktopView && ( */}
                <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                  {summary_report.project_summary_report.contract_platform}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_chain && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract Chain
                </Text>
                {/* {!isDesktopView && ( */}
                <Text
                  fontSize="lg"
                  fontWeight={"normal"}
                  mb={4}
                  wordBreak="break-word"
                >
                  {summary_report.project_summary_report.contract_chain}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.contract_url && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contract URL
                </Text>
                {/* {!isDesktopView && ( */}
                <Text
                  fontSize="lg"
                  fontWeight={"normal"}
                  mb={4}
                  wordBreak="break-word"
                >
                  {summary_report.project_summary_report.contract_url}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            <Text
              fontSize="lg"
              fontWeight={"bold"}
              color={"gray.600"}
              my={[1, 1, 1, 4]}
              mt={[4, 4, 4, 4]}
            >
              Language
            </Text>
            {/* {!isDesktopView && ( */}
            <Text fontSize="lg" fontWeight={"normal"} mb={4}>
              {"Solidity"}
            </Text>
            {/* )} */}
            <Divider />
            {summary_report.project_summary_report.project_url && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Codebase
                </Text>
                {/* {!isDesktopView && ( */}
                <Text
                  fontSize="lg"
                  fontWeight={"normal"}
                  mb={4}
                  wordBreak="break-word"
                >
                  {summary_report.project_summary_report.project_url}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.git_commit_hash && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Commit Hash
                </Text>
                {/* {!isDesktopView && ( */}
                <Text
                  fontSize="lg"
                  fontWeight={"normal"}
                  mb={4}
                  wordBreak="break-word"
                >
                  {summary_report.project_summary_report.git_commit_hash}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.website && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Website
                </Text>
                {/* {!isDesktopView && ( */}
                <>
                  {" "}
                  <Text
                    fontSize="lg"
                    fontWeight={"normal"}
                    mb={4}
                    wordBreak="break-word"
                  >
                    {summary_report.project_summary_report.website}
                  </Text>
                  <Divider />
                </>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.date_published && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Date Published
                </Text>
                {/* {!isDesktopView && ( */}
                <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                  {summary_report.project_summary_report.date_published}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.organization && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Organization
                </Text>
                {/* {!isDesktopView && ( */}
                <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                  {summary_report.project_summary_report.organization}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.report_owner && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Publishers/Owners Name
                </Text>
                {/* {!isDesktopView && ( */}
                <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                  {summary_report.project_summary_report.report_owner}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            {summary_report.project_summary_report.email && (
              <>
                <Text
                  fontSize="lg"
                  fontWeight={"bold"}
                  color={"gray.600"}
                  my={[1, 1, 1, 4]}
                  mt={[4, 4, 4, 4]}
                >
                  Contact Email
                </Text>
                {/* {!isDesktopView && ( */}
                <Text fontSize="lg" fontWeight={"normal"} mb={4}>
                  {summary_report.project_summary_report.email}
                </Text>
                {/* )} */}
                <Divider />
              </>
            )}
            <Text
              fontSize="lg"
              fontWeight={"bold"}
              color={"gray.600"}
              my={[1, 1, 1, 4]}
              mt={[4, 4, 4, 4]}
            >
              Audit Methodology
            </Text>
            {/* {!isDesktopView && ( */}
            <Text fontSize="lg" fontWeight={"normal"} mb={4}>
              {"Static Scanning"}
            </Text>
            {/* )} */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AuditSummaryContainer;

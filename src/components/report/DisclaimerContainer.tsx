import { Flex, Heading, Text } from "@chakra-ui/react";

import React from "react";

const DisclaimerContainer: React.FC<{ download: boolean }> = () => {
  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      id={"disclaimer"}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        mb={10}
        alignItems="center"
      >
        <Text fontSize={["28px"]} fontWeight={400}>
          6.
        </Text>
        <Heading color={"#52FF00"} fontSize="4xl" ml={4}>
          Disclaimer
        </Heading>
      </Flex>

      <Text fontSize="sm" fontWeight={400} color={"detail"} mt={8} mb={4}>
        The Reports neither endorse nor condemn any specific project or team,
        nor do they guarantee the security of any specific project. The contents
        of this report do not, and should not be interpreted as having any
        bearing on, the economics of tokens, token sales, or any other goods,
        services, or assets.
      </Text>

      <Text fontSize="sm" fontWeight={400} color={"detail"} my={4}>
        The security audit is not meant to replace functional testing done
        before a software release.
      </Text>
      <Text fontSize="sm" fontWeight={400} color={"detail"} my={4}>
        There is no warranty that all possible security issues of a particular
        smart contract(s) will be found by the tool, i.e., It is not guaranteed
        that there will not be any further findings based solely on the results
        of this evaluation.
      </Text>
      <Text fontSize="sm" fontWeight={400} color={"detail"} my={4}>
        Emerging technologies such as Smart Contracts and Solidity carry a high
        level of technical risk and uncertainty. There is no warranty or
        representation made by this report to any Third Party in regards to the
        quality of code, the business model or the proprietors of any such
        business model, or the legal compliance of any business.
      </Text>
      <Text fontSize="sm" fontWeight={400} color={"detail"} mt={8} mb={4}>
        In no way should a third party use these reports to make any decisions
        about buying or selling a token, product, service, or any other asset.
        It should be noted that this report is not investment advice, is not
        intended to be relied on as investment advice, and has no endorsement of
        this project or team. It does not serve as a guarantee as to the
        project's absolute security.
      </Text>
      <Text fontSize="sm" fontWeight={400} color={"detail"} my={4}>
        The assessment provided by SolidityScan is subject to dependencies and
        under continuing development. You agree that your access and/or use,
        including but not limited to any services, reports, and materials, will
        be at your sole risk on an as-is, where-is, and as-available basis.
        SolidityScan owes no duty to any third party by virtue of publishing
        these Reports.
      </Text>
      <Text fontSize="sm" fontWeight={400} color={"detail"} my={4}>
        As one audit-based assessment cannot be considered comprehensive, we
        always recommend proceeding with several independent manual audits
        including manual audit and a public bug bounty program to ensure the
        security of the smart contracts.
      </Text>
    </Flex>
  );
};

export default DisclaimerContainer;

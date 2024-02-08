import { Flex, Heading, Text, Grid, VStack, Image } from "@chakra-ui/react";
import { Report } from "common/types";

import React from "react";
import { SeverityIcon } from "components/icons";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";

const ProjectSummaryContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  const assetsURL = getAssetsURL();
  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      id={"project-summary"}
      px={4}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        mb={10}
        alignItems="center"
        className={"ss-report-h1"}
        content={"Vulnerability Classification and Severity"}
      >
        <Text fontSize="28px" fontWeight={400}>
          1.
        </Text>
        <Heading color={"#52FF00"} fontSize="28px" ml={4}>
          Vulnerability
        </Heading>
        <Text fontSize="28px" fontWeight={400}>
          {" "}
          &nbsp;Classification and Severity{" "}
        </Text>
      </Flex>
      <Text
        className={"ss-report-right-nav"}
        content={"Description"}
        fontSize="lg"
        fontWeight={"600"}
        mt={[6, 6, 6, 12]}
      >
        Description
      </Text>
      <Text fontSize="xs" fontWeight={400} color={"#4E5D78"} my={4}>
        To enhance navigability, the document is organized in descending order
        of severity for easy reference. Issues are categorized as &nbsp;
        <Text display="inline-block">
          <Image
            src={`${assetsURL}report/fixed_color.svg`}
            w={"14px"}
            alt="F"
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={"xs"}
          fontWeight={"500"}
          color={"black"}
          fontStyle={"italic"}
        >
          Fixed
        </Text>
        ,&nbsp;&nbsp;{" "}
        <Text display="inline-block">
          <Image
            src={`${assetsURL}report/pending_fix_color.svg`}
            w={"14px"}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={"xs"}
          fontWeight={"500"}
          color={"black"}
          fontStyle={"italic"}
        >
          Pending Fix
        </Text>
        ,&nbsp;&nbsp; or &nbsp; &nbsp;
        <Text display="inline-block">
          <Image
            src={`${assetsURL}report/wont_fix_color.svg`}
            w={"14px"}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={"xs"}
          fontWeight={"500"}
          color={"black"}
          fontStyle={"italic"}
        >
          Won't Fix
        </Text>
        ,&nbsp; indicating their current status. &nbsp;
        <Text display="inline-block">
          <Image
            src={`${assetsURL}report/wont_fix_color.svg`}
            w={"14px"}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={"xs"}
          fontWeight={"500"}
          color={"black"}
          fontStyle={"italic"}
        >
          Won't Fix
        </Text>
        &nbsp;&nbsp; denotes that the team is aware of the issue but has chosen
        not to resolve it. Issues labeled as &nbsp;
        <Text display="inline-block">
          <Image
            src={`${assetsURL}report/pending_fix_color.svg`}
            w={"14px"}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={"xs"}
          fontWeight={"500"}
          color={"black"}
          fontStyle={"italic"}
        >
          Pending Fix
        </Text>
        &nbsp;&nbsp; state that the bug is yet to be resolved. Additionally,
        each issue's severity is assessed based on the risk of exploitation or
        the potential for other unexpected or unsafe behavior.
      </Text>
      <Grid
        className={"ss-report-right-nav"}
        content={"Vulnerability Severity"}
        backgroundColor="#FFFFFF00"
        w="100%"
        h="fit-content"
        px={2}
        mt={6}
        templateColumns={"repeat(2, 1fr)"}
        gap={10}
      >
        <IssueType
          issueType={"critical"}
          desc={`The issue affects the contract in such a way that funds may be lost, allocated incorrectly, or otherwise result in a significant loss.`}
        />
        <IssueType
          issueType={"high"}
          desc={`High-severity vulnerabilities pose a significant risk to both the Smart Contract and the organization. They can lead to user fund losses, may have conditional requirements, and are challenging to exploit.`}
        />
        <IssueType
          issueType={"medium"}
          desc={`The issue affects the ability of the contract to operate in a way that doesn’t significantly hinder its behavior.`}
        />
        <IssueType
          issueType={"low"}
          desc={`The issue has minimal impact on the contract’s ability to operate.`}
        />
        <IssueType
          issueType={"gas"}
          desc={`This category deals with optimizing code and refactoring to conserve gas.`}
        />
        <IssueType
          issueType={"informational"}
          desc={`The issue does not affect the contract's operational capability but is considered good practice to address.`}
        />
      </Grid>
    </Flex>
  );
};

const IssueType: React.FC<{ issueType: string; desc: string }> = ({
  issueType,
  desc,
}) => {
  return (
    <VStack alignItems={"flex-start"}>
      <Flex alignItems={"center"}>
        <SeverityIcon size={6} variant={issueType} />
        <Text fontSize={"sm"} fontWeight={600} ml={2}>
          {sentenceCapitalize(issueType)}
        </Text>
      </Flex>
      <Text fontSize={"xs"} fontWeight={400} color={"#4E5D78"}>
        {desc}
      </Text>
    </VStack>
  );
};

export default ProjectSummaryContainer;

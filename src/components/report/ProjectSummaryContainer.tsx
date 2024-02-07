import { Flex, Heading, Text, Grid, VStack, Image } from "@chakra-ui/react";
import { Report } from "common/types";

import React from "react";
import { SeverityIcon } from "components/icons";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";

const ProjectSummaryContainer: React.FC<{
  summary_report: Report;
  download: boolean;
}> = ({ summary_report, download }) => {
  const assetsURL = getAssetsURL();
  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      id={"project-summary"}
      px={[0, 3, 4]}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        my={download ? 10 : [4, 6, 10]}
        alignItems="center"
        className={"ss-report-h1"}
        content={"Vulnerability Classification and Severity"}
      >
        <Text
          fontSize={download ? "28px" : ["14px", "16px", "28px"]}
          fontWeight={400}
        >
          1.
        </Text>
        <Heading
          color={"#52FF00"}
          fontSize={download ? "28px" : ["14px", "16px", "28px"]}
          ml={download ? 4 : [2, 3, 4]}
        >
          Vulnerability
        </Heading>
        <Text
          fontSize={download ? "28px" : ["14px", "16px", "28px"]}
          fontWeight={400}
        >
          {" "}
          &nbsp;Classification and Severity{" "}
        </Text>
      </Flex>
      <Text
        className={"ss-report-right-nav"}
        content={"Description"}
        fontSize={download ? "lg" : ["sm", "md", "lg"]}
        fontWeight={"600"}
        mt={download ? 12 : [1, 3, 12, 12]}
      >
        Description
      </Text>
      <Text
        fontSize={download ? "xs" : ["8px", "11px", "xs"]}
        fontWeight={400}
        color={"#4E5D78"}
        my={download ? 4 : [1, 2, 4]}
      >
        To enhance navigability, the document is organized in descending order
        of severity for easy reference. Issues are categorized as &nbsp;
        <Text display="inline-block">
          <Image
            src={`${assetsURL}report/fixed_color.svg`}
            width={download ? "14px" : ["5px", "10px", "14px"]}
            alt="F"
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={download ? "xs" : ["8px", "11px", "xs"]}
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
            width={download ? "14px" : ["5px", "10px", "14px"]}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={download ? "xs" : ["8px", "11px", "xs"]}
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
            width={download ? "14px" : ["5px", "10px", "14px"]}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={download ? "xs" : ["8px", "11px", "xs"]}
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
            width={download ? "14px" : ["5px", "10px", "14px"]}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={download ? "xs" : ["8px", "11px", "xs"]}
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
            width={download ? "14px" : ["5px", "10px", "14px"]}
            mb={-0.5}
          />
        </Text>
        &nbsp;&nbsp;
        <Text
          display="inline-block"
          fontSize={download ? "xs" : ["8px", "11px", "xs"]}
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
        maxW={download ? "100%" : ["320px", "350px", "100%"]}
        h="fit-content"
        px={download ? 2 : [0, 0, 2]}
        mt={download ? 6 : [2, 4, 6]}
        templateColumns={"repeat(2, 1fr)"}
        gap={download ? 10 : [2, 4, 10]}
      >
        <IssueType
          download={download}
          issueType={"critical"}
          desc={`The issue affects the contract in such a way that funds may be lost, allocated incorrectly, or otherwise result in a significant loss.`}
        />
        <IssueType
          download={download}
          issueType={"high"}
          desc={`High-severity vulnerabilities pose a significant risk to both the Smart Contract and the organization. They can lead to user fund losses, may have conditional requirements, and are challenging to exploit.`}
        />
        <IssueType
          download={download}
          issueType={"medium"}
          desc={`The issue affects the ability of the contract to operate in a way that doesn’t significantly hinder its behavior.`}
        />
        <IssueType
          download={download}
          issueType={"low"}
          desc={`The issue has minimal impact on the contract’s ability to operate.`}
        />
        <IssueType
          download={download}
          issueType={"gas"}
          desc={`This category deals with optimizing code and refactoring to conserve gas.`}
        />
        <IssueType
          download={download}
          issueType={"informational"}
          desc={`The issue does not affect the contract's operational capability but is considered good practice to address.`}
        />
      </Grid>
    </Flex>
  );
};

const IssueType: React.FC<{
  issueType: string;
  desc: string;
  download: boolean;
}> = ({ issueType, desc, download }) => {
  return (
    <VStack alignItems={"flex-start"}>
      <Flex alignItems={"center"}>
        <SeverityIcon size={6} variant={issueType} />
        <Text fontSize={["12px", "xs", "sm"]} fontWeight={600} ml={2}>
          {sentenceCapitalize(issueType)}
        </Text>
      </Flex>
      <Text
        fontSize={download ? "xs" : ["8px", "11px", "xs"]}
        fontWeight={400}
        color={"#4E5D78"}
      >
        {desc}
      </Text>
    </VStack>
  );
};

export default ProjectSummaryContainer;

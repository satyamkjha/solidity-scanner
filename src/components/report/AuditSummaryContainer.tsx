import {
  Divider,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  Link,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Report } from "common/types";

import React from "react";
import { GithubIcon, ProjectIcon, BitbucketIcon } from "components/icons";
import {
  getProjectType,
  getAssetsURL,
  sentenceCapitalize,
  getContractBlockChainLogoUrl,
} from "helpers/helperFunction";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { reportProjectDetails, reportBlockDetails } from "common/values";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";

const AuditSummaryContainer: React.FC<{
  summary_report: Report;
  download: boolean;
}> = ({ summary_report, download }) => {
  const assetsURL = getAssetsURL();

  let iconSize = useBreakpointValue({ base: 15, sm: 20, md: 50 });
  if (download) {
    iconSize = 50;
  }

  let scoreCircleSize =
    useBreakpointValue({
      base: "75px",
      sm: "85px",
      md: "100px",
    }) || "100px";
  let scoreCirclePadding =
    useBreakpointValue({
      base: 1,
      sm: 1,
      md: 2,
    }) || 2;
  let scoreCircleThickness =
    useBreakpointValue({
      base: "4px",
      sm: "4px",
      md: "7px",
    }) || "7px";

  let scoreFontSize =
    useBreakpointValue({
      base: "15px",
      sm: "18px",
      md: "20px",
    }) || "20px";

  const detailOptions = summary_report.project_summary_report.project_url
    ? reportProjectDetails
    : reportBlockDetails;

  const solidity_score = summary_report.scan_summary[0].score_v2
    ? summary_report.scan_summary[0].score_v2
    : (parseFloat(summary_report.scan_summary[0].score) * 20).toFixed(2);

  const getProjectIcon = (url: string) => {
    switch (getProjectType(url)) {
      case "bitbucket":
        return <BitbucketIcon size={iconSize || 50} />;
      case "github":
        return <GithubIcon size={iconSize || 50} />;
      case "gitlab":
        return <GithubIcon size={iconSize || 50} />;
      case "filescan":
        return (
          <Image
            w={download ? "60px" : ["20px", "30px", "60px"]}
            src={`${assetsURL}icons/integrations/${getProjectType(
              url || ""
            )}.svg`}
          />
        );
    }
  };
  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      id={"executive-summary"}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        my={download ? 10 : [4, 6, 10]}
        alignItems="center"
      >
        <Text
          fontSize={download ? "28px" : ["14px", "20px", "28px"]}
          fontWeight={400}
        >
          02.
        </Text>
        <Heading
          color={"#52FF00"}
          fontSize={download ? "28px" : ["14px", "20px", "28px"]}
          ml={4}
        >
          Executive
        </Heading>
        <Text
          fontSize={download ? "28px" : ["14px", "20px", "28px"]}
          fontWeight={400}
        >
          {" "}
          &nbsp;Summary{" "}
        </Text>
      </Flex>
      <Flex
        py={download ? 6 : [2, 3, 6]}
        px={download ? 7 : [2, 3, 7]}
        w="100%"
        flexDir={"column"}
        backgroundColor={"#FBFBFB"}
      >
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={["row"]}
          className={"ss-report-right-nav"}
          content={"Executive Summary"}
        >
          {summary_report.project_summary_report.project_url ? (
            getProjectIcon(summary_report.project_summary_report.project_url)
          ) : summary_report.project_summary_report.contract_platform ? (
            <Image
              src={`${assetsURL}${getContractBlockChainLogoUrl(
                summary_report.project_summary_report.contract_platform || "",
                summary_report.project_summary_report.contract_chain || ""
              )}.svg`}
              w={download ? "50px" : ["15px", "20px", "50px"]}
            />
          ) : (
            <ProjectIcon size={iconSize || 50} />
          )}
          <Flex
            w={"60%"}
            align={["flex-start"]}
            flexDir={"column"}
            mb={0}
            ml={download ? 6 : [2, 3, 6]}
          >
            <Text
              fontSize={download ? "md" : ["xs", "sm", "md"]}
              fontWeight={"bold"}
            >
              {summary_report.project_summary_report.project_name}
              {summary_report.project_summary_report.contract_name}
            </Text>
            <Text
              fontSize={download ? "sm" : ["10px", "12px", "sm"]}
              fontWeight={400}
              wordBreak="break-all"
              mt={download ? 1.5 : [0, 1, 1.5]}
            >
              {summary_report.project_summary_report.project_url !== "File Scan"
                ? `${
                    summary_report.project_summary_report.project_url
                      ? sentenceCapitalize(
                          getProjectType(
                            summary_report.project_summary_report.project_url
                          )
                        ) + " Project"
                      : ""
                  }`
                : "Uploaded Solidity File(s)"}
              {summary_report.project_summary_report.contract_address}
            </Text>
            <Link
              href={
                (summary_report.project_summary_report.project_url !==
                  "File Scan" &&
                  summary_report.project_summary_report.project_url) ||
                summary_report.project_summary_report.project_url ||
                summary_report.project_summary_report.contract_url
              }
              target={"_blank"}
              fontSize={download ? "xs" : ["6px", "8px", "xs"]}
              fontWeight={400}
              color={"accent"}
              w={"100%"}
              display={"flex"}
              alignItems={"center"}
            >
              <Text isTruncated>
                {summary_report.project_summary_report.project_url !==
                "File Scan"
                  ? summary_report.project_summary_report.project_url
                  : ""}
                {summary_report.project_summary_report.contract_url}
              </Text>

              {summary_report.project_summary_report.project_url !==
              "File Scan" ? (
                <ExternalLinkIcon
                  ml={download ? 1.5 : [0, 1, 1.5]}
                  color={"#8A94A6"}
                />
              ) : null}
            </Link>
          </Flex>

          {summary_report.project_summary_report.date_published ? (
            <Text
              fontSize={download ? "xs" : ["6px", "8px", "xs"]}
              fontWeight={400}
              color={"#8A94A6"}
              ml={"auto"}
            >
              Published on{" "}
              {summary_report.project_summary_report.date_published}
            </Text>
          ) : null}
        </Flex>

        <Divider my={download ? 6 : [2, 3, 6]} borderColor={"#D8D8D8"} />
        <Grid
          w="100%"
          h="fit-content"
          templateColumns={"repeat(3, 1fr)"}
          gap={download ? 8 : [1, 3, 8]}
        >
          {detailOptions.map((detail, index) => {
            if (
              summary_report.project_summary_report.project_url &&
              summary_report.project_summary_report.project_url ===
                "File Scan" &&
              detail.value === "git_commit_hash"
            )
              return null;
            else
              return (
                <VStack
                  alignItems={"flex-start"}
                  spacing={download ? 1 : [0, 0, 1]}
                >
                  <Text
                    fontSize={download ? "xs" : ["6px", "8px", "xs"]}
                    fontWeight={400}
                    color={"#8A94A6"}
                  >
                    {detail.label}
                  </Text>
                  <Text
                    fontSize={download ? "sm" : ["10px", "12px", "sm"]}
                    fontWeight={600}
                  >
                    {detail.label === "Language" ||
                    detail.label === "Audit Methodology"
                      ? detail.value
                      : (summary_report.project_summary_report as any)[
                          detail.value
                        ] || "-"}
                  </Text>
                </VStack>
              );
          })}
        </Grid>
      </Flex>
      <Flex
        w="100%"
        my={download ? 6 : [2, 3, 6]}
        px={download ? 10 : [2, 3, 10]}
        py={download ? 6 : [1, 2, 6]}
        justifyContent={["flex-start"]}
        alignItems={["flex-start"]}
        direction={["row"]}
        bgImage={`url("${assetsURL}report/gradient_bg.svg")`}
        bgSize={"cover"}
        borderRadius={download ? 15 : [5, 8, 15]}
      >
        <SolidityScoreProgress
          score={summary_report.scan_summary[0].score_v2}
          size={download ? "100px" : scoreCircleSize}
          fontSize={scoreFontSize}
          thickness={download ? "7px" : scoreCircleThickness}
          padding={scoreCirclePadding}
        />

        <VStack alignItems="flex-start" px={download ? 4 : [1, 2, 4]}>
          <Text
            fontSize={download ? "18px" : ["12px", "14px", "18px"]}
            fontWeight={600}
            textAlign="center"
          >
            Security Score is
            {parseFloat(solidity_score) < 50
              ? " LOW"
              : parseFloat(solidity_score) >= 90
              ? " GREAT"
              : " AVERAGE"}
          </Text>
          <Text
            color="subtle"
            fontSize={download ? "xs" : ["8px", "10px", "xs"]}
            fontWeight={400}
          >
            The SolidityScan score is calculated based on lines of code and
            weights assigned to each issue depending on the severity and
            confidence. To improve your score, view the detailed result and
            leverage the remediation solutions provided.
          </Text>
        </VStack>
      </Flex>
      {summary_report.project_summary_report.description ? (
        <Text
          fontSize={download ? "xs" : ["6px", "8px", "xs"]}
          fontWeight={400}
        >
          {summary_report.project_summary_report.description}
        </Text>
      ) : (
        <>
          <Text
            fontSize={download ? "xs" : ["6px", "8px", "xs"]}
            fontWeight={400}
          >
            This report has been prepared for{" "}
            {summary_report.project_summary_report.project_name} using
            SolidityScan to scan and discover vulnerabilities and safe coding
            practices in their smart contract including the libraries used by
            the contract that are not officially recognized. The SolidityScan
            tool runs a comprehensive static analysis on the Solidity code and
            finds vulnerabilities ranging from minor gas optimizations to major
            vulnerabilities leading to the loss of funds. The coverage scope
            pays attention to all the informational and critical vulnerabilities
            with over (100+) modules. The scanning and auditing process covers
            the following areas:{" "}
          </Text>

          <Text
            fontSize={download ? "xs" : ["6px", "8px", "xs"]}
            fontWeight={400}
            mt={2}
          >
            Various common and uncommon attack vectors will be investigated to
            ensure that the smart contracts are secure from malicious actors.
            The scanner modules find and flag issues related to Gas
            optimizations that help in reducing the overall Gas cost It scans
            and evaluates the codebase against industry best practices and
            standards to ensure compliance It makes sure that the officially
            recognized libraries used in the code are secure and up to date
          </Text>
          <Text
            fontSize={download ? "xs" : ["6px", "8px", "xs"]}
            fontWeight={400}
            mt={2}
          >
            The SolidityScan Team recommends running regular audit scans to
            identify any vulnerabilities that are introduced after{" "}
            {summary_report.project_summary_report.project_name} introduces new
            features or refactors the code.
          </Text>
        </>
      )}
    </Flex>
  );
};

export default AuditSummaryContainer;

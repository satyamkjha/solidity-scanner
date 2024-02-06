import {
  Divider,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  Link,
  Grid,
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
}> = ({ summary_report }) => {
  const assetsURL = getAssetsURL();

  const detailOptions = summary_report.project_summary_report.project_url
    ? reportProjectDetails
    : reportBlockDetails;

  const getProjectIcon = (url: string) => {
    switch (getProjectType(url)) {
      case "bitbucket":
        return <BitbucketIcon size={50} />;
      case "github":
        return <GithubIcon size={50} />;
      case "gitlab":
        return <GithubIcon size={50} />;
      case "filescan":
        return (
          <Image
            w={"60px"}
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
      transform={"scale(0.7)"}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        my={10}
        alignItems="center"
      >
        <Text fontSize="28px" fontWeight={400}>
          02.
        </Text>
        <Heading color={"#52FF00"} fontSize="28px" ml={4}>
          Executive
        </Heading>
        <Text fontSize="28px" fontWeight={400}>
          {" "}
          &nbsp;Summary{" "}
        </Text>
      </Flex>
      <Flex
        py={6}
        px={7}
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
              w={"50px"}
            />
          ) : (
            <ProjectIcon size={50} />
          )}
          <Flex
            w={"60%"}
            align={["flex-start"]}
            flexDir={"column"}
            mb={0}
            ml={6}
          >
            <Text fontSize="md" fontWeight={"bold"}>
              {summary_report.project_summary_report.project_name}
              {summary_report.project_summary_report.contract_name}
            </Text>
            <Text fontSize="sm" fontWeight={400} wordBreak="break-all" mt={1.5}>
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
              fontSize="xs"
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
                <ExternalLinkIcon ml={1.5} color={"#8A94A6"} />
              ) : null}
            </Link>
          </Flex>

          {summary_report.project_summary_report.date_published ? (
            <Text fontSize="xs" fontWeight={400} color={"#8A94A6"} ml={"auto"}>
              Published on{" "}
              {summary_report.project_summary_report.date_published}
            </Text>
          ) : null}

          {/* <VStack align={"center"}>
          <CircularProgress
            value={
              summary_report.scan_summary[0].score_v2
                ? parseFloat(summary_report.scan_summary[0].score_v2)
                : parseFloat(
                    (
                      parseFloat(summary_report.scan_summary[0].score) * 20
                    ).toFixed(2)
                  )
            }
            color="accent"
            thickness="8px"
            size="90px"
            capIsRound
          >
            <CircularProgressLabel
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Flex flexDir="column" alignItems="center" w="100%">
                <Text fontSize="lg" fontWeight={900} color="accent">
                  {summary_report.scan_summary[0].score_v2 ||
                    (
                      parseFloat(summary_report.scan_summary[0].score) * 20
                    ).toFixed(2)}
                </Text>
              </Flex>
            </CircularProgressLabel>
          </CircularProgress>
          <Text
            fontSize="md"
            fontWeight={"600"}
            color={"accent"}
            width={"100%"}
          >
            Security Score
          </Text>
        </VStack> */}
        </Flex>

        <Divider my={6} borderColor={"#D8D8D8"} />
        <Grid
          w="100%"
          h="fit-content"
          templateColumns={"repeat(3, 1fr)"}
          gap={8}
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
                <VStack alignItems={"flex-start"} spacing={1}>
                  <Text fontSize="xs" fontWeight={400} color={"#8A94A6"}>
                    {detail.label}
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
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
        my={6}
        px={10}
        py={6}
        justifyContent={["center", "center", "center", "flex-start"]}
        alignItems={["center", "center", "center", "flex-start"]}
        direction={["column", "column", "row"]}
        bgImage={`url("${assetsURL}report/gradient_bg.svg")`}
        bgSize={"cover"}
        borderRadius={15}
      >
        <SolidityScoreProgress
          score={summary_report.scan_summary[0].score}
          size={"100px"}
          thickness={"7px"}
        />
        <VStack alignItems="flex-start" px={4}>
          <Text fontSize="18px" fontWeight={600} textAlign="center">
            Security Score is
            {parseFloat(summary_report.scan_summary[0].score) < 50
              ? " LOW"
              : parseFloat(summary_report.scan_summary[0].score) >= 90
              ? " GREAT"
              : " AVERAGE"}
          </Text>
          <Text color="subtle" fontSize="xs" fontWeight={400}>
            The SolidityScan score is calculated based on lines of code and
            weights assigned to each issue depending on the severity and
            confidence. To improve your score, view the detailed result and
            leverage the remediation solutions provided.
          </Text>
        </VStack>
      </Flex>
      {summary_report.project_summary_report.description ? (
        <Text fontSize="xs" fontWeight={400}>
          {summary_report.project_summary_report.description}
        </Text>
      ) : (
        <>
          <Text fontSize="xs" fontWeight={400}>
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

          <Text fontSize="xs" fontWeight={400} mt={2}>
            Various common and uncommon attack vectors will be investigated to
            ensure that the smart contracts are secure from malicious actors.
            The scanner modules find and flag issues related to Gas
            optimizations that help in reducing the overall Gas cost It scans
            and evaluates the codebase against industry best practices and
            standards to ensure compliance It makes sure that the officially
            recognized libraries used in the code are secure and up to date
          </Text>
          <Text fontSize="xs" fontWeight={400} mt={2}>
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

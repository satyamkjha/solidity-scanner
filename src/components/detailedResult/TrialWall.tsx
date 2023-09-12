import React, { useContext, useEffect, useState } from "react";
import {
  Flex,
  VStack,
  Box,
  Text,
  Icon,
  Button,
  HStack,
  useMediaQuery,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CodeBlock, atomOneLight } from "react-code-blocks";
import { AiOutlineCaretRight } from "react-icons/ai";
import { dummyCode, dummyIssues } from "common/values";
import { WarningTwoIcon } from "@chakra-ui/icons";
import UpgradePackage from "../upgradePackage";
import { getAssetsURL } from "helpers/helperFunction";
import { DetailResultContext } from "common/contexts";
export const TrialWall: React.FC = () => {
  return (
    <Flex w="100%" sx={{ flexDir: "column" }}>
      <TrialWallCode />
      {/* <TrialWallIssueDescription /> */}
    </Flex>
  );
};

export const TrialWallCode: React.FC = () => {
  const assetsURL = getAssetsURL();
  const [gasIssueCount, setGasIssueCount] = useState<number>(0);
  const { issues, scanSummary, setFiles, setOpenIssueIndex } =
    useContext(DetailResultContext);

  useEffect(() => {
    if (scanSummary && scanSummary.issue_severity_distribution.gas) {
      setGasIssueCount(scanSummary.issue_severity_distribution.gas);
    }
  }, []);

  const viewGasIssue = () => {
    const gasIssuesIndex =
      issues &&
      issues.findIndex(
        (issue) => issue.template_details.issue_severity === "gas"
      );
    if (gasIssuesIndex !== -1) {
      setOpenIssueIndex([gasIssuesIndex]);
      setFiles({
        bug_id:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].bug_id,
        issue_id: issues[gasIssuesIndex].issue_id,
        bug_hash:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].bug_hash,
        bug_status:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].bug_status,
        findings:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].findings,
        description_details:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0]
            .description_details,
        template_details: issues[gasIssuesIndex].template_details,
        comment:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].comment,
        issue_description:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0]
            .issue_description,
        issue_remediation:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0]
            .issue_remediation,

        wait_to_scroll: 1000,
      });
    }
  };
  return (
    <Flex
      w="100%"
      sx={{ flexDir: ["column", "column", "column"] }}
      position="relative"
      h="70vh"
    >
      <VStack w={"100%"} alignItems="flex-start" spacing={5} px={4}>
        <Box
          sx={{
            w: "100%",
            position: "sticky",
            top: 8,
          }}
        >
          <DummyCode />
        </Box>
      </VStack>

      <UpgradePackage
        footer={
          <Flex
            px={6}
            py={4}
            bg={"white"}
            border={"1px solid #F795B4"}
            boxShadow={"0px 0px 20px 0px #F795B429"}
            borderRadius={"11px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image src={`${assetsURL}icons/gas-icon.svg`} />
            <VStack ml={6} mr={8} alignItems={"flex-start"} spacing={1}>
              <Text fontWeight={600}>{gasIssueCount} Gas Issues found</Text>
              <Text color="text" fontWeight={400} fontSize={"xs"}>
                Trail users can only view gas bug details. Please upgrade to
                access details for other issues.
              </Text>
            </VStack>
            <ChakraLink
              color={"blue"}
              ml={"auto"}
              whiteSpace={"nowrap"}
              onClick={viewGasIssue}
            >
              View Now
            </ChakraLink>
          </Flex>
        }
      />
    </Flex>
  );
};

export const TrialWallIssueDescription: React.FC = () => {
  return (
    <Flex
      w="100%"
      sx={{ flexDir: ["column", "column", "column"] }}
      position="relative"
      h="30vh"
    >
      <VStack w={"100%"} alignItems="flex-start" spacing={5} px={4}>
        <Box
          sx={{
            w: "100%",
            position: "sticky",
            top: 8,
          }}
        >
          <DummyIssueDescp />
        </Box>
      </VStack>
      <Flex
        w="100%"
        h="20vh"
        position="absolute"
        sx={{
          backdropFilter: "blur(6px)",
        }}
        bg="rgba(255,255,255,0.3)"
        alignItems="center"
        justifyContent="flex-start"
        flexDir="column"
        mt={"50px"}
      ></Flex>
    </Flex>
  );
};

export const TrialWallIssue: React.FC<{
  no_of_issue: number;
  severity: string;
}> = ({ no_of_issue, severity }) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  return (
    <Flex
      w="100%"
      sx={{ flexDir: ["column", "column", "column"] }}
      position="relative"
    >
      <VStack w={"100%"} alignItems="flex-start" spacing={5} px={4}>
        <Box
          sx={{
            w: "100%",
            position: "sticky",
            top: 8,
          }}
        >
          {dummyIssues.map(({ filesCount, issueTitle, severity }) => (
            <DummyIssue
              filesCount={filesCount}
              issueTitle={issueTitle}
              severity={severity}
            />
          ))}
        </Box>
      </VStack>
      <Flex
        w="100%"
        h="100%"
        position="absolute"
        sx={{
          backdropFilter: "blur(6px)",
        }}
        bg="rgba(255,255,255,0.3)"
        alignItems="center"
        justifyContent="flex-start"
        flexDir="column"
        pt={20}
      >
        <WarningTwoIcon color={severity} fontSize={50} />
        <Text
          textAlign={"center"}
          w={"80%"}
          fontWeight={700}
          fontSize="md"
          color="black"
          mb={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {no_of_issue}
          <Text textTransform="capitalize" mx={1}>
            {severity}{" "}
          </Text>
          Vulnerabilities found !
        </Text>
        <Text
          textAlign={"center"}
          w={"80%"}
          fontWeight={300}
          fontSize="sm"
          color="black"
          mb={8}
        >
          Upgrade from the trial plan to find more details about these
          vulnerabilities.
        </Text>
        {!isDesktopView && (
          <Link to="/billing">
            <Button mt={2} px={4} variant="brand" width="100%">
              Upgrade
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

const DummyIssue: React.FC<{
  filesCount: number;
  issueTitle: string;
  severity: string;
}> = ({ severity, filesCount, issueTitle }) => {
  return (
    <>
      <Flex
        sx={{
          w: "100%",
          my: 3,

          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "gray.100",
        }}
        h={10}
      >
        <Flex sx={{ alignItems: "center" }}>
          <Text
            sx={{
              ml: 3,
              fontWeight: 600,
              color: "#4E5D78",
              maxW: 250,
              fontSize: "sm",
            }}
            w={"100%"}
            isTruncated
          >
            {issueTitle}
          </Text>
        </Flex>
        <HStack>
          <Text
            sx={{
              mr: 3,
              fontSize: "sm",
              fontWeight: 600,
              color: "subtle",
            }}
          >
            {filesCount} files
          </Text>{" "}
          <Icon
            as={AiOutlineCaretRight}
            mr={2}
            color="subtle"
            fontSize="14px"
            transition="transform 0.2s"
            transform="rotate(90deg)"
          />
        </HStack>
      </Flex>
    </>
  );
};

const DummyCode: React.FC = () => {
  return (
    <Box w="100%">
      <Box
        sx={{
          borderRadius: 15,
          bg: "bg.subtle",
          p: 4,
          my: 2,
        }}
      >
        <Flex
          sx={{
            w: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text
            text="subtle"
            fontSize="sm"
            color="subtle"
            mb={2}
            maxW="70%"
            isTruncated
          >
            src/test/resources/rules/SOLIDITY_TRANSFER_IN_LOOP
          </Text>
        </Flex>

        <pre>
          <CodeBlock
            customStyle={{
              height: "55vh",
              fontSize: "14px",
              overflow: "scroll",
            }}
            theme={atomOneLight}
            showLineNumbers
            text={dummyCode}
          />
        </pre>
      </Box>
    </Box>
  );
};

const DummyIssueDescp: React.FC = () => {
  return (
    <Box w="100%">
      <Box
        sx={{
          borderRadius: 15,
          bg: "bg.subtle",
          p: 4,
          my: 2,
        }}
        h={"20vh"}
        overflow={"scroll"}
      >
        <Flex
          sx={{
            w: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          mb={5}
          mx={10}
          flexDir="row"
        >
          <Text fontSize="md" color={"gray.600"} fontWeight={"bold"}>
            Vulnerability Description
          </Text>

          <Text ml={10} fontSize="md" color={"gray.600"} fontWeight={"bold"}>
            Remediation
          </Text>
        </Flex>
        <Text
          px={5}
          py={2}
          mb={3}
          fontWeight="300"
          fontSize={14}
          borderRadius={12}
          color={"gray.600"}
          bg={"gray.100"}
          width="fit-content"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Box>
    </Box>
  );
};

export default TrialWall;

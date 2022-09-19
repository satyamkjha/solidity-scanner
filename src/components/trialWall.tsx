import React from "react";
import {
  Flex,
  VStack,
  Box,
  Text,
  Icon,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { CodeBlock, atomOneLight } from "react-code-blocks";

import { AiOutlineCaretRight, AiFillGithub } from "react-icons/ai";

import VulnerabilityDistribution from "components/vulnDistribution";
import { SeverityIcon } from "components/icons";

import { dummyCode, dummyIssues } from "common/values";
import { TrialWallIcon } from "components/icons";
import { WarningTwoIcon } from "@chakra-ui/icons";
export const TrialWall: React.FC = () => {
  return (
    <Flex w="100%" sx={{ flexDir: "column" }} h="100vh">
      <TrialWallCode />
      <TrialWallIssueDescription />
    </Flex>
  );
};

export const TrialWallCode: React.FC = () => {
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
      <Flex
        w="100%"
        h="60vh"
        mt={6}
        position="absolute"
        sx={{
          backdropFilter: "blur(6px)",
        }}
        bg="rgba(255,255,255,0.3)"
        alignItems="center"
        justifyContent="flex-start"
        flexDir="column"
        pt={"100px"}
      >
        <TrialWallIcon />
        <Text
          textAlign={"center"}
          w={"80%"}
          fontWeight={700}
          fontSize="md"
          color="black"
          mb={4}
        >
          Upgrade to use this feature
        </Text>

        <Text
          textAlign={"center"}
          w={"80%"}
          fontWeight={300}
          fontSize="sm"
          color="black"
          mb={8}
        >
          Upgrade from the trial plan to use this feature and much more.
        </Text>

        <Link to="/billing">
          <Button mt={4} variant="brand" width="250px">
            Upgrade
          </Button>
        </Link>
      </Flex>
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
        >
          {no_of_issue} Vulnerabilities found !
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

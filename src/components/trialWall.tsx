import React from "react";
import { Flex, VStack, Box, Text, Icon, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { CodeBlock, atomOneLight } from "react-code-blocks";

import { AiOutlineCaretRight, AiFillGithub } from "react-icons/ai";

import VulnerabilityDistribution from "components/vulnDistribution";
import { SeverityIcon } from "components/icons";

import { dummyCode, dummyIssues } from "common/values";
import { TrialWallIcon } from "components/icons";

export const TrialWall: React.FC = () => {
  return (
    <Flex
      w="100%"
      sx={{ flexDir: ["column", "column", "row"] }}
      position="relative"
      h="60vh"
    >
      <VStack
        w={["100%", "100%", "40%"]}
        spacing={8}
        mb={[8, 8, 0]}
        alignItems="flex-start"
      >
        <Flex w="100%" justifyContent="space-around">
          <Box width="80%" mt={2}>
            <VulnerabilityDistribution
              critical={3}
              high={3}
              medium={3}
              low={3}
              informational={3}
            />
          </Box>
        </Flex>
        <Box w="100%" minH="50vh" display="flex" flexDir="column" pl={1}>
          {dummyIssues.map(({ filesCount, issueTitle, severity }) => (
            <DummyIssue
              filesCount={filesCount}
              issueTitle={issueTitle}
              severity={severity}
            />
          ))}
        </Box>
      </VStack>
      <VStack
        w={["100%", "100%", "60%"]}
        alignItems="flex-start"
        spacing={5}
        px={4}
      >
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
        position="absolute"
        sx={{
          backdropFilter: "blur(6px)",
        }}
        bg="rgba(255,255,255,0.3)"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <TrialWallIcon />
        <Text fontWeight={700} mt={6}>
          Upgrade to use this feature
        </Text>
        {/* <Text fontSize="sm" mt={2}>
          Upgrade to use this feature
        </Text> */}
        <Link to="/billing">
          <Button mt={4} variant="brand" width="250px">
            Upgrade
          </Button>
        </Link>
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
    <Button my={1} py={6}>
      <Flex
        sx={{
          w: "100%",
          my: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex sx={{ alignItems: "center" }}>
          <SeverityIcon variant={severity} />
          <Text
            sx={{
              ml: 3,
              fontWeight: 600,
              color: "#4E5D78",
              maxW: 250,
              fontSize: "sm",
            }}
            isTruncated
          >
            {issueTitle}
          </Text>
        </Flex>
        <Text
          sx={{
            mr: 3,
            fontSize: "sm",
            fontWeight: 600,
            color: "subtle",
          }}
        >
          {filesCount} files
        </Text>
      </Flex>
      <Icon
        as={AiOutlineCaretRight}
        mr={2}
        color="subtle"
        fontSize="14px"
        transition="transform 0.2s"
        transform="rotate(90deg)"
      />
    </Button>
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
            justifyContent: "space-between",
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
          <Button size="sm">
            <Icon as={AiFillGithub} color="subtle" mr={2} />
            Create issue
          </Button>
        </Flex>

        <pre>
          <CodeBlock
            customStyle={{
              height: "50vh",
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

export default TrialWall;

import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Flex,
  VStack,
  Box,
  Text,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { BiCodeCurly } from 'react-icons/bi';
import { AiOutlineCaretRight } from 'react-icons/ai';

import { CodeBlock, atomOneLight } from 'react-code-blocks';

import VulnerabilityDistribution from 'components/vulnDistribution';
import Score from 'components/score';
import { SeverityIcon } from 'components/icons';

type FileState = {
  issue_id: string;
  file_path: string;
  line_nos_start: number[];
  line_nos_end: number[];
};

const sampleDesc = `
Solidity source files indicate the versions of the compiler they can be compiled with. pragma solidity ^0.4.17;
        
// bad: compiles w 0.4.17 and above pragma solidity 0.4.24;
// good : compiles w 0.4.24 only
                    
It is recommended to follow the latter example, as future compiler
versions may handle certain language constructions in a way the
developer did not foresee.`;

const sampleCode = `query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}`;
const issues = [
  {
    issue_id: 'someid',
    issue_name: 'SOLIDITY_SAFEMATH',
    issue_severity: '0',
    issue_confidence: '2',
    type: 'ast_parsed',
    version: '1',
    additional_meta: {},
    findings: [
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_DIV_MUL.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_SAFEMATH.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
    ],
  },
  {
    issue_id: 'someid2',
    issue_name: 'SOLIDITY_PRAGMA_VERSION',
    issue_severity: '0',
    issue_confidence: '2',
    type: 'ast_parsed',
    version: '1',
    additional_meta: {},
    findings: [
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_PRAGMAS_VERSION.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_DOS_WITH_THROW.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_DO_WHILE_CONTINUE.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
    ],
  },
  {
    issue_id: 'someid2',
    issue_name: 'SOLIDITY_PRAGMA_VERSION',
    issue_severity: '0',
    issue_confidence: '2',
    type: 'ast_parsed',
    version: '1',
    additional_meta: {},
    findings: [
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_PRAGMAS_VERSION.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_DOS_WITH_THROW.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
      {
        file_path:
          'sandbox/smartcheck/src/test/resources/rules/SOLIDITY_DO_WHILE_CONTINUE.sol',
        line_nos_end: [11, 26, 33],
        line_nos_start: [0, 18, 30],
      },
    ],
  },
];

export const Result: React.FC = () => {
  const [file, setFile] = useState<FileState | null>(null);
  return (
    <Flex w="100%" sx={{ flexDir: ['column', 'column', 'row'] }} py={2}>
      <VStack
        w={['100%', '100%', '40%']}
        spacing={8}
        mb={[8, 8, 0]}
        alignItems="flex-start"
      >
        <Flex w="100%" justifyContent="space-around">
          <Box width="60%">
            <VulnerabilityDistribution critical={4} medium={1} low={12} />
          </Box>
          <Score score={3.7} />
        </Flex>
        <Box w="100%" minH="50vh">
          <Issues file={file} setFile={setFile} />
        </Box>
      </VStack>
      <VStack
        w={['100%', '100%', '60%']}
        alignItems="flex-start"
        spacing={5}
        px={4}
      >
        <Box
          sx={{
            w: '100%',
            position: 'sticky',
            top: 8,
          }}
        >
          {file ? (
            <>
              <FileDetails file={file} />
            </>
          ) : (
            <Flex
              sx={{
                w: '100%',
                bg: 'bg.subtle',
                flexDir: 'column',
                alignItems: 'center',
              }}
              py={36}
            >
              <Icon as={BiCodeCurly} fontSize="40px" color="subtle" mb={4} />
              <Text color="subtle">
                Please select a file from an issue to see vulnerability details.
              </Text>
            </Flex>
          )}
        </Box>
      </VStack>
    </Flex>
  );
};

type IssuesProps = {
  file: FileState | null;
  setFile: Dispatch<SetStateAction<FileState | null>>;
};
const Issues: React.FC<IssuesProps> = ({ file, setFile }) => {
  return (
    <Accordion allowMultiple>
      {issues.map(({ issue_id, findings, issue_name }) => (
        <AccordionItem id={issue_id}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                _hover={{
                  bg: 'rgba(47, 248, 107, 0.07)',
                }}
                _expanded={{
                  bg: 'rgba(47, 248, 107, 0.1)',
                }}
              >
                <Flex
                  sx={{
                    w: '100%',
                    my: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Flex sx={{ alignItems: 'center' }}>
                    <SeverityIcon variant="critical" />
                    <Text sx={{ ml: 3, fontWeight: 600, color: '#4E5D78' }}>
                      {issue_name}
                    </Text>
                  </Flex>
                  <Text
                    sx={{
                      mr: 3,
                      fontSize: 'sm',
                      fontWeight: 600,
                      color: 'subtle',
                    }}
                  >
                    {findings.length} file{findings.length > 1 && 's'}
                  </Text>
                </Flex>
                <Icon
                  as={AiOutlineCaretRight}
                  mr={2}
                  color="subtle"
                  fontSize="14px"
                  transition="transform 0.2s"
                  transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
                />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {findings.map(({ file_path, line_nos_start, line_nos_end }) => (
                  <Box
                    id={file_path}
                    sx={{
                      cursor: 'pointer',
                      bg:
                        file_path === file?.file_path ? 'gray.200' : 'gray.50',
                      p: 4,
                      my: 2,
                      color: 'text',
                      fontSize: 'sm',
                      borderRadius: 15,
                      transition: '0.2s background',
                      _hover: {
                        bg:
                          file_path === file?.file_path
                            ? 'gray.200'
                            : 'gray.100',
                      },
                    }}
                    onClick={() =>
                      setFile({
                        issue_id,
                        file_path,
                        line_nos_start,
                        line_nos_end,
                      })
                    }
                  >
                    <Text>{file_path}</Text>
                  </Box>
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

type FileDetailsProps = { file: FileState };
const FileDetails: React.FC<FileDetailsProps> = ({ file }) => {
  return (
    <Box w="100%">
      <Box
        sx={{
          borderRadius: 15,
          bg: 'bg.subtle',
          p: 4,
          my: 2,
        }}
      >
        <Text text="subtle" fontSize="sm" color="subtle" mb={2}>
          {file.file_path}
        </Text>
        <CodeBlock
          customStyle={{
            height: '35vh',
            fontSize: '14px',
            overflow: 'scroll',
          }}
          theme={atomOneLight}
          showLineNumbers
          text={sampleCode}
          language="graphql"
        />
      </Box>
      <Box
        sx={{
          borderRadius: 15,
          bg: 'bg.subtle',
          p: 4,
          my: 4,
        }}
      >
        <Box fontSize="sm" mb={2}>
          <IssueDetail issue_id={file.issue_id} />
        </Box>
      </Box>
    </Box>
  );
};

const IssueDetail: React.FC<{ issue_id: string }> = ({ issue_id }) => {
  return (
    <Tabs size="sm" variant="soft-rounded" colorScheme="green">
      <TabList
        sx={{
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderColor: 'border',
          pb: 4,
          px: 4,
        }}
      >
        <Tab mx={2}>Vulnerability Description</Tab>
        <Tab mx={2}>Example</Tab>
        <Tab mx={2}>Recommendations</Tab>
      </TabList>
      <TabPanels>
        <TabPanel sx={{ h: '35vh', w: '100%', overflowY: 'scroll' }}>
          <pre>{sampleDesc}</pre>
        </TabPanel>
        <TabPanel sx={{ h: '35vh', w: '100%', overflowY: 'scroll' }}>
          test2
        </TabPanel>
        <TabPanel sx={{ h: '35vh', w: '100%', overflowY: 'scroll' }}>
          <pre>{sampleCode}</pre>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Result;

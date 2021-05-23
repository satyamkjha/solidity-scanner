import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Flex,
  Box,
  Text,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import Overview from './components/Overview';
import Result from './components/result';

export const ProjectPage: React.FC = () => {
  return (
    <Box
      sx={{
        w: '100%',
        bg: 'bg.subtle',
        borderRadius: '20px',
        my: 4,
        px: 8,
        py: 4,
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text sx={{ fontSize: 'xl', fontWeight: 600, ml: 2 }}>
          Test Dummy Project 1
        </Text>
        <Link
          as={RouterLink}
          to="/projects"
          variant="subtle-without-underline"
          fontSize="md"
        >
          ← back
        </Link>
      </Flex>
      <Box
        sx={{
          w: '100%',
          bg: 'white',
          borderRadius: '20px',
          my: 4,
          p: 4,
        }}
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList
            sx={{
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderColor: 'border',
              pb: 4,
              px: 4,
            }}
          >
            <Tab mx={2}>Overview</Tab>
            <Tab mx={2}>Detailed Result</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Overview />
            </TabPanel>
            <TabPanel>
              <Result />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProjectPage;

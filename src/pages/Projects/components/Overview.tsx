import React from 'react';
import { Flex, VStack, HStack, Box, Text } from '@chakra-ui/react';

import VulnerabilityDistribution from 'components/vulnDistribution';
import PieChart from 'components/pieChart';
import Score from 'components/score';

const pieData = [
  {
    id: 'critical',
    label: 'Critical',
    value: 4,
    color: '#FF5C00',
  },
  {
    id: 'medium',
    label: 'Medium',
    value: 1,
    color: '#FFE600',
  },
  {
    id: 'low',
    label: 'Low',
    value: 12,
    color: '#38CB89',
  },
];

export const Overview: React.FC = () => {
  return (
    <Flex w="100%" sx={{ flexDir: ['column', 'column', 'row'] }}>
      <VStack w={['100%', '100%', '50%']} mb={[8, 8, 0]}>
        <Box w={['100%', '100%', '70%']} h="300px">
          <PieChart data={pieData} />
        </Box>
        <Box w={['70%', '70%', '50%']}>
          <VulnerabilityDistribution critical={4} medium={1} low={12} />
        </Box>
      </VStack>
      <VStack
        w={['100%', '100%', '50%']}
        alignItems="flex-start"
        p={8}
        spacing={5}
      >
        <Score score={3.7} />
        <Box sx={{ w: '100%', borderRadius: 15, bg: 'bg.subtle', p: 4 }}>
          <Text sx={{ fontSize: 'sm', letterSpacing: '0.7px' }}>
            SCAN STATISTICS
          </Text>
        </Box>

        <VStack w="100%" px={4} spacing={8} fontSize="sm">
          <HStack w="100%" justifyContent="space-between">
            <Text>Status</Text>
            <Text
              sx={{
                color: 'green.500',
                bg: 'green.50',
                px: 3,
                py: 1,
                borderRadius: 20,
              }}
            >
              Completed
            </Text>
          </HStack>
          <HStack w="100%" justifyContent="space-between">
            <Text>Score</Text>
            <Text color="subtle">3.6</Text>
          </HStack>
          <HStack w="100%" justifyContent="space-between">
            <Text>Duration</Text>
            <Text color="subtle">0:00:02</Text>
          </HStack>
          <HStack w="100%" justifyContent="space-between">
            <Text>Lines of code</Text>
            <Text color="subtle">200</Text>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Overview;

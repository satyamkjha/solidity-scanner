import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

const VulnerabilityDistribution: React.FC<{
  critical: number;
  medium: number;
  low: number;
}> = ({ critical, medium, low }) => {
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        mx: 2,
      }}
    >
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>
          {critical + medium + low}
        </Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Total</Text>
        <Box
          sx={{ w: '24px', h: '3px', bgColor: 'gray.400', ml: '1px', mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{critical}</Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Critical</Text>
        <Box
          sx={{ w: '24px', h: '3px', bgColor: 'critical', ml: '1px', mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{medium}</Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Medium</Text>
        <Box
          sx={{ w: '24px', h: '3px', bgColor: 'medium', ml: '1px', mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{low}</Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Low</Text>
        <Box sx={{ w: '24px', h: '3px', bgColor: 'low', ml: '1px', mt: 1 }} />
      </Box>
    </Flex>
  );
};

export default VulnerabilityDistribution;

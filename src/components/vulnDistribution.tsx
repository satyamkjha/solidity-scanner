import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import { IssueSeverityDistribution } from "common/types";

const VulnerabilityDistribution: React.FC<IssueSeverityDistribution> = ({
  critical,
  high,
  medium,
  low,
  informational,
  gas
}) => {

  console.log(gas);

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        mx: 2,
      }}
    >
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{critical}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Crit</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "high", ml: "1px", mt: 1 }} />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{high}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>High</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "high", ml: "1px", mt: 1 }} />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{medium}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Med</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "medium", ml: "1px", mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{low}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Low</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "low", ml: "1px", mt: 1 }} />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{informational}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Infor</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "gray.400", ml: "1px", mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{gas === undefined ? 0 : gas}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Gas</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "gas", ml: "1px", mt: 1 }}
        />
      </Box>
    </Flex>
  );
};

export const ErrorVulnerabilityDistribution: React.FC = ({}) => {
  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        mx: 2,
      }}
    >
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>NA</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Crit</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "high", ml: "1px", mt: 1 }} />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>NA</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>High</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "high", ml: "1px", mt: 1 }} />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>NA</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Med</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "medium", ml: "1px", mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>NA</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Low</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "low", ml: "1px", mt: 1 }} />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>NA</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Infor</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "gray.400", ml: "1px", mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>NA</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>GAS</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "gas", ml: "1px", mt: 1 }}
        />
      </Box>
    </Flex>
  );
};

export default VulnerabilityDistribution;

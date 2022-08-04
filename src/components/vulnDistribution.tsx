import React from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { IssueSeverityDistribution } from "common/types";

const VulnerabilityDistribution: React.FC<IssueSeverityDistribution> = ({
  critical,
  high,
  medium,
  low,
  informational,
  gas,
}) => {
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
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>
          {gas ? gas : 0 }
        </Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Gas</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "gas", ml: "1px", mt: 1 }} />
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
        <Box sx={{ w: "24px", h: "3px", bgColor: "gas", ml: "1px", mt: 1 }} />
      </Box>
    </Flex>
  );
};

export const VulnerabilityDistributionFilter: React.FC<{
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
  gas?: number | undefined;
  vulnerability: boolean[];
  setVulnerability: React.Dispatch<React.SetStateAction<boolean[]>>;
}> = ({
  critical,
  high,
  medium,
  low,
  informational,
  gas,
  vulnerability,
  setVulnerability,
}) => {
  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        mx: 2,
      }}
    >
      <Button
        flexDir={"column"}
        py={2}
        mx={2}
        height="fit-content"
        variant={vulnerability[0] ? "solid" : "outline"}
        onClick={() => {
          let newVulnerability = vulnerability;
          newVulnerability[0] = !newVulnerability[0];
          setVulnerability([...newVulnerability]);
        }}
      >
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{critical}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Crit</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "high", ml: "1px", mt: 1 }} />
      </Button>
      <Button
        flexDir={"column"}
        py={2}
        mx={2}
        height="fit-content"
        variant={vulnerability[1] ? "solid" : "outline"}
        onClick={() => {
          let newVulnerability = vulnerability;
          newVulnerability[1] = !newVulnerability[1];
          setVulnerability([...newVulnerability]);
        }}
      >
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{high}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>High</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "high", ml: "1px", mt: 1 }} />
      </Button>
      <Button
        flexDir={"column"}
        py={2}
        mx={2}
        height="fit-content"
        variant={vulnerability[2] ? "solid" : "outline"}
        onClick={() => {
          let newVulnerability = vulnerability;
          newVulnerability[2] = !newVulnerability[2];
          setVulnerability([...newVulnerability]);
        }}
      >
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{medium}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Med</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "medium", ml: "1px", mt: 1 }}
        />
      </Button>
      <Button
        flexDir={"column"}
        py={2}
        mx={2}
        height="fit-content"
        variant={vulnerability[3] ? "solid" : "outline"}
        onClick={() => {
          let newVulnerability = vulnerability;
          newVulnerability[3] = !newVulnerability[3];
          setVulnerability([...newVulnerability]);
        }}
      >
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{low}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Low</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "low", ml: "1px", mt: 1 }} />
      </Button>
      <Button
        flexDir={"column"}
        py={2}
        mx={2}
        height="fit-content"
        variant={vulnerability[4] ? "solid" : "outline"}
        onClick={() => {
          let newVulnerability = vulnerability;
          newVulnerability[4] = !newVulnerability[4];
          setVulnerability([...newVulnerability]);
        }}
      >
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{informational}</Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Infor</Text>
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "gray.400", ml: "1px", mt: 1 }}
        />
      </Button>
      <Button
        flexDir={"column"}
        py={2}
        mx={2}
        height="fit-content"
        variant={vulnerability[5] ? "solid" : "outline"}
        onClick={() => {
          let newVulnerability = vulnerability;
          newVulnerability[5] = !newVulnerability[5];
          setVulnerability([...newVulnerability]);
        }}
      >
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>
          {gas === undefined ? 0 : gas}
        </Text>
        <Text sx={{ color: "subtle", fontSize: "xs" }}>Gas</Text>
        <Box sx={{ w: "24px", h: "3px", bgColor: "gas", ml: "1px", mt: 1 }} />
      </Button>
    </Flex>
  );
};

export default VulnerabilityDistribution;

import React from "react";
import { Flex, Box, Text, Button, HStack } from "@chakra-ui/react";

import { IssueSeverityDistribution } from "common/types";
import { SeverityIcon } from "./icons";

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
        <Box
          sx={{ w: "24px", h: "3px", bgColor: "critical", ml: "1px", mt: 1 }}
        />
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
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{gas ? gas : 0}</Text>
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
  vulnerabilityParams: boolean[];
  setVulnerabilityFilter: any;
}> = ({
  critical,
  high,
  medium,
  low,
  informational,
  gas,
  vulnerabilityParams,
  setVulnerabilityFilter,
}) => {
  return (
    <Flex
      sx={{
        alignItems: "center",
        mt: 2.5,
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      <Button
        py={2}
        borderRadius={"24px"}
        height="fit-content"
        variant={vulnerabilityParams[0] ? "outline" : "solid"}
        borderColor={vulnerabilityParams[0] ? "critical" : "none"}
        backgroundColor={vulnerabilityParams[0] ? "white" : "#F8F8F8"}
        onClick={() => {
          let newVulnerability = vulnerabilityParams;
          newVulnerability[0] = !newVulnerability[0];
          setVulnerabilityFilter([...newVulnerability]);
        }}
      >
        <HStack spacing={1}>
          <SeverityIcon variant={"critical"} />
          <Text
            sx={{
              color: "subtle",
              lineHeight: 1.2,
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {critical}
          </Text>
          <Text sx={{ color: "subtle", fontSize: "xs", fontWeight: 500 }}>
            Critical
          </Text>
        </HStack>
      </Button>
      <Button
        py={2}
        borderRadius={"24px"}
        height="fit-content"
        variant={vulnerabilityParams[1] ? "outline" : "solid"}
        borderColor={vulnerabilityParams[1] ? "high" : "none"}
        backgroundColor={vulnerabilityParams[1] ? "white" : "#F8F8F8"}
        onClick={() => {
          let newVulnerability = vulnerabilityParams;
          newVulnerability[1] = !newVulnerability[1];
          setVulnerabilityFilter([...newVulnerability]);
        }}
      >
        <HStack spacing={1}>
          <SeverityIcon variant={"high"} />
          <Text
            sx={{
              color: "subtle",
              lineHeight: 1.2,
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {high}
          </Text>
          <Text sx={{ color: "subtle", fontSize: "xs", fontWeight: 500 }}>
            High
          </Text>
        </HStack>
      </Button>
      <Button
        py={2}
        borderRadius={"24px"}
        height="fit-content"
        variant={vulnerabilityParams[2] ? "outline" : "solid"}
        borderColor={vulnerabilityParams[2] ? "medium" : "none"}
        backgroundColor={vulnerabilityParams[2] ? "white" : "#F8F8F8"}
        onClick={() => {
          let newVulnerability = vulnerabilityParams;
          newVulnerability[2] = !newVulnerability[2];
          setVulnerabilityFilter([...newVulnerability]);
        }}
      >
        <HStack spacing={1}>
          <SeverityIcon variant={"medium"} />
          <Text
            sx={{
              color: "subtle",
              lineHeight: 1.2,
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {medium}
          </Text>
          <Text sx={{ color: "subtle", fontSize: "xs", fontWeight: 500 }}>
            Medium
          </Text>
        </HStack>
      </Button>
      <Button
        py={2}
        borderRadius={"24px"}
        height="fit-content"
        variant={vulnerabilityParams[3] ? "outline" : "solid"}
        borderColor={vulnerabilityParams[3] ? "low" : "none"}
        backgroundColor={vulnerabilityParams[3] ? "white" : "#F8F8F8"}
        onClick={() => {
          let newVulnerability = vulnerabilityParams;
          newVulnerability[3] = !newVulnerability[3];
          setVulnerabilityFilter([...newVulnerability]);
        }}
      >
        <HStack spacing={1}>
          <SeverityIcon variant={"low"} />
          <Text
            sx={{
              color: "subtle",
              lineHeight: 1.2,
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {low}
          </Text>
          <Text sx={{ color: "subtle", fontSize: "xs", fontWeight: 500 }}>
            Low
          </Text>
        </HStack>
      </Button>
      <Button
        py={2}
        borderRadius={"24px"}
        height="fit-content"
        variant={vulnerabilityParams[4] ? "outline" : "solid"}
        borderColor={vulnerabilityParams[4] ? "informational" : "none"}
        backgroundColor={vulnerabilityParams[4] ? "white" : "#F8F8F8"}
        onClick={() => {
          let newVulnerability = vulnerabilityParams;
          newVulnerability[4] = !newVulnerability[4];
          setVulnerabilityFilter([...newVulnerability]);
        }}
      >
        <HStack spacing={1}>
          <SeverityIcon variant={"informational"} />
          <Text
            sx={{
              color: "subtle",
              lineHeight: 1.2,
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {informational}
          </Text>
          <Text sx={{ color: "subtle", fontSize: "xs", fontWeight: 500 }}>
            Info
          </Text>
        </HStack>
      </Button>
      <Button
        py={2}
        borderRadius={"24px"}
        height="fit-content"
        variant={vulnerabilityParams[5] ? "outline" : "solid"}
        borderColor={vulnerabilityParams[5] ? "gas" : "none"}
        backgroundColor={vulnerabilityParams[5] ? "white" : "#F8F8F8"}
        onClick={() => {
          let newVulnerability = vulnerabilityParams;
          newVulnerability[5] = !newVulnerability[5];
          setVulnerabilityFilter([...newVulnerability]);
        }}
      >
        <HStack spacing={1}>
          <SeverityIcon variant={"gas"} />
          <Text
            sx={{
              color: "subtle",
              lineHeight: 1.2,
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {gas === undefined ? 0 : gas}
          </Text>
          <Text sx={{ color: "subtle", fontSize: "xs", fontWeight: 500 }}>
            Gas
          </Text>
        </HStack>
      </Button>
    </Flex>
  );
};

export default VulnerabilityDistribution;

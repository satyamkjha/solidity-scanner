import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

const SolidityScoreProgress: React.FC<{
  score: string;
  size: string;
  thickness: string;
  fontSize?: string;
  padding?: number | string;
}> = ({ score, size, thickness, fontSize, padding }) => {
  return (
    <CircularProgress
      value={parseFloat(score)}
      color="accent"
      thickness={thickness}
      size={size}
      p={padding ? padding : 2}
      capIsRound
      background="white"
      borderRadius={"50%"}
      border={"1px solid #EEEEEE"}
      sx={{
        "& > div:first-child": {
          transitionProperty:
            "stroke-dashoffset 1.5s ease 0s, stroke-dasharray 1.5s ease 0s, stroke 1.5s",
        },
      }}
    >
      <CircularProgressLabel sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <Text
            fontSize={fontSize ? fontSize : score === "100.00" ? "26px" : "xl"}
            fontWeight={600}
            color="accent"
          >
            {score === "100.00" ? 100 : score}
          </Text>
        </Box>
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default SolidityScoreProgress;

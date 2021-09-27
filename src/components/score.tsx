import React from "react";
import {
  Flex,
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { LogoIcon } from "components/icons";

export type ScoreProps = { score: string };
const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <Flex
      sx={{
        alignItems: "center",
      }}
    >
      {/* <CircularProgress
        value={(parseInt(score, 10) * 100) / 5}
        color="brand"
        capIsRound
      >
        <CircularProgressLabel
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <LogoIcon size={20} />
        </CircularProgressLabel>
      </CircularProgress> */}
      <Box mx={2} sx={{ textAlign: "center" }}>
        <Text
          sx={{
            color: "accent",
            fontSize: "2xl",
            fontWeight: 600,
            mx: "auto",
            lineHeight: 1,
          }}
        >
          {score}
        </Text>
        <Text sx={{ color: "subtle", fontSize: "sm", fontWeight: 600 }}>
          Score
        </Text>
      </Box>
    </Flex>
  );
};

export default Score;

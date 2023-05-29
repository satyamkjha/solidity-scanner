import { Box, Text } from "@chakra-ui/layout";
import React, { Component } from "react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const ThreatScoreMeter = ({
  strokeWidth = 11,
  diameter = 200,
  fontSize = "2xl",
  textMarginTop = -10,
  subtleFontSize = "xs",
  percentage,
}) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;
  const circumference = Math.PI * radius;

  let percentageValue;
  if (percentage > 100) {
    percentageValue = 100;
  } else if (percentage < 0) {
    percentageValue = 0;
  } else {
    percentageValue = percentage;
  }
  const semiCirclePercentage = percentageValue * (circumference / 100);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <svg
        width={diameter}
        height={diameter / 2}
        style={{
          transform: "rotateY(180deg)",
          backgroundImage: `url(${assetsURL}background/meterBg.svg)`,
          backgroundPositionX: diameter * 0.1,
          backgroundPositionY: diameter * 0.1,
          backgroundSize: diameter * 0.8,
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "content-box",
        }}
      >
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={"#D9D9D9"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference,
          }}
        />
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={
            !percentage
              ? ""
              : percentage > 80
              ? "#68C78E"
              : percentage > 50
              ? "#FFC661"
              : "#FF5630"
          }
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: semiCirclePercentage,
            transition:
              "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s",
          }}
        />
      </svg>
      <Text
        position={"absolute"}
        w="100%"
        mt={textMarginTop}
        fontSize={fontSize}
        fontWeight="700"
      >
        {percentage}
        <Box as={"span"} color="gray.500" fontSize={subtleFontSize}>
          /100
        </Box>
      </Text>
    </div>
  );
};

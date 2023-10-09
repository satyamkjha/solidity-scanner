import React, { useEffect } from "react";
import { Grid, GridItem, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const HeroInfographics: React.FC = () => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [singleRow, doubleRow] = useMediaQuery([
    "(max-width: 600px)",
    "(max-width: 1200px)",
  ]);

  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  const data: {
    url: string;
    text: string;
  }[] = [
    { url: "landing/infographics/ai_scan.svg", text: "AI Powered Scan" },
    {
      url: "landing/infographics/seamless_integrations.svg",
      text: "Seamless Integrations",
    },
    {
      url: "landing/infographics/vulnerability_detectors.svg",
      text: `${no_of_vuln_detectors}+ Vulnerability Detectors`,
    },
    { url: "landing/infographics/audit_report.svg", text: "Audit Report" },
  ];

  return (
    <Grid
      backgroundColor="#FFFFFF00"
      w="100%"
      h="fit-content"
      px={[5, 5, 10]}
      py={20}
      mb={20}
      templateColumns={
        singleRow
          ? "repeat(1, 1fr)"
          : doubleRow
          ? "repeat(2, 1fr)"
          : "repeat(4, 1fr)"
      }
    >
      {data.map((item, index) => (
        <GridItem
          key={index}
          borderRadius={20}
          w="100%"
          h={"300px"}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={`${assetsURL}${item.url}`}
            height={"200px"}
            width={"200px"}
          />
          <Text fontSize="md" ml="2" mt={4} color="white" fontWeight={600}>
            {item.text}
          </Text>
        </GridItem>
      ))}
    </Grid>
  );
};

import React, { useEffect, useState, useRef } from "react";
import { Grid, GridItem, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { isInViewport } from "common/functions";

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
    { url: "landing/infographics/ai_scan.svg", text: "AI Powered Scanning" },
    {
      url: "landing/infographics/seamless_integrations.svg",
      text: "Seamless Integrations",
    },
    {
      url: "landing/infographics/vulnerability_detectors.svg",
      text: `140+ Vulnerability Detectors`,
    },
    {
      url: "landing/infographics/audit_report.svg",
      text: "Generate Audit Reports",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(70);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = document.getElementById("public_layout");
    if (element) {
      element.addEventListener("scroll", function (event) {
        if (isInViewport(ref.current, setAnimationOffset)) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }
    return () => {
      element?.removeEventListener("scroll", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      backgroundColor="#FFFFFF00"
      w="100%"
      h="fit-content"
      px={[5, 5, 10]}
      py={20}
      mb={20}
      ref={ref}
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
          opacity={isVisible ? 1 : 0}
          transform={`translateY(${
            isVisible ? 0 : animationOffset + index * 20
          }px)`}
          transition={`opacity ${(3 + index * 1.5) / 10}s ease-in, transform ${
            (5 + index * 1.5) / 10
          }s ease-in`}
        >
          <Image
            src={`${assetsURL}${item.url}`}
            height={item.text === "Audit Report" ? "230px" : "200px"}
            width={item.text === "Audit Report" ? "230px" : "200px"}
          />
          <Text fontSize="md" ml="2" mt={4} color="white" fontWeight={600}>
            {item.text}
          </Text>
        </GridItem>
      ))}
    </Grid>
  );
};

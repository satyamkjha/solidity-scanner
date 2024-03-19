import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import AnimatedNumbers from "react-animated-numbers";
import { isInViewport } from "common/functions";
import { useConfig } from "hooks/useConfig";
import { getFeatureGateConfig } from "helpers/helperFunction";

export default function ProductNumbers() {
  const config: any = useConfig();

  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  const data: {
    color: string;
    heading: string;
    subHeading: string;
    headingNumber: number;
  }[] = [
    {
      color: "#EDFCFE",
      heading: "M $ +",
      headingNumber: getFeatureGateConfig().product_numbers.hacks_value,
      subHeading: "Hacks & exploits losses",
    },
    {
      color: "#F4EFFF",
      heading: " +",
      headingNumber: getFeatureGateConfig().product_numbers.vuln_detectors,
      subHeading: "Code patterns detected",
    },
    {
      color: "#F4EFFF",
      heading: "M $ +",
      headingNumber: getFeatureGateConfig().product_numbers.contracts_worth,
      subHeading: "Worth of contracts secured",
    },
    {
      color: "#EDFCFE",
      heading: "M +",
      headingNumber: getFeatureGateConfig().product_numbers.lines_of_code,
      subHeading: "Line of code scanned",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(70);
  const ref = useRef<HTMLDivElement>(null);
  const [stopAnimation] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const element = document.getElementById("public_layout");
    if (element && !stopAnimation) {
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
    <Flex
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      my={24}
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      h="fit-content"
      px={[0, 0, 0, 10]}
      ref={ref}
    >
      <Grid
        backgroundColor="#FFFFFF00"
        w="100%"
        h="fit-content"
        px={10}
        maxW={["450px", "450px", "900px"]}
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={[5, 10, 0]}
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
            bgColor={item.color}
            opacity={stopAnimation || isVisible ? 1 : 0}
            transform={
              stopAnimation
                ? "none"
                : `translateY(${isVisible ? 0 : animationOffset}px)`
            }
            transition={
              stopAnimation
                ? "none"
                : "opacity 0.25s ease-in, transform 0.5s ease-in"
            }
          >
            <Flex flexDir="row" alignItems="center" justifyContent="flex-start">
              <Heading color="#323B4B" fontSize="5xl" fontWeight={900}>
                <AnimatedNumbers
                  includeComma
                  animateToNumber={item.headingNumber}
                  locale="en-US"
                />
              </Heading>
              <Heading mt={1} color="#323B4B" fontSize="5xl" fontWeight={900}>
                {item.heading}
              </Heading>
            </Flex>
            <Text color="#323B4B">{item.subHeading}</Text>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

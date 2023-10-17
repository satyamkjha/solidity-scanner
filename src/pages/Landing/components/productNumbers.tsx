import React, { useState, useRef, useEffect } from "react";
import { Flex, Text, Heading, HStack, Grid, GridItem } from "@chakra-ui/react";
import AnimatedNumbers from "react-animated-numbers";
import { isInViewport } from "common/functions";

export default function ProductNumbers() {
  const data: {
    color: string;
    heading: string;
    subHeading: string;
    headingNumber: number;
  }[] = [
    {
      color: "#EDFCFE",
      heading: "M $ +",
      headingNumber: 200,
      subHeading: "Hacks & exploits losses",
    },
    {
      color: "#F4EFFF",
      heading: " +",
      headingNumber: 140,
      subHeading: "Code patterns detected",
    },
    {
      color: "#F4EFFF",
      heading: "M $ +",
      headingNumber: 52.4,
      subHeading: "Worth of contracts secured",
    },
    {
      color: "#EDFCFE",
      heading: "M +",
      headingNumber: 6.4,
      subHeading: "Line of code scanned",
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
      element?.removeEventListener("scroll", () =>
        console.log("removed listner")
      );
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
            opacity={isVisible ? 1 : 0}
            transform={`translateY(${isVisible ? 0 : animationOffset}px)`}
            transition="opacity 0.25s ease-in, transform 0.5s ease-in"
          >
            <HStack spacing={0}>
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
            </HStack>
            <Text color="#323B4B">{item.subHeading}</Text>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

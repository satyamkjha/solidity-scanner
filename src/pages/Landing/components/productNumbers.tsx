import React from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  HStack,
  VStack,
  SkeletonText,
  Skeleton,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { teamsData } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import AnimatedNumbers from "react-animated-numbers";

export default function ProductNumbers() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const [isDesktopView] = useMediaQuery("(max-width: 1350px)");

  const data: {
    color: string;
    heading: string;
    subHeading: string;
    headingNumber: number;
  }[] = [
    {
      color: "#EDFCFE",
      heading: "0 M",
      headingNumber: 28.5,
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
      heading: "M $",
      headingNumber: 2.4,
      subHeading: "Worth of contracts secured",
    },
    {
      color: "#EDFCFE",
      heading: "0+ M",
      headingNumber: 1.6,
      subHeading: "Line of code scanned",
    },
  ];

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
          >
            <HStack spacing={0}>
              <Heading color="#323B4B" fontSize="5xl" fontWeight={900}>
                <AnimatedNumbers
                  includeComma
                  animateToNumber={item.headingNumber}
                  locale="en-US"
                  configs={[
                    { mass: 1, tension: 220, friction: 100 },
                    { mass: 1, tension: 180, friction: 130 },
                    { mass: 1, tension: 280, friction: 90 },
                    { mass: 1, tension: 180, friction: 135 },
                    { mass: 1, tension: 260, friction: 100 },
                    { mass: 1, tension: 210, friction: 180 },
                  ]}
                />
              </Heading>
              <Heading color="#323B4B" fontSize="5xl" fontWeight={900}>
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

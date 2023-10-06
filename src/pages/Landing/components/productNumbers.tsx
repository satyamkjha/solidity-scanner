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

export default function ProductNumbers() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const [isDesktopView] = useMediaQuery("(max-width: 1350px)");

  const data: {
    color: string;
    heading: string;
    subHeading: string;
  }[] = [
    {
      color: "#EDFCFE",
      heading: "28.50 M",
      subHeading: "Hacks & exploits losses",
    },
    {
      color: "#F4EFFF",
      heading: "140 +",
      subHeading: "Code patterns detected",
    },
    {
      color: "#F4EFFF",
      heading: "2.4M $",
      subHeading: "Worth of contracts secured",
    },
    {
      color: "#EDFCFE",
      heading: "1.60+ M",
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
        {data.map((item) => (
          <GridItem
            borderRadius={20}
            w="100%"
            h={"300px"}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            bgColor={item.color}
          >
            <Heading color="#323B4B" fontSize="5xl" fontWeight={900}>
              {item.heading}
            </Heading>
            <Text color="#323B4B">{item.subHeading}</Text>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

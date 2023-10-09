import React, { useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";

export default function Partners() {
  const assetsURL = getAssetsURL();

  const data: {
    url: string;
  }[] = [
    { url: "landing/partners/hacken.svg" },
    {
      url: "landing/partners/resonance.svg",
    },
    {
      url: "landing/partners/airchains.svg",
    },
    { url: "landing/partners/tiacoin.svg" },
    {
      url: "landing/partners/blockhubble.svg",
    },
    { url: "landing/partners/reef.svg" },
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
      py={10}
      px={[0, 0, 0, 10, 24]}
    >
      <Heading
        width="90%"
        maxW="700px"
        as="h2"
        fontSize="3xl"
        fontWeight={800}
        my={5}
      >
        Lorem ipsum dolor sit amet consectetur. Ipsum quis quisque{" "}
        <Box as="span" sx={{ color: "accent" }}>
          luctus senectus sagittis
        </Box>
      </Heading>
      <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={5}>
        Lorem ipsum dolor sit amet consectetur. At velit duis mattis
      </Text>
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        flexDir="column"
        position="relative"
      >
        <Box
          sx={{
            borderRadius: "100px",
            opacity: 0.7,
            background: "rgba(82, 255, 0, 0.32)",
            filter: "blur(250px)",
            position: "absolute",
            width: "633.226px",
            height: "642px",
            top: -100,
            right: -300,
            zIndex: 0,
          }}
        ></Box>
        <Box
          sx={{
            borderRadius: "100px",
            opacity: 0.7,
            background: "rgba(82, 255, 0, 0.32)",
            filter: "blur(250px)",
            position: "absolute",
            width: "633.226px",
            height: "642px",
            bottom: -100,
            left: -300,
            zIndex: 0,
          }}
        ></Box>
        <Grid
          backgroundColor="#FFFFFF00"
          w="100%"
          h="fit-content"
          p={10}
          my={10}
          zIndex={10}
          position="relative"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={10}
        >
          {data.map((item, index) => (
            <GridItem
              key={index}
              borderRadius={20}
              w="100%"
              h="220px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgColor="white"
            >
              <Image
                onClick={() => window.open("", "_blank")}
                src={`${assetsURL}${item.url}`}
              />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}

import React, { useEffect, useState, useRef } from "react";
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
import { isInViewport } from "common/functions";

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
      ref={ref}
      px={[0, 0, 0, 10, 24]}
    >
      <Heading
        width="90%"
        maxW="1000px"
        as="h2"
        fontSize="3xl"
        fontWeight={700}
        my={5}
      >
        Partnering with{" "}
        <Box as="span" sx={{ color: "accent" }}>
          Excellence
        </Box>{" "}
        for Your Success.
      </Heading>
      <Text maxW="1000px" color="subtle" fontSize={["lg", "lg", "xl"]} mb={5}>
        Discover the potential of collaboration as we proudly introduce our
        esteemed partners. These valuable partnerships enable us to deliver
        outstanding solutions and services, supported by a network of expertise
        and innovation.
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
              opacity={isVisible ? 1 : 0}
              transform={`translateY(${
                isVisible ? 0 : animationOffset + index * 20
              }px)`}
              transition={`opacity ${
                (3 + index * 1.5) / 10
              }s ease-in, transform ${(5 + index * 1.5) / 10}s ease-in`}
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

import React, { useState, useRef, useEffect } from "react";
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
} from "@chakra-ui/react";
import { teamsData } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { isInViewport } from "common/functions";

export default function AboutUs() {
  const assetsURL = getAssetsURL();

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
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ textAlign: "center" }}
      my={24}
      py={10}
      h="fit-content"
      ref={ref}
      px={[0, 0, 0, 24]}
    >
      <Box mb={20} position="relative" width="fit-content" height="fit-content">
        <Heading fontSize="3xl" mb={3}>
          Meet the Team
        </Heading>
        <Box
          bottom={0}
          right={0}
          position="absolute"
          width="120px"
          height="5px"
          bgColor="#30F"
        />
      </Box>

      <Text
        px={[5, 10]}
        color="subtle"
        fontSize={["lg", "lg", "xl"]}
        mb={5}
        maxW="600px"
      >
        We're always eager to discuss anything related to security.
      </Text>
      <Flex
        as="div"
        w="100%"
        alignItems="center"
        py={10}
        my={[5, 5, 20]}
        flexDir={["column", "column", "row"]}
        justifyContent={"center"}
      >
        {teamsData.line1.map((data, index) => (
          <Flex
            as="div"
            key={index}
            alignItems="center"
            flexDir={["row", "row", "row"]}
            justifyContent={"flex-start"}
            mx={20}
            my={[5, 5, 5, 0]}
            opacity={isVisible ? 1 : 0}
            transform={`translateY(${
              isVisible ? 0 : animationOffset + index * 20
            }px)`}
            transition={`opacity ${
              (3 + index * 1.5) / 10
            }s ease-in, transform ${(5 + index * 1.5) / 10}s ease-in`}
          >
            <VStack spacing={0}>
              <Box
                height={"200px"}
                mb={"-195px"}
                zIndex={10}
                width="200px"
                borderRadius={"50%"}
                backgroundImage={`url(${assetsURL}${data.imgUrl})`}
                backgroundSize="contain"
                backgroundPosition={"center"}
              />
              <Box
                height={"200px"}
                width="200px"
                borderRadius={"50%"}
                background={
                  "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
                }
              />

              <Text
                marginTop={"15px !important"}
                textAlign={"left"}
                fontSize="xl"
              >
                {data.name}
              </Text>
              <Text
                textAlign={"left"}
                color={"gray.400"}
                fontSize="xl"
                fontWeight={500}
              >
                {data.designation}
              </Text>
              <HStack marginTop={"15px !important"} spacing={5}>
                <Image
                  onClick={() => {
                    window.open(data.linkedinUrl, "_blank");
                  }}
                  src={`${assetsURL}landing/socials/linkedin.svg`}
                  height={"30px"}
                  width={"30px"}
                  alt={"Linkedin"}
                />
                <Image
                  onClick={() => {
                    window.open(data.twitterUrl, "_blank");
                  }}
                  src={`${assetsURL}landing/socials/twitter.svg`}
                  height={"30px"}
                  width={"30px"}
                  borderRadius={"5px"}
                  alt={"Twitter"}
                />
              </HStack>
            </VStack>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export function AboutUsSkeleton() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      py={24}
      px={[0, 0, 0, 24]}
      w="100%"
      flexDir={"column"}
    >
      <SkeletonText
        startColor="lightgray"
        endColor="#eeeeee"
        noOfLines={2}
        spacing="4"
        skeletonHeight="5"
        w={["100%", "100%", "60%"]}
      />
      <Flex
        flexDir={["column", "column", "column", "row"]}
        alignItems={"center"}
        justifyContent={"center"}
        w={"40%"}
        mt={20}
      >
        <Flex
          flexDir="column"
          align={"center"}
          w={"100%"}
          mx={10}
          my={[5, 5, 5, 0]}
        >
          <Skeleton
            w={"200px"}
            h={"200px"}
            startColor="lightgray"
            endColor="#eeeeee"
            borderRadius={"50%"}
          ></Skeleton>
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={3}
            spacing="4"
            skeletonHeight="2"
            w={"100%"}
            mt={6}
          />
        </Flex>
        <Flex
          flexDir="column"
          align={"center"}
          w={"100%"}
          mx={10}
          my={[5, 5, 5, 0]}
        >
          <Skeleton
            w={"200px"}
            h={"200px"}
            startColor="lightgray"
            endColor="#eeeeee"
            borderRadius={"50%"}
          ></Skeleton>
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={3}
            spacing="4"
            skeletonHeight="2"
            w={"100%"}
            mt={6}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

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
  Stack,
} from "@chakra-ui/react";
import { teamsData } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export default function AboutUs() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  return (
    <Box
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      my={24}
      px={[0, 0, 0, 24]}
    >
      <Heading fontSize="3xl" mb={5}>
        Meet the Founders
      </Heading>
      <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={5}>
        Meet the experts behind the scenes. We are always excited to talk about
        anything in crypto.
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
        {teamsData.line1.map((data) => (
          <Flex
            as="div"
            alignItems="center"
            flexDir={["row", "row", "row"]}
            justifyContent={"flex-start"}
            mx={10}
            my={[5, 5, 5, 0]}
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
      {/* <Flex
            as="div"
            w="100%"
            alignItems="center"
            py={10}
            my={10}
            flexDir={["column", "column", "row"]}
            justifyContent={"center"}
          >
            {teamsData.line2.map((data) => (
              <Flex
                as="div"
                alignItems="center"
                flexDir={["row", "row", "row"]}
                justifyContent={"flex-start"}
                mx={10}
              >
                <VStack spacing={0}>
                  <Box
                    height={"200px"}
                    mb={"-195px"}
                    zIndex={10}
                    width="200px"
                    borderRadius={"50%"}
                    backgroundImage={`url(${data.imgUrl})`}
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
                      src="/socials/linkedin.svg"
                      height={"30px"}
                      width={"30px"}
                      alt={"Linkedin"}
                    />
                    <Image
                      onClick={() => {
                        window.open(data.twitterUrl, "_blank");
                      }}
                      src="/socials/twitter.svg"
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
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            py={10}
            my={10}
            flexDir={["column", "column", "row"]}
            justifyContent={"center"}
          >
            {teamsData.line3.map((data) => (
              <Flex
                as="div"
                alignItems="center"
                flexDir={["row", "row", "row"]}
                justifyContent={"flex-start"}
                mx={10}
              >
                <VStack spacing={0}>
                  <Box
                    height={"200px"}
                    mb={"-195px"}
                    zIndex={10}
                    width="200px"
                    borderRadius={"50%"}
                    backgroundImage={`url(${data.imgUrl})`}
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
                      src="/socials/linkedin.svg"
                      height={"30px"}
                      width={"30px"}
                      alt={"Linkedin"}
                    />
                    <Image
                      onClick={() => {
                        window.open(data.twitterUrl, "_blank");
                      }}
                      src="/socials/twitter.svg"
                      height={"30px"}
                      width={"30px"}
                      borderRadius={"5px"}
                      alt={"Twitter"}
                    />
                  </HStack>
                </VStack>
              </Flex>
            ))}
          </Flex> */}
    </Box>
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

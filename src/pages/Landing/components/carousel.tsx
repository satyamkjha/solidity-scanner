import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import {
  Image,
  Box,
  Heading,
  Text,
  Flex,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

const ImageCarousel = () => {
  const imgSourceList = [
    {
      src: "landing/carousel/Screenshot_1.png",
      alt: "View detailed scan result of your smart contracts on SolidityScan",
    },
    {
      src: "landing/carousel/Screenshot_2.png",
      alt: "Find Bugs highlighted and pin pointed in your code for an easy fix on SolidityScan",
    },
    {
      src: "landing/carousel/Screenshot_3.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "landing/carousel/Screenshot_4.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "landing/carousel/Screenshot_5.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "landing/carousel/Screenshot_6.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "landing/carousel/Screenshot_7.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "landing/carousel/Screenshot_8.png",
      alt: "Easily manage your projects and scans on SolidityScan",
    },
  ];

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Box
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      mb={10}
      mt={[10, 10, 20]}
      px={[0, 0, 0, 24]}
    >
      <Heading as="h2" fontSize="3xl" my={5}>
        Fully automated smart contract audit system <br /> to help{" "}
        <Box as="span" sx={{ color: "accent" }}>
          secure your products faster
        </Box>
      </Heading>
      <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
        Focus on what matters most, our robots handle the rest ☕️
      </Text>
      <Carousel plugins={["arrows"]}>
        {imgSourceList.map((src) => (
          <Image
            
            src={`${assetsURL}${src.src}`}
            alt={src.alt}
            // margin="30px"
            width="90%"
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;

export function CarouselSkeleton() {
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
        w={"100%"}
        h={["20vh", "20vh", "20vh", "70vh"]}
        mt={20}
      >
        <Skeleton
          w={"80%"}
          h={"100%"}
          startColor="lightgray"
          endColor="#eeeeee"
          borderRadius={"5px"}
        ></Skeleton>
      </Flex>
    </Flex>
  );
}

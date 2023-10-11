import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Heading,
  SkeletonText,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import "../../../styles/testimonial.css";
import { userTestimonials } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { isInViewport } from "common/functions";

const UserTestimonial: React.FC = () => {
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
    <Box
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      my={24}
      py={10}
      px={[5, 10, 10, 20]}
      ref={ref}
    >
      <Heading fontSize="3xl" mb={20}>
        What People are Saying about us
      </Heading>
      {/* <Text color="subtle" fontSize="xl" mb={4}>
            Meet the experts behind the scenes. We are always excited to talk
            about anything in crypto.
          </Text> */}

      <Swiper
        initialSlide={1}
        slidesPerView={2}
        spaceBetween={150}
        breakpoints={{
          280: {
            slidesPerView: 1,
            height: 700,
          },
          768: {
            slidesPerView: 1,
            height: 400,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 120,
            height: 400,
          },
          1440: {
            slidesPerView: 2,
            spaceBetween: 150,
            height: 400,
          },
        }}
        centeredSlides={true}
        navigation={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 2,
          depth: 65,
          modifier: 8,
          slideShadows: false,
        }}
        effect={"coverflow"}
        pagination={{
          clickable: true,
        }}
        style={{
          marginTop: "50px",
          paddingTop: "50px",
          paddingLeft: "20px",
          paddingRight: "20px",
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : animationOffset}px)`,
          transition: "opacity 0.25s ease-in, transform 0.5s ease-in",
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
      >
        {userTestimonials.map((data, index) => (
          <SwiperSlide
            key={index}
            style={{ height: "calc(100% - 60px)", width: "100%" }}
          >
            <Flex
              w={["85%", "85%", "90%", "92%"]}
              h={"100%"}
              flexDir={"column"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              margin={[4]}
              marginLeft={"auto"}
              marginRight={"auto"}
              boxShadow="0px 16px 32px rgba(0, 0, 0, 0.13)"
              borderRadius="15px"
              backgroundColor={"#FFFFFF"}
            >
              <Image
                mt={"-50px"}
                mb={2}
                height={"120px"}
                width="120px"
                src={`${assetsURL}landing/testimonial/${data.imageUrl}`}
                borderRadius={"50%"}
              />
              <Text fontSize="lg">{data.name}</Text>
              <Text color="subtle" fontSize="md" px={2}>
                {data.designation}
              </Text>
              <Box>
                <Image
                  src={`${assetsURL}landing/testimonial/quoteStart.svg`}
                  ml={4}
                />
                <Text
                  padding={["4", "4", "8", "10"]}
                  mt={-20}
                  fontSize={["sm", "sm", "sm", "md"]}
                  fontStyle="italic"
                  fontWeight="400"
                >
                  {'"' + data.testimonial + ' "'}
                </Text>
                <Image
                  src={`${assetsURL}landing/testimonial/quoteEnd.svg`}
                  mb={10}
                  ml={"auto"}
                  mr={4}
                  mt={-20}
                />
              </Box>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default UserTestimonial;

export function TestimonialSkeleton() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      py={28}
      px={[0, 0, 0, 24]}
      w="100%"
      flexDir={["column"]}
    >
      <SkeletonText
        startColor="lightgray"
        endColor="#eeeeee"
        noOfLines={1}
        spacing="4"
        skeletonHeight="8"
        w={"50%"}
        mb={[10]}
      />
      <HStack
        my={10}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={10}
      >
        <Flex
          flexDir={"column"}
          w="20%"
          align="center"
          display={["none", "none", "none", "flex"]}
        >
          <Skeleton
            w={"80px"}
            h={"80px"}
            startColor="lightgray"
            endColor="#eeeeee"
            borderRadius={"50%"}
          ></Skeleton>
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={2}
            spacing="4"
            skeletonHeight="4"
            w={["50%"]}
            mt={6}
          />
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={10}
            spacing="3"
            skeletonHeight="2"
            w={["100%"]}
            mt={10}
          />
        </Flex>
        <Flex flexDir={"column"} w="40%" align="center">
          <Skeleton
            w={"120px"}
            h={"120px"}
            startColor="lightgray"
            endColor="#eeeeee"
            borderRadius={"50%"}
          ></Skeleton>
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={2}
            spacing="4"
            skeletonHeight="4"
            w={["50%"]}
            mt={6}
          />
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={14}
            spacing="3"
            skeletonHeight="2"
            w={["100%"]}
            mt={10}
          />
        </Flex>
        <Flex
          flexDir={"column"}
          w="20%"
          align="center"
          display={["none", "none", "none", "flex"]}
        >
          <Skeleton
            w={"80px"}
            h={"80px"}
            startColor="lightgray"
            endColor="#eeeeee"
            borderRadius={"50%"}
          ></Skeleton>
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={2}
            spacing="4"
            skeletonHeight="4"
            w={["50%"]}
            mt={6}
          />
          <SkeletonText
            startColor="lightgray"
            endColor="#eeeeee"
            noOfLines={10}
            spacing="3"
            skeletonHeight="2"
            w={["100%"]}
            mt={10}
          />
        </Flex>
      </HStack>
    </Flex>
  );
}

import React, { Component } from "react";

import { Box, Text, VStack, Image } from "@chakra-ui/react";

import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import "./testimonial.css";

import { userTestimonials } from "common/values";

const UserTestimonial: React.FC = () => {
  {
    return (
      <Swiper
        initialSlide={1}
        slidesPerView={2}
        spaceBetween={150}
        breakpoints={{
          280: {
            slidesPerView: 1,
            height: 600,
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
        style={{ marginTop: "50px", paddingTop: "50px" }}
        modules={[EffectCoverflow, Navigation, Pagination]}
      >
        {userTestimonials.map((data, index) => (
          <SwiperSlide
            key={index}
            style={{ height: "calc(100% - 60px)", width: "100%" }}
          >
            <Box
              w={["85%", "85%", "90%", "92%"]}
              margin={[4]}
              marginLeft={"auto"}
              marginRight={"auto"}
              boxShadow="0px 16px 32px rgba(0, 0, 0, 0.13)"
              borderRadius="15px"
            >
              <VStack>
                <Image
                  mt={"-50px"}
                  mb={2}
                  height={"120px"}
                  width="120px"
                  src={data.imageUrl}
                  borderRadius={"50%"}
                />
                <Text fontSize="lg">{data.name}</Text>
                <Text color="subtle" fontSize="md" px={2}>
                  {data.designation}
                </Text>
                <Box>
                  <Image src="/testimonials/quoteStart.svg" ml={4} />
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
                    src="/testimonials/quoteEnd.svg"
                    mb={10}
                    ml={"auto"}
                    mr={4}
                    mt={-20}
                  />
                </Box>
              </VStack>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};

export default UserTestimonial;

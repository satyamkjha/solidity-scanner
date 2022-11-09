import React, { Component } from "react";

import { Box, Text, VStack } from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import "./testimonial.css";

import { userTestimonials } from "common/values";

export class UserTestimonial extends Component {
  render() {
    return (
      <Swiper
        initialSlide={1}
        slidesPerView={2}
        spaceBetween={150}
        breakpoints={{
          320: {
            slidesPerView: 1,
            height: 600,
            width: 250,
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
        style={{ marginTop: "50px" }}
        modules={[EffectCoverflow, Navigation, Pagination]}
      >
        {userTestimonials.map((data, index) => (
          <SwiperSlide
            key={index}
            style={{ height: "calc(100% - 60px)", width: "100%" }}
          >
            <Box
              margin={"20px"}
              boxShadow="0px 16px 32px rgba(0, 0, 0, 0.13)"
              borderRadius="15px"
            >
              <VStack>
                <Text fontSize="lg" mt="10">
                  {data.name}
                </Text>
                <Text color="subtle" fontSize="md">
                  {data.designation}
                </Text>
                <Box>
                  <Text
                    padding={"10"}
                    fontSize="xl"
                    fontStyle="italic"
                    fontWeight="400"
                  >
                    {'"' + data.testimonial + '"'}
                  </Text>
                </Box>
              </VStack>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
}

export default UserTestimonial;

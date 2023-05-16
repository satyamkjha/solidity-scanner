import React from "react";
import { Box, Text, Flex, Image, Heading } from "@chakra-ui/react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import "./testimonial.css";
import { userTestimonials } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";

const UserTestimonial: React.FC = () => {
  const assetsURL = getAssetsURL();
  return (
    <Box
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      my={28}
      px={[0, 0, 0, 24]}
    >
      <Heading fontSize="3xl" mb={10}>
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
        style={{ marginTop: "50px", paddingTop: "50px" }}
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

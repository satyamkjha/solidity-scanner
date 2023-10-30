import React, { useEffect, useState } from "react";
import { Flex, Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const LatestHacks: React.FC = () => {
  const data: {
    articleLink: string;
    articleHeading: string;
    articleDate: string;
  }[] = [
    {
      articleLink:
        "https://blog.solidityscan.com/starsarena-hack-analysis-e71d78704e85?source=rss----3e911405e793---4",
      articleHeading: "StarsArena Hack Analysis",
      articleDate: "Fri, 13 Oct 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/exactly-protocol-hack-analysis-6ebc99d3e7b1?source=rss----3e911405e793---4",
      articleHeading: "Exactly Protocol Hack Analysis",
      articleDate: "Mon, 09 Oct 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/banana-token-hack-analysis-3f6f84c08b8f?source=rss----3e911405e793---4",
      articleHeading: "Banana Token Hack Analysis",
      articleDate: "Tue, 12 Sep 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/dappsocial-hack-analysis-3b8bf243a850?source=rss----3e911405e793---4",
      articleHeading: "DAppSocial Hack Analysis",
      articleDate: "Fri, 08 Sep 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/zunami-protocol-hack-analysis-e95981976e11?source=rss----3e911405e793---4",
      articleHeading: "Zunami Protocol Hack Analysis",
      articleDate: "Tue, 05 Sep 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/earningfarm-hack-analysis-f5eba2a1e080?source=rss----3e911405e793---4",
      articleHeading: "EarningFarm Hack Analysis",
      articleDate: "Thu, 24 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/uwerx-hack-analysis-f03b061bb07b?source=rss----3e911405e793---4",
      articleHeading: "Uwerx Hack Analysis",
      articleDate: "Tue, 08 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/jpegd-hack-analysis-a5a3dc89fa4?source=rss----3e911405e793---4",
      articleHeading: "JPEG’d Hack Analysis",
      articleDate: "Mon, 07 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/platypus-hack-analysis-a7d2f6d1f96e?source=rss----3e911405e793---4",
      articleHeading: "Platypus Hack Analysis",
      articleDate: "Thu, 03 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/ffist-hack-analysis-9cb695c0fad9?source=rss----3e911405e793---4",
      articleHeading: "$FFIST Hack Analysis",
      articleDate: "Fri, 28 Jul 2023 ",
    },
  ];

  return (
    <Flex
      as="section"
      w="100%"
      alignItems="center"
      p={0}
      textAlign={["center", "center"]}
      flexDir="column"
    >
      <Box
        display={"flex"}
        // flexDir="column"
        alignItems="center"
        justifyContent={"flex-start"}
        w={"90%"}
        px={[0, 0, 0]}
        py={10}
        my={10}
        borderRadius={20}
        background={"#FFFFFF"}
      >
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              style={{
                width: "fit-content",
                height: "fit-content",
                opacity: 1,
              }}
            >
              <ArticleComp key={index} {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

const ArticleComp: React.FC<{
  articleLink: string;
  articleHeading: string;
  articleDate: string;
}> = ({ articleLink, articleHeading, articleDate }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      width={"90vw"}
      maxW="450px"
      height="fit-content"
      borderRadius="25px"
      mr={5}
      background={"#FAFBFC"}
    >
      <Flex
        backgroundImage={`${assetsURL}background/latest_hack_post_bg.svg`}
        width="100%"
        height={["auto", "270px"]}
        borderRadius="25px"
        flexDir="column"
        pt={"60px"}
        justifyContent="flex-start"
        alignItems="center"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
      >
        <Heading
          color={"white"}
          w="80%"
          fontSize={"3xl"}
          sx={{
            background:
              "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {articleHeading}
        </Heading>
      </Flex>
      <Flex
        justifyContent={["flex-start", "space-between"]}
        alignItems="center"
        flexDir={["column", "row"]}
        p={5}
        borderBottomLeftRadius="25px"
        borderBottomRightRadius="25px"
        width="100%"
        height={["fit-content", "100px"]}
        background={"#FAFBFC"}
      >
        <VStack
          spacing={1}
          textAlign={["center", "left"]}
          alignItems={["center", "flex-start"]}
        >
          <Text fontSize="sm">{articleHeading}</Text>
          <Text fontSize="xs" color="#78909C">
            Published in . {articleDate}
          </Text>
        </VStack>
        <Button
          onClick={() => window.open(articleLink, "_blank")}
          fontSize="14px"
          py={5}
          px={10}
          mt={3}
          variant="cta-outline"
          w=""
        >
          Read Full Article
        </Button>
      </Flex>
    </Flex>
  );
};

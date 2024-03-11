import React from "react";
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
      articleHeading: "StarsArena",
      articleDate: "Fri, 13 Oct 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/exactly-protocol-hack-analysis-6ebc99d3e7b1?source=rss----3e911405e793---4",
      articleHeading: "Exactly Protocol",
      articleDate: "Mon, 09 Oct 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/banana-token-hack-analysis-3f6f84c08b8f?source=rss----3e911405e793---4",
      articleHeading: "Banana Token",
      articleDate: "Tue, 12 Sep 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/dappsocial-hack-analysis-3b8bf243a850?source=rss----3e911405e793---4",
      articleHeading: "DAppSocial",
      articleDate: "Fri, 08 Sep 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/zunami-protocol-hack-analysis-e95981976e11?source=rss----3e911405e793---4",
      articleHeading: "Zunami Protocol",
      articleDate: "Tue, 05 Sep 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/earningfarm-hack-analysis-f5eba2a1e080?source=rss----3e911405e793---4",
      articleHeading: "EarningFarm",
      articleDate: "Thu, 24 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/uwerx-hack-analysis-f03b061bb07b?source=rss----3e911405e793---4",
      articleHeading: "Uwerx",
      articleDate: "Tue, 08 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/jpegd-hack-analysis-a5a3dc89fa4?source=rss----3e911405e793---4",
      articleHeading: "JPEG’d",
      articleDate: "Mon, 07 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/platypus-hack-analysis-a7d2f6d1f96e?source=rss----3e911405e793---4",
      articleHeading: "Platypus",
      articleDate: "Thu, 03 Aug 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/ffist-hack-analysis-9cb695c0fad9?source=rss----3e911405e793---4",
      articleHeading: "$FFIST",
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
      <Heading
        width="100%"
        maxW="1000px"
        textAlign="center"
        as="h2"
        fontSize="3xl"
        fontWeight={700}
        my={5}
        mx={[5, 5, 10]}
      >
        In The{" "}
        <Box as="span" sx={{ color: "accent" }}>
          News
        </Box>
      </Heading>
      <Text
        maxW="1000px"
        textAlign="center"
        color="subtle"
        mx={[5, 5, 10]}
        fontSize={["lg", "lg", "xl"]}
        mb={5}
      >
        Explore the Buzz Surrounding Our Innovative Solution
      </Text>
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
          spaceBetween={20}
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
      maxW="350px"
      height="fit-content"
      borderRadius="25px"
      mr={5}
      background={"#FAFBFC"}
    >
      <Flex
        backgroundImage={`${assetsURL}background/latest_hack_post_bg.svg`}
        width="100%"
        height={["220px", "220px", "240px"]}
        borderTopRadius="25px"
        flexDir="column"
        pt={"60px"}
        justifyContent="space-between"
        alignItems="flex-start"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="stretch"
      >
        <VStack textAlign="left" alignItems="flex-start" ml={10}>
          <Text color={"white"} fontSize={"lg"}>
            HACK ANALYSIS
          </Text>
          <Heading
            color={"white"}
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
        </VStack>

        <Text
          textAlign="left"
          ml={10}
          w="100%"
          mb={8}
          fontSize="xs"
          color="#78909C"
        >
          Published on {articleDate}
        </Text>
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
        <Button
          onClick={() => window.open(articleLink, "_blank")}
          fontSize="16px"
          py={6}
          px={10}
          w="95%"
          mt={3}
          variant="cta-outline"
        >
          Read Full Article
        </Button>
      </Flex>
    </Flex>
  );
};

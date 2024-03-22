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
        "https://blog.solidityscan.com/mimspell-hack-analysis-05ffcde475f6?source=rss----3e911405e793---4",
      articleHeading: "MIMSpell",
      articleDate: "Mon, 12 Feb 2024",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/socket-gateway-hack-analysis-b0e9567f7d3e?source=rss----3e911405e793---4",
      articleHeading: "Socket Gatewaygo",
      articleDate: "Thu, 18 Jan 2024",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/wise-lending-hack-analysis-f652f389e397?source=rss----3e911405e793---4",
      articleHeading: "Wise Lending",
      articleDate: "Tue, 16 Jan 2024",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/gamma-hack-analysis-6c074e61709e?source=rss----3e911405e793---4",
      articleHeading: "Gamma Hack",
      articleDate: "Tue, 09 Jan 2024",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/radiant-capital-hack-analysis-b300ebdeee29?source=rss----3e911405e793---4",
      articleHeading: "Radiant Capital",
      articleDate: "Mon, 08 Jan 2024",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/orbit-chain-hack-analysis-b71c36a54a69?source=rss----3e911405e793---4",
      articleHeading: "Orbit Chain",
      articleDate: "Wed, 03 Jan 2024",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/pine-protocol-hack-analysis-7ce8621f444b?source=rss----3e911405e793---4",
      articleHeading: "Pine Protocol",
      articleDate: "Tue, 02 Jan 2024",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/transit-finance-hack-analysis-998400e2bd0c?source=rss----3e911405e793---4",
      articleHeading: "Transit Finance",
      articleDate: "Fri, 29 Dec 2023",
    },
    {
      articleLink:
        "https://blog.solidityscan.com/thestandard-io-hack-analysis-e9d74aede42e?source=rss----3e911405e793---4",
      articleHeading: "TheStandard.io",
      articleDate: "Mon, 04 Dec 2023",
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
        Most recent hacks that{" "}
        <Box as="span" sx={{ color: "accent" }}>
          made the news
        </Box>
      </Heading>
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

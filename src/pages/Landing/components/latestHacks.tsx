import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const LatestHacks: React.FC = () => {
  const data: {
    imgUrl: string;
    articleLink: string;
    articleHeading: string;
    articleDate: string;
  }[] = [
    {
      imgUrl: "landing/latest_hacks/LatestHacksImg.png",
      articleLink: "",
      articleHeading: "Smart Contract Security",
      articleDate: "Mar 13",
    },
    {
      imgUrl: "landing/latest_hacks/LatestHacksImg.png",
      articleLink: "",
      articleHeading: "Smart Contract Security",
      articleDate: "Mar 13",
    },
    {
      imgUrl: "landing/latest_hacks/LatestHacksImg.png",
      articleLink: "",
      articleHeading: "Smart Contract Security",
      articleDate: "Mar 13",
    },
    {
      imgUrl: "landing/latest_hacks/LatestHacksImg.png",
      articleLink: "",
      articleHeading: "Smart Contract Security",
      articleDate: "Mar 13",
    },
    {
      imgUrl: "landing/latest_hacks/LatestHacksImg.png",
      articleLink: "",
      articleHeading: "Smart Contract Security",
      articleDate: "Mar 13",
    },
    {
      imgUrl: "landing/latest_hacks/LatestHacksImg.png",
      articleLink: "",
      articleHeading: "Smart Contract Security",
      articleDate: "Mar 13",
    },
  ];

  const [showUnderline] = useMediaQuery("(min-width: 325px)");

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
        flexDir="column"
        alignItems="center"
        justifyContent={"flex-start"}
        w={"90%"}
        px={[0, 0, 10]}
        py={10}
        my={10}
        borderRadius={20}
        background={"#FFFFFF"}
      >
        <Box
          mb={5}
          position="relative"
          width="fit-content"
          height="fit-content"
        >
          <Heading
            w={"100%"}
            maxW={["300px", "300px", "800px"]}
            as="h1"
            fontSize="3xl"
            mb={2}
            fontWeight={800}
          >
            Most recent hacks that{" "}
            <Box as="span" color="#3300FF">
              made the news
            </Box>
          </Heading>
          <Box
            bottom={0}
            right={0}
            display={showUnderline ? "block" : "none"}
            position="absolute"
            width={["70%", "225px"]}
            height="5px"
            bgColor="#30F"
          />
        </Box>

        <Text color="subtle" fontSize={["lg", "lg", "xl"]} mt={4} mb={6}>
          Lorem ipsum dolor sit amet consectetur. Vitae egestas integer est ut
          iaculis. Volutpat nascetur tortor et ante.
        </Text>
        <Flex
          justifyContent="flex-start"
          alignItems={"flex-start"}
          height="fit-content"
          width="100%"
          overflowX="scroll"
          my={20}
          pb={5}
        >
          <Flex
            justifyContent="flex-start"
            alignItems={"flex-start"}
            height="fit-content"
            width="fit-content"
          >
            {data.map((item, index) => (
              <ArticleComp key={index} {...item} />
            ))}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

const ArticleComp: React.FC<{
  imgUrl: string;
  articleLink: string;
  articleHeading: string;
  articleDate: string;
}> = ({ imgUrl, articleLink, articleHeading, articleDate }) => {
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
      <Image
        src={`${assetsURL}${imgUrl}`}
        width="100%"
        height={["auto", "270px"]}
        borderRadius="25px"
        alt={"Article Image"}
      />
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

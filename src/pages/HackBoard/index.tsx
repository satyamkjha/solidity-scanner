import React from "react";
import { Flex, Box, Container, Text, Heading } from "@chakra-ui/react";
import HacksOverview from "components/hackerboard/HacksOverview";
import HacksExplorer from "components/hackerboard/HacksExplorer";
import { useHacksOverview } from "hooks/useHacksOverview";

// const ArticleComp: React.FC = () => {
//   return (
//     <Flex
//       justifyContent="flex-start"
//       alignItems="center"
//       flexDir="column"
//       w="350px"
//       height="300px"
//       borderRadius="25px"
//       mr={5}
//       background={"#FAFBFC"}
//     >
//       <Image
//         src="/background/article_img.png"
//         width="100%"
//         height="250px"
//         borderRadius="25px"
//         alt={"Article Image"}
//       />
//       <Flex
//         justifyContent="space-between"
//         alignItems="center"
//         flexDir="row"
//         px={5}
//         borderBottomLeftRadius="25px"
//         borderBottomRightRadius="25px"
//         width="100%"
//         height="100px"
//         background={"#FAFBFC"}
//       >
//         <VStack spacing={1} alignItems="flex-start">
//           <Text fontSize="sm">Smart Contract Audit</Text>
//           <Text fontSize="xs" color="#78909C">
//             Published in . Mar 13
//           </Text>
//         </VStack>
//         <Button fontSize="12px" py={4} px={5} variant="cta-outline" w="">
//           Read Full Article
//         </Button>
//       </Flex>
//     </Flex>
//   );
// };

const LeaderBoard: React.FC = () => {
  const { data } = useHacksOverview();

  return (
    <Container maxW="100vw" p={0} color="black">
      <Flex
        as="section"
        w="100%"
        alignItems="center"
        p={0}
        textAlign={["center", "center"]}
        flexDir="column"
      >
        <HacksOverview overviewData={data?.data} />
        <Box
          display={"flex"}
          flexDir="column"
          alignItems="center"
          justifyContent={"flex-start"}
          w={["90%", "90%", "90%", "70%"]}
          px={[4, 4, 7, 10]}
          mt={"-60px"}
          mb={4}
          py={[0, 0, 0, 10]}
          borderRadius={20}
          background={"#FFFFFF"}
        >
          <Heading as="h1" fontSize="3xl" my={5}>
            Explore through all the hacks{" "}
            <Box as="span" color="#3300FF" textDecoration="underline">
              since 2011
            </Box>
          </Heading>
          <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
            Delve into a comprehensive database of blockchain breaches,
            providing insights into the evolution of cybersecurity challenges
            and the lessons learned from each incident since 2011.
          </Text>
        </Box>

        <HacksExplorer overviewData={data?.data} />

        {/* <Box
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
          <Heading as="h1" fontSize="3xl" mb={4}>
            Most recent hacks that{" "}
            <Box as="span" color="#3300FF" textDecoration="underline">
              made the news
            </Box>
          </Heading>
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
              <ArticleComp />
              <ArticleComp />
              <ArticleComp />
              <ArticleComp />
              <ArticleComp />
              <ArticleComp />
            </Flex>
          </Flex>
        </Box> */}
      </Flex>
    </Container>
  );
};

export default LeaderBoard;

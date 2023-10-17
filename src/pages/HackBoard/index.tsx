import React from "react";
import { Flex, Box, Container, Text, Heading } from "@chakra-ui/react";
import HacksOverview from "components/hackerboard/HacksOverview";
import HacksExplorer from "components/hackerboard/HacksExplorer";
import { useHacksOverview } from "hooks/useHacksOverview";

const LeaderBoard: React.FC = () => {
  const { data } = useHacksOverview();

  return (
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
          Delve into a comprehensive database of blockchain breaches, providing
          insights into the evolution of cybersecurity challenges and the
          lessons learned from each incident since 2011.
        </Text>
      </Box>

      <HacksExplorer overviewData={data?.data} />
    </Flex>
  );
};

export default LeaderBoard;

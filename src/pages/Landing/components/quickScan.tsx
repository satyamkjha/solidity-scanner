import React from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Image,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { Link } from "react-router-dom";

export default function QuickScan() {
  const assetsURL = getAssetsURL();

  return (
    <Flex
      as="section"
      w="100%"
      my={0}
      textAlign={["center", "left"]}
      py={24}
      px={[0, 0, 0, 24]}
      backgroundImage={`url('${assetsURL}background/pattern_mask.png')`}
      display={["flex"]}
      flexDirection={["column", "column", "column", "row"]}
      alignItems={"center"}
      justifyContent={[
        "flex-start",
        "flex-start",
        "flex-start",
        "space-between",
      ]}
    >
      <Box
        textAlign={"left"}
        w={["100%", "100%", "100%", "45%"]}
        px={[0, 0, 14]}
        py={10}
      >
        <Heading wordBreak={"keep-all"} as="h1" fontSize={"3xl"} mb={8}>
          SolidityScan{" "}
          <Box
            as="span"
            sx={{
              background:
                "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            QuickScan
          </Box>
        </Heading>
        <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
          An open to all quick scanning extension designed to view results in
          simple terms. Initiate a smart contract scan by selecting from a wide
          range of supported protocols and get a quick analysis report within
          seconds.
        </Text>
        <Link to="/quickscan">
          <Button variant="brand" w="200px">
            Run QuickScan
          </Button>
        </Link>
      </Box>
      <Box
        w={["100%", "100%", "100%", "55%"]}
        p={0}
        display={"flex"}
        mr={[10, 10, 10]}
        flexDirection="column"
        alignItems={["center", "center", "center", "flex-end"]}
      >
        <Image
          marginTop={["0px", "0px", "0px", "-60px"]}
          src={`${assetsURL}landing/quickscan_hero.png`}
          transform="translateX(20px)"
          zIndex={"10"}
          alt={"Run quick scans for your smart contracts"}
        />
      </Box>
    </Flex>
  );
}

export function QSSkeleton() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      py={24}
      px={[0, 0, 0, 24]}
      w="100%"
      flexDir={["column", "column", "column", "row"]}
    >
      <SkeletonText
        startColor="lightgray"
        endColor="#eeeeee"
        noOfLines={8}
        spacing="4"
        skeletonHeight="3"
        w={["100%", "100%", "100%", "50%"]}
        mt={[10, 10, 10, 0]}
      />
      <Skeleton
        startColor="lightgray"
        endColor="#eeeeee"
        height={"220px"}
        borderRadius={"10px"}
        w={["100%", "100%", "100%", "50%"]}
        ml={[0, 0, 0, 10]}
      />
    </Flex>
  );
}

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
import { Link, useHistory } from "react-router-dom";
import QuickScanForm from "components/quickscan/QuickScanForm";

export default function QuickScan() {
  const assetsURL = getAssetsURL();

  const history = useHistory();

  const runQuickScan = async (
    address: string,
    platform: string,
    chain: string,
    ref: string | null
  ) => {
    history.push(`/quickscan/${address}/${platform}/${chain}`);
  };

  return (
    <Box w={"100%"} h="fit-content" bg="white">
      <QuickScanForm
        view="landing"
        runQuickScan={runQuickScan}
        isLoading={false}
      />
    </Box>
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

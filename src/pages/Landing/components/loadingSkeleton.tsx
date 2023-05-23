import React from "react";
import { Flex, SkeletonText, Skeleton } from "@chakra-ui/react";

export default function LoadingSkeleton() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      py={24}
      w="100%"
      flexDir={["column", "column", "column", "row"]}
    >
      <SkeletonText
        noOfLines={7}
        spacing="4"
        skeletonHeight="3"
        w={["100%", "100%", "100%", "50%"]}
        mt={[10, 10, 10, 0]}
      />
      <Skeleton
        height={"200px"}
        borderRadius={"10px"}
        w={["100%", "100%", "100%", "50%"]}
        ml={[0, 0, 0, 10]}
      />
    </Flex>
  );
}

import React from "react";
import { Text, HStack, Image, VStack } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";

const PricingModelItem: React.FC<{
  item: any;
  plan: any;
  page: "billing" | "pricing";
}> = ({ item, plan, page }) => {
  const assetsURL = getAssetsURL();
  return (
    <VStack
      width="250px"
      pl={page === "pricing" ? 7 : 4}
      alignItems={"flex-start"}
      mb={5}
      spacing={1}
      opacity={item.key === "detector" ? 1 : plan[item.key] ? 1 : 0.5}
    >
      <Text
        fontSize="xs"
        color="#7F7F7F"
        textAlign={"left"}
        fontWeight={300}
        width="100%"
      >
        {item.description}
      </Text>
      <HStack
        width="100%"
        alignItems={"center"}
        justifyContent="flex-start"
        spacing={2}
      >
        <Image width="20px" height="20px" src={`${assetsURL}${item.icon}`} />
        <Text fontSize="sm" fontWeight={400}>
          {item.title}
        </Text>
      </HStack>
    </VStack>
  );
};

export default PricingModelItem;

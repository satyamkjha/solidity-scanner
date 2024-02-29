import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const PricingCardItem: React.FC<{
  item: any;
  plan: any;
  page: "billing" | "pricing";
  planTheme?: { [key: string]: string };
}> = ({ item, plan, page, planTheme }) => {
  const isItemChecked =
    item.key === "detector" ? true : plan[item.key] ? true : false;
  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      pl={page === "billing" ? 4 : 6}
      mb={6}
      opacity={isItemChecked ? 1 : 0.5}
    >
      {isItemChecked ? (
        <CheckIcon color={planTheme ? planTheme.color : "black"} />
      ) : (
        <CloseIcon boxSize={3.5} />
      )}
      <Text fontSize={page === "billing" ? "md" : "lg"} ml={3}>
        {item.title}
      </Text>
    </Flex>
  );
};

export default PricingCardItem;

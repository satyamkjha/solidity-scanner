import React from "react";
import { Text, HStack, Image, VStack, Flex } from "@chakra-ui/react";
import { pricing_card_description_data } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { Plan } from "common/types";
import PricingModelItem from "components/pricing/PricingModalItem";
import PricingCardItem from "components/pricing/PricingCardItem";
import { CheckIcon } from "@chakra-ui/icons";

const PricingDetailsList: React.FC<{
  plan: Plan;
  page: "billing" | "pricing";
  view?: string;
  planTheme?: { [key: string]: string };
}> = ({ plan, page, view, planTheme }) => {
  const assetsURL = getAssetsURL();
  return (
    <>
      {view === "pricing-card" ? (
        <Flex
          w={"100%"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          pl={page === "billing" ? 4 : 6}
          mb={6}
        >
          <CheckIcon color={planTheme ? planTheme.color : "black"} />
          <Text fontSize={page === "billing" ? "md" : "lg"} ml={3}>
            {plan.name === "custom" ? "Custom" : plan.loc.toLocaleString("us")}{" "}
            LoCs
          </Text>
        </Flex>
      ) : (
        <VStack
          pl={page === "pricing" ? 7 : 4}
          width="250px"
          alignItems={"flex-start"}
          mb={5}
          spacing={0}
        >
          <Text
            fontSize="xs"
            mb={1}
            color="#7F7F7F"
            fontWeight={300}
            width="100%"
          >
            Remaining Lines of code
          </Text>
          <HStack
            width="100%"
            alignItems={"center"}
            justifyContent="flex-start"
            mb={5}
            spacing={2}
          >
            <Image
              width="20px"
              height="20px"
              src={`${assetsURL}common/loc-code.svg`}
            />
            <Text fontWeight={700}>{plan.loc.toLocaleString("us")}</Text>
            <Text fontWeight={500}>LoCs</Text>
          </HStack>
        </VStack>
      )}
      {pricing_card_description_data.map((item) => (
        <>
          {view === "pricing-card" ? (
            <PricingCardItem
              item={item}
              plan={plan}
              page={page}
              planTheme={planTheme}
            />
          ) : (
            <PricingModelItem item={item} plan={plan} page={page} />
          )}
        </>
      ))}
    </>
  );
};

export default PricingDetailsList;

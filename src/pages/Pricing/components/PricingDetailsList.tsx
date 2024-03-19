import React from "react";
import { Text, HStack, Image, VStack, Flex } from "@chakra-ui/react";
import { pricing_card_description_data } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { Plan } from "common/types";
import PricingModelItem from "components/pricing/PricingModalItem";
import PricingCardItem from "components/pricing/PricingCardItem";
import { CheckIcon } from "@chakra-ui/icons";
import PricingPopover from "components/pricing/PricingPopover";
import { profile } from "console";

const PricingDetailsList: React.FC<{
  plan: Plan;
  page: "billing" | "pricing";
  mouseHover?: boolean;
  view?: string;
  planTheme?: { [key: string]: string };
}> = ({ plan, page, mouseHover = false, view, planTheme }) => {
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
            {plan.name === "custom"
              ? "Custom"
              : plan.loc.toLocaleString("en-US")}{" "}
            LOC
          </Text>
          {mouseHover && (
            <PricingPopover
              item={{
                title: "Lines Of Code",
                icon: "common/loc-code.svg",
                tooltipText: `Scan up to ${plan.loc} lines of code with zero limitation on the number of projects scanned.`,
              }}
              mouseHover
            />
          )}
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
            Lines of code
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
            <Text fontWeight={700}>
              {" "}
              {plan.name === "Trial"
                ? "Gas Bugs Only"
                : plan.loc.toLocaleString("en-US")}
            </Text>
            <Text fontWeight={500}>{plan.name !== "Trial" && "LOC"}</Text>
          </HStack>
        </VStack>
      )}
      {pricing_card_description_data(plan.name).map((item) => (
        <>
          {view === "pricing-card" ? (
            <PricingCardItem
              item={item}
              plan={plan}
              page={page}
              planTheme={planTheme}
              mouseHover={mouseHover}
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

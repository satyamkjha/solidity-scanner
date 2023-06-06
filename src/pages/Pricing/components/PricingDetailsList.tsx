import React, { useEffect, useRef, useState } from "react";
import { Text, HStack, Image, VStack } from "@chakra-ui/react";
import { pricing_card_description_data } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { Plan } from "common/types";

const PricingDetailsList: React.FC<{
  plan: Plan;
  selectedPackage: string;
}> = ({ plan }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  return (
    <>
      <VStack pl={7} width="250px" alignItems={"flex-start"} mb={4} spacing={0}>
        <Text
          fontSize="xs"
          mb={1}
          color="#7F7F7F"
          fontWeight={300}
          width="100%"
        >
          No of Scans
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
            src={`${assetsURL}pricing/coin.svg`}
          />
          <Text fontWeight={700}>{plan.scan_count}</Text>
          <Text fontWeight={500}>Scans</Text>
        </HStack>
      </VStack>
      {pricing_card_description_data.map((item) => (
        <VStack
          width="250px"
          pl={7}
          alignItems={"flex-start"}
          mb={4}
          spacing={0}
          opacity={
            item.key === "detector"
              ? 1
              : item.key === "github" || item.key === "actions"
              ? plan.github
                ? 1
                : 0.5
              : item.key === "report" || item.key === "private"
              ? plan.publishable_report
                ? 1
                : 0.5
              : 0.5
          }
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
            <Image
              width="20px"
              height="20px"
              src={`${assetsURL}${item.icon}`}
            />
            <Text fontSize="sm" fontWeight={400}>
              {item.title}
            </Text>
          </HStack>
        </VStack>
      ))}
    </>
  );
};

export default PricingDetailsList;

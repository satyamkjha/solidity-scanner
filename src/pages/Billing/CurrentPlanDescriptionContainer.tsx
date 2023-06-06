import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  HStack,
  useMediaQuery,
  Heading,
  Image,
} from "@chakra-ui/react";
import "./billing.css";
import { dateToDDMMMMYYYY } from "common/functions";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { Plan } from "common/types";

const CurrentPlanDescriptionContainer: React.FC<{
  packageName: string;
  plan: Plan;
}> = ({ packageName, plan }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  return (
    <Flex
      w={"100%"}
      flexDir="column"
      justifyContent={"flex-start"}
      alignItems="flex-start"
    >
      <Flex alignItems="center" justifyContent="center">
        {packageName !== "trial" && (
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}pricing/${packageName}-heading.svg`}
          />
        )}
        <Text fontSize={"2xl"} fontWeight={700}>
          {sentenceCapitalize(plan.name)}
        </Text>
      </Flex>
      <Text
        mt={2}
        mb={3}
        fontWeight={400}
        color="detail"
        width={["100%", "100%", "100%", "80%", "60%"]}
      >
        {plan.description ||
          "Simplest way to get started with the product. Scan your contract using free credits and get your security score and issue count"}
      </Text>
      <Flex textAlign="center" my={4}>
        <Heading fontSize={"x-large"}>
          {plan.amount === "Free" ? "Free" : `$ ${plan.amount}`}&nbsp;
        </Heading>
        {packageName !== "trial" && packageName !== "ondemand" && (
          <Text fontSize="xs" color="detail" mt={2}>
            {`/ month `}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default CurrentPlanDescriptionContainer;

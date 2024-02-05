import React from "react";
import { Flex, Text, Heading, Image, HStack } from "@chakra-ui/react";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { Plan } from "common/types";
import { CheckBadge } from "components/icons";

const CurrentPlanDescriptionContainer: React.FC<{
  packageName: string;
  plan: Plan;
  duration: string;
  showCheckIcon?: boolean;
  showDescription?: boolean;
}> = ({
  packageName,
  plan,
  duration,
  showCheckIcon = true,
  showDescription = true,
}) => {
  const assetsURL = getAssetsURL();
  return (
    <Flex
      w={"100%"}
      flexDir="column"
      justifyContent={"flex-start"}
      alignItems="flex-start"
    >
      <Flex alignItems="center" justifyContent="center">
        {!["trial", "non-pro", "pro/custom"].includes(packageName) && (
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}pricing/${packageName}-heading.svg`}
          />
        )}
        {["non-pro", "pro/custom"].includes(packageName) && (
          <HStack mb={4}>
            {duration !== "on-demand-report" && (
              <Image
                width="75px"
                height="75px"
                src={
                  "publish_report" === duration
                    ? `${assetsURL}report/user.svg`
                    : `${assetsURL}report/ss-shield.svg`
                }
                mr={2}
              />
            )}

            <Flex flexDir={"column"}>
              <Text fontSize={"2xl"} fontWeight={700}>
                {duration === "on-demand-report"
                  ? "One Time Audit Report"
                  : "publish_report" === duration
                  ? "Self-Published Report"
                  : "verified_publish_report" === duration
                  ? "Verified Report"
                  : sentenceCapitalize(plan.name)}
              </Text>
              <Flex textAlign="center" my={1}>
                <Heading fontSize={"lg"}>
                  {plan.amount === "Free"
                    ? "Free"
                    : `$ ${parseFloat(plan.amount).toFixed(2)}`}
                  &nbsp;
                </Heading>
                <Text fontSize="xs" color="detail" mt={1}>
                  {`/ report `}
                </Text>
              </Flex>
            </Flex>
          </HStack>
        )}

        {!["non-pro", "pro/custom"].includes(packageName) && (
          <Text fontSize={"2xl"} fontWeight={700}>
            {sentenceCapitalize(plan.name)}
          </Text>
        )}
        {showCheckIcon && (
          <Flex ml={2}>
            <CheckBadge fillColor={"#38CB89"} strokColor={"white"} />
          </Flex>
        )}
      </Flex>
      {showDescription && (
        <Text
          my={2}
          fontWeight={400}
          color="detail"
          fontSize={"sm"}
          width={"100%"}
        >
          {plan.description ||
            "Simplest way to get started with the product. Scan your contract using free credits and get your security score and issue count"}
        </Text>
      )}
      {!["custom", "non-pro", "pro/custom"].includes(packageName) && (
        <Flex textAlign="center" my={2}>
          <Heading fontSize={"x-large"}>
            {plan.amount === "Free"
              ? "Free"
              : `$ ${parseFloat(plan.amount).toFixed(2)}`}
            &nbsp;
          </Heading>
          {packageName !== "trial" && packageName !== "ondemand" && (
            <Text fontSize="xs" color="detail" mt={2}>
              {`/ ${duration === "topup" ? "credit" : duration} `}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default CurrentPlanDescriptionContainer;

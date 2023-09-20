import React from "react";
import { Flex, Text, Heading, Image } from "@chakra-ui/react";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
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
        {!["topup", "publish_report", "verified_publish_report"].includes(
          packageName
        ) && (
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}pricing/${packageName}-heading.svg`}
          />
        )}
        {"publish_report" === packageName && (
          <Image
            width="50px"
            height="50px"
            src={`${assetsURL}report/user.svg`}
          />
        )}
        {"verified_publish_report" === packageName && (
          <Image
            width="50px"
            height="50px"
            src={`${assetsURL}report/ss-shield.svg`}
          />
        )}
        <Text fontSize={"2xl"} fontWeight={700}>
          {"publish_report" === packageName
            ? "Self-Published Report"
            : "verified_publish_report" === packageName
            ? "Verified Report"
            : sentenceCapitalize(plan.name)}
        </Text>

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
      {packageName !== "custom" && (
        <Flex textAlign="center" my={2}>
          <Heading fontSize={"x-large"}>
            {plan.amount === "Free"
              ? "Free"
              : `$ ${parseFloat(plan.amount).toFixed(2)}`}
            &nbsp;
          </Heading>
          {packageName !== "trial" && packageName !== "ondemand" && (
            <Text fontSize="xs" color="detail" mt={2}>
              {`/ ${
                duration === "topup"
                  ? "credit"
                  : [
                      "topup",
                      "publish_report",
                      "verified_publish_report",
                    ].includes(packageName)
                  ? "report"
                  : duration
              } `}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default CurrentPlanDescriptionContainer;

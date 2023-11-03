import {
  useToast,
  Text,
  Flex,
  VStack,
  CircularProgress,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  HStack,
  CloseButton,
  Divider,
  AlertDialogFooter,
  Image,
  Box,
  background,
  Heading,
} from "@chakra-ui/react";
import {
  formattedDate,
  getNextPaymentValue,
  getPaymentDaysLeft,
} from "common/functions";
import { useHistory } from "react-router-dom";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import React, { useRef, useState } from "react";

const PlanCycleInfo: React.FC<{
  planName: string;
  packageName: string;
  packageRechargeDate: string;
  packageValidity: number;
  subscription:
    | {
        end_date: string;
        start_date: string;
        renewal_date: string;
      }
    | undefined;
}> = ({
  planName,
  packageRechargeDate,
  packageValidity,
  packageName,
  subscription,
}) => {
  const assetsURL = getAssetsURL();
  const history = useHistory();

  if (packageName === "trial" || packageName === "ondemand")
    return (
      <Image
        src={`${assetsURL}common/pro_upgrade.svg`}
        height="185px"
        width="400px"
        cursor={"pointer"}
        onClick={() => history.push("/billing")}
      />
    );
  else
    return (
      <Flex
        w="100%"
        maxW={"400px"}
        maxH="185px"
        px={8}
        py={6}
        cursor={"pointer"}
        background={packageName !== "custom" ? packageName : "none"}
        height="185px"
        backgroundImage={
          packageName === "custom"
            ? `url(${assetsURL}background/custom_plan_cycle_card_bg.svg)`
            : "none"
        }
        onClick={() => history.push("/billing")}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        borderRadius="15px"
        flexDir="column"
      >
        {packageName === "expired" ? (
          <>
            <Heading fontSize="xl" color="#8A94A6">
              Plan Expired
            </Heading>
            <VStack alignItems="flex-start" spacing={1} mt={"50px"}>
              <Text fontSize="xs" fontWeight="400">
                Expired on
              </Text>
              <Text fontSize="sm" fontWeight="600">
                {formattedDate(new Date(subscription?.end_date || ""), "long")}
              </Text>
            </VStack>
          </>
        ) : packageName === "custom" ? (
          <>
            <VStack alignItems="flex-start" spacing={1}>
              <Text fontSize="xs" color="#8A94A6" fontWeight="400">
                Subscribed on
              </Text>
              <Text color="#8A94A6" fontSize="sm" fontWeight="600">
                {formattedDate(
                  new Date(subscription?.start_date || ""),
                  "long"
                )}
              </Text>
            </VStack>
            <Heading fontSize="xl" color="#FFFFFF" mt={"50px"}>
              Enterprise Plan
            </Heading>
          </>
        ) : (
          <>
            {" "}
            <Flex>
              {subscription ? (
                <VStack alignItems="flex-start" spacing={1}>
                  <Text fontSize="xs" fontWeight="400">
                    Next Billed on
                  </Text>
                  <Text fontSize="sm" fontWeight="600">
                    {formattedDate(new Date(subscription.renewal_date), "long")}
                  </Text>
                </VStack>
              ) : (
                <VStack alignItems="flex-start" spacing={1}>
                  <Text fontSize="xs" fontWeight="400">
                    Plan Ends on
                  </Text>
                  <Text fontSize="sm" fontWeight="600">
                    {formattedDate(new Date(packageRechargeDate), "long")}
                  </Text>
                </VStack>
              )}
              {packageName === "pro" && (
                <Image
                  src={`${assetsURL}pricing/pro_badge.svg`}
                  ml="auto"
                  mt={-8}
                  width={"50%"}
                  h={"auto"}
                />
              )}
            </Flex>
            <Flex mt={8} align="center">
              <CircularProgress
                value={
                  subscription
                    ? getNextPaymentValue(
                        packageRechargeDate,
                        packageValidity,
                        new Date(packageRechargeDate),
                        new Date(subscription.renewal_date)
                      )
                    : getNextPaymentValue(
                        packageRechargeDate,
                        packageValidity,
                        new Date(packageRechargeDate)
                      )
                }
                color={packageName + "-dark"}
                trackColor="white"
                thickness="8px"
                size="60px"
                capIsRound
              ></CircularProgress>
              <VStack alignItems="flex-start" spacing={0} ml={3}>
                <Text fontSize="lg" fontWeight="700">
                  {subscription
                    ? getPaymentDaysLeft(
                        packageRechargeDate,
                        packageValidity,
                        new Date(subscription.renewal_date)
                      )
                    : getPaymentDaysLeft(packageRechargeDate, packageValidity)}
                  &nbsp; days
                </Text>
                <Text fontSize="sm" fontWeight="400">
                  remaining for the {sentenceCapitalize(planName)} Plan
                </Text>
              </VStack>
            </Flex>
          </>
        )}
      </Flex>
    );
};

export default PlanCycleInfo;

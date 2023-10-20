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
} from "@chakra-ui/react";
import {
  formattedDate,
  getNextPaymentValue,
  getPaymentDaysLeft,
} from "common/functions";

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
  return (
    <Flex
      w="100%"
      maxW={
        packageName === "trial" || packageName === "ondemand"
          ? "375px"
          : "400px"
      }
      maxH="185px"
      px={8}
      py={6}
      background={
        packageName === "trial" || packageName === "ondemand"
          ? "linear-gradient(101.8deg, #000000 4.3%, #3E1EA8 108.23%)"
          : packageName
      }
      backgroundImage={
        packageName === "trial" || packageName === "ondemand"
          ? `url('${assetsURL}pricing/pro_upgrade.svg')`
          : "none"
      }
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      borderRadius="15px"
      flexDir="column"
    >
      {packageName === "trial" || packageName === "ondemand" ? (
        <>
          <Text fontSize="xl" color="white" mt={4}>
            Upgrade to <strong>Pro</strong>
          </Text>
          <Text color="white" fontWeight="400" fontSize="sm" w="75%" mt="2">
            You've subscribed to a free trial version, Upgrade to unlock
            features and starts scanning your contracts.
          </Text>
        </>
      ) : (
        <>
          <Flex>
            {subscription && (
              <VStack alignItems="flex-start" spacing={1}>
                <Text fontSize="xs" fontWeight="400">
                  Next Billed on
                </Text>
                <Text fontSize="sm" fontWeight="600">
                  {formattedDate(new Date(subscription.renewal_date), "long")}
                </Text>
              </VStack>
            )}
            {packageName === "pro" && (
              <Image
                src={`${assetsURL}pricing/pro_badge.svg`}
                ml="auto"
                mt={-8}
                h={"80px"}
              />
            )}
          </Flex>
          <Flex mt={2} align="center">
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

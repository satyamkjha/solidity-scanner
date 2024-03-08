import React from "react";
import {
  HStack,
  Image,
  Text,
  Box,
  VStack,
  Divider,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Profile, PricingData } from "common/types";
import { useConfig } from "hooks/useConfig";
import { getAssetsURL } from "helpers/helperFunction";
import { CheckBadge } from "./icons";
import { formattedDate } from "common/functions";
import PlanDetailsModal from "pages/Billing/components/PlanDetailsModal";
import { packageLabel } from "common/values";

export const PlanDataContainer: React.FC<{
  profileData: Profile;
  pricingPlans: PricingData;
}> = ({ profileData, pricingPlans }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userPlan =
    pricingPlans.pricing_data[
      profileData.billing_cycle === "N/A" ? "trial" : profileData.billing_cycle
    ][profileData.current_package];

  return (
    <VStack
      px={4}
      py={7}
      w="100%"
      justifyContent="flex-start"
      alignItems="center"
      spacing={7}
    >
      <VStack
        w="100%"
        justifyContent="flex-start"
        spacing={2}
        bgColor="#E6FAEC"
        px={5}
        borderRadius={10}
        py={2}
      >
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Text fontWeight={600} fontSize="sm">
            Plan LoCs Quota
          </Text>
          <Text fontWeight={600} color="#B0B7C3" fontSize="xs">
            Expires in
          </Text>
        </HStack>
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <HStack spacing={0}>
            <Text fontWeight={700} fontSize="lg">
              {profileData.plan_loc_remaining}
            </Text>
            <Text color="subtle" fontSize="sm">
              /{userPlan ? userPlan.loc : "--"}
            </Text>
          </HStack>
          <Text fontWeight={600} fontSize="sm">
            With Current Plan
          </Text>
        </HStack>
      </VStack>
      <VStack
        w="100%"
        justifyContent="flex-start"
        spacing={2}
        bgColor="#FFFCF7"
        px={5}
        borderRadius={10}
        py={2}
      >
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Text fontWeight={600} fontSize="sm">
            Plan LoCs Quota
          </Text>
          <Text fontWeight={600} color="#B0B7C3" fontSize="xs">
            Expires in
          </Text>
        </HStack>
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <HStack spacing={0}>
            <Text fontWeight={700} fontSize="lg">
              {profileData.on_demand_loc_remaining}
            </Text>
            <Text color="subtle" fontSize="sm">
              /{userPlan ? profileData.total_loc - userPlan.loc : "--"}
            </Text>
          </HStack>
          <Text fontWeight={600} fontSize="sm">
            Never Expires
          </Text>
        </HStack>
      </VStack>
      <VStack
        w="100%"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
      >
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Text fontWeight={600}>Total LoC Quota </Text>
          <Text fontWeight={600}>
            {profileData.current_package === "trial"
              ? "--"
              : profileData.total_loc}{" "}
            <span
              style={{
                fontWeight: 300,
                fontSize: "sm",
              }}
            >
              LOCs
            </span>{" "}
          </Text>
        </HStack>
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Text fontWeight={600}>Used LOC</Text>
          <Text fontWeight={600}>
            {profileData.current_package === "trial"
              ? "--"
              : profileData.total_loc - profileData.loc_remaining}{" "}
            <span
              style={{
                fontWeight: 300,
                fontSize: "sm",
              }}
            >
              LOCs
            </span>{" "}
          </Text>
        </HStack>
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Text fontWeight={600}>Remaining LOC</Text>
          <Text fontWeight={600}>
            {profileData.current_package === "trial"
              ? "--"
              : profileData.loc_remaining}{" "}
            <span
              style={{
                fontWeight: 300,
                fontSize: "sm",
              }}
            >
              LOCs
            </span>{" "}
          </Text>
        </HStack>
      </VStack>
      <Divider />
      {!["expired", "custom"].includes(profileData.current_package) ? (
        <>
          <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
            <Text color="subtle" fontSize="xs">
              Current Subscribed Plan
            </Text>
            <HStack>
              {profileData.current_package !== "trial" && (
                <Image
                  width="35px"
                  height="35px"
                  src={`${assetsURL}pricing/${profileData.current_package}-heading.svg`}
                />
              )}

              <Text fontSize={"2xl"} fontWeight={700}>
                {
                  packageLabel[
                    pricingPlans.pricing_data[
                      profileData.billing_cycle === "N/A"
                        ? "trial"
                        : profileData.billing_cycle
                    ][profileData.current_package].name
                  ]
                }
              </Text>
              <Flex ml={2}>
                <CheckBadge fillColor={"#38CB89"} strokColor={"white"} />
              </Flex>
            </HStack>
          </VStack>
          <HStack w="100%" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
                Subscribed on
              </Text>
              <Text fontWeight={500} fontSize="md">
                {formattedDate(
                  new Date(profileData.package_recharge_date),
                  "long"
                )}
              </Text>
            </Box>
            <Button
              variant="accent-outline"
              borderRadius={"8px"}
              background="white"
              color={"blue"}
              fontSize="sm"
              fontWeight="400"
              px={8}
              onClick={onOpen}
            >
              Plan Details
            </Button>
          </HStack>
          <PlanDetailsModal
            subscription={profileData.is_cancellable}
            currentPackage={profileData.current_package}
            duration={profileData.billing_cycle}
            packageRechargeDate={profileData.package_recharge_date}
            plan={
              pricingPlans.pricing_data[
                profileData.billing_cycle === "N/A"
                  ? "trial"
                  : profileData.billing_cycle
              ][profileData.current_package]
            }
            open={isOpen}
            onModalClose={onClose}
          />
        </>
      ) : null}
    </VStack>
  );
};

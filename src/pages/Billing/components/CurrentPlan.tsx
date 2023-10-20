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
  getPaymentDaysLeft,
  getNextPaymentValue,
} from "common/functions";
import { Plan } from "common/types";
import API from "helpers/api";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import React, { useRef, useState } from "react";
import SubscriptionDataContainer from "./SubscriptionDataContainer";
import CurrentPlanDescriptionContainer from "./CurrentPlanDescriptionContainer";
import PlanDetailsModal from "./PlanDetailsModal";
import PlanCycleInfo from "./PlanCycleInfo";

const CurrentPlan: React.FC<{
  isCancellable: boolean;
  billingCycle: string;
  packageName: string;
  packageRechargeDate: string;
  packageValidity: number;
  plan: Plan;
  subscription?: {
    end_date: string;
    start_date: string;
    renewal_date: string;
  };
  upgradePlan: any;
}> = ({
  billingCycle,
  packageName,
  packageRechargeDate,
  packageValidity,
  plan,
  isCancellable,
  subscription,
  upgradePlan,
}) => {
  const toast = useToast();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const cancelSubscription = async () => {
    const { data } = await API.delete(
      API_PATH.API_CANCEL_STRIPE_SUBSCRIPTION_BETA
    );
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
    }
  };

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const onModalClose = () => setOpen(false);

  const [isCancelSub, setIsCancelSub] = useState(false);
  const onClose = () => setIsCancelSub(false);

  // const getNextPaymentValue = (startDate: Date, nextDate?: Date) => {
  //   const remainingDays = getPaymentDaysLeft(nextDate);
  //   if (nextDate) {
  //     const timeDifference = nextDate.getTime() - startDate.getTime();
  //     const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  //     return (remainingDays * 100) / totalDays;
  //   } else {
  //     return (remainingDays * 100) / packageValidity;
  //   }
  // };

  // const getPaymentDaysLeft = (nextDate?: Date) => {
  //   if (nextDate) {
  //     const timeDifference = nextDate.getTime() - new Date().getTime();
  //     return Math.ceil(timeDifference / (1000 * 3600 * 24));
  //   } else {
  //     const startDate = new Date(packageRechargeDate);
  //     const currentDate = new Date();
  //     const millisecondsPerDay = 24 * 60 * 60 * 1000;

  //     const elapsedTime = currentDate.getTime() - startDate.getTime();
  //     const elapsedDays = Math.floor(elapsedTime / millisecondsPerDay);

  //     const remainingDays = packageValidity - elapsedDays;
  //     return remainingDays;
  //   }
  // };

  return (
    <Box
      sx={{
        w: "100%",
        p: [5, 5, 10],
        background: "white",
        borderRadius: 15,
      }}
    >
      <Flex
        w={"100%"}
        h={"100%"}
        flexDir={["column", "column", "column", "row"]}
        justifyContent={[
          "flex-start",
          "flex-start",
          "flex-start",
          "space-between",
        ]}
        alignItems="flex-start"
      >
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          <CurrentPlanDescriptionContainer
            duration={billingCycle}
            packageName={packageName}
            plan={plan}
          />

          {packageName !== "pro" && packageName !== "custom" && (
            <Button
              variant="brand"
              px={8}
              mt={3}
              fontWeight={400}
              borderRadius="8px"
              onClick={upgradePlan}
            >
              Upgrade Plan
            </Button>
          )}
          <Flex
            mt={packageName === "pro" ? 24 : 16}
            flexWrap="wrap"
            alignItems="center"
            w={"100%"}
            flexDir={"row"}
          >
            <SubscriptionDataContainer
              packageName={packageName}
              packageRechargeDate={packageRechargeDate}
            />
          </Flex>
        </Flex>
        <Flex
          w={["100%", "100%", "100%", "40%"]}
          h="100%"
          mt={[10, 10, 10, 0]}
          p={2}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          {packageName !== "custom" && (
            <PlanCycleInfo
              planName={plan.name}
              packageRechargeDate={packageRechargeDate}
              packageValidity={packageValidity}
              packageName={packageName}
              subscription={subscription}
            />
          )}
          <Flex mt={[6, 6, 6, "auto"]} ml={[0, 0, 0, 4]}>
            <Button
              variant="accent-outline"
              borderRadius={"8px"}
              background="white"
              color={"blue"}
              fontSize="sm"
              fontWeight="400"
              px={8}
              onClick={() => {
                setOpen(!open);
              }}
            >
              Plan Details
            </Button>
            <Button
              onClick={() => setIsCancelSub(!isCancelSub)}
              variant={isCancellable ? "accent-outline" : "gray-outline"}
              borderRadius={"8px"}
              fontSize="sm"
              fontWeight="400"
              ml={10}
              isDisabled={!isCancellable}
            >
              Cancel Subscription
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <PlanDetailsModal
        subscription={subscription ? true : false}
        currentPackage={packageName}
        duration={billingCycle}
        packageRechargeDate={packageRechargeDate}
        plan={plan}
        open={open}
        onModalClose={onModalClose}
      />

      <AlertDialog
        isOpen={isCancelSub}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent alignContent={"center"}>
            <Flex
              p={5}
              flexDir={"column"}
              justifyContent="flex-start"
              alignItems={"center"}
            >
              <HStack w={"100%"} mb={5}>
                <Text
                  textAlign={"center"}
                  w={"90%"}
                  fontSize="lg"
                  fontWeight="bold"
                >
                  Cancel Subscription
                </Text>
                <CloseButton onClick={onClose} />
              </HStack>

              <Divider />
              <Text mt={5}>
                Are you sure you want to cancel the subscription?
              </Text>

              <Flex align="center" my={6}>
                <CurrentPlanDescriptionContainer
                  duration={billingCycle}
                  packageName={packageName}
                  plan={plan}
                  showDescription={false}
                  showCheckIcon={false}
                />
              </Flex>

              <AlertDialogFooter>
                <Button variant="brand" onClick={cancelSubscription} ml={3}>
                  Cancel Subscription
                </Button>
              </AlertDialogFooter>
            </Flex>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CurrentPlan;

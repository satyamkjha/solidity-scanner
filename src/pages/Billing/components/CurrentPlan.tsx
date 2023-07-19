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
import { formattedDate } from "common/functions";
import { Plan } from "common/types";
import API from "helpers/api";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import React, { useRef, useState } from "react";
import SubscriptionDataContainer from "./SubscriptionDataContainer";
import CurrentPlanDescriptionContainer from "./CurrentPlanDescriptionContainer";
import PlanDetailsModal from "./PlanDetailsModal";

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

  const getNextPaymentValue = (startDate: Date, nextDate?: Date) => {
    const remainingDays = getPaymentDaysLeft(nextDate);
    if (nextDate) {
      const timeDifference = nextDate.getTime() - startDate.getTime();
      const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return (remainingDays * 100) / totalDays;
    } else {
      return (remainingDays * 100) / packageValidity;
    }
  };

  const getPaymentDaysLeft = (nextDate?: Date) => {
    if (nextDate) {
      const timeDifference = nextDate.getTime() - new Date().getTime();
      return Math.ceil(timeDifference / (1000 * 3600 * 24));
    } else {
      const startDate = new Date(packageRechargeDate);
      const currentDate = new Date();
      const millisecondsPerDay = 24 * 60 * 60 * 1000;

      const elapsedTime = currentDate.getTime() - startDate.getTime();
      const elapsedDays = Math.floor(elapsedTime / millisecondsPerDay);

      const remainingDays = packageValidity - elapsedDays;
      return remainingDays;
    }
  };

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
        flexDir={["column", "column", "row"]}
        justifyContent={["flex-start", "flex-start", "space-between"]}
        alignItems="flex-start"
      >
        <Flex
          w={["100%", "100%", "50%"]}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          <CurrentPlanDescriptionContainer
            duration={billingCycle}
            packageName={packageName}
            plan={plan}
          />

          {packageName !== "pro" && (
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
          w={["100%", "100%", "40%"]}
          h="100%"
          mt={[10, 10, 0]}
          p={2}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
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
                <Text
                  color="white"
                  fontWeight="400"
                  fontSize="sm"
                  w="75%"
                  mt="2"
                >
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
                        {formattedDate(
                          new Date(subscription.renewal_date),
                          "long"
                        )}
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
                <Flex mt={isCancellable ? 6 : 2} align="center">
                  <CircularProgress
                    value={
                      subscription
                        ? getNextPaymentValue(
                            new Date(packageRechargeDate),
                            new Date(subscription.renewal_date)
                          )
                        : getNextPaymentValue(new Date(packageRechargeDate))
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
                            new Date(subscription.renewal_date)
                          )
                        : getPaymentDaysLeft()}
                      &nbsp; days
                    </Text>
                    <Text fontSize="sm" fontWeight="400">
                      remaining for the {sentenceCapitalize(plan.name)} Plan
                    </Text>
                  </VStack>
                </Flex>
              </>
            )}
          </Flex>
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

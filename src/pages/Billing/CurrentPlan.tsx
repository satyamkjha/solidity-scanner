import {
  useToast,
  Text,
  Flex,
  Heading,
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
  useDisclosure,
} from "@chakra-ui/react";
import { dateToDDMMMMYYYY } from "common/functions";
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
  name: string;
  packageName: string;
  packageRechargeDate: string;
  packageValidity: number;
  plan: Plan;
  subscription?: {
    end_date: string;
    start_date: string;
    renewal_date: string;
  };
}> = ({
  name,
  packageName,
  packageRechargeDate,
  packageValidity,
  plan,
  isCancellable,
  subscription,
}) => {
  const toast = useToast();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const { isOpen, onClose, onOpen } = useDisclosure();

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

  const getNextPaymentValue = (startDate: Date, nextDate: Date) => {
    const timeDifference = nextDate.getTime() - startDate.getTime();
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const daysTillNow = Math.ceil(
      (new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );

    return (daysTillNow * 100) / totalDays;
  };

  const getNextPaymentDaysLeft = (nextDate: Date) => {
    const timeDifference = nextDate.getTime() - new Date().getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysLeft;
  };

  return (
    <Box
      sx={{
        w: "100%",
        p: [5, 5, 10],
        background: "white",
        borderRadius: 15,
      }}
      _hover={{
        filter: "drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));",
      }}
    >
      <Flex
        w={"100%"}
        flexDir={["column", "column", "row"]}
        justifyContent={["flex-start", "flex-start", "space-between"]}
        alignItems="flex-start"
      >
        <Flex
          w={["100%", "100%", "60%"]}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          <CurrentPlanDescriptionContainer
            packageName={packageName}
            plan={plan}
          />
          <Flex
            mt={5}
            flexWrap="wrap"
            alignItems="center"
            w={"100%"}
            flexDir={"row"}
          >
            {subscription && (
              <SubscriptionDataContainer
                packageName={packageName}
                packageRechargeDate={packageRechargeDate}
              />
            )}
          </Flex>
        </Flex>
        <Flex
          w={["100%", "100%", "40%"]}
          mt={[10, 10, 0]}
          p={2}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          <Flex
            w="100%"
            maxW="400px"
            h="185px"
            px={8}
            py={6}
            background={
              packageName === "trail" || packageName === "ondemand"
                ? "linear-gradient(101.8deg, #000000 4.3%, #3E1EA8 108.23%)"
                : packageName
            }
            backgroundImage={
              packageName === "trail" || packageName === "ondemand"
                ? `url('${assetsURL}pricing/pro_upgrade.svg')`
                : "none"
            }
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            borderRadius="15px"
            flexDir="column"
          >
            {packageName === "trail" || packageName === "ondemand" ? (
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
                  <VStack alignItems="flex-start" spacing={1}>
                    <Text fontSize="xs" fontWeight="400">
                      Next Billed on
                    </Text>
                    <Text fontSize="sm" fontWeight="600">
                      {subscription &&
                        dateToDDMMMMYYYY(new Date(subscription.renewal_date))}
                    </Text>
                  </VStack>
                  {packageName === "pro" && (
                    <Image
                      src={`${assetsURL}pricing/pro_badge.svg`}
                      ml="auto"
                      mt={-8}
                    />
                  )}
                </Flex>
                <Flex mt={4} align="center">
                  <CircularProgress
                    value={
                      subscription &&
                      getNextPaymentValue(
                        new Date(packageRechargeDate),
                        new Date(subscription.renewal_date)
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
                      {subscription &&
                        getNextPaymentDaysLeft(
                          new Date(subscription.renewal_date)
                        )}
                      &nbsp; days
                    </Text>
                    <Text fontSize="sm" fontWeight="400">
                      remaining for the {sentenceCapitalize(name)} Plan
                    </Text>
                  </VStack>
                </Flex>
              </>
            )}
          </Flex>
          <Flex mt={10} ml={4}>
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
            {isCancellable && (
              <Button
                onClick={() => setOpen(!isOpen)}
                variant="accent-outline"
                borderRadius={"8px"}
                color={"blue"}
                fontSize="sm"
                fontWeight="400"
                ml={10}
                isDisabled={
                  packageName === "trail" || packageName === "ondemand"
                }
              >
                Cancel Subscription
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
      <PlanDetailsModal
        subscription={subscription ? true : false}
        currentPackage={packageName}
        packageRechargeDate={packageRechargeDate}
        plan={plan}
        open={open}
        onModalClose={onModalClose}
      />
      <AlertDialog
        isOpen={isOpen}
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

              <Text fontSize={"lg"} mt={10}>
                {plan.name}
              </Text>
              <Heading fontSize={"x-large"} mb={10}>
                {plan.name === "Trial"
                  ? "Free"
                  : plan.name === "Enterprise"
                  ? "$--"
                  : `$ ${plan.amount}`}
              </Heading>

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

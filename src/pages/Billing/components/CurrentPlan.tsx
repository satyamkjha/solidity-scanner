import {
  useToast,
  Text,
  Flex,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  HStack,
  CloseButton,
  Divider,
  AlertDialogFooter,
  Box,
} from "@chakra-ui/react";
import { Plan } from "common/types";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
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
  refetchProfile(): any;
}> = ({
  billingCycle,
  packageName,
  packageRechargeDate,
  packageValidity,
  plan,
  isCancellable,
  subscription,
  upgradePlan,
  refetchProfile,
}) => {
  const toast = useToast();
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
      refetchProfile();
      onClose();
    }
  };

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const onModalClose = () => setOpen(false);

  const [isCancelSub, setIsCancelSub] = useState(false);
  const onClose = () => setIsCancelSub(false);

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
        h={"fit-content"}
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
        </Flex>
        <Flex
          w={["100%", "100%", "100%", "36%"]}
          mt={[10, 10, 10, 0]}
          ml={[0, 0, 0, "auto"]}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          <PlanCycleInfo
            planName={plan.name}
            packageRechargeDate={packageRechargeDate}
            packageValidity={packageValidity}
            packageName={packageName}
            subscription={subscription}
          />
        </Flex>
      </Flex>
      <Flex
        mt={10}
        w={"100%"}
        h={"fit-content"}
        flexDir={["column", "column", "column", "row"]}
        justifyContent={[
          "flex-start",
          "flex-start",
          "flex-start",
          "space-between",
        ]}
        alignItems={["flex-start", "flex-start", "flex-start", "center"]}
      >
        <SubscriptionDataContainer
          packageName={packageName}
          isCancellable={isCancellable}
          packageRechargeDate={packageRechargeDate}
        />
        <Flex
          w={["100%", "100$", "100%", "fit-content"]}
          flexDir={["column", "row"]}
          justifyContent={"flex-start"}
          mt={[6, 6, 6, 4]}
          ml={[0, 0, 0, 4]}
        >
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
              onClick={() => setIsCancelSub(!isCancelSub)}
              variant={"gray-outline"}
              borderRadius={"8px"}
              fontSize="sm"
              fontWeight="400"
              ml={[0, 10]}
              mt={[5, 0]}
              isDisabled={!isCancellable}
            >
              Cancel Subscription
            </Button>
          )}
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

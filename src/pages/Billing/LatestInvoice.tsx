import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  VStack,
  Heading,
  Button,
  Text,
  Image,
  useDisclosure,
  Switch,
} from "@chakra-ui/react";
import { Plan, Transaction } from "common/types";
import React from "react";
import CancelPaymentDialog from "components/billing/CancelPaymentDialog";
import CurrentPlanDescriptionContainer from "./CurrentPlanDescriptionContainer";

const LatestInvoice: React.FC<{
  planData: Plan;
  selectedPlan: string;
  transactionData: Transaction;
  onPaymentCancel: any;
}> = ({ planData, selectedPlan, transactionData, onPaymentCancel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        w={"100%"}
        backgroundColor={"white"}
        borderRadius="15px"
        mt={4}
        px={[5, 5, 10]}
        py={[5, 5, 8]}
        boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15)"}
        flexDir="column"
      >
        <Flex w="100%" align="center" mb={8}>
          <Text fontWeight="600">Complete your purchase</Text>
          <CloseIcon
            ml="auto"
            color="#B0B7C3"
            cursor="pointer"
            onClick={onOpen}
          />
        </Flex>
        <CurrentPlanDescriptionContainer
          packageName={selectedPlan}
          plan={planData}
          duration={transactionData.billing_cycle}
          showCheckIcon={false}
        />
        <Flex
          flexDir={"row"}
          position={"relative"}
          alignItems={"flex-start"}
          justifyContent="flex-start"
        >
          <Text
            color={
              transactionData.billing_cycle === "monthly"
                ? "#000000"
                : "#7F7F7F"
            }
            fontSize="sm"
            fontWeight={300}
          >
            Monthly
          </Text>
          <Switch
            mx={4}
            size="md"
            variant={
              transactionData.billing_cycle === "yearly" ? "accent" : "brand"
            }
            isChecked={transactionData.billing_cycle === "yearly"}
            isDisabled={true}
          />
          <Text
            color={
              transactionData.billing_cycle === "yearly" ? "#000000" : "#7F7F7F"
            }
            fontSize="sm"
            fontWeight={300}
          >
            Yearly
          </Text>
        </Flex>
        <Button
          variant="brand"
          mt={[4, 4, 8, 10]}
          mx={[2, 2, 2, 14]}
          onClick={() => {
            window.open(`${transactionData.invoice_url}`, "_blank");
          }}
        >
          Make Payment
        </Button>
      </Flex>
      <CancelPaymentDialog
        isOpen={isOpen}
        onClose={onClose}
        orderId={transactionData.order_id}
        paymentPlatform={transactionData.payment_platform}
        onPaymentCancel={onPaymentCancel}
      />
    </>
  );
};

export default LatestInvoice;

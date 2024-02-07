import React, { useState, useEffect } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import PaymentModal from "./PaymentModal";
import { useParams } from "react-router-dom";
import { EmailForm } from "./qs_report/emailForm";
import { PaymentMsg } from "./qs_report/paymentMsg";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { usePricingPlans } from "hooks/usePricingPlans";

export const QSPaymentModal: React.FC<{
  onClose: any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  const [modalState, setModalState] = useState("enter_email");
  const { data: pricing_plans } = usePricingPlans();
  const {
    isOpen: openPaymentModal,
    onOpen,
    onClose: closePaymentModal,
  } = useDisclosure();
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { scanId, projectId, reportId } = useParams<{
    scanId: string;
    projectId: string;
    reportId: string;
  }>();
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "loading" | "failed"
  >("loading");

  useEffect(() => {
    if (transactionId === "") {
      setModalState("enter_email");
    } else {
      setModalState("payment_complete");

      checkTransactionStatus();
    }
  }, [transactionId]);

  const resetStates = () => {
    setModalState("enter_email");
    setEmail("");
    setPaymentStatus("loading");
  };

  const checkTransactionStatus = () => {
    let intervalId: NodeJS.Timeout;
    intervalId = setInterval(async () => {
      const { data } = await API.post(
        API_PATH.API_GET_CHECKOUT_TRANSACTION_STATUS,
        {
          transaction_id: transactionId,
        }
      );
      if (data.status && data.status === "paid") {
        setPaymentStatus("success");
        clearInterval(intervalId);
      }
    }, 10000);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetStates();
        }}
      >
        <ModalOverlay />
        <ModalContent
          bg="white"
          h={"100%"}
          minH={"fit-content"}
          maxH={"85vh"}
          maxW={["90vw", "90vw", "75vw"]}
          minW={"300px"}
          borderRadius="15px"
        >
          <ModalHeader textAlign={["center"]} py={10} pb={2}>
            {"Unlock Audit Report"}
          </ModalHeader>
          <ModalCloseButton mt={8} mr={2} />
          <ModalBody h="100%" w={"100%"} px={[6, 6, 6, 12]} pb={10} pt={4}>
            <Divider />
            <Flex
              justifyContent={"center"}
              alignItems={"flex-start"}
              w={"100%"}
              h={"100%"}
              flexDir="row"
              pt={
                modalState === "publish_details" ? [0, 0, 0, 10] : [4, 4, 4, 10]
              }
              pb={10}
            >
              {modalState === "enter_email" && pricing_plans ? (
                <EmailForm
                  amount={
                    pricing_plans.pricing_data["on-demand-report"]["non-pro"]
                      .amount
                  }
                  email={email}
                  setEmail={setEmail}
                  onOpen={onOpen}
                  setModalState={setModalState}
                  setPaymentStatus={setPaymentStatus}
                />
              ) : pricing_plans && modalState === "make_payment" ? (
                <PaymentModal
                  globalDuration={"on-demand-report"}
                  selectedPlan={"non-pro"}
                  setTransactionId={setTransactionId}
                  pricingDetails={pricing_plans.pricing_data}
                  isOpen={openPaymentModal}
                  onClose={() => {
                    closePaymentModal();
                  }}
                  containerModalClose={() => {
                    resetStates();
                    onClose();
                  }}
                  paymentMetadata={{
                    project_id: projectId,
                    scan_id: scanId,
                    report_id: reportId,
                  }}
                  email={email}
                />
              ) : modalState === "payment_complete" && pricing_plans ? (
                <PaymentMsg
                  amount={
                    pricing_plans.pricing_data["on-demand-report"]["non-pro"]
                      .amount
                  }
                  email={email}
                  paymentStatus={paymentStatus}
                />
              ) : null}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

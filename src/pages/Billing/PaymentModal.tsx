import { Modal, ModalOverlay, Flex, Divider } from "@chakra-ui/react";
import React, { useState } from "react";
import { getAssetsURL } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import SelectPaymentMethod from "./SelectPaymentMethod";

const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: any;
  selectedPlan: string;
}> = ({ isOpen, onClose, selectedPlan }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const [paymentMethod, setPaymentMethod] = useState<"cp" | "stripe">("cp");
  const createStripePayment = async () => {
    let duration = "";
    if (selectedPlan === "ondemand") {
      duration = "ondemand";
    } else {
      duration = "monthly";
    }

    const { data, status } = await API.post<{
      status: string;
      checkout_url: string;
    }>(API_PATH.API_CREATE_STRIPE_SUBSCRIPTION_BETA, {
      package: selectedPlan,
      duration: duration,
    });

    if (status === 200) {
      window.open(`${data.checkout_url}`, "_blank");
      fetchAgain();
      onClose();
    }
  };

  // const [coin, setCoin] = useState("");
  // const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const width = 600;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    let duration = "";
    if (selectedPlan === "ondemand") {
      duration = "ondemand";
    } else {
      duration = "monthly";
    }
    try {
      setLoading(true);
      const { data } = await API.post<{
        checkout_url: string;
        status: string;
        status_url: string;
      }>(API_PATH.API_CREATE_ORDER_CP, {
        package: selectedPlan,
        currency: coin,
        duration: duration,
      });
      setLoading(false);
      const popup = window.open(
        data.checkout_url,
        "",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
      );
      onClose();
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW="fit-content"
        w="fit-content"
        overflowY={"scroll"}
        overflowX={"scroll"}
        bg="white"
        minH={"fit-content"}
      >
        <ModalHeader background="#FFFFFF" textAlign={"center"}>
          Select Payment Method
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
          <Divider />
          <HStack mt={5} w="100%" spacing={5} h={"fit-content"}>
            <Flex w="fit-content" h={"fit-content"}>
              <SelectPaymentMethod paymentMethod={paymentMethod} />
            </Flex>
            <Flex w="fit-content" h={"fit-content"}>
              <SelectPaymentMethod paymentMethod={paymentMethod} />
            </Flex>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;

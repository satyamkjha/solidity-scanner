import {
  Modal,
  ModalOverlay,
  Flex,
  Divider,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Image,
  Text,
  Heading,
  Switch,
  Button,
  useMediaQuery,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import API from "helpers/api";
import PaymentMethodCard from "./PaymentMethodCard";
import CoinPaymentSelect from "./CoinPaymentsSelect";
import CouponCodeSection from "./CouponCodeSection";
import { Plan, PricingData } from "common/types";
import PricingDetails from "pages/Pricing/components/PricingDetails";
import CurrentPlanDescriptionContainer from "./CurrentPlanDescriptionContainer";
import ConfirmationMessageBox from "./ConfirmationMessageBox";
import DetailedBill from "./DetailedBill";
import SwitchDuration from "./SwitchDuration";

const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: any;
  selectedPlan: string;
  globalDuration: "monthly" | "yearly" | "ondemand";
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
}> = ({ isOpen, onClose, selectedPlan, pricingDetails, globalDuration }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const toast = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"cp" | "stripe">("cp");
  const [coin, setCoin] = useState("");
  const [step, setStep] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [updatedPrice, setUpdatedPrice] = useState<string>("");

  const [duration, setDuration] = useState<"monthly" | "yearly" | "ondemand">(
    globalDuration
  );
  const [loading, setLoading] = useState(false);

  const createStripePayment = async () => {
    let req = {};
    if (activeCoupon) {
      req = {
        package: selectedPlan,
        duration: duration,
        coupon: activeCoupon,
      };
    } else {
      req = {
        package: selectedPlan,
        duration: duration,
      };
    }

    try {
      const { data, status } = await API.post<{
        status: string;
        checkout_url: string;
      }>(API_PATH.API_CREATE_STRIPE_SUBSCRIPTION_BETA, req);

      if (status === 200 && data.checkout_url) {
        window.open(`${data.checkout_url}`, "_blank");
        // fetchAgain();
        onClose();
      } else {
        toast({
          title: data.message,
          status: "error",
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createCPLink = async () => {
    const width = 600;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    try {
      setLoading(true);
      let req = {};
      if (activeCoupon) {
        req = {
          package: selectedPlan,
          currency: coin,
          duration: duration,
          coupon: activeCoupon,
        };
      } else {
        req = {
          package: selectedPlan,
          currency: coin,
          duration: duration,
        };
      }
      const { data } = await API.post<{
        checkout_url: string;
        status: string;
        status_url: string;
      }>(API_PATH.API_CREATE_ORDER_CP, req);
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

  const [isLargerThan450, isLargerThan900] = useMediaQuery([
    "(min-width: 450px)",
    "(min-width: 900px)",
  ]);

  useEffect(() => {
    setActiveCoupon("");
  }, []);

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
        <ModalCloseButton />
        <ModalHeader background="#FFFFFF" textAlign={"center"}>
          {isLargerThan900
            ? "Select Payment Method"
            : isLargerThan450
            ? step > 0
              ? "Confirm Payment Details"
              : "Select Payment Method"
            : step === 0
            ? "Confirm Plan"
            : step === 1
            ? "Select Payment Method"
            : step === 2
            ? "Enter Coupon Code"
            : "Confirm Payment Details"}
        </ModalHeader>

        <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]} py={10}>
          <Divider />
          {isLargerThan900 ? (
            <HStack
              mt={5}
              w="fit-content"
              spacing={"20px"}
              h={"fit-content"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <Flex
                w="400px"
                flexDir="column"
                h="fit-content"
                justifyContent={"flex-start"}
              >
                <HStack w="100%" spacing={"20px"}>
                  <PaymentMethodCard
                    paymentType={"cp"}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                  <PaymentMethodCard
                    paymentType={"stripe"}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                </HStack>
                {paymentMethod === "cp" && (
                  <CoinPaymentSelect setCoin={setCoin} coin={coin} />
                )}
                <CouponCodeSection
                  duration={duration}
                  selectedPlan={selectedPlan}
                  activeCoupon={activeCoupon}
                  setActiveCoupon={setActiveCoupon}
                  setUpdatedPrice={setUpdatedPrice}
                />
                <ConfirmationMessageBox
                  name={pricingDetails[duration][selectedPlan].name}
                  duration={duration}
                />
              </Flex>
              <Flex
                w="400px"
                h="fit-content"
                flexDir="column"
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
              >
                <CurrentPlanDescriptionContainer
                  packageName={selectedPlan}
                  plan={pricingDetails[duration][selectedPlan]}
                  duration={duration}
                />
                {duration !== "ondemand" && (
                  <SwitchDuration
                    setDuration={setDuration}
                    setActiveCoupon={setActiveCoupon}
                    setUpdatedPrice={setUpdatedPrice}
                    duration={duration}
                  />
                )}
                <DetailedBill
                  duration={duration}
                  pricingDetails={pricingDetails}
                  selectedPlan={selectedPlan}
                  activeCoupon={activeCoupon}
                  updatedPrice={updatedPrice}
                />
                <Button
                  mt={4}
                  w="100%"
                  variant="brand"
                  onClick={() => {
                    if (paymentMethod === "cp") {
                      createCPLink();
                    } else {
                      createStripePayment();
                    }
                  }}
                >
                  Make Payment
                </Button>
              </Flex>
            </HStack>
          ) : isLargerThan450 ? (
            <Flex
              w="450px"
              flexDir="column"
              h="fit-content"
              justifyContent={"flex-start"}
            >
              {step === 0 ? (
                <>
                  <HStack w="100%" spacing={"20px"}>
                    <PaymentMethodCard
                      paymentType={"cp"}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                    <PaymentMethodCard
                      paymentType={"stripe"}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                  </HStack>
                  {paymentMethod === "cp" && (
                    <CoinPaymentSelect setCoin={setCoin} coin={coin} />
                  )}
                  <CouponCodeSection
                    duration={duration}
                    selectedPlan={selectedPlan}
                    activeCoupon={activeCoupon}
                    setActiveCoupon={setActiveCoupon}
                    setUpdatedPrice={setUpdatedPrice}
                  />
                  <ConfirmationMessageBox
                    name={pricingDetails[duration][selectedPlan].name}
                    duration={duration}
                  />
                </>
              ) : (
                <>
                  <CurrentPlanDescriptionContainer
                    packageName={selectedPlan}
                    plan={pricingDetails[duration][selectedPlan]}
                    duration={duration}
                  />
                  {duration !== "ondemand" && (
                    <SwitchDuration
                      setDuration={setDuration}
                      setActiveCoupon={setActiveCoupon}
                      setUpdatedPrice={setUpdatedPrice}
                      duration={duration}
                    />
                  )}
                  <DetailedBill
                    duration={duration}
                    pricingDetails={pricingDetails}
                    selectedPlan={selectedPlan}
                    activeCoupon={activeCoupon}
                    updatedPrice={updatedPrice}
                  />
                </>
              )}
              <Button
                mt={4}
                w="100%"
                variant="brand"
                onClick={() => {
                  if (step > 0) {
                    if (paymentMethod === "cp") {
                      createCPLink();
                    } else {
                      createStripePayment();
                    }
                  } else {
                    setStep(1);
                  }
                }}
              >
                {step > 0 ? "Make Payment" : "Proceed to Payment"}
              </Button>
            </Flex>
          ) : (
            <>
              <Flex
                w="75vw"
                maxW={"300px"}
                flexDir="column"
                h="fit-content"
                justifyContent={"flex-start"}
                pt={5}
              >
                {step === 0 ? (
                  <>
                    <CurrentPlanDescriptionContainer
                      packageName={selectedPlan}
                      plan={pricingDetails[duration][selectedPlan]}
                      duration={duration}
                    />
                    {duration !== "ondemand" && (
                      <SwitchDuration
                        setDuration={setDuration}
                        setActiveCoupon={setActiveCoupon}
                        setUpdatedPrice={setUpdatedPrice}
                        duration={duration}
                      />
                    )}
                  </>
                ) : step === 1 ? (
                  <VStack
                    w="100%"
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={5}
                  >
                    <PaymentMethodCard
                      paymentType={"cp"}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                    <PaymentMethodCard
                      paymentType={"stripe"}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                  </VStack>
                ) : step === 2 ? (
                  <>
                    {paymentMethod === "cp" && (
                      <CoinPaymentSelect setCoin={setCoin} coin={coin} />
                    )}
                    <CouponCodeSection
                      duration={duration}
                      selectedPlan={selectedPlan}
                      activeCoupon={activeCoupon}
                      setActiveCoupon={setActiveCoupon}
                      setUpdatedPrice={setUpdatedPrice}
                    />
                  </>
                ) : (
                  <>
                    <ConfirmationMessageBox
                      name={pricingDetails[duration][selectedPlan].name}
                      duration={duration}
                    />
                    <DetailedBill
                      duration={duration}
                      pricingDetails={pricingDetails}
                      selectedPlan={selectedPlan}
                      activeCoupon={activeCoupon}
                      updatedPrice={updatedPrice}
                    />
                  </>
                )}
                <Button
                  mt={4}
                  w="100%"
                  variant="brand"
                  onClick={() => {
                    if (step > 2) {
                      if (paymentMethod === "cp") {
                        createCPLink();
                      } else {
                        createStripePayment();
                      }
                    } else {
                      setStep(step + 1);
                    }
                  }}
                >
                  {step === 0 ? "Confirm Plan" : "Proceed to Payment"}
                </Button>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;

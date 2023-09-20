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
  Button,
  useMediaQuery,
  VStack,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { API_PATH } from "helpers/routeManager";
import API from "helpers/api";
import PaymentMethodCard from "../../pages/Billing/components/PaymentMethodCard";
import CoinPaymentSelect from "../../pages/Billing/components/CoinPaymentsSelect";
import CouponCodeSection from "../../pages/Billing/components/CouponCodeSection";
import { Plan, Profile } from "common/types";
import CurrentPlanDescriptionContainer from "../../pages/Billing/components/CurrentPlanDescriptionContainer";
import ConfirmationMessageBox from "../../pages/Billing/components/ConfirmationMessageBox";
import DetailedBill from "../../pages/Billing/components/DetailedBill";
import SwitchDuration from "../../pages/Billing/components/SwitchDuration";
import Loader from "components/styled-components/Loader";

const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: any;
  selectedPlan: string;
  quantity?: number;
  globalDuration: string;
  profileData?: Profile;
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
  paymentMetadata?: any;
}> = ({
  isOpen,
  onClose,
  selectedPlan,
  pricingDetails,
  globalDuration,
  profileData,
  quantity,
  paymentMetadata,
}) => {
  const toast = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"cp" | "stripe">("cp");
  const [coin, setCoin] = useState("");
  const [step, setStep] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [updatedPrice, setUpdatedPrice] = useState<string>("");
  const [disableMessage, setDisableMessage] = useState<string>("");
  const [disablePayment, setDisablePayment] = useState<boolean>(true);

  const [duration, setDuration] = useState<
    "monthly" | "yearly" | "ondemand" | "topup"
  >(globalDuration);
  const [loading, setLoading] = useState(false);

  const createStripePayment = async () => {
    let req: any = {};
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

    if (quantity) {
      req.quantity = quantity;
    }

    if (paymentMetadata) {
      req.paymnet_metadata = paymentMetadata;
    }

    try {
      setLoading(true);
      const { data, status } = await API.post<{
        status: string;
        checkout_url: string;
      }>(API_PATH.API_CREATE_STRIPE_SUBSCRIPTION_BETA, req);

      if (status === 200 && data.checkout_url) {
        setLoading(false);
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
      setLoading(false);
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
      let req: any = {};
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
      if (quantity) {
        req.quantity = quantity;
      }
      const { data } = await API.post<{
        checkout_url: string;
        status: string;
        status_url: string;
      }>(API_PATH.API_CREATE_ORDER_CP, req);
      setLoading(false);
      window.open(
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

  const isCoinPaymentDisabled = () => {
    if (!coin) return true;
    if (activeCoupon && parseFloat(updatedPrice).toFixed(2) === "0.00") {
      setDisableMessage("Coin payment is not available with this coupon");
      return true;
    }
    setDisableMessage("");
    return false;
  };

  useEffect(() => {
    setActiveCoupon("");
  }, []);

  useEffect(() => {
    if (paymentMethod === "cp") {
      setDisablePayment(isCoinPaymentDisabled());
    } else {
      setDisablePayment(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, paymentMethod, updatedPrice, activeCoupon]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW="fit-content"
        w="fit-content"
        overflowY={"scroll"}
        overflowX={"scroll"}
        bg="white"
        h={duration === "topup" ? "75%" : "85%"}
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

        <ModalBody h="100%" w={"100%"} px={[6, 6, 6, 12]} pb={10} pt={4}>
          <Divider />
          {isLargerThan900 ? (
            <HStack
              mt={5}
              w="fit-content"
              spacing={"20px"}
              h="100%"
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <Flex
                w="400px"
                flexDir="column"
                h="100%"
                justifyContent={"flex-start"}
              >
                <HStack w="100%" spacing={"20px"}>
                  <PaymentMethodCard
                    paymentType={"cp"}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                  {profileData ? (
                    !profileData.public_address && (
                      <PaymentMethodCard
                        paymentType={"stripe"}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                      />
                    )
                  ) : (
                    <PaymentMethodCard
                      paymentType={"stripe"}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                  )}
                </HStack>
                {paymentMethod === "cp" && (
                  <CoinPaymentSelect setCoin={setCoin} coin={coin} />
                )}
                {duration !== "topup" && (
                  <CouponCodeSection
                    duration={duration}
                    selectedPlan={selectedPlan}
                    activeCoupon={activeCoupon}
                    setActiveCoupon={setActiveCoupon}
                    setUpdatedPrice={setUpdatedPrice}
                  />
                )}
                <ConfirmationMessageBox
                  name={pricingDetails[duration][selectedPlan].name}
                  duration={duration}
                />
              </Flex>
              <Flex
                w="400px"
                h="100%"
                flexDir="column"
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
              >
                <CurrentPlanDescriptionContainer
                  packageName={selectedPlan}
                  plan={pricingDetails[duration][selectedPlan]}
                  duration={duration}
                />
                {![
                  "ondemand",
                  "topup",
                  "publish_report",
                  "verified_publish_report",
                ].includes(duration) && (
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
                  quantity={quantity}
                />
                <Tooltip
                  isDisabled={
                    paymentMethod !== "cp" ||
                    disableMessage === "" ||
                    !activeCoupon
                  }
                  label={disableMessage}
                >
                  <Flex mt={"auto"} w="100%">
                    <Button
                      w="100%"
                      variant="brand"
                      isLoading={loading}
                      spinner={<Loader color={"#3300FF"} size={25} />}
                      onClick={() => {
                        if (paymentMethod === "cp") {
                          createCPLink();
                        } else {
                          createStripePayment();
                        }
                      }}
                      isDisabled={disablePayment}
                    >
                      Make Payment
                    </Button>
                  </Flex>
                </Tooltip>
              </Flex>
            </HStack>
          ) : isLargerThan450 ? (
            <Flex
              w="450px"
              flexDir="column"
              h="100%"
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
                    {profileData ? (
                      !profileData.public_address && (
                        <PaymentMethodCard
                          paymentType={"stripe"}
                          paymentMethod={paymentMethod}
                          setPaymentMethod={setPaymentMethod}
                        />
                      )
                    ) : (
                      <PaymentMethodCard
                        paymentType={"stripe"}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                      />
                    )}
                  </HStack>
                  {paymentMethod === "cp" && (
                    <CoinPaymentSelect setCoin={setCoin} coin={coin} />
                  )}
                  {duration !== "topup" && (
                    <CouponCodeSection
                      duration={duration}
                      selectedPlan={selectedPlan}
                      activeCoupon={activeCoupon}
                      setActiveCoupon={setActiveCoupon}
                      setUpdatedPrice={setUpdatedPrice}
                    />
                  )}
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
                  {![
                    "ondemand",
                    "topup",
                    "publish_report",
                    "verified_publish_report",
                  ].includes(duration) && (
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
                    quantity={quantity}
                  />
                </>
              )}
              <Button
                mt={"auto"}
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
                h="100%"
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
                    {![
                      "ondemand",
                      "topup",
                      "publish_report",
                      "verified_publish_report",
                    ].includes(duration) && (
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
                    {profileData ? (
                      !profileData.public_address && (
                        <PaymentMethodCard
                          paymentType={"stripe"}
                          paymentMethod={paymentMethod}
                          setPaymentMethod={setPaymentMethod}
                        />
                      )
                    ) : (
                      <PaymentMethodCard
                        paymentType={"stripe"}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                      />
                    )}
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
                      quantity={quantity}
                    />
                  </>
                )}
                <Button
                  mt={"auto"}
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

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

const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: any;
  selectedPlan: string;
  globalDuration: "monthly" | "yearly" | "on-demand";
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
}> = ({ isOpen, onClose, selectedPlan, pricingDetails, globalDuration }) => {
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
      // fetchAgain();
      onClose();
    }
  };

  const [coin, setCoin] = useState("");

  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [updatedPrice, setUpdatedPrice] = useState<string>("");

  const [duration, setDuration] = useState<"monthly" | "yearly" | "on-demand">(
    globalDuration
  );

  const [loading, setLoading] = useState(false);
  const createCPLink = async () => {
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
        <ModalHeader background="#FFFFFF" textAlign={"center"}>
          Select Payment Method
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
          <Divider />
          <HStack mt={5} w="fit-content" spacing={"20px"} h={"fit-content"}>
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
              <CoinPaymentSelect setCoin={setCoin} coin={coin} />
              <CouponCodeSection
                duration={duration}
                selectedPlan={selectedPlan}
                activeCoupon={activeCoupon}
                setActiveCoupon={setActiveCoupon}
                setUpdatedPrice={setUpdatedPrice}
              />
              <Flex
                bgColor="#FFF8ED"
                justifyContent={"center"}
                alignItems={"center"}
                border="2px solid #FFC661"
                p={3}
                borderRadius={10}
                mt={5}
              >
                <Text color="#4E5D78" fontWeight={300} fontSize={"sm"}>
                  You have currently selected the{" "}
                  <span
                    style={{
                      fontWeight: 900,
                    }}
                  >
                    <b>
                      {sentenceCapitalize(
                        pricingDetails[duration][selectedPlan].name
                      )}{" "}
                      {sentenceCapitalize(duration)}{" "}
                    </b>
                  </span>
                  plan sum of the charges will apply on your conformation
                </Text>
              </Flex>
            </Flex>
            <Flex w="400px" h="fit-content" flexDir="column">
              <Flex
                w="100%"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Image
                  width="30px"
                  height="30px"
                  mr={2}
                  src={`${assetsURL}pricing/${selectedPlan}-heading.svg`}
                />
                <Text fontSize={"xl"} fontWeight={700}>
                  {sentenceCapitalize(
                    pricingDetails[duration][selectedPlan].name
                  )}
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                w="100%"
                justifyContent={"flex-start"}
                alignItems={"flex-end"}
                my={1}
              >
                <Heading fontSize="2xl" lineHeight="title" fontWeight={900}>
                  {`$ ${pricingDetails[duration][selectedPlan].amount}`}
                </Heading>
                <Text fontSize="2xl" fontWeight={300}>
                  /
                </Text>
                <Text mb={1} fontSize="md" fontWeight={300}>
                  {duration}
                </Text>
              </Flex>
              {duration !== "on-demand" && (
                <Flex
                  my={2}
                  flexDir={"row"}
                  position={"relative"}
                  alignItems={"flex-start"}
                  justifyContent="flex-start"
                >
                  <Text
                    color={duration === "monthly" ? "#000000" : "#7F7F7F"}
                    fontSize="sm"
                    fontWeight={300}
                  >
                    Monthly
                  </Text>
                  <Switch
                    mx={4}
                    size="md"
                    variant={duration === "yearly" ? "accent" : "brand"}
                    isChecked={duration === "yearly"}
                    onChange={() => {
                      if (duration === "monthly") {
                        setDuration("yearly");
                      } else {
                        setDuration("monthly");
                      }
                    }}
                  />
                  <Text
                    color={duration === "yearly" ? "#000000" : "#7F7F7F"}
                    fontSize="sm"
                    fontWeight={300}
                  >
                    Yearly
                  </Text>
                </Flex>
              )}
              <Text
                mt={2}
                mb={3}
                fontWeight={400}
                fontSize={"sm"}
                color="detail"
              >
                {pricingDetails[duration][selectedPlan].description}
              </Text>
              <Divider />
              <HStack mt={4} w="100%" justifyContent={"space-between"}>
                <Text fontSize={"sm"} fontWeight={300}>
                  Selected Plan Total
                </Text>
                <Heading fontSize={"md"}>
                  {`$ ${pricingDetails[duration][selectedPlan].amount}0`}
                </Heading>
              </HStack>
              {duration === "yearly" && (
                <HStack mt={4} w="100%" justifyContent={"space-between"}>
                  <Text fontSize={"sm"} fontWeight={300}>
                    Yearly Discount
                  </Text>
                  <Heading fontSize={"md"}>{`- $ 999.00`} </Heading>
                </HStack>
              )}
              <HStack mt={4} w="100%" justifyContent={"space-between"}>
                <Text color={"#8A94A6"} fontSize={"sm"} fontWeight={300}>
                  Coupon Code
                </Text>
                <Heading color={"#8A94A6"} fontSize={"md"}>
                  {`- $ 00.00`}{" "}
                </Heading>
              </HStack>
              <Divider mt={4} />
              <HStack mt={4} w="100%" justifyContent={"space-between"}>
                <Text fontSize={"sm"} fontWeight={300}>
                  Grand Total
                </Text>
                <Heading fontSize={"lg"}>
                  {`$ ${pricingDetails[duration][selectedPlan].amount}0`}
                </Heading>
              </HStack>
              <Divider mt={4} />
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;

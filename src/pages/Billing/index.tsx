import React, { useState } from "react";
import { useQueryClient } from "react-query";
import CryptoIcon from "react-crypto-icons";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js/types/components/buttons";

import {
  Flex,
  Box,
  Text,
  Icon,
  Button,
  Divider,
  Link,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCheckCircle } from "react-icons/ai";

import { useProfile } from "hooks/useProfile";
import { useAcceptedCoins } from "hooks/usePricing";

import API from "helpers/api";
import { daysRemaining, dateToDDMMMMYYYY } from "common/functions";

const Billing: React.FC = () => {
  const { data } = useProfile();
  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: 8,
        mx: [0, 0, 4],
        my: 4,
        minH: "78vh",
      }}
    >
      <Flex
        sx={{
          w: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          my: 4,
        }}
      >
        <Text sx={{ color: "text", fontWeight: 600 }}>
          BILLING
          {data?.current_package === "trial" && (
            <Text as="span" ml={4} color="subtle" fontSize="smaller">
              Get two scans free with trial account
            </Text>
          )}
        </Text>
      </Flex>
      {!data ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          {data.current_package === "trial" ||
          data.current_package === "expired" ? (
            <>
              <Box
                sx={{ w: "100%", background: "white", borderRadius: 15, p: 8 }}
              >
                <PricingPlan
                  name="Individual Researcher"
                  packageName="individual"
                  price={99}
                  details={[
                    "Monitor upto 3 projects",
                    "Unlimited rescans",
                    "Access to all existing templates",
                  ]}
                />
                <Divider w="100%" my={8} />
                <PricingPlan
                  name="Enterprise"
                  packageName="enterprise"
                  price={499}
                  details={[
                    "Monitor upto 10 projects",
                    "Unlimited rescans",
                    "Access to all existing templates",
                    "Integrate with all popular tools and platforms",
                    "Add custom scan templates and set priorities for issues",
                    "Access to white glove services from our team",
                  ]}
                />
              </Box>
              <Box
                sx={{
                  w: "100%",
                  background: "white",
                  borderRadius: 15,
                  p: 8,
                  mt: 4,
                }}
              >
                <PricingPlan
                  isCustom
                  name="Custom"
                  packageName=""
                  price={499}
                  details={[
                    "Contact us in more custom features",
                    "Request our team for a manual audit",
                    "Get suggestions for issue remediation",
                  ]}
                />
              </Box>
            </>
          ) : (
            <>
              {data.current_package === "enterprise" ? (
                <Flex width="100%" p={8}>
                  <Box sx={{ w: "100%" }}>
                    <CurrentPlan
                      name="Enterprise"
                      packageName="enterprise"
                      packageRechargeDate={data.package_recharge_date}
                      packageValidity={data.package_validity}
                      details={[
                        "Monitor upto 10 projects",
                        "Unlimited rescans",
                        "Access to all existing templates",
                        "Integrate with all popular tools and platforms",
                        "Add custom scan templates and set priorities for issues",
                        "Access to white glove services from our team",
                      ]}
                    />
                  </Box>
                  {/* <Box sx={{ w: "%" }}></Box> */}
                </Flex>
              ) : (
                <Flex width="100%" p={8}>
                  <Box sx={{ w: "100%" }}>
                    <CurrentPlan
                      name="Individual Researcher"
                      packageName="individual"
                      packageRechargeDate={data.package_recharge_date}
                      packageValidity={data.package_validity}
                      details={[
                        "Monitor upto 3 projects",
                        "Unlimited rescans",
                        "Access to all existing templates",
                      ]}
                    />
                  </Box>
                  {/* <Box sx={{ w: "%" }}></Box> */}
                </Flex>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

const PricingPlan: React.FC<{
  name: string;
  packageName: string;
  price: number;
  details: string[];
  isCustom?: boolean;
}> = ({ name, price, details, packageName, isCustom }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const createPaypalOrder = async () => {
    const { data } = await API.post<{
      status: string;
      orderID: string;
    }>("/api-create-paypal-order/", {
      package: packageName,
    });
    return data.orderID;
  };

  const onPaypayApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    const { data: responseData } = await API.post<{
      status: string;
      message: string;
    }>("/api-execute-paypal-order/", {
      order_id: data.orderID,
    });
    queryClient.invalidateQueries("profile");
    if (responseData.status === "success") {
      toast({
        title: "Payment successful.",
        description: `You've successfully subscribed to the ${packageName} plan.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error.",
        description: `There was an issue processing your payment.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        alignItems={["center", "center", "flex-start"]}
        justifyContent={["center", "center", "space-between"]}
        flexDir={["column", "column", "row"]}
        w="100%"
      >
        <Box mb={[6, 6, 0]} minW="200px">
          <Text sx={{ fontSize: "lg" }}>{name}</Text>
          <Text fontSize="3xl" color="brand-dark" fontWeight={500} pt={2}>
            {" "}
            ${price} / mo
          </Text>
        </Box>
        <Box width={["80%", "80%", "40%"]} mb={[6, 6, 0]}>
          <PricingDetails details={details} />
        </Box>
        <Box mb={[6, 6, 0]}>
          {isCustom ? (
            <Link target="_blank" href="mailto:info@bitaces.com">
              <Button colorScheme="gray" variant="outline" width="230px">
                Contact us
              </Button>
            </Link>
          ) : (
            <Button variant="brand" width="230px" onClick={onOpen}>
              Pay Now
            </Button>
          )}
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent backgroundColor="bg.subtle">
          <ModalCloseButton />
          <ModalBody py={12}>
            <Flex w="100%">
              <Box width="65%" m={2}>
                <Flex
                  cursor="pointer"
                  width="100%"
                  bg="white"
                  pt={6}
                  px={8}
                  borderRadius="15px"
                  h="160px"
                  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                >
                  <Box width="100%" px={4}>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AZAcrVVsOPsS5yHduMohAWjIVrlPtaD_RbaoCh7JlvcA3TE8EF-n1q834XEMlZYOxzd1wjAGLEcRHifO",
                      }}
                    >
                      <PayPalButtons
                        style={{
                          color: "blue",
                          shape: "pill",
                          label: "pay",
                          height: 40,
                          layout: "vertical",
                        }}
                        className="full-width"
                        createOrder={createPaypalOrder}
                        onApprove={onPaypayApprove}
                      />
                    </PayPalScriptProvider>
                  </Box>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  color="subtle"
                  px={5}
                  mt={6}
                  sx={{
                    height: 0.5,
                    borderColor: "#EDF2F7",
                    borderStyle: "solid",
                    borderLeftWidth: ["130px", "180px", "240px"],
                    borderRightWidth: ["130px", "180px", "240px"],
                  }}
                >
                  <Text fontWeight={600} color="subtle">
                    OR
                  </Text>
                </Flex>
                <Flex
                  cursor="pointer"
                  width="100%"
                  bg="white"
                  mt={6}
                  py={6}
                  px={8}
                  borderRadius="15px"
                  // h="320px"
                  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                >
                  <CoinPayments packageName={packageName} onClose={onClose} />
                </Flex>
              </Box>
              <Box
                width="35%"
                bg="white"
                m={2}
                py={6}
                px={8}
                borderRadius="15px"
                border="1px solid"
                borderColor="gray.300"
              >
                <Text sx={{ fontWeight: 500 }}>{name}</Text>
                <Text
                  sx={{
                    fontWeight: 600,
                    fontSize: "3xl",
                    color: "brand-dark",
                    py: 2,
                  }}
                >
                  ${price} / mo
                </Text>
                <Box py={8}>
                  <PricingDetails details={details} inModal />
                </Box>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const PricingDetails: React.FC<{ details: string[]; inModal?: boolean }> = ({
  details,
  inModal,
}) => {
  return (
    <>
      {details.map((detail) => (
        <Flex
          alignItems="center"
          fontWeight={400}
          fontSize={inModal ? "sm" : "md"}
          my={2}
        >
          <Icon as={AiOutlineCheckCircle} color="brand-dark" mr={2} />
          <Text>{detail}</Text>
        </Flex>
      ))}
    </>
  );
};

const CurrentPlan: React.FC<{
  name: string;
  packageName: string;
  details: string[];
  packageRechargeDate: string;
  packageValidity: number;
}> = ({ name, packageRechargeDate, packageValidity, details }) => {
  return (
    <Box
      sx={{
        w: "100%",
        background: "white",
        borderRadius: 15,
        p: 8,
        border: "1px solid #38CB89",
      }}
    >
      <Flex alignItems="center">
        <Icon as={AiFillCheckCircle} color="#38CB89" fontSize="xl" mr={2} />
        <Text>Current Plan</Text>
      </Flex>
      <Flex>
        <Box width="50%">
          <Text sx={{ fontWeight: 500 }} fontSize="2xl" mt={8}>
            {name}
          </Text>
          {/* <Text
            sx={{
              fontWeight: 600,
              fontSize: "3xl",
              color: "brand-dark",
              py: 2,
            }}
          >
            ${price} / mo
          </Text> */}
          <Box py={4}>
            <PricingDetails details={details} inModal />
          </Box>
        </Box>
        <Flex
          width="50%"
          py={4}
          pr={4}
          justifyContent="space-between"
          alignItems="flex-end"
          flexDirection="column"
        >
          <Flex alignItems="center" pt={4}>
            <Icon
              as={AiOutlineCalendar}
              color="gray.500"
              fontSize="2xl"
              mr={2}
            />
            <Text>
              <Text as="span" fontSize="2xl" fontWeight={700}>
                {daysRemaining(new Date(packageRechargeDate), packageValidity)}
              </Text>{" "}
              days remaining
            </Text>
          </Flex>
          <Box mb={2}>
            <Text fontWeight={400} fontSize="md" mb={1} color="#4E5D78">
              Subscribed on
            </Text>
            <Text fontWeight={500} fontSize="xl">
              {dateToDDMMMMYYYY(new Date(packageRechargeDate))}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

const CoinPayments: React.FC<{ packageName: string; onClose: () => void }> = ({
  packageName,
  onClose,
}) => {
  const { data, isLoading } = useAcceptedCoins();
  const [coin, setCoin] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const width = 600;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    try {
      setLoading(true);
      const { data } = await API.post<{
        checkout_url: string;
        status: string;
        status_url: string;
      }>("api-create-order-cp/", {
        package: packageName,
        currency: coin,
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
    <VStack width="100%" spacing={6} mt={4} alignItems="inherit">
      <Flex alignItems="flex-end" justifyContent="space-between">
        <img
          src="/coinpayments-logo.svg"
          width="200px"
          alt="CoinPayments Logo"
        />
        {data && coin !== "" && (
          <Flex alignItems="center">
            <CryptoIcon size={32} name={coin.toLowerCase()} />
            <Text ml={2} color="brand-dark" fontWeight={700} fontSize="3xl">
              {packageName === "individual" &&
                parseFloat(data[coin].rate_individual).toPrecision(2)}
              {packageName === "enterprise" &&
                parseFloat(data[coin].rate_enterprise).toPrecision(2)}
              <Text as="span" fontSize="md" fontWeight={700} ml={2}>
                {coin}
              </Text>
            </Text>
          </Flex>
        )}
      </Flex>
      <FormControl id="contract_platform">
        <FormLabel fontSize="sm">Select coin</FormLabel>
        <Select
          placeholder="Select coin"
          value={coin}
          isRequired
          isDisabled={isLoading}
          onChange={(e) => setCoin(e.target.value)}
        >
          {data &&
            Object.keys(data).map((key) => (
              <option key={key} value={key}>
                {data[key].name}
              </option>
            ))}
        </Select>
      </FormControl>
      <Flex justifyContent="flex-end">
        <Button
          variant="brand"
          isDisabled={coin === "" || isLoading}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Make Payment
        </Button>
      </Flex>
    </VStack>
  );
};

export default Billing;

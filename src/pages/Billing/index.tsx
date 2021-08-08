import React from "react";

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { AiOutlineCheckCircle } from "react-icons/ai";
import API from "helpers/api";

const Billing: React.FC = () => {
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
        minH: "80vh",
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
          <Text as="span" ml={4} color="subtle" fontSize="smaller">
            Get two scans free with trial account
          </Text>
        </Text>
      </Flex>
      <Box sx={{ w: "100%", background: "white", borderRadius: 15, p: 8 }}>
        <PricingPlan
          name="Individual Researcher"
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
        sx={{ w: "100%", background: "white", borderRadius: 15, p: 8, mt: 4 }}
      >
        <PricingPlan
          isCustom
          name="Custom"
          price={499}
          details={[
            "Contact us in more custom features",
            "Request our team for a manual audit",
            "Get suggestions for issue remediation",
          ]}
        />
      </Box>
      {/* {isLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : 'TEST'
      )} */}
    </Box>
  );
};

const PricingPlan: React.FC<{
  name: string;
  price: number;
  details: string[];
  isCustom?: boolean;
}> = ({ name, price, details, isCustom }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createPaypalOrder = async () => {
    const { data } = await API.post<{
      status: string;
      orderID: string;
    }>("/api-create-paypal-order/", {
      package: "package1",
    });
    return data.orderID;
  };

  const onPaypayApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    const { data: responseData } = await API.post(
      "/api-execute-paypal-order/",
      {
        order_id: data.orderID,
      }
    );
    console.log(responseData);
  };

  return (
    <>
      <Flex
        alignItems={["center", "center", "flex-start"]}
        justifyContent={["center", "center", "space-between"]}
        flexDir={["column", "column", "row"]}
        w="100%"
      >
        <Box mb={[6, 6, 0]}>
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
              <Box width="70%" m={2}>
                <Flex
                  cursor="pointer"
                  width="100%"
                  bg="white"
                  pt={6}
                  px={8}
                  borderRadius="15px"
                  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                >
                  <Box width="100%" px={4}>
                    <PayPalScriptProvider options={{ "client-id": "sb" }}>
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
                  {/* <PayPalButtons
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
                    /> */}
                </Flex>
              </Box>
              <Box
                width="30%"
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

export default Billing;

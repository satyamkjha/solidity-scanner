import React from "react";
import { useQueryClient } from "react-query";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { AiOutlineCheckCircle } from "react-icons/ai";
import API from "helpers/api";
import { useProfile } from "hooks/useProfile";
import { AiOutlineCalendar, AiFillCheckCircle } from "react-icons/ai";

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
          {data.current_package === "trial" ? (
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
                    <PayPalScriptProvider options={{ "client-id": "AZAcrVVsOPsS5yHduMohAWjIVrlPtaD_RbaoCh7JlvcA3TE8EF-n1q834XEMlZYOxzd1wjAGLEcRHifO" }}>
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

const CurrentPlan: React.FC<{
  name: string;
  packageName: string;
  details: string[];
}> = ({ name, packageName, details }) => {
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
                28
              </Text>{" "}
              days remaining
            </Text>
          </Flex>
          <Button size="sm" variant="brand">
            Cancel Subscription
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Billing;

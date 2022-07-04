import React, { useEffect, useRef, useState } from "react";
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
  Image,
  Heading,
  HStack,
  Badge,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  toast,
} from "@chakra-ui/react";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCheckCircle } from "react-icons/ai";

import { useProfile } from "hooks/useProfile";
import { useAcceptedCoins } from "hooks/usePricing";

import API from "helpers/api";
import { daysRemaining, dateToDDMMMMYYYY } from "common/functions";
import { Plan, Profile, Transaction } from "common/types";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { placements } from "@popperjs/core";
import ContactUs from "components/contactus";
import { usePricingPlans } from "hooks/usePricingPlans";
import { useTransactions } from "hooks/useTransactions";
import { sentenceCapitalize } from "helpers/helperFunction";
import { useInvoices } from "hooks/useInvoices";
import ReactPaginate from "react-paginate";
import { server } from "typescript";

const Billing: React.FC = () => {
  const { data } = useProfile();

  const { data: plans } = usePricingPlans();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const { data: transactionList } = useTransactions(1, 50);

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
          flexDir: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          my: 4,
        }}
      >
        <Text sx={{ color: "text", fontWeight: 600 }}>BILLING</Text>
        {!data || !plans || !transactionList ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <Tabs mt={10} w={"100%"} variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab px={20}>Plans</Tab>
              <Tab px={20}>Transactions</Tab>
            </TabList>
            <TabPanels width={"100%"}>
              <TabPanel width={"100%"}>
                <>
                  {data.current_package === "trial" ||
                  data.current_package === "expired" ||
                  data.current_package === "ondemand" ? (
                    <>
                      {transactionList.data.length > 0 &&
                        transactionList.data[0].payment_status === "open" && (
                          <LatestInvoice
                            transactionData={transactionList.data[0]}
                            selectedPlan={transactionList.data[0].package}
                            planData={
                              plans.monthly[transactionList.data[0].package]
                            }
                          />
                        )}
                      <Flex
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        flexWrap="wrap"
                        width={"100%"}
                        height={"fit-content"}
                        padding={2}
                        mt={5}
                      >
                        {Object.keys(plans.monthly).map((plan) => {
                          if (plan !== "trial")
                            return (
                              <PricingPlan
                                selectedPlan={selectedPlan}
                                setSelectedPlan={setSelectedPlan}
                                plan={plan}
                                planData={plans.monthly[plan]}
                              />
                            );
                        })}
                      </Flex>
                      <Text sx={{ color: "text", fontWeight: 600 }} ml={5}>
                        {plans.monthly[selectedPlan].name}
                      </Text>
                      <Text
                        as="span"
                        ml={5}
                        mt={3}
                        fontWeight={300}
                        fontSize="smaller"
                      >
                        {plans.monthly[selectedPlan].description}
                      </Text>
                      <PricingDetails
                        planData={plans.monthly[selectedPlan]}
                        selectedPlan={selectedPlan}
                      />
                    </>
                  ) : (
                    <>
                      <VStack width="100%" pt={8}>
                        <Box sx={{ w: "100%" }}>
                          <CurrentPlan
                            isCancellable={data.is_cancellable}
                            name={plans.monthly[data.current_package].name}
                            packageName={data.current_package}
                            packageRechargeDate={data.package_recharge_date}
                            packageValidity={data.package_validity}
                            plan={plans.monthly[data.current_package]}
                          />
                        </Box>
                        <HStack
                          spacing={5}
                          align={"flex-start"}
                          width={"100%"}
                          pt={5}
                        >
                          {data.is_cancellable && (
                            <CardDetails profileData={data} />
                          )}
                          {data.is_cancellable && <InvoiceList />}
                        </HStack>
                        {/* <Box sx={{ w: "%" }}></Box> */}
                      </VStack>
                    </>
                  )}
                </>
              </TabPanel>
              <TabPanel>
                <TransactionListCard transactionList={transactionList?.data} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </Box>
  );
};

const PricingPlan: React.FC<{
  plan: string;
  planData: Plan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
  selectedPlan: string;
}> = ({ plan, planData, selectedPlan, setSelectedPlan }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const createStripePayment = async () => {
    let duration = "";
    if (selectedPlan === "ondemand") {
      duration = "ondemand";
    } else {
      duration = "monthly";
    }

    const { data } = await API.post<{
      status: string;
      checkout_url: string;
    }>("/api-create-stripe-subscription-beta/", {
      package: selectedPlan,
      duration: duration,
    });
    window.open(`${data.checkout_url}`, "_blank");
  };
  const selected = selectedPlan === plan;

  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexDir={["column"]}
        w="180px"
        backgroundColor={"white"}
        borderRadius="xl"
        mr={5}
        mb={5}
        border={selected ? "1px solid #3E15F4" : ""}
        onClick={() => setSelectedPlan(plan)}
        overflow={"hidden"}
        zIndex={selected ? 100 : 0}
        filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
      >
        <Text
          w={"100%"}
          color={selected ? "white" : "accent"}
          backgroundColor={selected ? "accent" : "white"}
          py={4}
          textAlign="center"
          fontSize={"sm"}
        >
          {planData.discount
            ? `Save upto ${planData.discount}`
            : planData.name === "Beginner"
            ? "Starter"
            : planData.name === "Custom"
            ? "Customize your plan"
            : planData.name === "On Demand"
            ? "Pay as you go"
            : ""}
        </Text>

        {!selected && <Divider w={"90%"} />}
        <Text mt={10} mx={5} fontSize={"sm"}>
          {planData.name}
        </Text>
        <Heading fontSize={"x-large"} my={1}>
          {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
        </Heading>
        <Text mb={!selected ? 10 : 4} mx={5} fontSize={"xs"}>
          per month
        </Text>
        {selected && (
          <Button
            my={5}
            variant="brand"
            onClick={() => {
              if (plan === "custom") setOpen(true);
              else onOpen();
            }}
          >
            {plan === "custom" ? "Contact Us" : "Select Plan"}
          </Button>
        )}
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
                  bg="#F6F9FC"
                  pb={6}
                  borderRadius="15px"
                  h="fit-content"
                  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                >
                  <Box
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w="100%"
                  >
                    <Box
                      flexDir={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      w="100%"
                      height={"fit-content"}
                    >
                      <Image
                        src="/stripe-pay.png"
                        alt="pay"
                        borderRadius="15px"
                        w={"360px"}
                        h={"90px"}
                      />
                    </Box>
                    <Flex
                      flexDir={"row"}
                      justifyContent="center"
                      alignItems="center"
                      w="100%"
                      height={"fit-content"}
                      px={4}
                    >
                      <Button
                        onClick={createStripePayment}
                        style={{
                          padding: "1.3rem",
                          backgroundColor: "#5a1cff",
                          color: "#FFFFFF",
                          borderRadius: "30px",
                        }}
                        w={"300px"}
                      >
                        Pay with
                        <Image
                          src="/stripe.png"
                          alt="pay"
                          ml={"2.5px"}
                          w={"70px"}
                          h={"45px"}
                        />
                      </Button>
                    </Flex>
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
                  bg="#F6F9FC"
                  mt={6}
                  py={6}
                  px={8}
                  borderRadius="15px"
                  // h="320px"
                  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                >
                  <CoinPayments packageName={selectedPlan} onClose={onClose} />
                </Flex>
              </Box>
              <Box
                width="35%"
                bg="white"
                m={2}
                pb={6}
                overflow="hidden"
                borderRadius="15px"
                border="1px solid"
                borderColor="gray.300"
              >
                <Text
                  w={"100%"}
                  color={selected ? "white" : "accent"}
                  backgroundColor={selected ? "accent" : "white"}
                  py={3}
                  textAlign="center"
                  fontSize={"sm"}
                >
                  {planData.discount
                    ? `Save upto ${planData.discount}`
                    : planData.name === "Beginner"
                    ? "Starter"
                    : planData.name === "Custom"
                    ? "Customize your plan"
                    : planData.name === "On Demand"
                    ? "Pay as you go"
                    : ""}
                </Text>
                <Text mx={6} mt={4} sx={{ fontWeight: 500 }}>
                  {planData.name}
                </Text>
                <HStack>
                  <Heading
                    ml={6}
                    mr={1}
                    fontSize={"x-large"}
                    mt={1}
                    mb={!selected ? 10 : 4}
                  >
                    {planData.amount === "Free"
                      ? "Free"
                      : `$ ${planData.amount}`}{" "}
                    /
                  </Heading>
                  <Text mx={6} fontSize={"md"}>
                    month
                  </Text>
                </HStack>

                <Text mx={6} fontSize={"xs"}>
                  {planData.description}
                </Text>
                <Flex
                  ml={5}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="column"
                >
                  <HStack mt={5} justify={"flex-start"}>
                    <HiCheckCircle size={20} color={successColor} />

                    <Text fontSize={"sm"} ml={5}>
                      {planData.scan_count} Scan Credit
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    <HiCheckCircle size={20} color={successColor} />

                    <Text fontSize={"sm"} ml={5}>
                      Security Score
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.name === "trial" ? (
                      <HiXCircle size={20} color={greyColor} />
                    ) : (
                      <HiCheckCircle size={20} color={successColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Detailed Result
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.github ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Private Github
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.report ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Generate Report
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.publishable_report ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Publishable Report
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {plan === "custom" ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      White Glove Services
                    </Text>
                  </HStack>
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ContactUs isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

const CurrentPlan: React.FC<{
  isCancellable: boolean;
  name: string;
  packageName: string;
  packageRechargeDate: string;
  packageValidity: number;
  plan: Plan;
}> = ({ name, packageRechargeDate, packageValidity, plan, isCancellable }) => {
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";

  const toast = useToast();

  const cancelSubscription = async () => {
    const { data } = await API.delete("/api-cancel-stripe-subscription-beta/");
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
    }
  };

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <Box
      sx={{
        w: "100%",
        background: "white",
        borderRadius: 15,
        p: 8,
      }}
      filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
    >
      <Flex justifyContent={"space-between"} alignItems="center">
        <Flex alignItems="center" ml={7}>
          <Icon as={AiFillCheckCircle} color="#38CB89" fontSize="2xl" mr={2} />
          <Text fontSize={"xl"} fontWeight={900}>
            Current Plan
          </Text>
        </Flex>
        <Flex alignItems="center" width={"25%"}>
          <Icon as={AiOutlineCalendar} color="gray.500" fontSize="2xl" mr={2} />
          <Text>
            <Text as="span" fontSize="2xl" fontWeight={700}>
              {daysRemaining(new Date(packageRechargeDate), packageValidity)}
            </Text>{" "}
            days remaining
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        flexDirection="row"
        pt={5}
      >
        <Box ml={7} width="40%">
          <Text fontSize={"lg"}>{plan.name}</Text>
          <Text as="span" mt={5} mb={10} fontWeight={300} fontSize="smaller">
            {plan.description}
          </Text>
          <Divider mt={3} w={"60%"} />

          <HStack>
            <Heading
              verticalAlign={"center"}
              fontSize={"x-large"}
              mt={3}
              mb={4}
            >
              {plan.amount === "Free" ? "Free" : `$ ${plan.amount}/mo`}
            </Heading>
            {plan.discount && (
              <Text
                color={"accent"}
                backgroundColor={"white"}
                textAlign="left"
                fontWeight={600}
                fontSize={"sm"}
                mb={10}
                ml={10}
              >
                (Save upto {plan.discount})
              </Text>
            )}
          </HStack>
          <Box mb={2}>
            <Text fontWeight={400} fontSize="md" mb={1} color="#4E5D78">
              Subscribed on
            </Text>
            <Text fontWeight={500} fontSize="xl">
              {dateToDDMMMMYYYY(new Date(packageRechargeDate))}
            </Text>
          </Box>
        </Box>
        <Flex
          width="25%"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
        >
          <HStack mt={5} justify={"flex-start"}>
            <HiCheckCircle size={20} color={successColor} />

            <Text fontSize={"sm"} ml={5}>
              {plan.scan_count} Scan Credit
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            <HiCheckCircle size={20} color={successColor} />

            <Text fontSize={"sm"} ml={5}>
              Security Score
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.name === "trial" ? (
              <HiXCircle size={20} color={greyColor} />
            ) : (
              <HiCheckCircle size={20} color={successColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Detailed Result
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.github ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Private Github
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.report ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Generate Report
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.publishable_report ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Publishable Report
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.name === "Custom" ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              White Glove Services
            </Text>
          </HStack>
          {isCancellable && (
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="accent-ghost"
              color={"red"}
              mt={5}
              ml={-4}
            >
              <HiXCircle
                size={20}
                color={"red.100"}
                style={{ marginRight: "10px" }}
              />
              Cancel Subscription
            </Button>
          )}
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Subscription
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to cancel the subscription?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} py={6}>
                No, my bad
              </Button>
              <Button variant="brand" onClick={cancelSubscription} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
    let duration = "";
    if (packageName === "ondemand") {
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
      }>("api-create-order-cp/", {
        package: packageName,
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
              {packageName === "ondemand"
                ? parseFloat(data[coin].ondemand[packageName]).toPrecision(2)
                : parseFloat(data[coin].monthly[packageName]).toPrecision(2)}
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

const PricingDetails: React.FC<{ planData: Plan; selectedPlan: string }> = ({
  planData,
  selectedPlan,
}) => {
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";
  return (
    <>
      <Flex
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        flexWrap="wrap"
        width={"100%"}
        height={"fit-content"}
        padding={5}
      >
        <HStack ml={5} justify={"flex-start"} width={"30%"}>
          <HiCheckCircle size={30} color={successColor} />

          <Image src="/pricing/coin.svg" alt="Product screenshot" p={4} />
          <Text fontSize={"md"} ml={5}>
            {planData.scan_count} Scan Credit
          </Text>
        </HStack>

        <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
          <HiCheckCircle size={30} color={successColor} />

          <Image src="/pricing/score-icon.svg" alt="Product screenshot" p={4} />
          <Text fontSize={"md"} ml={5}>
            Security Score
          </Text>
        </HStack>

        <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
          {selectedPlan === "trial" ? (
            <HiXCircle size={30} color={greyColor} />
          ) : (
            <HiCheckCircle size={30} color={successColor} />
          )}
          <Image
            h={"70px"}
            w={"70px"}
            src="/pricing/result-icon.svg"
            alt="Product screenshot"
            p={4}
          />
          <Text fontSize={"md"} ml={5}>
            Detailed Result
          </Text>
        </HStack>
        <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
          {planData.github ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image src="/pricing/github.svg" alt="Product screenshot" p={4} />
          <Text fontSize={"md"} ml={5}>
            Private Github
          </Text>
        </HStack>

        <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
          {planData.report ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image src="/pricing/report.svg" alt="Product screenshot" p={4} />
          <Text fontSize={"md"} ml={5}>
            Generate Reports
          </Text>
        </HStack>
        <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
          {planData.publishable_report ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image src="/pricing/publish.svg" alt="Product screenshot" p={4} />
          <Text fontSize={"md"} ml={5}>
            Publishable Reports
          </Text>
        </HStack>
        <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
          {selectedPlan === "custom" ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image
            src="/pricing/support-icon.svg"
            alt="Product screenshot"
            p={4}
          />
          <Text fontSize={"md"} ml={5}>
            White Glove Services
          </Text>
        </HStack>
      </Flex>
    </>
  );
};

const LatestInvoice: React.FC<{
  planData: Plan;
  selectedPlan: string;
  transactionData: Transaction;
}> = ({ planData, selectedPlan, transactionData }) => {
  return (
    <>
      <Flex
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        flexDir={["column"]}
        w={"100%"}
        backgroundColor={"white"}
        borderRadius="xl"
        mr={5}
        my={5}
        overflow={"hidden"}
        filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
      >
        <Text
          w={"100%"}
          fontSize={"md"}
          fontWeight={600}
          color={"white"}
          backgroundColor={"accent"}
          px={10}
          py={4}
        >
          Complete your open {transactionData.payment_platform} Payment
        </Text>
        <HStack p={10} w={"100%"} justify="space-between">
          <VStack w={"40%"} align="flex-start">
            <HStack w={"100%"} justify="space-between">
              <Text fontSize={"lg"} sx={{ color: "text", fontWeight: 900 }}>
                {planData.name}
              </Text>
              <Heading fontSize={"x-large"}>
                {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
              </Heading>
            </HStack>

            <Text as="span" mt={10} fontWeight={300} fontSize="smaller">
              {planData.description}
            </Text>
          </VStack>
          <Button
            variant="brand"
            onClick={() => {
              window.open(`${transactionData.invoice_url}`, "_blank");
            }}
          >
            Complete Payment
          </Button>
        </HStack>

        {/* <PricingDetails planData={planData} selectedPlan={selectedPlan} /> */}
      </Flex>
    </>
  );
};

const CardDetails: React.FC<{
  profileData: Profile;
}> = ({ profileData }) => {
  console.log(profileData);
  let package_recharge_date = new Date(profileData.package_recharge_date);
  let package_end_date = new Date(profileData.package_end_date);

  return (
    <Box
      sx={{
        w: "50%",
        background: "white",
        borderRadius: 15,
        p: 8,
      }}
      filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
    >
      <Text fontSize={"lg"} fontWeight={900} color={"gray.500"}>
        Payment Details
      </Text>
      <HStack mt={5} spacing={5} width={"100%"} align="center">
        <Image
          src={`/cards/${profileData.payment_details?.brand}.svg`}
          alt="Product screenshot"
          zIndex={"10"}
          sx={{
            width: "60px",
          }}
        />
        <Text fontWeight={500} color={"gray.500"}>
          ----
        </Text>
        <Text fontWeight={500} color={"gray.500"}>
          ----
        </Text>
        <Text fontWeight={500} color={"gray.500"}>
          ----
        </Text>
        <Text fontWeight={500} color={"gray.500"}>
          {profileData.payment_details?.last_4_digits}
        </Text>
      </HStack>
      <HStack ml={"80px"} mt={3} spacing={5} width={"100%"} align="center">
        <Text fontWeight={500} color={"gray.500"}>
          {sentenceCapitalize(profileData.payment_details?.brand!)} Card
        </Text>
        <Box
          as="div"
          height={2}
          width={2}
          borderRadius={"50%"}
          backgroundColor={"gray.500"}
        ></Box>
        <Text fontWeight={500} color={"gray.500"}>
          Card Expires on {profileData.payment_details?.exp_month}/
          {profileData.payment_details?.exp_year}
        </Text>
      </HStack>
      <Text mt={10} fontWeight={500} color={"gray.500"}>
        Next billed on{" "}
        {`${package_recharge_date.getDate()} ${
          monthNames[package_recharge_date.getMonth()]
        } ${package_recharge_date.getFullYear()}`}
      </Text>

      <Text
        ml={20}
        mt={10}
        fontSize={"xs"}
        fontWeight={300}
        color={"gray.400"}
        textAlign="right"
      >
        * We do not store your card data or payment details.
      </Text>
    </Box>
  );
};

const monthNames = [
  "Jan",
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const InvoiceList: React.FC = () => {
  const { data } = useInvoices(1, 5);

  return (
    <Box
      sx={{
        w: "50%",
        background: "white",
        borderRadius: 15,
        p: 8,
      }}
      filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
    >
      <Text fontSize={"lg"} mb={7} fontWeight={900} color={"gray.500"}>
        Invoices
      </Text>

      {data?.data.map((invoice) => {
        let date = invoice.date.split("-");
        return (
          <HStack mt={3} justify="space-between" width={"100%"} align="center">
            <Text fontWeight={500} color={"gray.500"}>
              {date[2]} {monthNames[parseInt(date[1])]} {date[0]}
            </Text>
            <Badge
              colorScheme={
                invoice.invoice_status === "paid" ? "green" : "orange"
              }
            >
              {invoice.invoice_status}
            </Badge>
          </HStack>
        );
      })}
    </Box>
  );
};

const TransactionListCard: React.FC<{ transactionList: Transaction[] }> = ({
  transactionList,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const toast = useToast();

  const [orderId, setOrderId] = useState("");
  const [paymentPlatform, setPaymentPlatform] = useState("");

  const cancelPayment = async () => {
    const { data } = await API.delete("/api-invalidate-order-beta/", {
      data: {
        payment_platform: paymentPlatform,
        order_id: orderId,
      },
    });
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
    }
  };
  return (
    <Box
      sx={{
        w: "100%",
        background: "white",
        borderRadius: 15,
        p: 8,
      }}
      filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
    >
      <HStack
        p={4}
        borderRadius={10}
        backgroundColor={"gray.100"}
        mt={3}
        justify="flex-start"
        width={"100%"}
        align="center"
      >
        <Text w={"8%"} fontWeight={500} color={"gray.500"}>
          Status
        </Text>
        <Text w={"12%"} fontWeight={500} color={"gray.500"}>
          Amount
        </Text>
        <Text w={"14%"} fontWeight={500} color={"gray.500"}>
          Date
        </Text>
        <Text w={"14%"} fontWeight={500} color={"gray.500"}>
          Payment Mode
        </Text>
        <Text w={"14%"} fontWeight={500} color={"gray.500"}>
          Package
        </Text>
      </HStack>

      {transactionList.map((transaction) => {
        let date = transaction.date.split("-");
        return (
          <HStack p={4} justify="flex-start" width={"100%"} align="center">
            {/* <Text fontWeight={500} color={"gray.500"}>
              {date[2]} {monthNames[parseInt(date[1])]} {date[0]}
            </Text>
            <Badge
              colorScheme={
                invoice.invoice_status === "paid" ? "green" : "orange"
              }
            >
              {invoice.invoice_status}
            </Badge> */}
            <Text w={"8%"} fontWeight={500} color={"gray.500"}>
              <Badge
                colorScheme={
                  transaction.payment_status === "success"
                    ? "green"
                    : transaction.payment_status === "failed"
                    ? "red"
                    : "orange"
                }
              >
                {transaction.payment_status}
              </Badge>
            </Text>
            <Text w={"12%"} fontWeight={500} color={"gray.500"}>
              {parseFloat(transaction.amount).toFixed(2)}{" "}
              {transaction.currency.toUpperCase()}
            </Text>
            <Text w={"14%"} fontWeight={500} color={"gray.500"}>
              {date[2]} {monthNames[parseInt(date[1])]} {date[0]}
            </Text>
            <Text w={"14%"} fontWeight={500} color={"gray.500"}>
              {sentenceCapitalize(transaction.payment_platform)}
            </Text>
            <Text w={"14%"} fontWeight={500} color={"gray.500"}>
              {sentenceCapitalize(transaction.package)}
            </Text>
            <HStack w={"34%"} justify="flex-end">
              {transaction.payment_platform === "stripe" &&
                transaction.payment_status === "open" && (
                  <Button
                    variant="accent-ghost"
                    color={"red"}
                    w={"fit-content"}
                    my={0}
                    py={0}
                    fontSize={"xs"}
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setOrderId(transaction.order_id);
                      setPaymentPlatform(transaction.payment_platform);
                    }}
                  >
                    Cancel Payment
                  </Button>
                )}
              {transaction.payment_status === "open" &&
                transaction.invoice_url && (
                  <Button
                    variant="accent-ghost"
                    color={"accent"}
                    w={"fit-content"}
                    my={0}
                    py={0}
                    fontSize={"xs"}
                    width={"fit-content"}
                    onClick={() => {
                      window.open(transaction.invoice_url, "_blank");
                    }}
                  >
                    Complete Payment
                  </Button>
                )}
            </HStack>
          </HStack>
        );
      })}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Payment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to cancel the payment invoice?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} py={6}>
                No, my bad
              </Button>
              <Button
                variant="brand"
                onClick={() => {
                  cancelPayment();
                }}
                ml={3}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Billing;

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
  CloseButton,
  Input,
  ModalHeader,
  useMediaQuery,
} from "@chakra-ui/react";
import "./billing.css";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCheckCircle } from "react-icons/ai";

import { useProfile } from "hooks/useProfile";
import { useAcceptedCoins } from "hooks/usePricing";

import API from "helpers/api";
import { daysRemaining, dateToDDMMMMYYYY } from "common/functions";
import { Page, Plan, Profile, Transaction } from "common/types";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { placements } from "@popperjs/core";
import ContactUs from "components/contactus";
import { useTransactions } from "hooks/useTransactions";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import { useInvoices } from "hooks/useInvoices";
import ReactPaginate from "react-paginate";
import { server } from "typescript";
import {
  CoinPaymentsIcon,
  StripeLogo,
  StripePaymentsLogo,
} from "components/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { usePricingPlans } from "hooks/usePricingPlans";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";

const successColor = "#289F4C";
const greyColor = "#BDBDBD";

const Billing: React.FC = () => {
  const { data } = useProfile();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const [pageNo, setPageNo] = useState(1);
  const { data: transactions, refetch } = useTransactions(pageNo, 10);
  const [transactionList, setTransactionList] = useState<
    Transaction[] | undefined
  >();
  const [page, setPage] = useState<Page | undefined>();

  const { data: plans } = usePricingPlans();

  useEffect(() => {
    if (transactions) {
      let tList: Transaction[];
      if (pageNo > 1 && transactionList) {
        tList = transactionList.concat(transactions.data);
      } else {
        tList = transactions.data;
      }
      setTransactionList(tList);
      setPage(transactions.page);
    }
  }, [transactions]);

  const fetchAgain = async () => {
    setPageNo(1);
    await refetch();
  };

  const fetchMore = async () => {
    setPageNo(pageNo + 1);
    await refetch();
  };

  return (
    <Box
      boxSizing="border-box"
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: [0, 0, 4],
        mx: [0, 0, 4],
        my: 4,
        minH: "78vh",
      }}
    >
      <Flex
        w={"100%"}
        sx={{
          flexDir: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          my: 4,
        }}
      >
        <Text sx={{ color: "text", fontWeight: 600, ml: [3, 3, 5] }}>
          BILLING
        </Text>
        {!data || !plans || !transactionList || !page ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <Tabs
            mt={[3, 3, 5]}
            mx={0}
            px={0}
            w={"100%"}
            variant="soft-rounded"
            colorScheme="green"
          >
            <Flex
              width={"90%"}
              overflowX={["scroll", "scroll", "scroll", "visible"]}
              flexDir={"row"}
              justifyContent="flex-start"
              align={"center"}
              ml={[3, 3, 5]}
            >
              <TabList my={3} width={"fit-content"} zIndex={0}>
                <Tab
                  minW={["150px", "150px", "200px"]}
                  bgColor={"#F5F5F5"}
                  mr={5}
                >
                  Plans
                </Tab>
                <Tab
                  minW={["150px", "150px", "200px"]}
                  bgColor={"#F5F5F5"}
                  mx={[2, 3, 5]}
                >
                  Promo Code
                </Tab>
                <Tab
                  minW={["150px", "150px", "200px"]}
                  bgColor={"#F5F5F5"}
                  mx={[2, 3, 5]}
                >
                  Transactions
                </Tab>
              </TabList>
            </Flex>
            <TabPanels width={"100%"}>
              <TabPanel width={"100%"}>
                <>
                  {data.current_package === "trial" ||
                  data.current_package === "expired" ||
                  data.current_package === "ondemand" ? (
                    <Flex
                      justifyContent={"flex-start"}
                      alignItems={["center", "center", "center", "flex-start"]}
                      width={"100%"}
                      flexDir="column"
                    >
                      {transactionList.length > 0 &&
                        transactionList[0].payment_status === "open" && (
                          <LatestInvoice
                            transactionData={transactionList[0]}
                            selectedPlan={transactionList[0].package}
                            planData={
                              plans.pricing_data.monthly[
                                transactionList[0].package
                              ]
                            }
                          />
                        )}
                      <Text
                        display={["block", "block", "block", "none"]}
                        fontSize="xl"
                        mt={7}
                        width={"100%"}
                        textAlign="center"
                        sx={{ color: "text", fontWeight: 600 }}
                      >
                        {plans.pricing_data.monthly[selectedPlan].name}
                      </Text>
                      <Text
                        display={["block", "block", "block", "none"]}
                        width={["90%", "90%", "70%", "60%"]}
                        textAlign="center"
                        mt={3}
                        height="70px"
                        fontWeight={300}
                        fontSize="smaller"
                      >
                        {plans.pricing_data.monthly[selectedPlan].description}
                      </Text>
                      <Box
                        display={["flex", "flex", "flex", "none"]}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        width={"100%"}
                        height={"fit-content"}
                      >
                        <Swiper
                          initialSlide={4}
                          onSlideChange={(swiper) => {
                            setSelectedPlan(
                              Object.keys(plans.pricing_data.monthly)[
                                swiper.activeIndex
                              ]
                            );
                          }}
                          breakpoints={{
                            250: {
                              slidesPerView: 1,
                            },

                            340: {
                              slidesPerView: 2,
                              spaceBetween: 90,
                            },
                            450: {
                              slidesPerView: 2,
                              spaceBetween: 10,
                            },
                            540: {
                              height: 200,
                              slidesPerView: 3,
                              spaceBetween: 120,
                            },
                            600: {
                              height: 200,
                              slidesPerView: 3,
                              spaceBetween: 70,
                            },
                            650: {
                              height: 200,
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            740: {
                              slidesPerView: 4,
                              spaceBetween: 120,
                            },
                            830: {
                              slidesPerView: 4,
                              spaceBetween: 60,
                            },
                            920: {
                              slidesPerView: 4,
                              spaceBetween: 10,
                            },
                          }}
                          centeredSlides={true}
                          style={{
                            paddingTop: "50px",
                            paddingLeft: "20px",
                            width: "100%",
                          }}
                        >
                          {Object.keys(plans.pricing_data.monthly).map(
                            (plan, index) => {
                              return (
                                <SwiperSlide key={index}>
                                  <PlanCard
                                    fetchAgain={fetchAgain}
                                    selectedPlan={selectedPlan}
                                    setSelectedPlan={setSelectedPlan}
                                    plan={plan}
                                    planData={plans.pricing_data.monthly[plan]}
                                    profile={data}
                                  />
                                </SwiperSlide>
                              );
                            }
                          )}
                        </Swiper>
                      </Box>
                      <Flex
                        display={["none", "none", "none", "flex"]}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        width={"100%"}
                        height={"fit-content"}
                        overflowX={["scroll", "scroll", "scroll", "visible"]}
                      >
                        <Flex
                          justifyContent={[
                            "center",
                            "center",
                            "center",
                            "flex-start",
                            "flex-start",
                          ]}
                          alignItems={"flex-start"}
                          width={"fit-content"}
                          height={"fit-content"}
                          wrap={["nowrap", "nowrap", "nowrap", "wrap"]}
                          padding={2}
                          mt={5}
                        >
                          {Object.keys(plans.pricing_data.monthly).map(
                            (plan) => {
                              if (plan !== "trial")
                                return (
                                  <PlanCard
                                    fetchAgain={fetchAgain}
                                    selectedPlan={selectedPlan}
                                    setSelectedPlan={setSelectedPlan}
                                    plan={plan}
                                    planData={plans.pricing_data.monthly[plan]}
                                    profile={data}
                                  />
                                );
                            }
                          )}
                        </Flex>
                      </Flex>
                      <Text
                        display={["none", "none", "none", "flex"]}
                        sx={{ color: "text", fontWeight: 600 }}
                        ml={[0, 0, 3, 3, 5]}
                      >
                        {plans.pricing_data.monthly[selectedPlan].name}
                      </Text>
                      <Text
                        display={["none", "none", "none", "flex"]}
                        as="div"
                        ml={[0, 0, 3, 3, 5]}
                        mt={1}
                        height="40px"
                        width="70%"
                        fontWeight={300}
                        fontSize="smaller"
                      >
                        {plans.pricing_data.monthly[selectedPlan].description}
                      </Text>
                      <PricingDetails
                        planData={plans.pricing_data.monthly[selectedPlan]}
                        selectedPlan={selectedPlan}
                      />
                    </Flex>
                  ) : (
                    <>
                      <CurrentPlan
                        subscription={data.subscription}
                        isCancellable={data.is_cancellable}
                        name={
                          plans.pricing_data.monthly[data.current_package].name
                        }
                        packageName={data.current_package}
                        packageRechargeDate={data.package_recharge_date}
                        packageValidity={data.package_validity}
                        plan={plans.pricing_data.monthly[data.current_package]}
                      />

                      {/* <HStack
                          spacing={5}
                          align={"flex-start"}
                          width={"100%"}
                          pt={5}
                        >
                          {data.is_cancellable && (
                            <CardDetails profileData={data} />
                          )}
                          {data.is_cancellable && <InvoiceList />}
                        </HStack> */}
                    </>
                  )}
                </>
              </TabPanel>
              <TabPanel>
                <PromoCodeCard profileData={data} />
              </TabPanel>
              <TabPanel>
                <TransactionListCard
                  transactionList={transactionList}
                  page={page}
                  fetchAgain={fetchAgain}
                  pageNo={pageNo}
                  fetchMore={fetchMore}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </Box>
  );
};

const PlanCard: React.FC<{
  plan: string;
  planData: Plan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
  selectedPlan: string;
  profile: Profile;
  fetchAgain: () => Promise<void>;
}> = ({
  plan,
  planData,
  selectedPlan,
  setSelectedPlan,
  profile,
  fetchAgain,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const selected = selectedPlan === plan;
  const [isLargerThan767] = useMediaQuery(["(min-width : 768px)"]);
  const [nextStep, setNextStep] = useState<boolean>(false);

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
        filter={
          selected
            ? "drop-shadow(0px 2px 13px rgba(0, 0, 0, 0.2));"
            : "drop-shadow(0px 2px 13px rgba(0, 0, 0, 0.04));"
        }
      >
        <Text
          w={"100%"}
          color={selected ? "white" : "accent"}
          backgroundColor={selected ? "accent" : "white"}
          py={4}
          textAlign="center"
          fontSize={"sm"}
        >
          {planData.name === "Beginner"
            ? "Starter"
            : planData.name === "Enterprise"
            ? "Customize your plan"
            : planData.name === "On Demand"
            ? "Pay as you go"
            : planData.discount
            ? `Save upto ${planData.discount}`
            : ""}
        </Text>

        {!selected && <Divider w={"90%"} />}
        <Text mt={10} mx={5} fontSize={"sm"}>
          {planData.name}
        </Text>
        <Heading fontSize={"x-large"} my={1}>
          {planData.name === "Trial"
            ? "Free"
            : planData.name === "Custom"
            ? "$--"
            : `$ ${planData.amount}`}
        </Heading>
        <Text mb={!selected ? 10 : 4} mx={5} fontSize={"xs"}>
          {plan === "trial" || plan === "ondemand" ? "Perpetual" : "per month"}
        </Text>
        {selected && (
          <Button
            my={5}
            variant="brand"
            onClick={() => {
              if (plan === "custom") onOpen();
              else setOpen(true);
            }}
          >
            {plan === "custom" ? "Contact Us" : "Select Plan"}
          </Button>
        )}
      </Flex>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setNextStep(false);
        }}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent
          width={["90%", "90%", "100%"]}
          maxW={["450px", "450px", "750px"]}
          backgroundColor="white"
        >
          <ModalHeader textAlign={"center"}>
            {isLargerThan767 || nextStep
              ? "Select Payment Method"
              : "Selected Plan"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={"center"} display="flex" pb={6}>
            {isLargerThan767 ? (
              <Flex w="100%" h="fit-content">
                <SelectPaymentMethod
                  profile={profile}
                  fetchAgain={fetchAgain}
                  selectedPlan={selectedPlan}
                  onClose={() => {
                    setOpen(false);
                    setNextStep(false);
                  }}
                />
                <PlanDescription plan={selectedPlan} planData={planData} />
              </Flex>
            ) : nextStep ? (
              <SelectPaymentMethod
                profile={profile}
                fetchAgain={fetchAgain}
                selectedPlan={selectedPlan}
                onClose={() => {
                  setOpen(false);
                  setNextStep(false);
                }}
              />
            ) : (
              <Flex
                w={"100%"}
                flexDir={"column"}
                justifyContent="flex-start"
                alignItems={"center"}
              >
                <PaymentCardData plan={plan} planData={planData} />
                <Text
                  borderBottom={" 1px solid #3300FF"}
                  my={5}
                  cursor={"pointer"}
                  color="#3300FF"
                  onClick={() => {
                    setOpen(false);
                    setNextStep(false);
                  }}
                >
                  Change Plan
                </Text>
                <Button
                  my={5}
                  w="200px"
                  variant="brand"
                  onClick={() => {
                    setNextStep(true);
                  }}
                >
                  Proceed to Payment
                </Button>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <ContactUs isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const PaymentCardData: React.FC<{
  plan: string;
  planData: Plan;
}> = ({ planData }) => {
  return (
    <Flex
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      flexDir={["column"]}
      maxW="280px"
      width={"90%"}
      backgroundColor={"#F7F9FC"}
      borderRadius="xl"
      mr={5}
      mb={5}
      pb={5}
      overflow={"hidden"}
      zIndex={100}
      filter={"drop-shadow(0px 2px 13px rgba(0, 0, 0, 0.15));"}
    >
      <Text
        w={"100%"}
        color={"white"}
        backgroundColor={"accent"}
        py={4}
        fontWeight={700}
        textAlign="center"
        fontSize={"md"}
      >
        {planData.name === "Beginner"
          ? "Starter"
          : planData.name === "Enterprise"
          ? "Customize your plan"
          : planData.name === "On Demand"
          ? "Pay as you go"
          : planData.discount
          ? `Save upto ${planData.discount}`
          : ""}
      </Text>
      <Divider w={"90%"} />
      <Text mt={7} ml={5} fontWeight={700} fontSize={"2xl"}>
        {planData.name}
      </Text>
      <Text mx={5} mt={2} mb={2} fontSize={"sm"}>
        {planData.description}
      </Text>
      <HStack>
        <Heading ml={6} mb={4} mr={0} fontSize={"x-large"} mt={1}>
          {planData.amount === "Free"
            ? "Free"
            : planData.name === "On Demand"
            ? `$ ${planData.amount}`
            : `$ ${planData.amount + " /"}`}
        </Heading>
        <Text mx={6} fontSize={"md"}>
          {planData.name === "On Demand" || planData.amount === "Free"
            ? ""
            : "month"}
        </Text>
      </HStack>
    </Flex>
  );
};

const SelectPaymentMethod: React.FC<{
  selectedPlan: string;
  onClose: () => void;
  profile: Profile;
  fetchAgain: () => Promise<void>;
}> = ({ selectedPlan, onClose, profile, fetchAgain }) => {
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

  const { data, isLoading } = useAcceptedCoins();
  const [coin, setCoin] = useState("");
  const [loading, setLoading] = useState(false);
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

  const [isLargerThan400, isLargerThan500] = useMediaQuery([
    "(min-width : 400px)",
  ]);

  return (
    <Box m={[0, 0, 2]} width={["100%", "100%", "65%"]}>
      <>
        {!profile.public_address && (
          <>
            <Flex
              cursor="pointer"
              width="100%"
              bg="#F7F9FC"
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
                  {isLargerThan500 ? (
                    <StripePaymentsLogo size={400} />
                  ) : isLargerThan400 ? (
                    <StripePaymentsLogo size={300} />
                  ) : (
                    <StripePaymentsLogo size={250} />
                  )}
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
                    <StripeLogo size={120} />
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
          </>
        )}
      </>
      <Flex
        cursor="pointer"
        width="100%"
        bg="#F7F9FC"
        mt={profile.public_address ? 0 : 6}
        py={[4, 6]}
        px={[4, 8]}
        borderRadius="15px"
        h={profile.public_address ? "100%" : "fit-content"}
        minH="350px"
        boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
      >
        <VStack width="100%" spacing={6} mt={4} alignItems="inherit">
          <Flex alignItems="flex-end" justifyContent="space-between">
            <CoinPaymentsIcon size={200} />
            {/* {data && coin !== "" && (
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
        )} */}
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
              width={["100%", "200px"]}
            >
              Make Payment
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

const PlanDescription: React.FC<{
  plan: string;
  planData: Plan;
}> = ({ plan, planData }) => (
  <Box
    flexDir="column"
    justifyContent={"flex-start"}
    alignItems="flex-start"
    width="35%"
    bg="#F7F9FC"
    height={"100%"}
    m={2}
    pb={4}
    overflow="hidden"
    borderRadius="15px"
    border="1px solid"
    borderColor="gray.300"
  >
    <Text
      w={"100%"}
      color={"white"}
      backgroundColor={"accent"}
      py={3}
      textAlign="center"
      fontSize={"sm"}
    >
      {planData.discount
        ? `Save upto ${planData.discount}`
        : planData.name === "Beginner"
        ? "Starter"
        : planData.name === "Enterprise"
        ? "Customize your plan"
        : planData.name === "On Demand"
        ? "Pay as you go"
        : ""}
    </Text>
    <Text mx={6} fontSize="xl" mt={4} sx={{ fontWeight: 500 }}>
      {planData.name}
    </Text>
    <Text mx={6} mb={2} fontSize={"xs"}>
      {planData.description}
    </Text>
    <HStack>
      <Heading ml={6} mb={4} mr={0} fontSize={"x-large"} mt={1}>
        {planData.amount === "Free"
          ? "Free"
          : planData.name === "On Demand"
          ? `$ ${planData.amount}`
          : `$ ${planData.amount + " /"}`}
      </Heading>
      <Text mx={6} fontSize={"md"}>
        {planData.name === "On Demand" || planData.amount === "Free"
          ? ""
          : "month"}
      </Text>
    </HStack>

    <Flex
      ml={5}
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
    >
      <HStack mt={2} justify={"flex-start"}>
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
);

const CurrentPlan: React.FC<{
  isCancellable: boolean;
  name: string;
  packageName: string;
  packageRechargeDate: string;
  packageValidity: number;
  plan: Plan;
  subscription?: {
    end_date: string;
    start_date: string;
    renewal_date: string;
  };
}> = ({
  name,
  packageRechargeDate,
  packageValidity,
  plan,
  isCancellable,
  subscription,
}) => {
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";
  const toast = useToast();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const cancelSubscription = async () => {
    const { data } = await API.delete(
      API_PATH.API_CANCEL_STRIPE_SUBSCRIPTION_BETA
    );
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
        p: [5, 5, 10],
        // mt: [3, 3, 5],
        // ml: [3, 3, 5],
        background: "white",
        borderRadius: 15,
      }}
      filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
    >
      <Flex
        w={"100%"}
        flexDir={["column", "column", "row"]}
        justifyContent={["flex-start", "flex-start", "space-between"]}
        alignItems="flex-start"
      >
        <Flex
          w={["100%", "100%", "60%"]}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          <Flex alignItems="center">
            <Icon
              as={AiFillCheckCircle}
              color="#38CB89"
              fontSize="2xl"
              mr={2}
            />
            <Text fontSize={"xl"} fontWeight={900}>
              Current Plan
            </Text>
          </Flex>
          <Text mt={5} fontSize={"lg"}>
            {plan.name}
          </Text>
          <Text
            as="span"
            mt={2}
            mb={3}
            fontWeight={300}
            fontSize="smaller"
            width={["100%", "100%", "100%", "80%", "60%"]}
          >
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
          <Flex
            mt={5}
            justifyContent={"space-between"}
            flexWrap="wrap"
            maxW="600px"
            alignItems="center"
            w={"100%"}
            flexDir={"row"}
          >
            {subscription && (
              <>
                <Box mt={5} w="170px">
                  <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
                    Subscribed on
                  </Text>
                  <Text fontWeight={500} fontSize="md">
                    {dateToDDMMMMYYYY(new Date(packageRechargeDate))}
                  </Text>
                </Box>
                <Box mt={5} w="170px">
                  <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
                    Next Billed on
                  </Text>
                  <Text fontWeight={500} fontSize="md">
                    {dateToDDMMMMYYYY(new Date(subscription.renewal_date))}
                  </Text>
                </Box>
                <Box mt={5} w="170px">
                  <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
                    Recurring Payment
                  </Text>
                  <Text fontWeight={500} fontSize="md">
                    Stripe Payment
                  </Text>
                </Box>
              </>
            )}
          </Flex>
        </Flex>
        <Flex
          w={["100%", "100%", "25%"]}
          mt={[10, 10, 0]}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
        >
          <Flex alignItems="center">
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
          <Divider mt={3} />
          <Flex
            mt={3}
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
          >
            <HStack mt={3} justify={"flex-start"}>
              <HiCheckCircle size={20} color={successColor} />

              <Text fontSize={"sm"} ml={5}>
                {plan.name === "Enterprise" ? "-" : plan.scan_count}
                Scan Credit
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
              {plan.name === "Enterprise" ? (
                <HiCheckCircle size={20} color={successColor} />
              ) : (
                <HiXCircle size={20} color={greyColor} />
              )}

              <Text fontSize={"sm"} ml={5}>
                White Glove Services
              </Text>
            </HStack>
          </Flex>
          {isCancellable && (
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="accent-outline"
              mr={10}
              mt={10}
            >
              Cancel Subscription
            </Button>
          )}
        </Flex>
      </Flex>
      {subscription && (
        <Flex
          mt={10}
          mx={0}
          p={5}
          backgroundColor="#FFF8ED"
          justifyContent={"flex-start"}
          borderRadius="xl"
          border={"1px solid #FFC661"}
          alignItems="flex-start"
        >
          <Image src={`${assetsURL}icons/info.svg`} mr={5} />
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"lg"} fontWeight={600} color="gray.600">
              Recurring Payment
            </Text>
            <Text fontSize={"md"} fontWeight={400} color="gray.500">
              Your card will be billed automatically on{" "}
              {dateToDDMMMMYYYY(new Date(subscription.renewal_date))}. We do not
              store your card information anywhere in our application.
            </Text>
          </VStack>
        </Flex>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent alignContent={"center"}>
            <Flex
              p={5}
              flexDir={"column"}
              justifyContent="flex-start"
              alignItems={"center"}
            >
              <HStack w={"100%"} mb={5}>
                <Text
                  textAlign={"center"}
                  w={"90%"}
                  fontSize="lg"
                  fontWeight="bold"
                >
                  Cancel Subscription
                </Text>
                <CloseButton onClick={onClose} />
              </HStack>

              <Divider />
              <Text mt={5}>
                Are you sure you want to cancel the subscription?
              </Text>

              <Text fontSize={"lg"} mt={10}>
                {plan.name}
              </Text>
              <Heading fontSize={"x-large"} mb={10}>
                {plan.name === "Trial"
                  ? "Free"
                  : plan.name === "Enterprise"
                  ? "$--"
                  : `$ ${plan.amount}`}
              </Heading>

              <AlertDialogFooter>
                <Button variant="brand" onClick={cancelSubscription} ml={3}>
                  Cancel Subscription
                </Button>
              </AlertDialogFooter>
            </Flex>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

const PricingDetails: React.FC<{ planData: Plan; selectedPlan: string }> = ({
  planData,
  selectedPlan,
}) => {
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <>
      <Flex
        justifyContent={["center", "center", "center", "flex-start"]}
        alignItems={"flex-start"}
        flexWrap="wrap"
        width={"100%"}
        height={"fit-content"}
        mt={5}
      >
        <HStack
          ml={5}
          justify={"flex-start"}
          minW="270px"
          width={["70%", "45%", "30%"]}
        >
          <HiCheckCircle size={30} color={successColor} />

          <Image src={`${assetsURL}pricing/coin.svg`} p={4} />
          <Text fontSize={"md"} ml={5}>
            {planData.scan_count} Scan Credit
          </Text>
        </HStack>

        <HStack
          ml={5}
          justifyContent={"flex-start"}
          minW="270px"
          width={["70%", "45%", "30%"]}
        >
          <HiCheckCircle size={30} color={successColor} />

          <Image src={`${assetsURL}pricing/score-icon.svg`} p={4} />
          <Text fontSize={"md"} ml={5}>
            Security Score
          </Text>
        </HStack>

        <HStack
          ml={5}
          justifyContent={"flex-start"}
          minW="270px"
          width={["70%", "45%", "30%"]}
        >
          {selectedPlan === "trial" ? (
            <HiXCircle size={30} color={greyColor} />
          ) : (
            <HiCheckCircle size={30} color={successColor} />
          )}
          <Image
            h={"70px"}
            w={"70px"}
            src={`${assetsURL}pricing/result-icon.svg`}
            alt="Product screenshot"
            p={4}
          />
          <Text fontSize={"md"} ml={5}>
            Detailed Result
          </Text>
        </HStack>
        <HStack
          ml={5}
          justifyContent={"flex-start"}
          minW="270px"
          width={["70%", "45%", "30%"]}
        >
          {planData.github ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image src={`${assetsURL}pricing/github.svg`} p={4} />
          <Text fontSize={"md"} ml={5}>
            Private Github
          </Text>
        </HStack>

        <HStack
          ml={5}
          justifyContent={"flex-start"}
          minW="270px"
          width={["70%", "45%", "30%"]}
        >
          {planData.report ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image src={`${assetsURL}pricing/report.svg`} p={4} />
          <Text fontSize={"md"} ml={5}>
            Generate Reports
          </Text>
        </HStack>
        <HStack
          ml={5}
          justifyContent={"flex-start"}
          minW="270px"
          width={["70%", "45%", "30%"]}
        >
          {planData.publishable_report ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image src={`${assetsURL}pricing/publish.svg`} p={4} />
          <Text fontSize={"md"} ml={5}>
            Publishable Reports
          </Text>
        </HStack>
        <HStack
          ml={5}
          justifyContent={"flex-start"}
          minW="270px"
          width={["70%", "45%", "30%"]}
        >
          {selectedPlan === "custom" ? (
            <HiCheckCircle size={30} color={successColor} />
          ) : (
            <HiXCircle size={30} color={greyColor} />
          )}
          <Image
            src={`${assetsURL}pricing/support-icon.svg`}
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
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <>
      <Flex
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        flexDir={["column"]}
        w={"100%"}
        backgroundColor={"white"}
        borderRadius="xl"
        border={"1px solid #3E15F4"}
        maxW="1000px"
        mb={5}
        overflow={"hidden"}
        filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
      >
        <HStack
          width={"100%"}
          px={[5, 5, 10]}
          py={4}
          mr={5}
          backgroundColor={"#F5F2FF"}
          borderBottom={"1px solid #3E15F4"}
        >
          <Image src={`${assetsURL}icons/info.svg`} />
          <Text fontSize={"md"} fontWeight={600}>
            Complete your open {transactionData.payment_platform} Payment
          </Text>
        </HStack>
        <Flex
          p={[5, 5, 10]}
          flexDir={["column", "column", "row"]}
          w={"100%"}
          justify={["flex-start", "flex-start", "space-between"]}
          align={"flex-start"}
        >
          <VStack w={["100%", "100%", "40%"]} align="flex-start">
            <Text fontSize={"lg"} sx={{ color: "text", fontWeight: 900 }}>
              {planData.name}
            </Text>
            <Text as="span" mt={10} fontWeight={300} fontSize="smaller">
              {planData.description}
            </Text>
            <Heading mt={3} fontSize={"x-large"}>
              {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
            </Heading>
          </VStack>
          <Flex
            mt={[5, 5, 3]}
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
          >
            <HStack mt={2} justify={"flex-start"}>
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
              {selectedPlan === "Enterprise" ? (
                <HiCheckCircle size={20} color={successColor} />
              ) : (
                <HiXCircle size={20} color={greyColor} />
              )}

              <Text fontSize={"sm"} ml={5}>
                White Glove Services
              </Text>
            </HStack>
          </Flex>
        </Flex>
        <Button
          variant="brand"
          ml={[5, 5, 10]}
          mt={[5, 5, -20]}
          mb={10}
          onClick={() => {
            window.open(`${transactionData.invoice_url}`, "_blank");
          }}
        >
          Complete Payment
        </Button>

        {/* <PricingDetails planData={planData} selectedPlan={selectedPlan} /> */}
      </Flex>
    </>
  );
};

const CardDetails: React.FC<{
  profileData: Profile;
}> = ({ profileData }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
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
          src={`${assetsURL}cards/${profileData.payment_details?.brand}.svg`}
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

const TransactionListCard: React.FC<{
  transactionList: Transaction[];
  page: Page;
  pageNo: number;
  fetchMore: () => Promise<void>;
  fetchAgain: () => Promise<void>;
}> = ({ transactionList, page, pageNo, fetchMore, fetchAgain }) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const [orderId, setOrderId] = useState("");
  const [paymentPlatform, setPaymentPlatform] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreTransactions = () => {
    if (pageNo >= page.total_pages) {
      setHasMore(false);
      return null;
    }
    fetchMore();
  };
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const cancelPayment = async () => {
    const { data } = await API.delete(API_PATH.API_INVALIDATE_ORDER_BETA, {
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
      fetchAgain();
      onClose();
    }
  };
  return (
    <>
      {isLargerThan800 ? (
        <Box
          sx={{
            w: "100%",
            background: "white",
            borderRadius: 15,
            p: 4,

            overflowY: "scroll",
          }}
          filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
        >
          <HStack
            p={4}
            borderRadius={10}
            backgroundColor={"gray.100"}
            mt={3}
            justify="space-between"
            width={"100%"}
            align="center"
          >
            <Text w={"10%"} fontWeight={500} color={"gray.500"}>
              Status
            </Text>
            <Text w={"12%"} fontWeight={500} color={"gray.500"}>
              Amount
            </Text>
            <Text w={"12%"} fontWeight={500} color={"gray.500"}>
              Date
            </Text>
            <Text w={"130px"} fontWeight={500} color={"gray.500"}>
              Payment Mode
            </Text>
            <Text w={"130px"} fontWeight={500} color={"gray.500"}>
              Package
            </Text>
            <Box w={"calc(55% - 260px)"} />
          </HStack>

          <InfiniteScroll
            dataLength={transactionList?.length}
            next={() => fetchMoreTransactions()}
            hasMore={hasMore}
            loader={
              <Box
                w={"100%"}
                h="50vh"
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
              >
                <Spinner />
              </Box>
            }
            scrollableTarget="pageScroll"
          >
            {" "}
            {transactionList.length > 0 ? (
              transactionList.map((transaction, index) => {
                let date = transaction.date.split("-");
                return (
                  <>
                    <HStack
                      key={index}
                      p={4}
                      justify="space-between"
                      width={"100%"}
                      align="center"
                    >
                      <Text w={"10%"} fontWeight={500} color={"gray.500"}>
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
                      <Text w={"12%"} fontWeight={500} color={"gray.500"}>
                        {date[2]} {monthNames[parseInt(date[1])]} {date[0]}
                      </Text>
                      <Text w="130px" fontWeight={500} color={"gray.500"}>
                        {sentenceCapitalize(transaction.payment_platform)}
                      </Text>
                      <Text w="130px" fontWeight={500} color={"gray.500"}>
                        {sentenceCapitalize(transaction.package)}
                      </Text>
                      <HStack
                        w={"calc(55% - 260px)"}
                        flexWrap="wrap"
                        justify="flex-end"
                      >
                        {transaction.payment_platform === "stripe" &&
                          transaction.payment_status === "open" && (
                            <Button
                              variant="accent-ghost"
                              color={"red"}
                              w={"fit-content"}
                              my={0}
                              py={0}
                              fontSize={"sm"}
                              onClick={() => {
                                setIsOpen(!isOpen);
                                setOrderId(transaction.order_id);
                                setPaymentPlatform(
                                  transaction.payment_platform
                                );
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
                              fontSize={"sm"}
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
                  </>
                );
              })
            ) : (
              <>
                <Box
                  w={"100%"}
                  h="50vh"
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Text> There are not transactions to show. </Text>
                </Box>
              </>
            )}
          </InfiniteScroll>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={transactionList.length}
          next={() => fetchMoreTransactions()}
          hasMore={hasMore}
          loader={
            <Box w={"100%"} align="center">
              <Spinner />
            </Box>
          }
          scrollableTarget="pageScroll"
        >
          {transactionList.map((transaction, index) => {
            let date = transaction.date.split("-");
            return (
              <Flex
                sx={{
                  w: "calc(100% - 2rem)",
                  background: "white",
                  borderRadius: 15,
                  px: 4,
                  pb: 5,
                  my: 4,
                  mx: 3,
                }}
                key={index}
                justifyContent="space-between"
                flexDir={"row"}
                alignItems="flex-start"
                filter={"drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));"}
              >
                <Flex
                  justifyContent="flex-start"
                  flexDir={"row"}
                  alignItems="flex-start"
                  flexWrap={"wrap"}
                  w={"calc(100% - 60px)"}
                >
                  <VStack
                    mt={5}
                    alignItems={"flex-start"}
                    spacing={1}
                    width="180px"
                  >
                    <Text fontSize={"sm"} color="gray.400">
                      Plan Name
                    </Text>
                    <Text fontSize={"md"}>
                      {sentenceCapitalize(transaction.package)}
                    </Text>
                  </VStack>
                  <VStack
                    mt={5}
                    alignItems={"flex-start"}
                    spacing={1}
                    width="120px"
                  >
                    <Text fontSize={"sm"} color="gray.400">
                      Status
                    </Text>
                    <Text
                      fontSize={"md"}
                      color={
                        transaction.payment_status === "success"
                          ? "green"
                          : transaction.payment_status === "failed"
                          ? "red"
                          : "orange"
                      }
                    >
                      {sentenceCapitalize(transaction.payment_status)}
                    </Text>
                  </VStack>
                  <VStack
                    mt={5}
                    alignItems={"flex-start"}
                    spacing={1}
                    width="180px"
                  >
                    <Text fontSize={"sm"} color="gray.400">
                      Amount
                    </Text>
                    <Text fontSize={"md"}>
                      {"$"} {parseFloat(transaction.amount).toFixed(2)}{" "}
                      {transaction.currency.toUpperCase()}
                    </Text>
                  </VStack>
                  <VStack
                    mt={5}
                    alignItems={"flex-start"}
                    spacing={1}
                    width="180px"
                  >
                    <Text fontSize={"sm"} color="gray.400">
                      Payment Mode
                    </Text>
                    <Text fontSize={"md"}>
                      {sentenceCapitalize(transaction.payment_platform)}
                    </Text>
                  </VStack>
                  <VStack
                    width={"180px"}
                    spacing={3}
                    mt={5}
                    alignItems="flex-start"
                  >
                    {transaction.payment_platform === "stripe" &&
                      transaction.payment_status === "open" && (
                        <Button
                          bgColor={"#FF563010"}
                          color={"red"}
                          w={"fit-content"}
                          my={0}
                          py={0}
                          fontSize={"sm"}
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
                          bgColor={"#3E15F410"}
                          color={"accent"}
                          w={"fit-content"}
                          my={0}
                          py={0}
                          fontSize={"sm"}
                          width={"fit-content"}
                          onClick={() => {
                            window.open(transaction.invoice_url, "_blank");
                          }}
                        >
                          Complete Payment
                        </Button>
                      )}
                  </VStack>
                </Flex>
                <Box
                  mt={5}
                  sx={{
                    width: "60px",
                    height: "60px",
                    p: 2,
                    bg: "#F7F7F7",
                    color: "#4E5D78",
                    borderRadius: "50%",
                    textAlign: "center",
                  }}
                >
                  <Text fontSize="xl" fontWeight="600">
                    {date[2]}
                  </Text>
                  <Text fontSize="12px" mt="-4px">
                    {monthNames[parseInt(date[1])]}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </InfiniteScroll>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent w="80%">
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
    </>
  );
};

const PromoCodeCard: React.FC<{ profileData: Profile }> = ({ profileData }) => {
  const [promoCode, setPromoCode] = useState("");
  const [activePromo, setActivePromo] = useState<string | undefined>(
    profileData.promo_code
  );
  const toast = useToast();
  const applyPromoCode = () => {
    API.get(`api-apply-promo/?code=${promoCode}`).then((res) => {
      if (res.status === 200) {
        toast({
          title: res.data.message,
          status: res.data.status,
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        setActivePromo(promoCode);
      }
    });
  };

  return (
    <Box
      sx={{
        w: "100%",
        maxW: "1000px",
        background: "white",
        borderRadius: 15,
        p: [4, 4, 8],
        h: "50vh",
        // ml: [5, 5, 10],
      }}
      filter={"drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));"}
    >
      <Text fontSize={"lg"} my={5} fontWeight={900} color={"gray.500"}>
        Activate Promo Code
      </Text>
      <Text mb={7} fontWeight={500} width="60%" color={"gray.500"}>
        Have a Promo Code ?
      </Text>
      <Flex
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        flexDir={["column", "column", "row"]}
        width={"100%"}
        spacing="5%"
      >
        <Input
          isRequired
          placeholder="Enter Promo Code"
          variant="brand"
          size="lg"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          width={["100%", "100%", "70%", "60%"]}
        />
        <Button
          variant="brand"
          mt={[4, 4, 0]}
          ml={[0, 0, 4]}
          width={["100%", "100%", "30%", "20%"]}
          minW={"160px"}
          maxW={"360px"}
          disabled={
            promoCode.length < 0 ||
            promoCode.length > 50 ||
            profileData.current_package !== "trial" ||
            activePromo !== undefined
          }
          onClick={applyPromoCode}
        >
          Apply Promo Code
        </Button>
      </Flex>
      {activePromo && (
        <Flex
          mt={10}
          p={3}
          backgroundColor="#F8FFFA"
          justifyContent={"flex-start"}
          borderRadius="xl"
          border={"1px solid #289F4C"}
          alignItems="flex-start"
        >
          <HiCheckCircle size={30} color={"#289F4C"} />
          <VStack ml={3} alignItems={"flex-start"}>
            <Text fontSize={"lg"} fontWeight={600} color="gray.600">
              {activePromo.toUpperCase()}
            </Text>
            <Text fontSize={"md"} fontWeight={400} color="gray.500">
              {`${activePromo.toUpperCase()} has been activated`}
            </Text>
          </VStack>
        </Flex>
      )}
    </Box>
  );
};

export default Billing;

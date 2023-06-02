import React, { useEffect, useRef, useState } from "react";
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
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import "./billing.css";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCheckCircle } from "react-icons/ai";
import CurrentPlan from "./CurrentPlan";
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
import ScanCredits from "components/billing/ScanCredits";
import PricingDetails from "pages/Pricing/components/PricingDetails";

const successColor = "#289F4C";
const greyColor = "#BDBDBD";

const Billing: React.FC = () => {
  const { data } = useProfile();
  const [selectedPlan, setSelectedPlan] = useState("custom");

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
        p: 0,
        pt: 4,
        mx: [0, 0, 4],
        my: 4,
        minH: "85vh",
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
        <Text
          fontSize={"2xl"}
          px={[0, 0, 4]}
          mx={[0, 0, 4]}
          sx={{ color: "text", fontWeight: 600, ml: [3, 3, 5] }}
        >
          Billing & Transaction history
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
              px={[0, 0, 4]}
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
                  mr={5}
                >
                  Scan Credits
                </Tab>
                <Tab
                  minW={["150px", "150px", "200px"]}
                  bgColor={"#F5F5F5"}
                  mx={[2, 3, 5]}
                >
                  Transactions
                </Tab>
                <Tab
                  minW={["150px", "150px", "200px"]}
                  bgColor={"#F5F5F5"}
                  mx={[2, 3, 5]}
                >
                  Promo Code
                </Tab>
              </TabList>
            </Flex>
            <TabPanels width={"100%"}>
              <TabPanel width={"100%"} p={0}>
                <Flex w="100%" pt={4} px={[0, 0, 8]} mb={8}>
                  {data.current_package !== "trial" && (
                    <CurrentPlan
                      subscription={data.subscription}
                      isCancellable={data.is_cancellable}
                      name={
                        plans.pricing_data["monthly"][data.current_package].name
                      }
                      packageName={data.current_package}
                      packageRechargeDate={data.package_recharge_date}
                      packageValidity={data.package_validity}
                      plan={plans.pricing_data["monthly"][data.current_package]}
                    />
                  )}
                </Flex>
                <PricingDetails pricingDetails={plans} page="billing" />
              </TabPanel>
              <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                {data.current_package !== "trial" && (
                  <ScanCredits
                    planData={
                      plans.pricing_data["monthly"][data.current_package]
                    }
                    profile={data}
                    topUpData={
                      plans.pricing_data["topup-beginner"]["topup-beginner"]
                    }
                  />
                )}
              </TabPanel>
              <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                <TransactionListCard
                  transactionList={transactionList}
                  page={page}
                  fetchAgain={fetchAgain}
                  pageNo={pageNo}
                  fetchMore={fetchMore}
                />
              </TabPanel>
              <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                <PromoCodeCard profileData={data} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </Box>
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
          _hover={{
            filter: "drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));",
          }}
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
      _hover={{
        filter: "drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));",
      }}
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

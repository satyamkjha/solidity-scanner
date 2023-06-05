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
import { monthNames } from "common/values";

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

export default TransactionListCard;

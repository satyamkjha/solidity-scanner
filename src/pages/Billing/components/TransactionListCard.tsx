import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  useMediaQuery,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import "../billing.css";
import { Page, Transaction } from "common/types";
import { sentenceCapitalize } from "helpers/helperFunction";
import InfiniteScroll from "react-infinite-scroll-component";
import { monthNames } from "common/values";
import CancelPaymentDialog from "./CancelPaymentDialog";
import Loader from "components/styled-components/Loader";
import { DownloadIcon } from "@chakra-ui/icons";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { formattedDate } from "common/functions";

const TransactionListCard: React.FC<{
  transactionList: Transaction[];
  page: Page;
  pageNo: number;
  fetchAgain: () => Promise<void>;
  fetchMore: () => Promise<void>;
  onPaymentCancel: () => Promise<void>;
}> = ({
  transactionList,
  page,
  pageNo,
  fetchMore,
  onPaymentCancel,
  fetchAgain,
}) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderId, setOrderId] = useState("");
  const [paymentPlatform, setPaymentPlatform] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isInvoiceDownloading, setIsInvoiceDownloading] = useState<boolean[]>(
    []
  );

  useEffect(() => {
    if (transactionList && transactionList.length) {
      const boolList = transactionList.map((item, index) => {
        return false;
      });
      setIsInvoiceDownloading(boolList);
    }
  }, [transactionList]);

  const fetchMoreTransactions = () => {
    if (pageNo >= page.total_pages) {
      setHasMore(false);
      return null;
    }
    fetchMore();
  };

  const downloadInvoice = async (transaction: Transaction, index: number) => {
    setIsInvoiceDownloading((currentList) => {
      const newList = [...currentList];
      newList[index] = true;
      return newList;
    });
    try {
      const { data } = await API.get(
        `${API_PATH.API_GET_DOWNLOAD_INVOICE_URL}?order_id=${transaction.order_id}&payment_platform=${transaction.payment_platform}`
      );

      if (data.status === "success" && data.download_url) {
        const link = document.createElement("a");
        link.href = data.download_url;
        link.click();
      }
    } catch (e) {
      setIsInvoiceDownloading((currentList) => {
        const newList = [...currentList];
        newList[index] = false;
        return newList;
      });
    }

    setIsInvoiceDownloading((currentList) => {
      const newList = [...currentList];
      newList[index] = false;
      return newList;
    });
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
            <Text w={"6%"} fontWeight={500} color={"gray.600"}>
              Status
            </Text>
            <Text w={"12%"} fontWeight={500} color={"gray.600"}>
              Amount
            </Text>
            <Text w={"12%"} fontWeight={500} color={"gray.600"}>
              Date
            </Text>
            <Text w={"10%"} fontWeight={500} color={"gray.600"}>
              Payment Mode
            </Text>
            <Text w={"15%"} fontWeight={500} color={"gray.600"}>
              Package
            </Text>
            <Text w={"10%"} fontWeight={500} color={"gray.600"}>
              Billing Cycle
            </Text>
            <Text
              fontWeight={500}
              color={"gray.600"}
              textAlign="right"
              w={"20%"}
            >
              Actions
            </Text>
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
                <Loader />
              </Box>
            }
            scrollableTarget="pageScroll"
          >
            {" "}
            {transactionList.length > 0 ? (
              transactionList.map((transaction, index) => {
                const date = new Date(transaction.date);
                return (
                  <HStack
                    key={index}
                    p={4}
                    justify="space-between"
                    width={"100%"}
                    align="center"
                  >
                    <Text w={"6%"} fontWeight={500} color={"gray.400"}>
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
                    <Text w={"12%"} fontWeight={500} color={"gray.400"}>
                      {transaction.payment_platform === "coinpayments"
                        ? transaction.amount
                        : parseFloat(transaction.amount).toFixed(2)}
                      {transaction.currency.toUpperCase()}
                    </Text>
                    <Text w={"12%"} fontWeight={500} color={"gray.400"}>
                      {formattedDate(date)}
                    </Text>
                    <Text w="10%" fontWeight={500} color={"gray.400"}>
                      {sentenceCapitalize(transaction.payment_platform)}
                    </Text>
                    <Text w="15%" fontWeight={500} color={"gray.400"}>
                      {transaction.billing_cycle === "verified_publish_report"
                        ? "Verified Report"
                        : transaction.billing_cycle === "publish_report"
                        ? "Self-Published Report"
                        : sentenceCapitalize(transaction.package)}
                    </Text>
                    <Text w="10%" fontWeight={500} color={"gray.400"}>
                      {transaction.billing_cycle === "verified_publish_report"
                        ? "One-Time"
                        : transaction.billing_cycle === "publish_report"
                        ? "One-Time"
                        : sentenceCapitalize(transaction.billing_cycle)}
                    </Text>
                    <Flex w={"20%"} flexWrap="wrap" justify="flex-end">
                      {transaction.payment_platform === "stripe" &&
                        transaction.payment_status === "open" && (
                          <Button
                            variant="accent-ghost"
                            color={"red"}
                            my={0}
                            py={0}
                            fontSize={"sm"}
                            onClick={() => {
                              onOpen();
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
                      {transaction.payment_status === "success" &&
                        transaction.download_invoice_status &&
                        transaction.download_invoice_status === "success" && (
                          <Tooltip label="Download Invoice">
                            <Button
                              bgColor={"#3E15F410"}
                              color={"accent"}
                              w={"fit-content"}
                              ml={"auto"}
                              my={0}
                              py={0}
                              px={2}
                              fontSize={"sm"}
                              width={"fit-content"}
                              isLoading={isInvoiceDownloading[index]}
                              spinner={<Loader color={"#3300FF"} size={25} />}
                              onClick={() =>
                                downloadInvoice(transaction, index)
                              }
                            >
                              <DownloadIcon />
                            </Button>
                          </Tooltip>
                        )}
                    </Flex>
                  </HStack>
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
            <Box w={"100%"} alignItems="center">
              <Loader />
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
                            onOpen();
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
                <Flex
                  ml={"auto"}
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                >
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
                      {monthNames[parseInt(date[1]) - 1]}
                    </Text>
                  </Box>
                  {transaction.payment_status === "success" &&
                    transaction.download_invoice_status &&
                    transaction.download_invoice_status === "success" && (
                      <Button
                        bgColor={"#3E15F410"}
                        color={"accent"}
                        w={"fit-content"}
                        my={4}
                        py={0}
                        px={2}
                        fontSize={"sm"}
                        width={"fit-content"}
                        isLoading={isInvoiceDownloading[index] || false}
                        spinner={<Loader color={"#3300FF"} size={25} />}
                        onClick={() => downloadInvoice(transaction, index)}
                      >
                        <DownloadIcon />
                      </Button>
                    )}
                </Flex>
              </Flex>
            );
          })}
        </InfiniteScroll>
      )}
      <CancelPaymentDialog
        isOpen={isOpen}
        onClose={onClose}
        orderId={orderId}
        fetchAgain={fetchAgain}
        paymentPlatform={paymentPlatform}
        onPaymentCancel={onPaymentCancel}
      />
    </>
  );
};

export default TransactionListCard;

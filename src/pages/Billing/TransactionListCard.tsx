import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Spinner,
  VStack,
  HStack,
  Badge,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import "./billing.css";
import { Page, Transaction } from "common/types";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import InfiniteScroll from "react-infinite-scroll-component";
import { monthNames } from "common/values";
import CancelPaymentDialog from "components/common/CancelPaymentDialog";

const TransactionListCard: React.FC<{
  transactionList: Transaction[];
  page: Page;
  pageNo: number;
  fetchMore: () => Promise<void>;
  onPaymentCancel: () => Promise<void>;
}> = ({ transactionList, page, pageNo, fetchMore, onPaymentCancel }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                                onOpen();
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
            <Box w={"100%"} alignItems="center">
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
      <CancelPaymentDialog
        isOpen={isOpen}
        onClose={onClose}
        orderId={orderId}
        paymentPlatform={paymentPlatform}
        onPaymentCancel={onPaymentCancel}
      />
    </>
  );
};

export default TransactionListCard;

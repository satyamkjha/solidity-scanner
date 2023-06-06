import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Divider,
  Spinner,
  Heading,
  HStack,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import "./billing.css";

import CurrentPlan from "./CurrentPlan";
import PromoCodeCard from "./PromoCodeCard";
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
import TransactionListCard from "./TransactionListCard";

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
                    topUpData={plans.pricing_data["topup"]["beginner"]}
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

export default Billing;

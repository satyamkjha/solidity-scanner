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
  Image,
  VStack,
  Button,
} from "@chakra-ui/react";
import "./billing.css";
import LatestInvoice from "./LatestInvoice";
import CurrentPlan from "./CurrentPlan";
import PromoCodeCard from "./PromoCodeCard";
import { useProfile } from "hooks/useProfile";
import { useAcceptedCoins } from "hooks/usePricing";

import API from "helpers/api";
import { daysRemaining, dateToDDMMMMYYYY } from "common/functions";
import { Page, Plan, Profile, Transaction } from "common/types";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import ContactUs from "components/contactus";
import { useTransactions } from "hooks/useTransactions";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import { useInvoices } from "hooks/useInvoices";
import {
  CoinPaymentsIcon,
  StripeLogo,
  StripePaymentsLogo,
} from "components/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePricingPlans } from "hooks/usePricingPlans";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import ScanCredits from "components/billing/ScanCredits";
import PricingDetails from "pages/Pricing/components/PricingDetails";
import { CloseIcon } from "@chakra-ui/icons";
import TransactionListCard from "./TransactionListCard";

const successColor = "#289F4C";
const greyColor = "#BDBDBD";

const Billing: React.FC = () => {
  const { data } = useProfile();
  const [selectedPlan, setSelectedPlan] = useState("custom");
  const pricingRef = useRef<HTMLDivElement>(null);

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

  const onUpgradePlan = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
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
                <Flex w="100%" pt={4} px={[0, 0, 8]} mb={8} position="relative">
                  <CurrentPlan
                    subscription={data.subscription}
                    isCancellable={data.is_cancellable}
                    name={
                      plans.pricing_data[data.billing_cycle][
                        data.current_package
                      ].name
                    }
                    packageName={data.current_package}
                    packageRechargeDate={data.package_recharge_date}
                    packageValidity={data.package_validity}
                    plan={
                      plans.pricing_data[data.billing_cycle][
                        data.current_package
                      ]
                    }
                    upgradePlan={onUpgradePlan}
                  />
                  <Flex
                    h="100%"
                    position="absolute"
                    left="55%"
                    top={0}
                    right={4}
                  >
                    {transactionList.length > 0 &&
                      transactionList[0].payment_status === "open" && (
                        <LatestInvoice
                          transactionData={transactionList[0]}
                          selectedPlan={transactionList[0].package}
                          planData={
                            plans.pricing_data[data.billing_cycle][
                              transactionList[0].package
                            ]
                          }
                        />
                      )}
                  </Flex>
                </Flex>
                <Flex w="100%" ref={pricingRef}>
                  <PricingDetails pricingDetails={plans} page="billing" />
                </Flex>
              </TabPanel>
              <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                <ScanCredits
                  planData={
                    plans.pricing_data[data.billing_cycle][data.current_package]
                  }
                  profile={data}
                  topUpData={plans.pricing_data["topup"][data.current_package]}
                />
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

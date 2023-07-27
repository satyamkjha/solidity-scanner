import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import "./billing.css";

import { Page, Transaction, Profile } from "common/types";
import { useTransactions } from "hooks/useTransactions";
import { usePricingPlans } from "hooks/usePricingPlans";
import ScanCredits from "pages/Billing/components/ScanCredits";
import PricingDetails from "pages/Pricing/components/PricingDetails";
import CurrentPlan from "./components/CurrentPlan";
import LatestInvoice from "./components/LatestInvoice";
import PromoCodeCard from "./components/PromoCodeCard";
import TransactionListCard from "./components/TransactionListCard";
import Loader from "components/styled-components/Loader";

const Billing: React.FC<{ profileData: Profile }> = ({ profileData }) => {
  const [planBillingCycle, setPlanBillingCycle] = useState("");
  const pricingRef = useRef<HTMLDivElement>(null);

  const [pageNo, setPageNo] = useState(1);
  const { data: transactions, refetch } = useTransactions(pageNo, 10);
  const [transactionList, setTransactionList] = useState<
    Transaction[] | undefined
  >();
  const [page, setPage] = useState<Page | undefined>();
  const [completePaymentOpen, setCompletePaymentOpen] =
    useState<boolean>(false);

  const { data: plans } = usePricingPlans();

  useEffect(() => {
    if (profileData) {
      const billing_cycle =
        profileData.billing_cycle === "N/A"
          ? "trial"
          : profileData.billing_cycle;
      setPlanBillingCycle(billing_cycle);
    }
  }, [profileData]);

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

  useEffect(() => {
    if (
      transactionList &&
      transactionList.length > 0 &&
      transactionList[0].payment_status === "open"
    ) {
      setCompletePaymentOpen(true);
    } else {
      setCompletePaymentOpen(false);
    }
  }, [transactionList]);

  const fetchAgain = async () => {
    setPageNo(1);
    await refetch();
  };

  const fetchMore = async () => {
    setPageNo(pageNo + 1);
    await refetch();
  };

  const onPaymentCancel = (payment_type: string) => {
    setCompletePaymentOpen(false);
    fetchAgain();
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
        <Text mx={[2, 2, 2, 8]} sx={{ color: "subtle", fontWeight: 600 }}>
          Billing & Transaction history
        </Text>
        {!profileData ||
        !plans ||
        !transactionList ||
        !page ||
        !planBillingCycle ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Loader />
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
                {!["trial", "custom", "expired"].includes(
                  profileData.current_package
                ) && (
                  <Tab
                    minW={["150px", "150px", "200px"]}
                    bgColor={"#F5F5F5"}
                    mx={[2, 3, 5]}
                  >
                    Scan Credits
                  </Tab>
                )}
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
                {profileData.current_package !== "custom" && (
                  <Flex
                    w="100%"
                    pt={4}
                    px={[0, 0, 8]}
                    mb={8}
                    position="relative"
                    flexDir={["column", "column", "column", "row"]}
                  >
                    {plans.pricing_data[planBillingCycle] &&
                      plans.pricing_data[planBillingCycle][
                        profileData.current_package
                      ] && (
                        <CurrentPlan
                          subscription={profileData.subscription}
                          isCancellable={profileData.is_cancellable}
                          billingCycle={planBillingCycle}
                          packageName={profileData.current_package}
                          packageRechargeDate={
                            profileData.package_recharge_date
                          }
                          packageValidity={profileData.package_validity}
                          plan={
                            plans.pricing_data[planBillingCycle][
                              profileData.current_package
                            ]
                          }
                          upgradePlan={onUpgradePlan}
                        />
                      )}
                    {completePaymentOpen && (
                      <Flex
                        h="100%"
                        position={[
                          "relative",
                          "relative",
                          "relative",
                          "absolute",
                        ]}
                        left={[0, 0, 0, "55%"]}
                        top={0}
                        right={4}
                      >
                        <LatestInvoice
                          transactionData={transactionList[0]}
                          selectedPlan={transactionList[0].package}
                          planData={
                            plans.pricing_data[
                              transactionList[0].billing_cycle
                            ][transactionList[0].package]
                          }
                          onPaymentCancel={onPaymentCancel}
                        />
                      </Flex>
                    )}
                  </Flex>
                )}
                <Flex
                  w="100%"
                  ref={pricingRef}
                  mt={profileData.current_package === "custom" ? 4 : 0}
                >
                  <PricingDetails
                    currentPackage={profileData.current_package}
                    pricingDetails={plans}
                    page="billing"
                  />
                </Flex>
              </TabPanel>
              {!["trial", "custom", "expired"].includes(
                profileData.current_package
              ) && (
                <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                  {plans.pricing_data[planBillingCycle] &&
                    plans.pricing_data[planBillingCycle][
                      profileData.current_package
                    ] && (
                      <ScanCredits
                        planData={
                          plans.pricing_data[planBillingCycle][
                            profileData.current_package
                          ]
                        }
                        profile={profileData}
                        topUpData={plans.pricing_data["topup"]}
                        pricingDetails={plans.pricing_data}
                      />
                    )}
                </TabPanel>
              )}
              <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                <TransactionListCard
                  transactionList={transactionList}
                  page={page}
                  onPaymentCancel={fetchAgain}
                  pageNo={pageNo}
                  fetchMore={fetchMore}
                />
              </TabPanel>
              <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                <PromoCodeCard profileData={profileData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </Box>
  );
};

export default Billing;

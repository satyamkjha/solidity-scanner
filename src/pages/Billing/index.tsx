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

import { Page, Transaction } from "common/types";
import { useTransactions } from "hooks/useTransactions";
import { usePricingPlans } from "hooks/usePricingPlans";
import ScanCredits from "pages/Billing/components/ScanCredits";
import PricingDetails from "pages/Pricing/components/PricingDetails";
import CurrentPlan from "./components/CurrentPlan";
import LatestInvoice from "./components/LatestInvoice";
import PromoCodeCard from "./components/PromoCodeCard";
import TransactionListCard from "./components/TransactionListCard";
import Loader from "components/styled-components/Loader";
import { useProfile } from "hooks/useProfile";
import LocTopUp from "./components/LocTopUp";
import { useLocation } from "react-router-dom";
import { billingTabs } from "common/values";

const Billing: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab") || "billing";
  const [tabIndex, setTabIndex] = React.useState(
    billingTabs.findIndex((item) => item === tab)
  );

  const [planBillingCycle, setPlanBillingCycle] = useState("");
  const pricingRef = useRef<HTMLDivElement>(null);
  const { data: profileData, refetch: refetchProfile } = useProfile(true);
  const promoCodeEnabled = false;

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
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
        h: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        pt: 4,
        mx: [0, 0, 4],
        mb: 4,
        minH: "85vh",
      }}
    >
      <Flex
        w={"100%"}
        sx={{
          flexDir: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          mb: 4,
        }}
      >
        <Text mx={[4, 6, 8, 8]} sx={{ color: "subtle", fontWeight: 600 }}>
          BILLING & TRANSACTION HISTORY
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
            index={tabIndex}
            onChange={handleTabsChange}
            mx={0}
            px={0}
            w={"100%"}
            variant="soft-rounded"
            colorScheme="green"
            defaultIndex={tabIndex}
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
                ) ? (
                  <Tab
                    minW={["150px", "150px", "200px"]}
                    bgColor={"#F5F5F5"}
                    mx={[2, 3, 5]}
                  >
                    {profileData.credit_system === "loc"
                      ? "LOC TopUp"
                      : "Scan Credits"}
                  </Tab>
                ) : null}
                <Tab
                  minW={["150px", "150px", "200px"]}
                  bgColor={"#F5F5F5"}
                  mx={[2, 3, 5]}
                >
                  Transactions
                </Tab>
                {promoCodeEnabled && (
                  <Tab
                    minW={["150px", "150px", "200px"]}
                    bgColor={"#F5F5F5"}
                    mx={[2, 3, 5]}
                  >
                    Promo Code
                  </Tab>
                )}
              </TabList>
            </Flex>
            <TabPanels width={"100%"}>
              <TabPanel width={"100%"} p={0}>
                <Flex
                  w="100%"
                  pt={4}
                  px={[0, 0, 8]}
                  mb={8}
                  position="relative"
                  flexDir={["column", "column", "column", "row"]}
                >
                  {profileData.current_package === "custom" ? (
                    <CurrentPlan
                      pricing={plans}
                      subscription={profileData.subscription}
                      isCancellable={profileData.is_cancellable}
                      billingCycle={planBillingCycle}
                      packageName={profileData.current_package}
                      packageRechargeDate={profileData.package_recharge_date}
                      packageValidity={profileData.package_validity}
                      plan={{
                        name: "Enterprise",
                        description:
                          "Enterprise dealing in Crypto Development or Security with large team size. Get your scan results and reports vetted by our security professionals",
                        discount: null,
                        scan_count: 0,
                        amount: "NA",
                        loc: 100000,
                        github: true,
                        report: true,
                        publishable_report: true,
                      }}
                      refetchProfile={refetchProfile}
                      upgradePlan={onUpgradePlan}
                    />
                  ) : (
                    plans.pricing_data[planBillingCycle] &&
                    plans.pricing_data[planBillingCycle][
                      profileData.current_package
                    ] && (
                      <CurrentPlan
                        pricing={plans}
                        subscription={profileData.subscription}
                        isCancellable={profileData.is_cancellable}
                        billingCycle={planBillingCycle}
                        packageName={profileData.current_package}
                        packageRechargeDate={profileData.package_recharge_date}
                        packageValidity={profileData.package_validity}
                        plan={
                          plans.pricing_data[planBillingCycle][
                            profileData.current_package
                          ]
                        }
                        refetchProfile={refetchProfile}
                        upgradePlan={onUpgradePlan}
                      />
                    )
                  )}
                  {completePaymentOpen && (
                    <Flex
                      h="100%"
                      position={
                        profileData.current_package === "expired"
                          ? "relative"
                          : ["relative", "relative", "relative", "absolute"]
                      }
                      left={[0, 0, 0, "55%"]}
                      top={0}
                      right={4}
                    >
                      <LatestInvoice
                        transactionData={transactionList[0]}
                        selectedPlan={transactionList[0].package}
                        fetchAgain={fetchAgain}
                        planData={
                          plans.pricing_data[transactionList[0].billing_cycle][
                            transactionList[0].package
                          ]
                        }
                        onPaymentCancel={onPaymentCancel}
                      />
                    </Flex>
                  )}
                </Flex>
                <Flex
                  w="100%"
                  ref={pricingRef}
                  mt={profileData.current_package === "custom" ? 4 : 0}
                >
                  <PricingDetails
                    profileData={profileData}
                    pricingDetails={plans}
                    page="billing"
                  />
                </Flex>
              </TabPanel>
              {!["trial", "custom", "expired"].includes(
                profileData.current_package
              ) ? (
                <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                  {plans.pricing_data[planBillingCycle] &&
                  plans.pricing_data[planBillingCycle][
                    profileData.current_package
                  ] ? (
                    <>
                      {profileData.credit_system === "loc" ? (
                        <LocTopUp
                          planData={
                            plans.pricing_data[planBillingCycle][
                              profileData.current_package
                            ]
                          }
                          profile={profileData}
                          topUpData={plans.pricing_data["topup"]}
                          pricingDetails={plans.pricing_data}
                        />
                      ) : (
                        <ScanCredits
                          handleTabsChange={handleTabsChange}
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
                    </>
                  ) : null}
                </TabPanel>
              ) : null}
              <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                <TransactionListCard
                  transactionList={transactionList}
                  page={page}
                  onPaymentCancel={fetchAgain}
                  pageNo={pageNo}
                  fetchAgain={fetchAgain}
                  fetchMore={fetchMore}
                />
              </TabPanel>
              {promoCodeEnabled && (
                <TabPanel px={[0, 0, 4]} mx={[0, 0, 4]}>
                  <PromoCodeCard profileData={profileData} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </Box>
  );
};

export default Billing;

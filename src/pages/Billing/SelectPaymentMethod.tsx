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

  const [isLargerThan400, isLargerThan50f0] = useMediaQuery([
    "(min-width : 400px)",
  ]);

  return (
    <Box m={[0, 0, 2]} width={["100%", "100%", "65%"]}>
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

export default SelectPaymentMethod;

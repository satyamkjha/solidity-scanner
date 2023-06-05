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
  useMediaQuery,
  Image,
  Button,
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
  paymentMethod: "cp" | "stripe";
  setPaymentMethod: React.Dispatch<React.SetStateAction<"cp" | "stripe">>;
}> = ({ paymentMethod, setPaymentMethod }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const [isLargerThan400, isLargerThan50f0] = useMediaQuery([
    "(min-width : 400px)",
  ]);

  return (
    <Flex w="340px" flexDir="column" h="fit-content">
      <HStack w="100%" spacing={"20px"} mx="10px">
        <Flex
          w="150px"
          h="100px"
          borderRadius="10px"
          backgroundColor={paymentMethod === "cp" ? "#FFFFFF" : "#F7F9FC"}
          flexDir={"column"}
          justifyContent="flex-start"
          alignItems="center"
          p="10px"
          boxShadow={
            paymentMethod === "cp"
              ? " 0px 4px 23px rgba(47, 248, 107, 0.2)"
              : ""
          }
          border={paymentMethod === "cp" ? "1px solid #52FF00" : ""}
          onClick={() => {
            setPaymentMethod("cp");
          }}
        >
          <HStack w="100%" justifyContent="flex-end">
            <Flex
              w="18px"
              h="18px"
              backgroundColor="#EFEFEF"
              borderRadius="50%"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                w="10px"
                h="10px"
                background={
                  paymentMethod === "cp"
                    ? "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
                    : "#B0B7C3"
                }
                borderRadius="50%"
              ></Box>
            </Flex>
          </HStack>
          <Image
            height="30px"
            width="100px"
            src={`${assetsURL}billing/cp_logo.svg`}
          />
        </Flex>
        <Flex
          w="150px"
          h="100px"
          borderRadius="10px"
          backgroundColor={paymentMethod === "stripe" ? "#FFFFFF" : "#F7F9FC"}
          flexDir={"column"}
          justifyContent="flex-start"
          alignItems="center"
          p="10px"
          boxShadow={
            paymentMethod === "stripe"
              ? " 0px 4px 23px rgba(47, 248, 107, 0.2)"
              : ""
          }
          border={paymentMethod === "stripe" ? "1px solid #52FF00" : ""}
          onClick={() => {
            setPaymentMethod("stripe");
          }}
        >
          <HStack w="100%" justifyContent="flex-end">
            <Flex
              w="18px"
              h="18px"
              backgroundColor="#EFEFEF"
              borderRadius="50%"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                w="10px"
                h="10px"
                background={
                  paymentMethod === "stripe"
                    ? "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
                    : "#B0B7C3"
                }
                borderRadius="50%"
              ></Box>
            </Flex>
          </HStack>
          <Image
            height="30px"
            width="120px"
            src={`${assetsURL}billing/stripe_logo.svg`}
          />
          <HStack
            w="fit-content"
            bgColor="#0A2540"
            py="5px"
            px="10px"
            borderRadius="15px"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontSize="10px" color="#FFFFFF" w="fit-content">
              Pay With
            </Text>
            <Image
              height="15px"
              width="45px"
              src={`${assetsURL}billing/stripe_white_logo.svg`}
            />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SelectPaymentMethod;

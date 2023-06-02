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

  return <></>;
};

export default SelectPaymentMethod;

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

const PromoCodeCard: React.FC<{ profileData: Profile }> = ({ profileData }) => {
  const [promoCode, setPromoCode] = useState("");
  const [activePromo, setActivePromo] = useState<string | undefined>(
    profileData.promo_code
  );
  const toast = useToast();
  const applyPromoCode = () => {
    API.get(`api-apply-promo/?code=${promoCode}`).then((res) => {
      if (res.status === 200) {
        toast({
          title: res.data.message,
          status: res.data.status,
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        setActivePromo(promoCode);
      }
    });
  };

  return (
    <Box
      sx={{
        w: "100%",
        maxW: "1000px",
        background: "white",
        borderRadius: 15,
        p: [4, 4, 8],
        h: "50vh",
        // ml: [5, 5, 10],
      }}
    >
      <Text fontSize={"lg"} my={5} fontWeight={900} color={"gray.500"}>
        Activate Promo Code
      </Text>
      <Text mb={7} fontWeight={500} width="60%" color={"gray.500"}>
        Have a Promo Code ?
      </Text>
      <Flex
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        flexDir={["column", "column", "row"]}
        width={"100%"}
      >
        <Input
          isRequired
          placeholder="Enter Promo Code"
          variant="brand"
          size="lg"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          width={["100%", "100%", "70%", "60%"]}
        />
        <Button
          variant="brand"
          mt={[4, 4, 0]}
          ml={[0, 0, 4]}
          width={["100%", "100%", "30%", "20%"]}
          minW={"160px"}
          maxW={"360px"}
          disabled={
            promoCode.length < 0 ||
            promoCode.length > 50 ||
            profileData.current_package !== "trial" ||
            activePromo !== undefined
          }
          onClick={applyPromoCode}
        >
          Apply Promo Code
        </Button>
      </Flex>
      {activePromo && (
        <Flex
          mt={10}
          p={3}
          backgroundColor="#F8FFFA"
          justifyContent={"flex-start"}
          borderRadius="xl"
          border={"1px solid #289F4C"}
          alignItems="flex-start"
        >
          <HiCheckCircle size={30} color={"#289F4C"} />
          <VStack ml={3} alignItems={"flex-start"}>
            <Text fontSize={"lg"} fontWeight={600} color="gray.600">
              {activePromo.toUpperCase()}
            </Text>
            <Text fontSize={"md"} fontWeight={400} color="gray.500">
              {`${activePromo.toUpperCase()} has been activated`}
            </Text>
          </VStack>
        </Flex>
      )}
    </Box>
  );
};

export default PromoCodeCard;

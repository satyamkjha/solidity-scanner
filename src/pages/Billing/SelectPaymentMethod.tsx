import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  HStack,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import "./billing.css";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import PaymentMethodCard from "./PaymentMethodCard";

const SelectPaymentMethod: React.FC<{
  paymentMethod: "cp" | "stripe";
  setPaymentMethod: React.Dispatch<React.SetStateAction<"cp" | "stripe">>;
}> = ({ paymentMethod, setPaymentMethod }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const [isLargerThan400, isLargerThan50f0] = useMediaQuery([
    "(min-width : 400px)",
  ]);

  return <></>;
};

export default SelectPaymentMethod;

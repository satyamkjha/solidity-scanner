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
import { dateToDDMMMMYYYY } from "common/functions";

const SubscriptionDataContainer: React.FC<{
  packageName: string;
  packageRechargeDate: string;
}> = ({ packageName, packageRechargeDate }) => {
  return (
    <>
      <Box mt={5}>
        <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
          Subscribed on
        </Text>
        <Text fontWeight={500} fontSize="md">
          {dateToDDMMMMYYYY(new Date(packageRechargeDate))}
        </Text>
      </Box>
      <Box mt={5} ml={10}>
        <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
          Recurring Payment
        </Text>
        <Text fontWeight={500} fontSize="md">
          {packageName === "trial" || packageName === "ondemand"
            ? "--"
            : "Stripe Payment"}
        </Text>
      </Box>
    </>
  );
};

export default SubscriptionDataContainer;

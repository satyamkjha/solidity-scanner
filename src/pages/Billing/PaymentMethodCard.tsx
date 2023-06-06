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

const PaymentMethodCard: React.FC<{
  setPaymentMethod: React.Dispatch<React.SetStateAction<"cp" | "stripe">>;
  paymentMethod: "cp" | "stripe";
  paymentType: "cp" | "stripe";
}> = ({ setPaymentMethod, paymentMethod, paymentType }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Flex
      w="190px"
      h="100px"
      cursor={"pointer"}
      borderRadius="10px"
      backgroundColor={paymentMethod === paymentType ? "#FFFFFF" : "#F7F9FC"}
      flexDir={"column"}
      justifyContent="flex-start"
      alignItems="center"
      p="10px"
      boxShadow={
        paymentMethod === paymentType
          ? " 0px 4px 23px rgba(47, 248, 107, 0.2)"
          : ""
      }
      border={paymentMethod === paymentType ? "1px solid #52FF00" : ""}
      onClick={() => {
        setPaymentMethod(paymentType);
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
              paymentMethod === paymentType
                ? "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
                : "#B0B7C3"
            }
            borderRadius="50%"
          ></Box>
        </Flex>
      </HStack>
      {paymentType === "cp" ? (
        <Image
          height="40px"
          width="140px"
          src={`${assetsURL}billing/cp_logo.svg`}
        />
      ) : (
        <>
          <Image
            height="30px"
            width="150px"
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
        </>
      )}
    </Flex>
  );
};

export default PaymentMethodCard;

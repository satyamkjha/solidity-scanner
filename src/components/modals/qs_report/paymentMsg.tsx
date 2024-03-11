import React from "react";
import {
  Flex,
  Text,
} from "@chakra-ui/react";
import { CheckBadge } from "components/icons";
import Loader from "components/styled-components/Loader";
import { WarningTwoIcon } from "@chakra-ui/icons";

export const PaymentMsg: React.FC<{
  email: string;
  paymentStatus: string;
  amount: string;
}> = ({ email, paymentStatus, amount }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        w="100%"
        direction="column"
        justifyContent="center"
        alignItems={"center"}
      >
        {paymentStatus === "success" ? (
          <CheckBadge size={56} fillColor={"#38CB89"} strokColor={"white"} />
        ) : paymentStatus === "loading" ? (
          <Loader />
        ) : paymentStatus === "failed" ? (
          <WarningTwoIcon color="high" fontSize={80} />
        ) : (
          <></>
        )}

        {paymentStatus === "success" ? (
          <Text mt={5} fontWeight={300} fontSize={"lg"}>
            Thank you! Your payment of <b>$ {amount}</b> has been received.
          </Text>
        ) : paymentStatus === "loading" ? (
          <Text mt={5} fontWeight={300} fontSize={"lg"}>
            Please wait while we process your payment of <b>$ {amount}</b>
          </Text>
        ) : paymentStatus === "failed" ? (
          <Text mt={5} fontWeight={300} fontSize={"lg"}>
            Sorry! Your payment of <b>$ {amount}</b> was not successful.
          </Text>
        ) : (
          <></>
        )}

        <Text mt={7} maxW="500px" textAlign="center" fontSize={"sm"}>
          {paymentStatus === "success"
            ? "The link for the audit report PDF should be available on your email now. Contact the SolidityScan team for further help if needed!"
            : paymentStatus === "loading"
            ? "Sit back and relax. You will be getting a confirmation of the payment via email once processed."
            : ""}
        </Text>

        {email && paymentStatus === "success" && (
          <Text mt={"150px"} fontSize={"md"}>
            The payment details and One Time Audit Report link has been sent to
            the {email}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

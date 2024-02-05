import React, { useState, useEffect } from "react";
import {
  Flex,
  Stack,
  Text,
  Heading,
  useMediaQuery,
  InputGroup,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { CheckBadge } from "components/icons";
import Loader from "components/styled-components/Loader";
import { WarningTwoIcon } from "@chakra-ui/icons";

export const PaymentMsg: React.FC<{
  email: string;
  paymentStatus: string;
}> = ({ email, paymentStatus }) => {
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
            Thank you! Your payment of <b>$ 49.99</b> has been received.
          </Text>
        ) : paymentStatus === "loading" ? (
          <Text mt={5} fontWeight={300} fontSize={"lg"}>
            Plese Wait, Your payment of <b>$ 49.99</b> is under progress.
          </Text>
        ) : paymentStatus === "failed" ? (
          <Text mt={5} fontWeight={300} fontSize={"lg"}>
            Sorry! Your payment of <b>$ 49.99</b> was not successful.
          </Text>
        ) : (
          <></>
        )}

        <Text mt={7} maxW="500px" textAlign="center" fontSize={"sm"}>
          Lorem ipsum dolor sit amet consectetur. Justo dui auctor integer morbi
          tortor auctor. Gravida ornare lectus eu odio. Phasellus massa pretium
          ac nec tellus aliquam cras integer.
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

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
  Image,
} from "@chakra-ui/react";
import { getAssetsURL, isEmail } from "helpers/helperFunction";

export const EmailForm: React.FC<{
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  setPaymentStatus: React.Dispatch<
    React.SetStateAction<"success" | "loading" | "failed">
  >;
  amount: string;
  onOpen: () => void;
}> = ({ email, setEmail, setModalState, onOpen, setPaymentStatus, amount }) => {
  const assetsURL = getAssetsURL();

  return (
    <Flex
      w="100%"
      h="100%"
      direction={["column", "column", "row"]}
      justifyContent={["flex-start", "flex-start", "space-between"]}
      alignItems={["center", "center", "flex-start"]}
    >
      <VStack
        w={["100%", "100%", "100%", "55%"]}
        h="100%"
        justifyContent="space-between"
        alignItems={["center", "center", "flex-start"]}
      >
        <Flex
          w="100%"
          direction="column"
          justifyContent="flex-start"
          alignItems={["center", "center", "flex-start"]}
        >
          <Text fontSize={"2xl"} fontWeight={700}>
            One Time Audit Report
          </Text>
          <Flex textAlign={"center"} my={1}>
            <Heading fontSize={"lg"}>
              {`$ ${amount}`}
              &nbsp;
            </Heading>
            <Text fontSize="xs" color="detail" mt={1}>
              {`/ report `}
            </Text>
          </Flex>
          <Text
            my={2}
            fontWeight={400}
            color="detail"
            fontSize={"sm"}
            width={"100%"}
            textAlign={["center", "center", "left"]}
          >
            Make a one-time payment of $49 and get your automated smart contract
            audit report with a detailed security analysis on all the
            vulnerabilities along with their criticalities, descriptions &
            remediations. Get easy access to the report via email & share it
            across your team!
          </Text>
          <Flex
            mt={5}
            p={5}
            mb={2}
            w="100%"
            h="fit-content"
            borderRadius="10px"
            backgroundColor={"#F7F9FC"}
            flexDir={"column"}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text ml={1} mb={2} fontWeight={600} fontSize="md">
              Type Email*
            </Text>
            <InputGroup alignItems="center">
              <Input
                placeholder="Type your email"
                variant={"brand"}
                size="lg"
                color={"#000000"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputGroup>
          </Flex>
        </Flex>
        <Button
          w="100%"
          variant="brand"
          isDisabled={!isEmail(email)}
          onClick={() => {
            setModalState("make_payment");
            setPaymentStatus("loading");
            onOpen();
          }}
        >
          {"Proceed to Payment"}
        </Button>
      </VStack>
      <Flex
        display={["none", "none", "none", "flex"]}
        w={"40%"}
        h="100%"
        flexDir="row"
        justifyContent="center"
        alignItems={"center"}
        p={5}
        borderRadius={10}
      >
        <Image
          width="100%"
          height="auto"
          src={`${assetsURL}quickscan/quickscan_checkout_payment.svg`}
        />
      </Flex>
    </Flex>
  );
};

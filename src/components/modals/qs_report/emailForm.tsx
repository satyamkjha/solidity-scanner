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

export const EmailForm: React.FC<{
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  setPaymentStatus: React.Dispatch<
    React.SetStateAction<"success" | "loading" | "failed">
  >;
  onOpen: () => void;
}> = ({ email, setEmail, setModalState, onOpen, setPaymentStatus }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      direction={["column", "column", "row"]}
      justifyContent={["flex-start", "flex-start", "space-between"]}
      alignItems={["center", "center", "flex-start"]}
    >
      <VStack
        w={["100%", "100%", "50%"]}
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
          <Flex textAlign="center" my={1}>
            <Heading fontSize={"lg"}>
              {`$ 49`}
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
          >
            Lorem ipsum dolor sit amet consectetur. Nunc integer elementum arcu
            neque lacus ut. Eget congue congue ultrices porttitor ac neque.
            Fusce eget et lectus faucibus pellentesque lacus natoque consectetur
            feugiat. Tempor commoLorem ipsum dolor sit amet consectetur. Nunc
            integer elementum arcu neque lacus ut. Eget r commodo molestie amet
            ipsum. Facilisis nunc mi vestibulum consequat eros quis felis.
            Pretium mi non ipsum ipsum arcu. Et nullam ultrices morbi at feugiat
            euismod.
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
          onClick={() => {
            setModalState("make_payment");
            setPaymentStatus("loading");
            onOpen();
          }}
        >
          {"Proceed to Payment"}
        </Button>
      </VStack>
    </Flex>
  );
};

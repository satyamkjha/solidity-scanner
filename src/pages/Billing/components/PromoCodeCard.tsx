import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  useToast,
  VStack,
  Input,
} from "@chakra-ui/react";

import API from "helpers/api";
import { Profile } from "common/types";
import { HiCheckCircle } from "react-icons/hi";

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
            promoCode.length === 0 ||
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

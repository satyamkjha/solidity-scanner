import React, { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import "./billing.css";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import API from "helpers/api";

const CouponCodeSection: React.FC<{
  duration: "monthly" | "yearly" | "on-demand";
  activeCoupon: string | null;
  setActiveCoupon: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPlan: string;
  setUpdatedPrice: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  activeCoupon,
  setActiveCoupon,
  selectedPlan,
  setUpdatedPrice,
  duration,
}) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [couponCode, setCouponCode] = useState<string>("");

  const toast = useToast();
  const verifyCouponCode = () => {
    try {
      API.get(
        `api-validate-coupon/?coupon=${couponCode}&package=${selectedPlan}&duration=${duration}`
      ).then((res) => {
        if (res.data.status === "success") {
          toast({
            title: `${couponCode} successfully applied`,
            status: res.data.status,
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setActiveCoupon(couponCode);
          setUpdatedPrice(res.data.updated_price);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex
      mt={5}
      p={5}
      w="100%"
      h="fit-content"
      borderRadius="10px"
      backgroundColor={"#F7F9FC"}
      flexDir={"column"}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Text ml={1} mb={2} fontSize="md">
        Have a Coupon Code ?
      </Text>
      <InputGroup alignItems="center">
        <Input
          placeholder="Type your coupon code"
          variant={"brand"}
          size="lg"
          color={activeCoupon ? "#289F4C" : "#000000"}
          value={activeCoupon ? `${activeCoupon} Code Applied` : couponCode}
          onChange={(e) => {
            // if (activeCoupon === null)
            setCouponCode(e.target.value.toUpperCase());
          }}
        />
        <InputRightElement
          w="fit-content"
          children={
            <Text
              cursor={"pointer"}
              fontSize={"sm"}
              mt={2}
              mr={4}
              onClick={() => {
                if (activeCoupon) {
                  setActiveCoupon(null);
                } else {
                  verifyCouponCode();
                }
              }}
              color={
                couponCode.length > 3 || activeCoupon ? "#3E15F4" : "#CCCCCC"
              }
            >
              {activeCoupon ? "Remove" : "Apply"}
            </Text>
          }
        />
      </InputGroup>
    </Flex>
  );
};

export default CouponCodeSection;

import React, { useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import API from "helpers/api";

const CouponCodeSection: React.FC<{
  duration: "monthly" | "yearly" | "ondemand";
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
  const [couponCode, setCouponCode] = useState<string>("");
  const [isLargerThan450] = useMediaQuery(["(min-width: 450px)"]);
  const toast = useToast();
  const verifyCouponCode = () => {
    try {
      API.get(
        `api-validate-coupon/?coupon=${couponCode.trim()}&package=${selectedPlan}&duration=${duration}`
      ).then((res) => {
        if (res.data.status === "success") {
          toast({
            title: `${couponCode} successfully applied`,
            status: res.data.status,
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setActiveCoupon(couponCode.trim());
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
          value={
            activeCoupon && isLargerThan450
              ? `${activeCoupon} Code Applied`
              : couponCode
          }
          onChange={(e) => {
            setCouponCode(e.target.value.toUpperCase());
          }}
        />
        {isLargerThan450 && (
          <InputRightElement
            w="fit-content"
            zIndex={0}
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
        )}
      </InputGroup>
      {!isLargerThan450 && (
        <HStack
          mt={3}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"100%"}
        >
          <Text color="#289F4C">{activeCoupon ? "Code Applied!" : ""}</Text>

          {activeCoupon ? (
            <Text
              cursor={"pointer"}
              fontSize={"sm"}
              onClick={() => {
                if (activeCoupon) {
                  setActiveCoupon(null);
                }
              }}
              color={"#3E15F4"}
            >
              Remove
            </Text>
          ) : (
            <Button
              variant="outline"
              borderWidth={2}
              colorScheme={couponCode.length > 3 ? "purple" : "blackAlpha"}
              onClick={verifyCouponCode}
            >
              Apply
            </Button>
          )}
        </HStack>
      )}
    </Flex>
  );
};

export default CouponCodeSection;

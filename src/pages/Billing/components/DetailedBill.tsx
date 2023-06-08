import { Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { Plan } from "common/types";
import React from "react";

const DetailedBill: React.FC<{
  duration: "monthly" | "yearly" | "on-demand";
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
  selectedPlan: string;
  activeCoupon: string | null;
  updatedPrice: string;
}> = ({
  duration,
  pricingDetails,
  selectedPlan,
  activeCoupon,
  updatedPrice,
}) => {
  return (
    <>
      <Divider mt={5} />
      <HStack mt={5} w="100%" justifyContent={"space-between"}>
        <Text fontSize={"sm"} fontWeight={300}>
          Selected Plan Total
        </Text>
        <Heading fontSize={"md"}>
          {duration === "monthly"
            ? `$ ${pricingDetails[duration][selectedPlan].amount}0`
            : `$ ${
                parseInt(pricingDetails[duration][selectedPlan].amount) +
                parseInt(
                  JSON.parse(pricingDetails[duration][selectedPlan].discount)
                    .amount
                )
              }.00`}
        </Heading>
      </HStack>
      {duration === "yearly" && (
        <HStack mt={4} w="100%" justifyContent={"space-between"}>
          <Text fontSize={"sm"} fontWeight={300}>
            Yearly Discount
          </Text>
          <Heading fontSize={"md"}>
            {`- $ ${parseInt(
              JSON.parse(pricingDetails[duration][selectedPlan].discount).amount
            )}.00`}{" "}
          </Heading>
        </HStack>
      )}
      <HStack mt={4} w="100%" justifyContent={"space-between"}>
        <Text color={"#8A94A6"} fontSize={"sm"} fontWeight={300}>
          Coupon Code
        </Text>
        {activeCoupon && (
          <Heading color={"#8A94A6"} fontSize={"md"}>
            {`- $ ${parseFloat(
              parseFloat(pricingDetails[duration][selectedPlan].amount).toFixed(
                1
              ) - parseFloat(updatedPrice).toFixed(1)
            ).toFixed(1)}0`}{" "}
          </Heading>
        )}
      </HStack>
      <Divider mt={4} />
      <HStack mt={4} w="100%" justifyContent={"space-between"}>
        <Text fontSize={"sm"} fontWeight={300}>
          Grand Total
        </Text>
        <Heading fontSize={"lg"}>
          {activeCoupon
            ? `$ ${parseFloat(updatedPrice).toFixed(2)}`
            : `$ ${parseFloat(
                pricingDetails[duration][selectedPlan].amount
              ).toFixed(2)}`}
        </Heading>
      </HStack>
      <Divider mt={4} />
    </>
  );
};
export default DetailedBill;

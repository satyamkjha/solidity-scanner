import { Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { Plan } from "common/types";
import React from "react";

const DetailedBill: React.FC<{
  duration: string;
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
  selectedPlan: string;
  activeCoupon: string | null;
  updatedPrice: string;
  quantity?: number;
}> = ({
  duration,
  pricingDetails,
  selectedPlan,
  activeCoupon,
  updatedPrice,
  quantity,
}) => {
  return (
    <>
      <Divider mt={5} />
      <HStack mt={5} w="100%" justifyContent={"space-between"}>
        <Text fontSize={"sm"} fontWeight={300}>
          Selected Plan Total
        </Text>
        <Heading fontSize={"md"}>
          {duration === "topup"
            ? `$ ${pricingDetails[duration][selectedPlan].amount} X ${quantity}`
            : duration === "monthly"
            ? `$ ${pricingDetails[duration][selectedPlan].amount}`
            : pricingDetails[duration][selectedPlan].discount
            ? `$ ${
                parseInt(pricingDetails[duration][selectedPlan].amount) +
                parseInt(
                  JSON.parse(
                    pricingDetails[duration][selectedPlan].discount || ""
                  )?.amount
                )
              }.00`
            : `$ ${pricingDetails[duration][selectedPlan].amount}`}
        </Heading>
      </HStack>
      {duration === "yearly" && (
        <HStack mt={4} w="100%" justifyContent={"space-between"}>
          <Text fontSize={"sm"} fontWeight={300}>
            Yearly Discount
          </Text>
          <Heading fontSize={"md"}>
            {`- $ ${parseInt(
              JSON.parse(pricingDetails[duration][selectedPlan].discount || "")
                ?.amount
            )}.00`}{" "}
          </Heading>
        </HStack>
      )}
      {activeCoupon && (
        <HStack mt={4} w="100%" justifyContent={"space-between"}>
          <Text color={"#8A94A6"} fontSize={"sm"} fontWeight={300}>
            Coupon Code
          </Text>
          <Heading color={"#8A94A6"} fontSize={"md"}>
            {`- $ ${
              +parseFloat(
                pricingDetails[duration][selectedPlan]?.amount
              ).toFixed(1) - +parseFloat(updatedPrice).toFixed(1)
            }0`}{" "}
          </Heading>
        </HStack>
      )}
      <Divider mt={4} />
      <HStack mt={4} w="100%" justifyContent={"space-between"}>
        <Text fontSize={"sm"} fontWeight={300}>
          Grand Total
        </Text>
        <Heading fontSize={"lg"}>
          {activeCoupon
            ? `$ ${parseFloat(updatedPrice).toFixed(2)}`
            : `$ ${parseFloat(
                (
                  +pricingDetails[duration][selectedPlan]?.amount *
                  (quantity || 1)
                ).toString()
              ).toFixed(2)}`}
        </Heading>
      </HStack>
      <Divider mt={4} />
    </>
  );
};
export default DetailedBill;

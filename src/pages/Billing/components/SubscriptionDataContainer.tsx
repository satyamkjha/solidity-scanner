import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { formattedDate } from "common/functions";

const SubscriptionDataContainer: React.FC<{
  packageName: string;
  isCancellable: boolean;
  packageRechargeDate: string;
}> = ({ packageName, packageRechargeDate, isCancellable }) => {
  return (
    <HStack spacing={20}>
      <Box>
        <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
          Subscribed on
        </Text>
        <Text fontWeight={500} fontSize="md">
          {formattedDate(new Date(packageRechargeDate), "long")}
        </Text>
      </Box>
      {packageName !== "custom" && (
        <Box>
          <Text fontWeight={400} fontSize="sm" mb={1} color="#4E5D78">
            Recurring Payment
          </Text>
          <Text fontWeight={500} fontSize="md">
            {packageName === "trial" ||
            packageName === "ondemand" ||
            !isCancellable
              ? "--"
              : "Stripe Payment"}
          </Text>
        </Box>
      )}
    </HStack>
  );
};

export default SubscriptionDataContainer;

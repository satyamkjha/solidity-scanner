import { Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";

const SwitchDuration: React.FC<{
  setDuration: React.Dispatch<
    React.SetStateAction<"monthly" | "yearly" | "ondemand" | "topup">
  >;
  setActiveCoupon: React.Dispatch<React.SetStateAction<string | null>>;
  setUpdatedPrice: React.Dispatch<React.SetStateAction<string>>;
  duration: "monthly" | "yearly" | "ondemand" | "topup";
}> = ({ setDuration, setActiveCoupon, setUpdatedPrice, duration }) => {
  return (
    <Flex
      my={2}
      flexDir={"row"}
      position={"relative"}
      alignItems={"flex-start"}
      justifyContent="flex-start"
    >
      <Text
        color={duration === "monthly" ? "#000000" : "#7F7F7F"}
        fontSize="sm"
        fontWeight={300}
      >
        Monthly
      </Text>
      <Switch
        mx={4}
        size="md"
        variant={duration === "yearly" ? "accent" : "brand"}
        isChecked={duration === "yearly"}
        onChange={() => {
          if (duration === "monthly") {
            setDuration("yearly");
          } else {
            setDuration("monthly");
          }
          setActiveCoupon(null);
          setUpdatedPrice("");
        }}
      />
      <Text
        color={duration === "yearly" ? "#000000" : "#7F7F7F"}
        fontSize="sm"
        fontWeight={300}
      >
        Yearly
      </Text>
    </Flex>
  );
};

export default SwitchDuration;

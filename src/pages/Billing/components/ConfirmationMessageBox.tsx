import { Flex, Text } from "@chakra-ui/react";
import { sentenceCapitalize } from "helpers/helperFunction";
import React from "react";

const ConfirmationMessageBox: React.FC<{
  name: string;
  duration: string;
}> = ({ name, duration }) => {
  const getPlanDuration = () => {
    if ("on-demand-report" === duration) return "One Time Audit Report";
    else if ("publish_report" === duration) return "Self-Published Report";
    else if ("verified_publish_report" === duration) return "Verified Report";
    else if (duration !== "ondemand")
      return `${sentenceCapitalize(duration)} Plan`;
  };

  return (
    <Flex
      bgColor="#FFF8ED"
      justifyContent={"center"}
      alignItems={"center"}
      border="2px solid #FFC661"
      p={3}
      borderRadius={10}
      mt={"auto"}
    >
      <Text color="detail" fontWeight={300} fontSize={"sm"}>
        You have opted for the{" "}
        <span
          style={{
            fontWeight: 900,
          }}
        >
          <b>
            {![
              "publish_report",
              "verified_publish_report",
              "on-demand-report",
            ].includes(duration) && sentenceCapitalize(name)}{" "}
            {getPlanDuration()}
          </b>
        </span>
        . Charges will be applied upon your confirmation.
      </Text>
    </Flex>
  );
};

export default ConfirmationMessageBox;

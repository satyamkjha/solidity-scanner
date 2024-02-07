import { Flex, Text } from "@chakra-ui/react";
import { sentenceCapitalize } from "helpers/helperFunction";
import React from "react";

const ConfirmationMessageBox: React.FC<{
  name: string;
  duration: string;
}> = ({ name, duration }) => {
  const getPlanDuration = () => {
    if ("on-demand-report" === duration) return "";
    else if ("publish_report" === duration) return "Self-Published Report";
    else if ("verified_publish_report" === duration) return "Verified Report";
    else if (duration !== "ondemand") return sentenceCapitalize(duration);
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
        You have currently selected the{" "}
        <span
          style={{
            fontWeight: 900,
          }}
        >
          <b>
            {!["publish_report", "verified_publish_report"].includes(
              duration
            ) && sentenceCapitalize(name)}{" "}
            {getPlanDuration()}
          </b>
        </span>
        plan sum of the charges will apply on your confirmation
      </Text>
    </Flex>
  );
};

export default ConfirmationMessageBox;

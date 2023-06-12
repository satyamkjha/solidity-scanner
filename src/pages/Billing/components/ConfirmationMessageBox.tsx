import { Flex, Text } from "@chakra-ui/react";
import { sentenceCapitalize } from "helpers/helperFunction";
import React from "react";

const ConfirmationMessageBox: React.FC<{
  name: string;
  duration: string;
}> = ({ name, duration }) => {
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
            {sentenceCapitalize(name)}{" "}
            {duration !== "ondemand" && sentenceCapitalize(duration)}{" "}
          </b>
        </span>
        plan sum of the charges will apply on your confirmation
      </Text>
    </Flex>
  );
};

export default ConfirmationMessageBox;

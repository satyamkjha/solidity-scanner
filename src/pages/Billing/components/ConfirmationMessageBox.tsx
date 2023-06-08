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
      mt={5}
    >
      <Text color="#4E5D78" fontWeight={300} fontSize={"sm"}>
        You have currently selected the{" "}
        <span
          style={{
            fontWeight: 900,
          }}
        >
          <b>
            {sentenceCapitalize(name)} {sentenceCapitalize(duration)}{" "}
          </b>
        </span>
        plan sum of the charges will apply on your conformation
      </Text>
    </Flex>
  );
};

export default ConfirmationMessageBox;

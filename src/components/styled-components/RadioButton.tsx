import React from "react";
import { Flex, Box } from "@chakra-ui/react";

const RadioButton: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <Flex
      w="18px"
      h="18px"
      backgroundColor="#EFEFEF"
      borderRadius="50%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        w="10px"
        h="10px"
        background={
          isActive
            ? "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
            : "#B0B7C3"
        }
        borderRadius="50%"
      ></Box>
    </Flex>
  );
};

export default RadioButton;

import React from "react";
import { Flex, Box } from "@chakra-ui/react";

const RadioButton: React.FC<{
  isActive: boolean;
  theme?: "dark" | "light";
}> = ({ isActive, theme = "light" }) => {
  return (
    <Flex
      w="18px"
      h="18px"
      backgroundColor={theme === "dark" ? "#595959" : "#EFEFEF"}
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
            : theme === "dark"
            ? "#B0B7C3"
            : "#B0B7C3"
        }
        borderRadius="50%"
      ></Box>
    </Flex>
  );
};

export default RadioButton;

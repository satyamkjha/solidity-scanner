import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Loader: React.FC<{
  width?: string;
  height?: string;
  size?: number;
  color?: string;
}> = ({ size = 40, color = "#52ff00", width, height }) => {
  const thickness = size <= 30 ? 2 : 3;
  return (
    <Flex
      w={width ? width : "auto"}
      h={height ? height : "auto"}
      justifyContent="center"
      alignItems="center"
      py={4}
    >
      <Box
        as={"span"}
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          display: "inline-block",
          borderTop: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid transparent`,
          boxSizing: "border-box",
          animation: "rotation 1s linear infinite",
        }}
      />
    </Flex>
  );
};

export default Loader;

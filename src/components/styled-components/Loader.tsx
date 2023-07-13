import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Loader: React.FC<{
  width?: string;
  height?: string;
  py?: number;
  size?: number;
  color?: string;
}> = ({ size = 40, color = "#52ff00", width, height, py = 4 }) => {
  const thickness = size <= 30 ? 2 : 3;
  return (
    <Flex
      w={width ? width : "auto"}
      h={height ? height : "auto"}
      justifyContent="center"
      alignItems="center"
      py={py}
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

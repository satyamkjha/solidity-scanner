import React from "react";
import { Box } from "@chakra-ui/react";

const Loader: React.FC<{
  size?: number;
  color?: string;
}> = ({ size = 40, color = "#52ff00" }) => {
  const thickness = size <= 30 ? 2 : 3;
  return (
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
  );
};

export default Loader;

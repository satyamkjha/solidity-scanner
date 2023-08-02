import React from "react";
import { Image } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";

const FormatOptionLabel: React.FC<{
  value: string;
  label: string;
  icon?: string;
}> = ({ value, label, icon }) => {
  const assetsURL = getAssetsURL();
  return (
    <div id={value} style={{ display: "flex", flexDirection: "row" }}>
      {icon && icon !== "" && (
        <Image
          h={"24px"}
          w={"24px"}
          mr={3}
          src={`${assetsURL}blockscan/${icon}.svg`}
        />
      )}
      <div>{label}</div>
    </div>
  );
};

export default FormatOptionLabel;

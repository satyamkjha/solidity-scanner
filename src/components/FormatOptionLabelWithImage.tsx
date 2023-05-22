import { Image } from "@chakra-ui/react";
import React from "react";
import { getAssetsURL } from "helpers/helperFunction";

const FormatOptionLabelWithImage: React.FC<{
  value: string;
  label: string;
  icon: string;
}> = ({ value, label, icon }) => {
  const assetsURL = getAssetsURL();

  return (
    <div id={value} style={{ display: "flex", flexDirection: "row" }}>
      {icon !== "" && <Image mr={3} src={`${assetsURL}icons/${icon}.svg`} />}
      <div>{label}</div>
    </div>
  );
};

export default FormatOptionLabelWithImage;

import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export default function ProductVideo() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Flex
      as="section"
      w="100%"
      my={0}
      textAlign={["center", "left"]}
      py={[5, 5, 10, 20]}
      px={[0, 0, 0, 24]}
      backgroundImage={`url(${assetsURL}background/pattern_mask.png)`}
      display={["flex"]}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        borderColor={"#3300FF"}
        width="100%"
        height={["180px", "260px", "340px", "450px", "580px", "650px"]}
        borderRadius={["5px"]}
      >
        <iframe
          style={{
            width: "100%",
            height: "100%",
          }}
          src="https://www.youtube.com/embed/psu3GTKS_us"
          title="SolidityScan by CredShields - Intro"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Box>
    </Flex>
  );
}

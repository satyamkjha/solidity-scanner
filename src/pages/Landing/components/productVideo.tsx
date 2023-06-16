import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export default function ProductVideo() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    setPlayVideo(false);
  }, []);

  return (
    <Flex
      as="section"
      w="100%"
      my={0}
      textAlign={["center", "left"]}
      py={[5, 5, 10, 20]}
      px={[0, 0, 0, 40]}
      display={["flex"]}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        position="relative"
        borderColor={"#3300FF"}
        paddingBottom={"56.2%"}
        w={"100%"}
        height={0}
        borderRadius={["5px"]}
        backgroundImage={`url(${assetsURL}background/yt_video_thumbnail.svg)`}
        backgroundPosition={"center"}
        backgroundSize={"contain"}
        cursor={"pointer"}
        overflow={"hidden"}
        onClick={() => setPlayVideo(true)}
      >
        {playVideo && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/psu3GTKS_us?autoplay=1&rel=0"
            title="SolidityScan by CredShields - Intro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        )}
      </Box>
    </Flex>
  );
}

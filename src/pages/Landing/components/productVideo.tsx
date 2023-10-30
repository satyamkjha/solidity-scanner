import React, { useState, useEffect, useRef } from "react";
import { Flex, Box, Skeleton } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { isInViewport } from "common/functions";

export default function ProductVideo() {
  const assetsURL = getAssetsURL();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    setPlayVideo(false);
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(70);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = document.getElementById("public_layout");
    if (element) {
      element.addEventListener("scroll", function (event) {
        if (isInViewport(ref.current, setAnimationOffset)) {
          setIsVisible(true);
        }
      });
    }

    return () => {
      element?.removeEventListener("scroll", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      as="section"
      w="100%"
      my={0}
      textAlign={["center", "left"]}
      py={[5, 5, 10, 20]}
      px={[5, 7, 20, 40]}
      h="fit-content"
      display={["flex"]}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      ref={ref}
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
        opacity={isVisible ? 1 : 0}
        transition="opacity 0.25s ease-in"
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

export function VideoSkeleton() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      py={[5, 5, 10, 20]}
      w="100%"
    >
      <Skeleton
        startColor="lightgray"
        endColor="#eeeeee"
        height={["180px", "260px", "340px", "450px", "580px", "650px"]}
        borderRadius={"5px"}
        w={"100%"}
        ml={[0, 0, 0, 10]}
      />
    </Flex>
  );
}

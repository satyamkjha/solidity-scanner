import React, { useState } from "react";
import { getFeatureGateConfig } from "helpers/helperFunction";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const TopBanner: React.FC = () => {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  return (
    <>
      {isBannerOpen && getFeatureGateConfig().top_banner_data.enabled && (
        <MotionFlex
          initial={{ height: 0 }}
          animate={{ height: "25px" }}
          sx={{
            w: "100%",
            justifyContent: "center",
            py: 1,
            bg: "brand-dark",
          }}
        >
          <HStack justifyContent="center" w="calc(100% - 30px)">
            {getFeatureGateConfig().top_banner_data.banner_data.first_col && (
              <Text
                cursor="pointer"
                fontSize="12px"
                color="white"
                onClick={() =>
                  window.open(
                    getFeatureGateConfig().top_banner_data.banner_data.first_col
                      .link,
                    "_blank"
                  )
                }
                fontWeight={700}
              >
                {
                  getFeatureGateConfig().top_banner_data.banner_data.first_col
                    .text
                }
              </Text>
            )}
            {getFeatureGateConfig().top_banner_data.banner_data.second_col &&
              getFeatureGateConfig().top_banner_data.banner_data.second_col
                .enabled && (
                <>
                  <Text fontSize="12px" color="white" fontWeight={700}>
                    |
                  </Text>
                  <Text
                    cursor="pointer"
                    fontSize="12px"
                    color="white"
                    fontWeight={700}
                    onClick={() =>
                      window.open(
                        getFeatureGateConfig().top_banner_data.banner_data
                          .second_col.link,
                        "_blank"
                      )
                    }
                  >
                    {
                      getFeatureGateConfig().top_banner_data.banner_data
                        .second_col.text
                    }
                  </Text>
                </>
              )}
          </HStack>
          <CloseIcon
            mr="10px"
            cursor="pointer"
            fontSize="13px"
            color="white"
            onClick={() => setIsBannerOpen(false)}
          />
        </MotionFlex>
      )}
    </>
  );
};

export default TopBanner;

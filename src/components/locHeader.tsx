import React, { useEffect, useState, useRef } from "react";
import {
  HStack,
  Image,
  Text,
  Box,
  VStack,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { Profile, PricingData } from "common/types";
import { useConfig } from "hooks/useConfig";
import { getAssetsURL } from "helpers/helperFunction";
import { useWebSocket } from "hooks/useWebhookData";
import { LOCInfoContainer } from "./locInfoContainer";
import { PlanDataContainer } from "./planDataContainer";

export const LOCHeader: React.FC<{
  profileData: Profile;
  pricingPlans: PricingData;
}> = ({ profileData, pricingPlans }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [credits, setCredits] = useState(profileData.credits);
  const { messageQueue, updateMessageQueue } = useWebSocket();

  useEffect(() => {
    if (profileData) {
      setCredits(profileData.credits);
    }
  }, [profileData]);

  useEffect(() => {
    if (
      messageQueue.length > 0 &&
      messageQueue.some(
        (msgItem: any) => msgItem && msgItem.type === "account_credits_update"
      )
    ) {
      messageQueue.forEach((msgItem: any) => {
        if (msgItem.type && msgItem.type === "account_credits_update") {
          setCredits(msgItem.payload.updated_credits);
        }
      });
      let tempMessageQueue = messageQueue.filter(
        (msgItem: any) => msgItem.type !== "account_credits_update"
      );
      updateMessageQueue(tempMessageQueue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageQueue]);

  if (profileData.credit_system === "loc")
    return (
      <Popover>
        <PopoverTrigger>
          <Box w="100%">
            <LOCInfoContainer view="header" profileData={profileData} />
          </Box>
        </PopoverTrigger>
        <PopoverContent w="400px" borderRadius={10}>
          <Box w="400px">
            <PlanDataContainer
              profileData={profileData}
              pricingPlans={pricingPlans}
            />
          </Box>
        </PopoverContent>
      </Popover>
    );
  else
    return (
      <HStack justifyContent="flex-start" alignItems="center">
        <Image src={`${assetsURL}pricing/coin.svg`} mx="auto" />
        <Text fontWeight={600} fontSize="2xl" ml={4}>
          {credits}
          <Box as="span" ml={2} color="subtle" fontSize="sm">
            Scan Credits
          </Box>
        </Text>
      </HStack>
    );
};

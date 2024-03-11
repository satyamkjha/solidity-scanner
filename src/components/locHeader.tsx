import React, { useEffect, useState } from "react";
import {
  HStack,
  Image,
  Text,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from "@chakra-ui/react";
import { Profile, PricingData } from "common/types";
import { getAssetsURL } from "helpers/helperFunction";
import { useWebSocket } from "hooks/useWebhookData";
import { LOCInfoContainer } from "./locInfoContainer";
import { PlanDataContainer } from "./planDataContainer";

export const LOCHeader: React.FC<{
  profileData: Profile;
  pricingPlans: PricingData;
}> = ({ profileData, pricingPlans }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const assetsURL = getAssetsURL();
  const [credits, setCredits] = useState(profileData.credits);
  const { messageQueue, updateMessageQueue } = useWebSocket();

  useEffect(() => {
    if (profileData) {
      if (profileData.credit_system === "loc") {
        setCredits(profileData.loc_remaining);
      } else setCredits(profileData.credits);
    }
  }, [profileData]);

  useEffect(() => {
    if (messageQueue.length > 0) {
      const messageType =
        profileData.credit_system === "loc"
          ? "account_loc_update"
          : "account_credits_update";
      const creditUpdateMessage = messageQueue.filter(
        (msgItem: any) => msgItem.type === messageType
      );
      if (creditUpdateMessage && creditUpdateMessage.length) {
        if (profileData.credit_system === "loc") {
          setCredits(creditUpdateMessage[0].payload.updated_loc);
        } else {
          setCredits(creditUpdateMessage[0].payload.updated_credits);
        }

        // remove message from queue after consuming the event
        let tempMessageQueue = messageQueue.filter(
          (msgItem: any) => msgItem.type !== messageType
        );
        updateMessageQueue(tempMessageQueue);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageQueue]);

  if (profileData.credit_system === "loc")
    return (
      <Popover onClose={onClose} isOpen={isOpen}>
        <PopoverTrigger>
          <Box w="100%" cursor="pointer" onClick={onToggle}>
            <LOCInfoContainer view="header" remainingLoc={credits} />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          sx={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.35) !important",
          }}
          w="400px"
          borderRadius={10}
        >
          <Box w="400px">
            <PlanDataContainer
              profileData={profileData}
              pricingPlans={pricingPlans}
              onPopoverClose={onClose}
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

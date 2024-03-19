import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { getAssetsURL } from "helpers/helperFunction";

const PricingPopover: React.FC<{
  item: any;
  mouseHover: boolean;
}> = ({ item, mouseHover }) => {
  const assetsURL = getAssetsURL();

  return (
    <Popover placement="right" isLazy>
      <PopoverTrigger>
        <InfoOutlineIcon
          ml={2}
          color={"#B0B7C3"}
          _hover={{
            color: "#3E15F4",
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        bg={"white"}
        boxShadow={"0px 4px 35px 0px #00000026"}
        border={"0.33px solid #FFFFFF"}
        borderRadius={8}
        p={4}
        _focus={{
          boxShadow: "0px 4px 35px 0px #00000026 !important",
        }}
      >
        <PopoverArrow />
        <PopoverHeader border={"none"}>
          <HStack
            width="100%"
            alignItems={"center"}
            justifyContent="flex-start"
            spacing={2}
          >
            <Image
              width="32px"
              height="32px"
              src={`${assetsURL}${item.icon}`}
            />
            <Text fontSize="15px" fontWeight={600}>
              {item.title}
            </Text>
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <Text fontSize="xs" fontWeight={400} color={"detail"}>
            {item.tooltipText}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PricingPopover;

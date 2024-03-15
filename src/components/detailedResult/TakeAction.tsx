import React from "react";
import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Button,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { actionTaken, issueActions } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";

export const TakeAction: React.FC<{
  markedAction: string;
  isDisabled: boolean;
  onBugSelect: any;
}> = ({ markedAction, isDisabled, onBugSelect }) => {
  const assetsURL = getAssetsURL();

  return (
    <Menu>
      <MenuButton
        as={Button}
        aria-label="Take Action"
        rightIcon={<ChevronDownIcon boxSize={6} />}
        bg={"#FAFBFC"}
        fontSize={"sm"}
        w={"200px"}
        textAlign={"left"}
        _active={{
          bg: "#FAFBFC",
        }}
        isDisabled={isDisabled}
      >
        {actionTaken[markedAction] || markedAction}
      </MenuButton>
      <MenuList
        border={"none"}
        boxShadow={"0px 3px 12px 0px #00000026 !important"}
        borderRadius={15}
      >
        {issueActions &&
          issueActions.map((item, index) => (
            <Tooltip
              label={"Action already marked!"}
              isDisabled={markedAction !== item.value}
              placement={"right-end"}
            >
              <Flex w={"100%"}>
                <MenuItem
                  key={index}
                  pl={6}
                  py={2.5}
                  isDisabled={markedAction === item.value}
                  onClick={() => onBugSelect(item)}
                >
                  <Image
                    h={"20px"}
                    w={"20px"}
                    mr={3}
                    src={`${assetsURL}${item.icon}.svg`}
                  />
                  <Text fontSize={"sm"} fontStyle={"italic"}>
                    {item.label}
                  </Text>
                </MenuItem>
              </Flex>
            </Tooltip>
          ))}
      </MenuList>
    </Menu>
  );
};

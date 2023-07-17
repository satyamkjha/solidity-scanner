import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Icon,
  VStack,
  useClipboard,
  Divider,
  Image,
  Link,
  useDisclosure,
  useToast,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
  CloseButton,
} from "@chakra-ui/react";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { HiDuplicate, HiOutlineCheck } from "react-icons/hi";
import { CheckIcon } from "@chakra-ui/icons";
import { getAssetsURL } from "helpers/helperFunction";
import ConfirmActionForm from "components/confirmActionForm";
import { useProfile } from "hooks/useProfile";
import { useConfig } from "hooks/useConfig";
import UpgradePackage from "components/upgradePackage";
import Loader from "components/styled-components/Loader";
import CreateOrganisationForm from "./CreateOrganisationForm";
import Select from "react-select";
import { customStylesForOrgRole } from "../../common/stylesForCustomSelect";
import FormatOptionLabelWithImage from "../../components/FormatOptionLabelWithImage";
import { userRolesList } from "../../common/values";

const InvitedMemberItem: React.FC<{
  user: string;
  role: "admin" | "reader" | "editor";
  removeUser: (userEmail: string) => Promise<void>;
  updateRole: (
    userEmail: string,
    userRole: "admin" | "reader" | "editor"
  ) => Promise<void>;
}> = ({ user, role, removeUser, updateRole }) => {
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);

  return (
    <Flex
      w="100%"
      h="60px"
      flexDir="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      px={7}
    >
      <Flex
        w="fit-content"
        h="fit-content"
        flexDir="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        {/* <Flex
          w="50px"
          h="50px"
          borderRadius={"40px"}
          justifyContent={"center"}
          alignItems={"center"}
          color={"#FFFFFF"}
          bgColor="#FFC887"
          mr={3}
        >
          S
        </Flex> */}
        <VStack
          w="fit-content"
          justifyContent={"flex-start"}
          spacing={0}
          alignItems={"flex-start"}
        >
          {/* <Text fontWeight={900}>Lydia Curtis</Text> */}
          <Text fontWeight={300} color="#8A94A6">
            {user}
          </Text>
        </VStack>
      </Flex>
      <Text
        fontSize={"sm"}
        py={2}
        px={4}
        borderRadius={5}
        borderColor="#"
        bgColor="#F4F4F4"
        color="#323B4B"
        fontWeight={500}
      >
        Added
      </Text>
      <HStack>
        <Select
          isSearchable={false}
          formatOptionLabel={FormatOptionLabelWithImage}
          value={userRolesList.find((item) => role === item.value)}
          options={userRolesList}
          styles={customStylesForOrgRole}
          onChange={(newValue) => {
            if (newValue) {
              updateRole(user, newValue.value);
            }
          }}
        />
        <CloseButton
          onClick={() => {
            removeUser(user);
          }}
        />
      </HStack>
    </Flex>
  );
};

export default InvitedMemberItem;

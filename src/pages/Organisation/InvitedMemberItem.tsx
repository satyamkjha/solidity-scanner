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
  useMediaQuery,
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
  const [isDesktopView] = useMediaQuery("(min-width: 950px)");

  return (
    <Flex
      w="95%"
      bgColor="white"
      h={isDesktopView ? "40px" : "fit-content"}
      flexDir={isDesktopView ? "row" : "column"}
      justifyContent={isDesktopView ? "space-between" : "flex-start"}
      alignItems={"center"}
      borderWidth={isDesktopView ? 0 : 1}
      borderRadius={10}
      borderColor={"#ECECEC"}
      px={7}
      mt={5}
      py={isDesktopView ? 0 : 5}
    >
      <Flex
        w="fit-content"
        h="fit-content"
        flexDir="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        {/* <Text fontWeight={900}>Lydia Curtis</Text> */}
        <Text fontWeight={300} color="#8A94A6">
          {user}
        </Text>
      </Flex>
      <Flex
        flexDir={isDesktopView ? "row" : "column"}
        justifyContent={isDesktopView ? "flex-end" : "flex-start"}
        alignItems={"center"}
        mt={isDesktopView ? 0 : 4}
      >
        <Text
          fontSize={"sm"}
          py={2}
          px={4}
          borderRadius={5}
          borderColor="#"
          bgColor="#F4F4F4"
          color="#323B4B"
          fontWeight={500}
          mb={isDesktopView ? 0 : 3}
          mr={isDesktopView ? 7 : 0}
        >
          Added
        </Text>
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
        {isDesktopView && (
          <CloseButton
            ml={isDesktopView ? 4 : 0}
            onClick={() => {
              removeUser(user);
            }}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default InvitedMemberItem;

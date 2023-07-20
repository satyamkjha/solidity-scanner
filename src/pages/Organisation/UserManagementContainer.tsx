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
  useMediaQuery,
  TabPanel,
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
import NoOrgView from "./NoOrgView";
import OrganisationMemberList from "./OrganisationMemberList";
import { useUserOrgProfile } from "hooks/useUserOrgProfile";
import { useOrgUsersList } from "hooks/useOrgUsersList";

const UserManagementContainer: React.FC<{
  hasAccess: boolean;
  organizations: any[];
}> = ({ hasAccess, organizations }) => {
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);

  const [isDesktopView] = useMediaQuery("(min-width: 950px)");

  return (
    <Flex
      bgColor={isDesktopView ? "white" : "bg.subtle"}
      w="100%"
      h={"80vh"}
      borderRadius={10}
      my={6}
      pb={6}
      flexDir="column"
    >
      {organizations.length > 0 ? (
        <OrganisationMemberList hasAccess={hasAccess} />
      ) : (
        <NoOrgView hasAccess={hasAccess} />
      )}
    </Flex>
  );
};

export default UserManagementContainer;

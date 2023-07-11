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

const UserManagementContainer: React.FC<{
  hasAccess: boolean;
}> = ({ hasAccess }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);

  const [orgData, setOrgData] = useState(true);

  console.log(hasAccess);

  return (
    <Flex
      bgColor={["bg.subtle", "bg.subtle", "bg.subtle", "white"]}
      w="100%"
      h={"70vh"}
      borderRadius={"5px"}
      my={6}
      pb={6}
      flexDir="column"
    >
      {orgData ? (
        <OrganisationMemberList hasAccess={hasAccess} />
      ) : (
        <NoOrgView hasAccess={hasAccess} />
      )}
    </Flex>
  );
};

export default UserManagementContainer;

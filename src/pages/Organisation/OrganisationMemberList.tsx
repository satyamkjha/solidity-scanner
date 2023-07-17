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
import TeamMemberItem from "./TeamMemberItem";
import InviteMemberForm from "./InviteMemberForm";
import { useOrgUsersList } from "hooks/useOrgUsersList";

const OrganisationMemberList: React.FC<{
  hasAccess: boolean;
}> = ({ hasAccess }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);
  const toast = useToast();
  const [orgData, setOrgData] = useState(true);
  const { data } = useOrgUsersList();

  const userList = [];

  const removeOrganisationUserRequest = async () => {
    try {
      const { data } = await API.post(API_PATH.API_REMOVE_ORGANISATION_USERS, {
        users: userList,
      });
      if (data.status === "success") {
        toast({
          title: data.message,
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: data.message,
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateOrganisationUserRolesRequest = async () => {
    try {
      const { data } = await API.post(
        API_PATH.API_UPDATE_ORGANISATION_USERS_ROLE,
        {
          users: userList,
        }
      );
      if (data.status === "success") {
        toast({
          title: data.message,
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: data.message,
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Flex
        p={6}
        w="100%"
        align="center"
        flexDir={"row"}
        justifyContent={"space-between"}
      >
        <Flex
          bgColor={"white"}
          flexDir={"column"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          w={["100%", "100%", "100%", "fit-content"]}
        >
          <Text fontWeight={500} fontSize={"lg"}>
            Polygon Compound Team
          </Text>
          <Flex
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            flexDir={"row"}
            mt={2}
          >
            <Text fontWeight={700} fontSize={"sm"} mr={2}>
              Total
            </Text>
            <Text fontWeight={700} fontSize={"sm"} mr={2} color="#3300FF">
              07 Members
            </Text>
            <Text fontWeight={700} fontSize={"sm"} mr={2} color="#B0B7C3">
              | Created on 23 May 2023
            </Text>
          </Flex>
        </Flex>
        <Button
          onClick={onOpen}
          variant={"cta-outline"}
          borderWidth={"1px"}
          fontWeight={500}
          px={10}
          py={2}
          ml={[0, 0, 0, "auto"]}
          isDisabled={!hasAccess}
        >
          {"+  Invite Member"}
        </Button>
      </Flex>
      <Flex
        w="100%"
        h="100%"
        flexDir="column"
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <TeamMemberItem />
        <TeamMemberItem />
        <TeamMemberItem />
        <TeamMemberItem />
        <TeamMemberItem />
      </Flex>
      <InviteMemberForm isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default OrganisationMemberList;

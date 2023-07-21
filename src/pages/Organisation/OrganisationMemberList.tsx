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
  useMediaQuery,
  HStack,
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
import InviteMemberForm from "./InviteMemberForm";
import { useOrgUsersList } from "hooks/useOrgUsersList";
import TeamMemberItem from "./TeamMemberItem";
import { UserOrgItem } from "common/types";
import { useUserOrgProfile } from "hooks/useUserOrgProfile";
import { monthNames } from "common/values";

const OrganisationMemberList: React.FC<{
  hasAccess: boolean;
}> = ({ hasAccess }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);
  const toast = useToast();
  const [orgData, setOrgData] = useState(true);
  const { data: orgUserList, refetch: refetchOrgUserList } = useOrgUsersList();
  const { data: orgProfile } = useUserOrgProfile();
  const [count, setCount] = useState(0);

  let d = new Date();

  useEffect(() => {
    if (orgProfile) {
      d = new Date(orgProfile.user_organization.joined_at);
    }
  }, [orgProfile]);

  useEffect(() => {
    if (orgUserList) {
      setUserList(orgUserList.users);
      setCount(orgUserList.count);
    }
  }, [orgUserList]);

  const [userList, setUserList] = useState<UserOrgItem[]>([]);

  const removeOrganisationUserRequest = async (email: string) => {
    const removeUserList = [
      {
        user: email,
      },
    ];
    try {
      const { data } = await API.delete(
        API_PATH.API_REMOVE_ORGANISATION_USERS,
        {
          data: {
            users: removeUserList,
          },
        }
      );
      if (data.status === "success") {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setUserList(
          userList.filter((userItem) => {
            if (userItem.email === email) return false;
            else return true;
          })
        );
        setCount(count - 1);
      } else {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateOrganisationUserRolesRequest = async (
    email: string,
    role: "admin" | "editor" | "viewer"
  ) => {
    try {
      const { data } = await API.put(
        API_PATH.API_UPDATE_ORGANISATION_USERS_ROLE,
        {
          users: [
            {
              user: email,
              role: role,
            },
          ],
        }
      );
      if (data.status === "success") {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setUserList(
          userList.map((userItem) => {
            if (userItem.email === email) return { ...userItem, role: role };
            else return userItem;
          })
        );
      } else {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [isDesktopView] = useMediaQuery("(min-width: 950px)");

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
        flexDir={isDesktopView ? "row" : "column"}
        justifyContent={isDesktopView ? "space-between" : "flex-start"}
      >
        <Flex
          flexDir={"column"}
          justifyContent={"flex-start"}
          alignItems={isDesktopView ? "flex-start" : "center"}
          w={["100%", "100%", "100%", "fit-content"]}
          mb={isDesktopView ? 0 : 5}
        >
          <Text fontWeight={500} fontSize={"lg"}>
            {orgProfile?.user_organization.org_name}
          </Text>
          <Flex
            justifyContent={"flex-start"}
            alignItems={isDesktopView ? "flex-start" : "center"}
            flexDir={isDesktopView ? "row" : "column"}
            mt={2}
            textAlign={isDesktopView ? "left" : "center"}
          >
            <HStack mr={2}>
              <Text fontWeight={700} fontSize={"sm"}>
                Total
              </Text>
              <Text fontWeight={700} fontSize={"sm"} color="#3300FF">
                {count} Members
              </Text>
            </HStack>
            <Text fontWeight={700} fontSize={"sm"} color="#B0B7C3">
              {isDesktopView ? "|" : ""}{" "}
              {`Created at ${d.getDate()} ${
                monthNames[d.getMonth()]
              } ${d.getFullYear()}`}
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
        h="70vh"
        flexDir="column"
        justifyContent={"flex-start"}
        alignItems={"center"}
        overflowY="scroll"
      >
        <Flex
          w="100%"
          h="fit-content"
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {userList.map((userItem) => {
            if (userItem.role !== "owner")
              return (
                <TeamMemberItem
                  removeOrganisationUserRequest={removeOrganisationUserRequest}
                  updateOrganisationUserRolesRequest={
                    updateOrganisationUserRolesRequest
                  }
                  userItem={userItem}
                />
              );
          })}
        </Flex>
      </Flex>
      <InviteMemberForm
        isOpen={isOpen}
        onClose={onClose}
        refetchOrgUserList={refetchOrgUserList}
      />
    </Flex>
  );
};

export default OrganisationMemberList;

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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";
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
  user_organization: {
    joined_at: string;
    name: string;
    org_name: string;
    role: string;
    status: string;
  };
}> = ({ hasAccess, user_organization }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);
  const toast = useToast();
  const { data: orgUserList, refetch: refetchOrgUserList } = useOrgUsersList(
    user_organization.status === "joined"
  );
  const [count, setCount] = useState(0);

  let d = new Date();

  useEffect(() => {
    if (user_organization) {
      d = new Date(user_organization.joined_at);
    }
  }, [user_organization]);

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
            {user_organization.org_name}
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
        <HStack>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <InfoIcon color="#d7cdfa" />
            </PopoverTrigger>
            <PopoverContent p={3}>
              <PopoverArrow />
              <PopoverCloseButton />

              <PopoverBody>
                <Text
                  fontSize="sm"
                  textAlign="left"
                  lineHeight="title"
                  fontWeight={"300"}
                  mb={0}
                >
                  You can assign specific roles to users based on their
                  responsibilities and authorization needs. Each role is
                  associated with a set of permissions, defining what actions
                  users with that role can perform. To get a detailed
                  information about the permissions that come with each role,
                  Click on
                  <span>
                    <Link
                      ml={2}
                      color="#3300FF"
                      href="https://docs.solidityscan.com/"
                      isExternal
                    >
                      Learn More
                    </Link>
                  </span>
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button
            onClick={onOpen}
            variant={"cta-outline"}
            borderWidth={"1px"}
            fontWeight={500}
            _hover={{
              color: "#3300FF",
            }}
            px={10}
            py={2}
            ml={[0, 0, 0, "auto"]}
            isDisabled={!hasAccess || user_organization.status === "requested"}
          >
            {"+  Invite Member"}
          </Button>
        </HStack>
      </Flex>
      {user_organization.status === "joined" ? (
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
                    removeOrganisationUserRequest={
                      removeOrganisationUserRequest
                    }
                    updateOrganisationUserRolesRequest={
                      updateOrganisationUserRolesRequest
                    }
                    userItem={userItem}
                  />
                );
            })}
          </Flex>
        </Flex>
      ) : (
        <VStack w="100%" spacing={4} my={6} opacity={hasAccess ? 1 : 0.5}>
          <Image
            src={assetsUrl + "background/organisation_requested.svg"}
            h={"250px"}
            mb={2}
          />
          <Text fontWeight={400} maxW="600px" textAlign="center">
            Please wait till your request gets confirmed by our Team. Once
            confirmed you’ll be able to add users to your organisations and
            start assigning roles.
          </Text>
        </VStack>
      )}

      <InviteMemberForm
        isOpen={isOpen}
        onClose={onClose}
        refetchOrgUserList={refetchOrgUserList}
      />
    </Flex>
  );
};

export default OrganisationMemberList;

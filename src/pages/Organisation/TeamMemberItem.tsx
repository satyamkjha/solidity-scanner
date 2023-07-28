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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
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
import { UserOrgItem } from "common/types";
import { User } from "components/icons";
import { monthNames } from "common/values";
import { BsThreeDotsVertical } from "react-icons/bs";

const TeamMemberItem: React.FC<{
  userItem: UserOrgItem;
  removeOrganisationUserRequest: (email: string) => Promise<void>;
  updateOrganisationUserRolesRequest: (
    email: string,
    role: string
  ) => Promise<void>;
}> = ({
  userItem,
  removeOrganisationUserRequest,
  updateOrganisationUserRolesRequest,
}) => {
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);
  const [hover, setHover] = useState(false);

  let d = new Date(userItem.joined_at);

  const [isDesktopView] = useMediaQuery("(min-width: 950px)");

  return (
    <Flex
      w="100%"
      h={isDesktopView ? "90px" : "fit-content"}
      flexDir={isDesktopView ? "row" : "column"}
      justifyContent={isDesktopView ? "space-between" : "flex-start"}
      alignItems={"center"}
      bgColor="white"
      borderWidth={isDesktopView ? 0 : 1}
      borderRadius={10}
      borderTopWidth={1}
      borderColor={"#ECECEC"}
      py={isDesktopView ? 0 : 5}
      px={7}
      mb={isDesktopView ? 0 : 3}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Flex
        w={isDesktopView ? "fit-content" : "100%"}
        h="fit-content"
        flexDir={isDesktopView ? "row" : "column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        {isDesktopView && (
          <>
            {userItem.name.length > 0 ? (
              <Flex
                w="50px"
                h="50px"
                borderRadius={"40px"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"#FFFFFF"}
                bgColor="#FFC887"
                mr={3}
                fontSize={"25px"}
              >
                {userItem.name[0].toUpperCase()}
              </Flex>
            ) : (
              <Flex
                w="50px"
                h="50px"
                justifyContent={"center"}
                alignItems={"center"}
                mr={3}
              >
                <User size={50} />
              </Flex>
            )}
          </>
        )}

        {!isDesktopView && (
          <HStack w="100%" justifyContent="space-between">
            <Flex
              w="5px"
              h="5px"
              borderRadius={"40px"}
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
              fontSize={"25px"}
            >
              {" "}
            </Flex>
            {userItem.name.length > 0 ? (
              <Flex
                w="50px"
                h="50px"
                borderRadius={"40px"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"#FFFFFF"}
                bgColor="#FFC887"
                mr={3}
                fontSize={"25px"}
              >
                {userItem.name[0].toUpperCase()}
              </Flex>
            ) : (
              <Flex
                w="50px"
                h="50px"
                justifyContent={"center"}
                alignItems={"center"}
                mr={3}
              >
                <User size={50} />
              </Flex>
            )}
            <Menu placement={"bottom-end"}>
              <MenuButton
                zIndex={10}
                ml={"10px"}
                as={IconButton}
                backgroundColor="#FFFFFF"
                _hover={{ backgroundColor: "#FFFFFF" }}
                _active={{ backgroundColor: "#FFFFFF" }}
                icon={<BsThreeDotsVertical />}
                w={5}
                minW={5}
                aria-label="Options"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <MenuList
                sx={{
                  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                <MenuItem
                  _focus={{ backgroundColor: "#FFFFFF" }}
                  _hover={{ backgroundColor: "#FFFFFF" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOrganisationUserRequest(userItem.email);
                  }}
                >
                  Delete User
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}

        <VStack
          w="fit-content"
          justifyContent={"flex-start"}
          spacing={0}
          alignItems={isDesktopView ? "flex-start" : "center"}
          textAlign={isDesktopView ? "left" : "center"}
        >
          <Text fontWeight={900}>{userItem.name}</Text>
          <Text fontWeight={300} color="#8A94A6">
            {userItem.email}
          </Text>
        </VStack>
      </Flex>
      <Flex
        flexDir={isDesktopView ? "row" : "column"}
        justifyContent={isDesktopView ? "flex-end" : "flex-start"}
        alignItems={"center"}
        pr={isDesktopView ? (hover ? 0 : "30px") : 0}
        mt={isDesktopView ? 0 : 4}
      >
        {userItem.status === "joined" && (
          <Text
            fontSize={"md"}
            fontWeight={700}
            mb={isDesktopView ? 0 : 3}
            mr={isDesktopView ? 7 : 0}
          >
            {`Joined at ${d.getDate()} ${
              monthNames[d.getMonth()]
            } ${d.getFullYear()}`}
          </Text>
        )}
        {userItem.status === "requested" && (
          <Text
            fontSize={"sm"}
            py={2}
            px={4}
            w="fit-content"
            h="fit-content"
            borderRadius={5}
            borderColor="#"
            bgColor="#F4F4F4"
            color="#323B4B"
            fontWeight={500}
            mr={isDesktopView ? 7 : 0}
            mb={isDesktopView ? 0 : 3}
          >
            Requested
          </Text>
        )}

        {userItem.role ? (
          <Select
            formatOptionLabel={FormatOptionLabelWithImage}
            options={userRolesList}
            value={userRolesList.find((item) => userItem.role === item.value)}
            isSearchable={false}
            placeholder="Select Action"
            styles={customStylesForOrgRole}
            onChange={(newValue) => {
              if (newValue) {
                updateOrganisationUserRolesRequest(
                  userItem.email,
                  newValue.value
                );
              }
            }}
          />
        ) : (
          isDesktopView && (
            <Flex
              w="155px"
              h="20px"
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
            ></Flex>
          )
        )}
        {hover && isDesktopView && (
          <Menu placement={"bottom-end"}>
            <MenuButton
              zIndex={10}
              ml={"10px"}
              as={IconButton}
              backgroundColor="#FFFFFF"
              _hover={{ backgroundColor: "#FFFFFF" }}
              _active={{ backgroundColor: "#FFFFFF" }}
              icon={<BsThreeDotsVertical />}
              w={5}
              minW={5}
              aria-label="Options"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            <MenuList
              sx={{
                boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
              }}
            >
              <MenuItem
                _focus={{ backgroundColor: "#FFFFFF" }}
                _hover={{ backgroundColor: "#FFFFFF" }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeOrganisationUserRequest(userItem.email);
                }}
              >
                Delete User
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};

export default TeamMemberItem;

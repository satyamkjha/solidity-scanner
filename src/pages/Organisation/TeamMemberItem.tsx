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
import Select from "react-select";
import { customStylesForOrgRole } from "../../common/stylesForCustomSelect";
import FormatOptionLabelWithImage from "../../components/FormatOptionLabelWithImage";
import { issueActions } from "../../common/values";

const TeamMemberItem: React.FC<{}> = () => {
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);

  return (
    <Flex
      w="100%"
      h="90px"
      flexDir="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      borderTopWidth={1}
      borderColor={"#ECECEC"}
      px={7}
    >
      <Flex
        w="fit-content"
        h="fit-content"
        flexDir="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Flex
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
        </Flex>
        <VStack
          w="fit-content"
          justifyContent={"flex-start"}
          spacing={0}
          alignItems={"flex-start"}
        >
          <Text fontWeight={900}>Lydia Curtis</Text>
          <Text fontWeight={300} color="#8A94A6">
            lydiacurtis@gmail.com
          </Text>
        </VStack>
      </Flex>
      <Text fontSize={"md"} fontWeight={700}>
        Joined 28 June 2023
      </Text>
      <Select
        formatOptionLabel={FormatOptionLabelWithImage}
        options={issueActions}
        placeholder="Select Action"
        styles={customStylesForOrgRole}
        onChange={(newValue) => {}}
      />
    </Flex>
  );
};

export default TeamMemberItem;

import React from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import Select from "react-select";
import { customStylesForOrgRole } from "../../common/stylesForCustomSelect";
import FormatOptionLabelWithImage from "../../components/FormatOptionLabelWithImage";
import { issueActions } from "../../common/values";

const OrganisationListItem: React.FC<{}> = () => {
  return (
    <Flex
      w="100%"
      h="90px"
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

export default OrganisationListItem;

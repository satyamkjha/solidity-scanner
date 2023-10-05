import React from "react";
import { Flex } from "@chakra-ui/react";
import OrganisationListItem from "./OrganisationListItem";

const OrganisationSettingsContainer: React.FC<{}> = () => {
  return (
    <Flex
      bgColor={["bg.subtle", "bg.subtle", "bg.subtle", "bg.subtle"]}
      w="100%"
      h={"70vh"}
      borderRadius={"5px"}
      my={6}
      pb={6}
      flexDir="column"
    >
      <OrganisationListItem />
      <OrganisationListItem />
      <OrganisationListItem />
      <OrganisationListItem />
      <OrganisationListItem />
    </Flex>
  );
};

export default OrganisationSettingsContainer;

import React from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import NoOrgView from "./NoOrgView";
import OrganisationMemberList from "./OrganisationMemberList";
import { useUserOrgProfile } from "hooks/useUserOrgProfile";

const UserManagementContainer: React.FC<{
  hasAccess: boolean;
}> = ({ hasAccess }) => {
  const [isDesktopView] = useMediaQuery("(min-width: 950px)");
  const { data: orgProfile, refetch } = useUserOrgProfile(true);

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
      {orgProfile && (
        <>
          {orgProfile.user_organization ? (
            <OrganisationMemberList
              hasAccess={hasAccess}
              user_organization={orgProfile.user_organization}
            />
          ) : (
            <NoOrgView hasAccess={hasAccess} refetch={refetch} />
          )}
        </>
      )}
    </Flex>
  );
};

export default UserManagementContainer;

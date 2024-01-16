import { useEffect, useState, useContext } from "react";
import { useProfile } from "./useProfile";
import { useUserOrgProfile } from "./useUserOrgProfile";
import { UserRoleContext } from "common/contexts";

export const useUserRole = () => {
  return useContext(UserRoleContext);
};

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState("owner");
  const [isLoading, setIsLoading] = useState(true);
  const { data: profileData } = useProfile(true);
  const { data: orgProfile } = useUserOrgProfile(
    profileData?.logged_in_via === "org_login"
  );

  useEffect(() => {
    if (profileData) {
      setIsLoading(false);
      if (profileData.logged_in_via === "org_login" && orgProfile) {
        setRole(orgProfile.user_organization.role);
      }
    } else {
      setIsLoading(true);
    }
  }, [profileData, orgProfile]);

  if (isLoading) {
    return <></>;
  }

  return (
    <UserRoleContext.Provider value={{ role, profileData }}>
      {children}
    </UserRoleContext.Provider>
  );
};

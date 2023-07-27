import { useEffect, useState, createContext, useContext } from "react";
import { useProfile } from "./useProfile";
import { useUserOrgProfile } from "./useUserOrgProfile";

export const UserRoleContext = createContext("owner");

export const useUserRole = () => {
  return useContext(UserRoleContext);
};

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState("owner");
  const [isLoading, setIsLoading] = useState(true);
  const { data: profileData } = useProfile();
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
    <UserRoleContext.Provider value={role}>{children}</UserRoleContext.Provider>
  );
};

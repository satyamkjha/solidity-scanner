import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getUserOrgProfile = async () => {
  const { data } = await API.get<{
    status: "success";
    user_organization?: {
      role: "owner" | "admin" | "editor" | "viewer";
      org_name: string;
      joined_at: string;
      name: string;
      status: string;
    };
    messgae?: string;
  }>(API_PATH.API_GET_USER_ORGANISATION_PROFILE);
  return data;
};

export const useUserOrgProfile = (startQuery: boolean) => {
  return useQuery(["org_list"], () => getUserOrgProfile(), {
    enabled: startQuery,
  });
};

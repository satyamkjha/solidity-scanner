import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { UserOrgItem } from "common/types";

export const getOrgUsersList = async () => {
  const { data } = await API.get<{
    count: number;
    status: string;
    users: UserOrgItem[];
  }>(API_PATH.API_LIST_ORGANISATION_USERS);
  return data;
};

export const useOrgUsersList = (startQuery: boolean) => {
  return useQuery(["org_users_list"], () => getOrgUsersList(), {
    enabled: startQuery,
  });
};

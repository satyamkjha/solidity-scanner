import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getOrgUsersList = async () => {
  const { data } = await API.get<{}>(API_PATH.API_LIST_ORGANISATION_USERS);
  return data;
};

export const useOrgUsersList = () => {
  return useQuery(["org_users_list"], () => getOrgUsersList());
};

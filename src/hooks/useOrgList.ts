import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getOrgList = async () => {
  const { data } = await API.get<{}>(API_PATH.API_GET_USER_ORGANISATIONS);
  return data;
};

export const useOrgList = () => {
  return useQuery(["org_list"], () => getOrgList());
};

import { useQuery } from "react-query";
import API from "helpers/api";

import { API_PATH } from "helpers/routeManager";

const getOrgProfile = async (org_name: string) => {
  const { data } = await API.post<{
    org_name: string;
    user_count: number;
    created_at: string;
  }>(API_PATH.API_GET_ORGANISATION_PROFILE, {
    org_name,
  });
  return data;
};

export const useOrgProfile = (org_name: string) => {
  return useQuery(["projects", org_name], () => getOrgProfile(org_name));
};

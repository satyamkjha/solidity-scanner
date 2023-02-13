import { useQuery } from "react-query";
import API from "helpers/api";
import { Overview } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getOverview = async () => {
  const { data } = await API.get(API_PATH.API_GET_USER_OVERVIEW);
  return data;
};

export const useOverview = () => {
  return useQuery<{ overview: Overview }>("overview", getOverview);
};

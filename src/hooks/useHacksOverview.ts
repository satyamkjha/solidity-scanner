import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getOverview = async () => {
  const { data } = await API.get(`${API_PATH.API_GET_ATTACKS_OVERVIEW}`);
  return data;
};

export const useHacksOverview = () => {
  return useQuery("hacks_overview", getOverview);
};

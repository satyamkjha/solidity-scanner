import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getRecentQs = async () => {
  const { data } = await API.get(API_PATH.API_GET_LATEST_QS);
  return data;
};

export const useRecentQuickScans = () => {
  return useQuery("blocks", getRecentQs);
};

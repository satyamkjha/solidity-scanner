import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getRecentQs = async (ref: string | null) => {
  const { data } = await API.get(`${API_PATH.API_GET_LATEST_QS}?ref=${ref}`);
  return data;
};

export const useRecentQuickScans = (ref: string | null) => {
  return useQuery(["recent_qs", ref], () => getRecentQs(ref));
};

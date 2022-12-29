import { useQuery } from "react-query";
import API from "helpers/api";

const getRecentQs = async () => {
  const { data } = await API.get("/api-latest-qs");
  return data;
};

export const useRecentQuickScans = () => {
  return useQuery("blocks", getRecentQs);
};
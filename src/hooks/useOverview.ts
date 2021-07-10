import { useQuery } from "react-query";
import API from "helpers/api";
import { Overview } from "common/types";

const getOverview = async () => {
  const { data } = await API.get("/api-get-user-overview/");
  return data;
};

export const useOverview = () => {
  return useQuery<{ overview: Overview }>("overview", getOverview);
};

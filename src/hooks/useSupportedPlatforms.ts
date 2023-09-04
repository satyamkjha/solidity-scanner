import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getSupportedChains = async () => {
  const { data } = await API.get(API_PATH.API_GET_SUPPORTED_CHAINS);
  return data;
};

export const useSupportedChains = () => {
  return useQuery<{ [key: string]: string[] }>("supported_chains", () =>
    getSupportedChains()
  );
};

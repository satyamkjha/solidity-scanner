import { useQuery } from "react-query";
import API from "../helpers/api";
import { API_PATH } from "../helpers/routeManager";

const getPlatformChainStatus = async () => {
  const { data } = await API.get(API_PATH.API_GET_PLATFORM_CHAINS_STATUS);
  return data;
};

export const usePlatformChainStatus = () => {
  return useQuery<{ [key: string]: { [key: string]: string } }>(
    "platform_chain_status",
    () => getPlatformChainStatus()
  );
};

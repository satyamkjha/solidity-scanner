import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getAcceptedCoins = async () => {
  const { data } = await API.get<{
    [key: string]: {
      name: string;
    };
  }>(API_PATH.API_GET_ACCEPTED_COINS);
  return data;
};

export const useAcceptedCoins = () => {
  return useQuery("acceptedCoins", getAcceptedCoins);
};

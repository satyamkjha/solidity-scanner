import { useQuery } from "react-query";
import API from "helpers/api";

const getAcceptedCoins = async () => {
  const { data } = await API.get<{
    [key: string]: {
      name: string;
      rate_individual: string;
      rate_enterprise: string;
    };
  }>("/api-get-accepted-coins/");
  return data;
};

export const useAcceptedCoins = () => {
  return useQuery("acceptedCoins", getAcceptedCoins);
};

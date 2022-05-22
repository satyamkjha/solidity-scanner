import { useQuery } from "react-query";
import API from "helpers/api";

const getAcceptedCoins = async () => {
  const { data } = await API.get<{
    [key: string]: {
      name: string;
      monthly: {
        [plan: string]: string;
      };
      ondemand: {
        [plan: string]: string;
      };
    };
  }>("/api-get-accepted-coins/");
  return data;
};

export const useAcceptedCoins = () => {
  return useQuery("acceptedCoins", getAcceptedCoins);
};

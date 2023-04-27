import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getAccessKey = async () => {
  const { data } = await API.get(API_PATH.API_GET_ACCESS_KEY);
  return data;
};

export const useAccessKey = () => {
  return useQuery("accessKey", getAccessKey);
};

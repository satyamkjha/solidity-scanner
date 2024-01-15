import { useQuery } from "react-query";
import API from "helpers/api";
import { Profile } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getProfile = async () => {
  const { data } = await API.get(API_PATH.API_PROFILE);
  return data;
};

export const useProfile = (startScan: boolean) => {
  return useQuery<Profile>("profile", () => getProfile(), {
    enabled: startScan,
  });
};

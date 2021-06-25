import { useQuery } from "react-query";
import API from "helpers/api";
import { Profile } from "common/types";

const getProfile = async () => {
  const { data } = await API.get("/api-profile/");
  return data;
};

export const useProfile = () => {
  return useQuery<Profile>("profile", () => getProfile());
};

import { useQuery } from "react-query";
import API from "helpers/api";

import { Scan } from "common/types";

const getScans = async () => {
  const { data } = await API.get("/api-get-task-status");
  return data;
};

export const useScans = () => {
  return useQuery<{ scans: Scan[] }>("scans", getScans);
};

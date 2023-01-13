import { useQuery } from "react-query";
import API from "helpers/api";

import { Scan } from "common/types";

const getBlocks = async () => {
  const { data } = await API.get<{ scans: Scan[] }>("/api-get-task-status/");
  return { scans: data.scans.filter(({ scan_type }) => scan_type === "block") };
};

export const useBlocks = () => {
  return useQuery("blocks", getBlocks);
};

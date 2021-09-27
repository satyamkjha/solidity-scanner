import { useQuery } from "react-query";
import API from "helpers/api";

import { ScanMeta } from "common/types";

const getScans = async (project_id: string) => {
  const { data } = await API.post<{
    scans_remaining: number;
    scans: ScanMeta[];
  }>("/api-get-scans/", {
    project_id,
  });
  return data;
};

export const useScans = (project_id: string) => {
  return useQuery(["scans", project_id], () => getScans(project_id));
};

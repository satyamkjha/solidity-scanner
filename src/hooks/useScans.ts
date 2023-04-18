import { useQuery } from "react-query";
import API from "helpers/api";

import { ScanMeta } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getScans = async (project_id: string) => {
  const { data } = await API.post<{
    scans_remaining: number;
    project_id: string;
    project_name: string;
    project_url: string;
    project_branch?: string;
    scans: ScanMeta[];
  }>(API_PATH.API_GET_SCANS, {
    project_id,
  });
  return data;
};

export const useScans = (project_id: string) => {
  return useQuery(["scans", project_id], () => getScans(project_id));
};

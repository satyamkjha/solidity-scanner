import { useQuery } from "react-query";

import API from "helpers/api";

import { Scan } from "common/types";
import { API_PATH } from "helpers/routeManager";

export const getScan = async (scan_id: string) => {
  const { data } = await API.post<{
    scan_report: Scan;
    is_latest_scan: boolean;
    webhook_enabled?: boolean;
  }>(API_PATH.API_GET_SCAN_DETAILS, { scan_id });
  return data;
};

export const useScan = (scan_id: string) => {
  return useQuery(["scan_detail", scan_id], () => getScan(scan_id));
};

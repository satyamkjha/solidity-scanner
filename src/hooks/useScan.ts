import { useQuery } from "react-query";

import API from "helpers/api";

import { Scan, ScanDetail } from "common/types";

const getScan = async (scan_id: string) => {
  const { data } = await API.post<{ scan_report: Scan }>(
    "/api-get-scan-details/",
    { scan_id }
  );
  return data;
};

const getBetaScan = async (scan_id: string) => {
  const { data } = await API.post<{
    issues: ScanDetail[];
    beta_scan_status: string;
  }>("/api-get-scan-details-beta/", { scan_id });
  return data;
};

export const useScan = (scan_id: string) => {
  return useQuery(["scan_detail", scan_id], () => getScan(scan_id));
};

export const useBetaScan = (scan_id: string) => {
  return useQuery(["beta_scan_detail", scan_id], () => getBetaScan(scan_id));
};

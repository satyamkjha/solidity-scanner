import { useQuery } from "react-query";

import API from "helpers/api";

import { Scan } from "common/types";

const getScan = async (scan_id: string) => {
  const { data } = await API.post("/api-get-scan-details/", { scan_id });
  return data;
};

export const useScan = (scan_id: string) => {
  return useQuery<{ scan_report: Scan }>(["scan_detail", scan_id], () =>
    getScan(scan_id)
  );
};

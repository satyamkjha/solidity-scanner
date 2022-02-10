import { useQuery } from "react-query";

import API from "helpers/api";
import { Report } from "common/types";

const getReport = async (scan_id: string) => {
  const { data } = await API.post<{ summary_report: Report }>(
    "/api-get-report/",
    {
      scan_id,
    }
  );
  return data;
};

export const useReport = (scan_id: string) => {
  return useQuery(["beta_scan_detail", scan_id], () => getReport(scan_id));
};

import { useQuery } from "react-query";

import API from "helpers/api";
import { Report } from "common/types";

const getReport = async (project_id: string, report_id: string) => {
  const { data } = await API.post<{ summary_report: Report }>(
    "/api-get-beta-report/",
    {
      project_id,
      report_id,
    }
  );
  return data;
};

export const useReport = (project_id: string, report_id: string) => {
  return useQuery(["beta_report-detail", project_id, report_id], () =>
    getReport(project_id, report_id)
  );
};

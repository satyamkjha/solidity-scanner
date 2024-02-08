import { useQuery } from "react-query";

import { Report } from "common/types";
import axios from "axios";
import API, { PUBLIC_API } from "helpers/api";
import Auth from "helpers/auth";
import { API_PATH } from "helpers/routeManager";

export const getQSReport = async (
  project_id: string,
  report_id: string | undefined
) => {
  const { data } = await PUBLIC_API.post<{ summary_report: Report }>(
    API_PATH.API_GET_QS_REPORT,
    {
      project_id,
      report_id,
    }
  );
  return data;
};

export const useQSReport = (project_id: string, report_id: string) => {
  return useQuery(["qs_report", project_id, report_id], () =>
    getQSReport(project_id, report_id)
  );
};

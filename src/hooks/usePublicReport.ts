import { useQuery } from "react-query";

import { Report } from "common/types";
import axios from "axios";
import { API_URL_PROD, API_URL_DEV } from "helpers/api";
import Auth from "helpers/auth";

const API = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: Auth.isUserAuthenticated(),
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

const getPublicReport = async (project_type: string, report_id: string) => {
  const { data } = await API.post<{ summary_report: Report }>(
    "/api-get-published-report/",
    {
      project_type,
      report_id,
    }
  );
  return data;
};

export const usePublicReport = (project_type: string, report_id: string) => {
  return useQuery(["published_report", project_type, report_id], () =>
    getPublicReport(project_type, report_id)
  );
};

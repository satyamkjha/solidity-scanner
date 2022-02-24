import { useQuery } from "react-query";

import { Report } from "common/types";
import axios from "axios";
import { API_URL_PROD, API_URL_DEV } from "helpers/api";

const API = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

const getPublicReport = async (report_id: string) => {
  const { data } = await API.post<{ summary_report: Report }>(
    "/api-get-published-report/",
    {
      report_id,
    }
  );
  return data;
};

export const usePublicReport = (report_id: string) => {
  return useQuery(["published_report", report_id], () =>
    getPublicReport(report_id)
  );
};

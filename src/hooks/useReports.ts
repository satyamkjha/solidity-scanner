import { useQuery } from "react-query";
import API from "helpers/api";
import { ReportsListItem } from "common/types";

const getReports = async (project_id: string) => {
  const { data } = await API.post<{
    reports: ReportsListItem[];
  }>("/api-get-reports/", {
    project_id,
  });
  return data;
};

export const useReports = (project_id: string) => {
  return useQuery(["reports", project_id], () => getReports(project_id));
};

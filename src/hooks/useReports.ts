import { useQuery } from "react-query";
import API from "helpers/api";
import { ReportsListItem } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getReports = async (project_type: string, project_id: string) => {
  const { data } = await API.post<{
    reports: ReportsListItem[];
  }>(API_PATH.API_GET_REPORTS, {
    project_type,
    project_id,
  });
  return data;
};

export const useReports = (project_type: string, project_id: string) => {
  return useQuery(
    ["report_list", project_type, project_id],
    () => getReports(project_type, project_id),
    {
      enabled: !!project_id,
    }
  );
};

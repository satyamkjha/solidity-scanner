import { useQuery } from "react-query";

import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

export const getFileContent = async (
  type: "project" | "block",
  file_path: string,
  scan_id?: string,
  report_id?: string,
  project_id?: string
) => {
  const { data } = await API.post(
    type === "project"
      ? API_PATH.API_GET_FILE_CONTENT
      : API_PATH.API_GET_FILE_CONTENT_BLOCK,
    {
      file_paths: [file_path],
      scan_id,
      report_id,
      project_id,
    }
  );
  return data;
};

export const useFileContent = (
  scan_id: string,
  file_path: string,
  type: "project" | "block"
) => {
  return useQuery<any>(["file_content", scan_id, file_path], () =>
    getFileContent(type, file_path, scan_id)
  );
};

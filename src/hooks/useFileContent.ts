import { useQuery } from "react-query";

import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getFileContent = async (
  scan_id: string,
  file_path: string,
  type: "project" | "block"
) => {
  const { data } = await API.post(
    type === "project"
      ? API_PATH.API_GET_FILE_CONTENT
      : API_PATH.API_GET_FILE_CONTENT_BLOCK,
    {
      scan_id,
      file_paths: [file_path],
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
    getFileContent(scan_id, file_path, type)
  );
};

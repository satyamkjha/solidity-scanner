import { useQuery } from "react-query";

import API from "helpers/api";

const getFileContent = async (
  scan_id: string,
  file_path: string,
  type: "project" | "block"
) => {
  const { data } = await API.post(
    type === "project"
      ? "/api-get-file-content/"
      : "/api-get-file-content-block/",
    {
      scan_id,
      file_path,
    }
  );
  return data;
};

export const useFileContent = (
  scan_id: string,
  file_path: string,
  type: "project" | "block"
) => {
  return useQuery<{ file_contents: string }>(
    ["file_content", scan_id, file_path],
    () => getFileContent(scan_id, file_path, type)
  );
};

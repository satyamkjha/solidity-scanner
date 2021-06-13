import { useQuery } from "react-query";

import API from "helpers/api";

const getFileContent = async (scan_id: string, file_path: string) => {
  const { data } = await API.post("/api-get-file-content/", {
    scan_id,
    file_path,
  });
  return data;
};

export const useFileContent = (scan_id: string, file_path: string) => {
  return useQuery<{ file_contents: string }>(
    ["file_content", scan_id, file_path],
    () => getFileContent(scan_id, file_path)
  );
};

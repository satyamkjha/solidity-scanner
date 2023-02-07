import { useQuery } from "react-query";
import API from "helpers/api";

import { Pagination, ScanList } from "common/types";

const getBlocks = async (pagination: Pagination) => {
  const { data } = await API.get(
    `/api-get-task-status/?page=${pagination.pageNo}&per_page=${pagination.perPageCount}`
  );
  return data;
};

export const useBlocks = (pagination: Pagination) => {
  return useQuery<ScanList>(["blocks", pagination], () =>
    getBlocks(pagination));
};

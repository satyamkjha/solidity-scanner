import { useQuery } from "react-query";
import API from "helpers/api";

import { Pagination, ScanList } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getBlocks = async (pagination: Pagination) => {
  const { data } = await API.get(
    `${API_PATH.API_GET_TASK_STATUS}?page=${pagination.pageNo}&per_page=${pagination.perPageCount}`
  );
  return data;
};

export const useBlocks = (pagination: Pagination) => {
  return useQuery<ScanList>(["blocks", pagination], () =>
    getBlocks(pagination)
  );
};

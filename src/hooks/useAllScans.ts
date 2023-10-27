import { useQuery } from "react-query";
import API from "helpers/api";

import { Pagination, AllScanList } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getScans = async (
  pageNo: number,
  perPageCount: number,
  query: string | undefined,
  type: string | undefined
) => {
  let url = `${API_PATH.API_GET_ALL_SCANS}?page=${pageNo}&per_page=${perPageCount}`;
  if (query) url += `&q=${query}`;
  if (type) url += `&type=${type}`;

  const { data } = await API.get(url);
  return data;
};

export const useAllScans = (
  pagination: Pagination,
  query: string | undefined,
  type: string | undefined
) => {
  return useQuery<AllScanList>(["all_scans", pagination, query, type], () =>
    getScans(pagination.pageNo, pagination.perPageCount, query, type)
  );
};

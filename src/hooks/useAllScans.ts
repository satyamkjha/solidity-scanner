import { useQuery } from "react-query";
import API from "helpers/api";

import { Pagination, AllScanList } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getScans = async (
  pageNo: number,
  perPageCount: number,
  query: string,
  type: string
) => {
  const { data } = await API.get(
    `${API_PATH.API_GET_ALL_SCANS}?page=${pageNo}&per_page=${perPageCount}&q=${query}&type=${type}`
  );
  return data;
};

export const useAllScans = (
  pagination: Pagination,
  query: string,
  type: string
) => {
  return useQuery<AllScanList>(["all_scans", pagination], () =>
    getScans(pagination.pageNo, pagination.perPageCount, query, type)
  );
};

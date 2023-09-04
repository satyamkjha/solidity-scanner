import { useQuery } from "react-query";

import API from "helpers/api";
import { Pagination } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getHacks = async (
  pagination: Pagination,
  filters: any,
  sortBy: string,
  searchQuery: string
) => {
  const { data } = await API.post(API_PATH.API_GET_ATTACKS, {
    page: pagination.pageNo,
    per_page: pagination.perPageCount,
    filter: filters,
    sort_by: sortBy,
    search_query: searchQuery,
  });
  return data;
};

export const useHacksList = (
  pagination: Pagination,
  filters: any,
  sortBy: string,
  searchQuery: string
) => {
  return useQuery(
    ["hacks", pagination.pageNo, pagination.perPageCount, filters],
    () => getHacks(pagination, filters, sortBy, searchQuery)
  );
};

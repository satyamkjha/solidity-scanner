import { useQuery } from "react-query";
import API from "helpers/api";

import { Pagination, ProjectList } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getProjects = async (pageNo: number, perPageCount: number) => {
  const { data } = await API.get(
    `${API_PATH.API_GET_PROJECTS_BETA}?page=${pageNo}&per_page=${perPageCount}`
  );
  return data;
};

export const useProjects = (pagination: Pagination) => {
  return useQuery<ProjectList>(["projects", pagination], () =>
    getProjects(pagination.pageNo, pagination.perPageCount)
  );
};

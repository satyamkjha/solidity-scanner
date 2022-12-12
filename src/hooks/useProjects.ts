import { useQuery } from "react-query";
import API from "helpers/api";

import { Pagination, Project, ProjectList } from "common/types";

const getProjects = async (pageNo: number, perPageCount: number) => {
  const { data } = await API.get(`/api-get-projects-beta/?page=${pageNo}&per_page=${perPageCount}`);
  return data;
};

export const useProjects = (pagination: Pagination) => {
  return useQuery<ProjectList>(["projects", pagination], () =>
    getProjects(pagination.pageNo, pagination.perPageCount)
  );
};

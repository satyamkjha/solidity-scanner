import { useQuery } from "react-query";
import API from "helpers/api";

import { Project } from "common/types";

const getProjects = async () => {
  const { data } = await API.get<{ projects: Project[] }>("/api-get-projects");
  return data;
};

export const useProjects = () => {
  return useQuery("projects", getProjects);
};

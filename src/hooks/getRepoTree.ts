import { TreeItem } from "common/types";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

export const getRepoTree = async (
  project_url: string,
  project_branch: string
) => {
  try {
    const { data } = await API.post<{ status: string; tree: TreeItem }>(
      API_PATH.API_REPO_TREE,
      {
        project_url:
          project_url.slice(-4) === ".git"
            ? project_url.slice(0, project_url.length - 4)
            : project_url,
        project_branch,
      }
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

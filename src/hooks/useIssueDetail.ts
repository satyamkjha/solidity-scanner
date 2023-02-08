import { useQuery } from "react-query";

import API from "helpers/api";

import { IssueDetails } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getIssueDetail = async (issue_id: string, context: string) => {
  const { data } = await API.post(API_PATH.API_GET_ISSUE_DETAILS, {
    issue_id,
    context,
  });
  return data;
};

export const useIssueDetail = (issue_id: string, context: string) => {
  return useQuery<IssueDetails>(["issue_detail", issue_id, context], () =>
    getIssueDetail(issue_id, context)
  );
};

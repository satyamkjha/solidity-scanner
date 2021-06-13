import { useQuery } from "react-query";

import API from "helpers/api";

import { IssueDetails } from "common/types";

const getIssueDetail = async (issue_id: string) => {
  const { data } = await API.post("/api-get-issue-details/", { issue_id });
  return data;
};

export const useIssueDetail = (issue_id: string) => {
  return useQuery<IssueDetails>(["issue_detail", issue_id], () =>
    getIssueDetail(issue_id)
  );
};

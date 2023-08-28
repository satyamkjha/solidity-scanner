import { useQuery } from "react-query";
import API from "helpers/api";
import { TransactionList } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getTransactions = async (page: number, page_no: number) => {
  const { data } = await API.get(
    `${API_PATH.API_GET_TRANSACTION}?page=${page}&per_page=${page_no}`
  );
  return data;
};

export const useTransactions = (page: number, page_no: number) => {
  return useQuery<TransactionList>(["transactions", page, page_no], () =>
    getTransactions(page, page_no)
  );
};

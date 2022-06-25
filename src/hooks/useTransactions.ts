import { useQuery } from "react-query";
import API from "helpers/api";
import { Transaction, TransactionList } from "common/types";

const getTransactions = async (page: number, page_no: number) => {
  const { data } = await API.get(
    `api-get-transactions-beta/?page=${page}&per_page=${page_no}`
  );
  return data;
};

export const useTransactions = (page: number, page_no: number) => {
  return useQuery<TransactionList>("transactions", () =>
    getTransactions(page, page_no)
  );
};

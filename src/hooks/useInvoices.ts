import { useQuery } from "react-query";
import API from "helpers/api";
import { InvoiceList, Transaction, TransactionList } from "common/types";

const getInvoices = async (page: number, page_no: number) => {
  const { data } = await API.get(
    `api-get-invoices-beta/?page=${page}&per_page=${page_no}`
  );
  return data;
};

export const useInvoices = (page: number, page_no: number) => {
  return useQuery<InvoiceList>("invoices", () => getInvoices(page, page_no));
};

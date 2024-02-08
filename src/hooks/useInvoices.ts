import { useQuery } from "react-query";
import API from "helpers/api";
import { InvoiceList } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getInvoices = async (page: number, page_no: number) => {
  const { data } = await API.get(
    `${API_PATH.API_GET_INVOICES}?page=${page}&per_page=${page_no}`
  );
  return data;
};

export const useInvoices = (page: number, page_no: number) => {
  return useQuery<InvoiceList>("invoices", () => getInvoices(page, page_no));
};

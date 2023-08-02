import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const getHacks = async (
  startDate: string,
  endDate: string,
  selectedChain: string
) => {
  const { data } = await API.get(
    `${API_PATH.API_GET_ATTACKS_AGGREGATED}?start_date=${startDate}&end_date=${endDate}&selected_chain=${selectedChain}`
  );
  return data;
};

export const useHacksGraph = (
  startDate: string,
  endDate: string,
  selectedChain: string
) => {
  return useQuery(["hacks_aggregated", startDate, endDate, selectedChain], () =>
    getHacks(startDate, endDate, selectedChain)
  );
};

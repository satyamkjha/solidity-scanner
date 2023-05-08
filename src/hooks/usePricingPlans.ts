import { useQuery } from "react-query";
import API from "helpers/api";
import { Plan } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getPricingPlans = async () => {
  const { data } = await API.get<{
    pricing_data: {
      monthly: {
        [plan: string]: Plan;
      };
    };
  }>(API_PATH.API_GET_PRICING);
  return data;
};

export const usePricingPlans = () => {
  return useQuery("pricing_plans", () => getPricingPlans());
};

import { useQuery } from "react-query";
import API from "helpers/api";
import { Plan } from "common/types";

const getPricingPlans = async () => {
  const { data } = await API.get<{
    monthly: {
      [plan: string]: Plan;
    };
  }>("/api-get-prices/");
  return data;
};

export const usePricingPlans = () => {
  return useQuery("pricing_plans", () => getPricingPlans());
};

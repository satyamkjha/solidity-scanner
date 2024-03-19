import { useQuery } from "react-query";
import API from "helpers/api";
import { DetectorItemProp } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getDetectorsData = async () => {
  const { data } = await API.get<{ data: DetectorItemProp[] }>(
    API_PATH.API_GET_DETECTORS_DATA
  );
  return data;
};

export const useDetectorsData = () => {
  return useQuery("detectors_data", () => getDetectorsData());
};

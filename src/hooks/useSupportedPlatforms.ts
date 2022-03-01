import { useQuery } from "react-query";
import API from "helpers/api";
import { Profile } from "common/types";

const getSupportedChains = async () => {
  const { data } = await API.get("/api-get-supported-chains/");
  return data;
};

// export const useSupportedChains = () => {
//   return useQuery<{ etherscan: string[]; bscscan: string[]; polygonscan: string[]; }>("profile", () =>
//   getSupportedChains()
//   );
// };

export const useSupportedChains = () => {
  return useQuery<{ [key: string]: string[] }>("supported_chains", () =>
    getSupportedChains()
  );
};

import { useQueryClient } from "react-query";

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();
  const invalidateQueries = () => {
    console.log("runs");
    queryClient.invalidateQueries("profile");
    queryClient.invalidateQueries("blocks");
    queryClient.invalidateQueries("invoices");
    queryClient.invalidateQueries("transactions");
    queryClient.invalidateQueries("overview");
    queryClient.invalidateQueries("projects");
    queryClient.invalidateQueries("scan_detail");
    queryClient.invalidateQueries("scan_list");
    queryClient.invalidateQueries("profile");
  };
  return invalidateQueries;
};

export default useInvalidateQueries;

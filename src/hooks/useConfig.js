import { useEffect, useState, createContext, useContext } from "react";
import { setGlobalConfig } from "../helpers/helperFunction";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";

export const ConfigContext = createContext(null);

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await API.get(API_PATH.API_GET_CONFIGS);
        if (data && data.status === "success" && data.configs) {
          setConfig(data.configs);
          setGlobalConfig(data.configs);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  if (isLoading) {
    return <Loader width={"100vw"} height={"100vh"} />;
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

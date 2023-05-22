import { useEffect, useState, createContext, useContext } from 'react';
import { db } from "../helpers/firebaseConfig";
import { ref, onValue } from 'firebase/database';
import { setGlobalConfig } from "../helpers/helperFunction";

export const ConfigContext = createContext(null);

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = () => {
      try {
        const query = ref(db, 'config');
        const snapshot = onValue(query, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setConfig(data);
            setGlobalConfig(data);
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchConfig();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

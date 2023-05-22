import { useEffect, useState, createContext, useContext } from 'react';
import { db } from "../helpers/firebaseConfig";
import { ref, onValue } from 'firebase/database';

const ConfigContext = createContext(null);

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const query = ref(db, 'config');
    const unsubscribe = onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setConfig(data);
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {config ? children : null}
    </ConfigContext.Provider>
  );
};

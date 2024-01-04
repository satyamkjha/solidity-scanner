// WebSocketContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useToast } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useUserRole } from "./useUserRole";
import { useProfile } from "./useProfile";
import Auth from "helpers/auth";
import { useConfig } from "hooks/useConfig";

export const WSS_URL_DEV = process.env.REACT_APP_WSS_URL_DEV;
export const WSS_URL_PROD = process.env.REACT_APP_WSS_URL_PROD;

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const config = useConfig();
  const { data: profileData, refetch } = useProfile(Auth.isUserAuthenticated());
  const [webSocket, setWebSocket] = useState(null);
  const toast = useToast();
  const emptyArray = [];
  const [tempMessageQueue, setTempMessageQueue] = useState(emptyArray);
  const [messageQueue, setMessageQueue] = useState(emptyArray);

  useEffect(() => {
    const initializeWebSocket = (withAuth) => {
      console.log("init_ws");

      const ws = new WebSocket(
        `${
          process.env.REACT_APP_ENVIRONMENT === "production"
            ? WSS_URL_PROD
            : WSS_URL_DEV
        }${withAuth ? `?auth_token=${profileData.auth_token}` : ""}`
      );
      setWebSocket(ws);

      ws.addEventListener("open", () => {
        console.log("WebSocket connection opened");
      });

      ws.addEventListener("message", (event) => {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage) {
          if (receivedMessage.type === "error") {
            if (receivedMessage.payload && receivedMessage.payload.message) {
              toast({
                title: receivedMessage.payload.message,
                status: "error",
                isClosable: true,
                position: "bottom",
              });
            } else {
              toast({
                title: `Unexpected Error`,
                status: "error",
                isClosable: true,
                position: "bottom",
              });
            }
          } else {
            setTempMessageQueue((prevQueue) => [...prevQueue, receivedMessage]);
          }
        }
      });

      // Event listener for when the WebSocket connection is closed
      ws.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
        setWebSocket(null);
        // Reopen the WebSocket connection after a short delay (e.g., 3 seconds)

        setTimeout(() => {
          initializeWebSocket(withAuth);
        }, 4000);
      });

      // Event listener for WebSocket errors
      ws.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);

        // Close the WebSocket connection on error

        refetch().finally(() => ws.close());
      });

      return () => {
        // Clean up the WebSocket connection when the component unmounts
        ws.close();
      };
    };

    if (config && config.REACT_APP_FEATURE_GATE_CONFIG.websockets_enabled) {
      if (Auth.isUserAuthenticated()) {
        if (profileData && webSocket === null) {
          initializeWebSocket(true);
        }
      } else {
        if (webSocket === null) {
          initializeWebSocket(false);
        }
      }
    }
  }, [profileData, Auth.isUserAuthenticated()]);

  const processQueue = () => {
    setMessageQueue([...messageQueue, ...tempMessageQueue]);
    setTempMessageQueue(emptyArray);
  };

  const debouncedMsgInfusion = debounce(processQueue, 500);

  useEffect(() => {
    if (tempMessageQueue.length !== 0) {
      debouncedMsgInfusion();
    }

    return () => {
      debouncedMsgInfusion.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempMessageQueue]);

  const sendMessage = (msg) => {
    webSocket.send(
      JSON.stringify({
        action: "message",
        payload: msg,
      })
    );
  };

  const updateMessageQueue = (msg) => {
    setMessageQueue(msg);
  };

  const contextValue = {
    messageQueue,
    sendMessage,
    updateMessageQueue,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

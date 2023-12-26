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

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({ serverUrl, children }) => {
  const { profileData } = useUserRole();
  const [webSocket, setWebSocket] = useState(null);
  const toast = useToast();
  const [tempMessageQueue, setTempMessageQueue] = useState([]);
  const [messageQueue, setMessageQueue] = useState([]);

  useEffect(() => {
    const initializeWebSocket = () => {
      const ws = new WebSocket(
        `wss://api-ws-stage.solidityscan.com/stage?auth_token=${profileData.auth_token}`
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
          initializeWebSocket();
        }, 3000);
      });

      // Event listener for WebSocket errors
      ws.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);

        // Close the WebSocket connection on error
        ws.close();
      });

      return () => {
        // Clean up the WebSocket connection when the component unmounts
        ws.close();
      };
    };

    initializeWebSocket();
  }, [serverUrl]);

  const processQueue = () => {
    setMessageQueue((prevQueue) => [...prevQueue, ...tempMessageQueue]);
    setTempMessageQueue([]);
  };

  const debouncedMsgInfusion = debounce(processQueue, 400);

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

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
  const [wsReadyState, setWsReadyState] = useState(3);
  const toast = useToast();
  const emptyArray = [];
  const [tempMessageQueue, setTempMessageQueue] = useState(emptyArray);
  const [messageQueue, setMessageQueue] = useState(emptyArray);
  const [keepWSOpen, setKeepWSOpen] = useState(false);
  const [tempEmitMsgQueue, setTempEmitMsgQueue] = useState(emptyArray);

  const initializeWebSocket = (withAuth) => {
    const ws = new WebSocket(
      `${
        process.env.REACT_APP_ENVIRONMENT === "production"
          ? WSS_URL_PROD
          : WSS_URL_DEV
      }?auth_token=${
        withAuth
          ? `${profileData.auth_token}`
          : "75ce522381f289c1d790745d51e8b74bcd5c283c"
      }`
    );
    setWebSocket(ws);
    setWsReadyState(ws.readyState);

    ws.addEventListener("open", () => {
      setWsReadyState(ws.readyState);
    });

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage) {
        if (receivedMessage.message) {
          toast({
            title: receivedMessage.message,
            status: "error",
            isClosable: true,
            position: "bottom",
          });
          setKeepWSOpen(false);
        } else if (receivedMessage.type === "error") {
          if (
            receivedMessage.payload &&
            receivedMessage.payload.payload.error_message.message
          ) {
            toast({
              title: receivedMessage.payload.payload.error_message.message,
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
          setKeepWSOpen(false);
        } else {
          setTempMessageQueue((prevQueue) => [...prevQueue, receivedMessage]);
        }
      }
    });

    // Event listener for when the WebSocket connection is closed
    ws.addEventListener("close", (event) => {
      setWsReadyState(ws.readyState);
      setWebSocket(null);
      // Reopen the WebSocket connection after a short delay (e.g., 3 seconds)
    });

    // Event listener for WebSocket errors
    ws.addEventListener("error", (error) => {
      setWsReadyState(ws.readyState);
      // Close the WebSocket connection on error
      refetch().finally(() => ws.close());
    });

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      ws.close();
    };
  };

  useEffect(() => {
    if (
      config &&
      config.REACT_APP_FEATURE_GATE_CONFIG.websockets_enabled &&
      keepWSOpen &&
      webSocket === null
    ) {
      if (Auth.isUserAuthenticated()) {
        if (profileData && webSocket === null) {
          initializeWebSocket(true);
        } else {
          webSocket.close();
        }
      } else {
        if (webSocket === null) {
          initializeWebSocket(false);
        } else {
          webSocket.close();
        }
      }
    }
  }, [profileData, keepWSOpen, webSocket, Auth.isUserAuthenticated()]);

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
    if (wsReadyState === 1) {
      webSocket.send(
        JSON.stringify({
          action: "message",
          payload: msg,
        })
      );
    } else {
      setKeepWSOpen(true);
      setTempEmitMsgQueue([...tempEmitMsgQueue, msg]);
    }
  };

  useEffect(() => {
    if (
      tempEmitMsgQueue &&
      tempEmitMsgQueue.length > 0 &&
      webSocket.readyState === 1
    ) {
      tempEmitMsgQueue.forEach((msg) => {
        webSocket.send(
          JSON.stringify({
            action: "message",
            payload: msg,
          })
        );
      });
      setTempEmitMsgQueue([]);
    }
  }, [wsReadyState]);

  const updateMessageQueue = (msg) => {
    setMessageQueue(msg);
  };

  const contextValue = {
    messageQueue,
    sendMessage,
    updateMessageQueue,
    setKeepWSOpen,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

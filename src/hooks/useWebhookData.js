import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { throttle } from "lodash";
import { useProfile } from "./useProfile";
import Auth from "helpers/auth";
import { useConfig } from "hooks/useConfig";
import { matchPublicRoute } from "./../helpers/helperFunction";

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
  const pathname = window.location.pathname;
  const config = useConfig();

  const { data: profileData, refetch } = useProfile(
    Auth.isUserAuthenticated() && !matchPublicRoute(pathname)
  );
  const [webSocket, setWebSocket] = useState(null);
  const [wsReadyState, setWsReadyState] = useState(3);
  const toast = useToast();
  const emptyArray = [];
  const [messageQueue, setMessageQueue] = useState(emptyArray);
  const [keepWSOpen, setKeepWSOpen] = useState(false);
  const [needAuthToken, setNeedAuthToken] = useState(true);
  const [tempEmitMsgQueue, setTempEmitMsgQueue] = useState(emptyArray);
  const [checkAuthToken, setCheckAuthToken] = useState(false);

  const initializeWebSocket = (withAuth) => {
    const ws = new WebSocket(
      `${
        process.env.REACT_APP_ENVIRONMENT === "production"
          ? WSS_URL_PROD
          : WSS_URL_DEV
      }`
    );
    setWebSocket(ws);
    setWsReadyState(ws.readyState);

    const handleWebSocketMessage = (receivedMessage) => {
      setMessageQueue((prevQueue) => [...prevQueue, receivedMessage]);
    };

    ws.addEventListener("open", () => {
      if (needAuthToken) {
        ws.send(
          JSON.stringify({
            action: "message",
            payload: {
              type: "auth_token_register",
              body: {
                auth_token: profileData.auth_token,
              },
            },
          })
        );
      }
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
            receivedMessage.payload.payload.error_message &&
            receivedMessage.payload.payload.error_message.message
          ) {
            toast({
              title: receivedMessage.payload.payload.error_message.message,
              status: "error",
              isClosable: true,
              position: "bottom",
            });
          } else if (
            receivedMessage.payload &&
            receivedMessage.payload.payload.scan_status_err_message
          ) {
            const message = {
              type: "insufficient_loc",
              payload: { ...receivedMessage.payload.payload },
            };
            const throttledHandler = throttle(
              () => handleWebSocketMessage(message),
              100
            );
            throttledHandler();
          } else {
            toast({
              title: `Unexpected Error`,
              status: "error",
              isClosable: true,
              position: "bottom",
            });
          }
          setKeepWSOpen(false);
        } else if (receivedMessage.type === "auth_token_register") {
          if (receivedMessage.payload.message === "Auth token registered.") {
            setCheckAuthToken(true);
          }
        } else {
          const throttledHandler = throttle(
            () => handleWebSocketMessage(receivedMessage),
            100
          );
          throttledHandler();
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
      if (Auth.isUserAuthenticated() && pathname !== "/quickscan") {
        initializeWebSocket(true);
      } else {
        initializeWebSocket(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData, keepWSOpen, webSocket, Auth.isUserAuthenticated()]);

  // const processQueue = () => {
  //   setMessageQueue([...messageQueue, ...tempMessageQueue]);
  //   setTempMessageQueue(emptyArray);
  // };

  // const debouncedMsgInfusion = debounce(processQueue, 100);

  // useEffect(() => {
  //   if (tempMessageQueue.length !== 0) {
  //     debouncedMsgInfusion();
  //   }

  //   return () => {
  //     debouncedMsgInfusion.cancel();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tempMessageQueue]);

  const sendMessage = (msg) => {
    if (wsReadyState === 1) {
      emitMessages(msg);
    } else {
      setKeepWSOpen(true);
      setTempEmitMsgQueue([...tempEmitMsgQueue, msg]);
    }
  };

  const emitMessages = (msg) => {
    webSocket.send(
      JSON.stringify({
        action: "message",
        payload: msg,
      })
    );
  };

  useEffect(() => {
    if (
      tempEmitMsgQueue &&
      tempEmitMsgQueue.length > 0 &&
      webSocket.readyState === 1
    ) {
      if (needAuthToken) {
        if (checkAuthToken) {
          tempEmitMsgQueue.forEach((msg) => {
            emitMessages(msg);
          });
          setTempEmitMsgQueue([]);
        }
      } else {
        tempEmitMsgQueue.forEach((msg) => {
          emitMessages(msg);
        });
        setTempEmitMsgQueue([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsReadyState, checkAuthToken]);

  const updateMessageQueue = (msg) => {
    setMessageQueue(msg);
  };

  const contextValue = {
    messageQueue,
    sendMessage,
    updateMessageQueue,
    setKeepWSOpen,
    setNeedAuthToken,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

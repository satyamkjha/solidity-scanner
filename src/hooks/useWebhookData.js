// WebSocketContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { debounce } from "lodash";
import Cookies from "js-cookie";

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({ serverUrl, children }) => {
  const [webSocket, setWebSocket] = useState(null);
  const toast = useToast();
  const [tempMessageQueue, setTempMessageQueue] = useState([]);
  const [messageQueue, setMessageQueue] = useState([]);
  const csrftoken = Cookies.get("csrftoken");

  useEffect(() => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const csrftoken = cookies.find((cookie) => cookie.startsWith("csrftoken"));
  }, []);

  useEffect(() => {
    const ws = new WebSocket(serverUrl);

    setWebSocket(ws);

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);

      console.log(receivedMessage);
      // Add the message to the queue
      // if (receivedMessage) {
      //   if (receivedMessage.type === "error") {
      //     if (receivedMessage.payload && receivedMessage.payload.message) {
      //       toast({
      //         title: receivedMessage.payload.message,
      //         status: "error",
      //         isClosable: true,
      //         position: "bottom",
      //       });
      //     } else {
      //       toast({
      //         title: `Unexpected Error`,
      //         status: "error",
      //         isClosable: true,
      //         position: "bottom",
      //       });
      //     }
      //   } else {
      //     setTempMessageQueue((prevQueue) => [...prevQueue, receivedMessage]);
      //   }
      // }
    });

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      ws.close();
    };
  }, [serverUrl]);

  useEffect(() => {
    console.log(webSocket);
  }, [webSocket]);

  const processQueue = () => {
    setMessageQueue(tempMessageQueue);
    setTempMessageQueue([]);
  };

  //   useEffect(() => {
  //     if (webSocket !== null) {
  //       ws.send(webSocket);
  //     }
  //   }, [webSocket]);

  const debouncedMsgInfusion = debounce(processQueue, 200);

  useEffect(() => {
    debouncedMsgInfusion();

    return () => {
      debouncedMsgInfusion.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempMessageQueue]);

  const sendMessage = (msg) => {
    setWebSocket(msg);
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

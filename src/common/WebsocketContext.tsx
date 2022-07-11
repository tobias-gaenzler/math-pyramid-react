import { createContext, useContext, useEffect, useRef } from "react";
import { Message, MessageType } from "./Message";
import { Model } from "./Model";
import { useModelContext } from "./ModelContext";
import { useUserContext } from "./UserContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : "ws://localhost:3333";

type WebsocketContextProps = {
  sendMessage: (message: string, type: MessageType) => void;
};
type ChildrenProps = {
  children: React.ReactNode;
};
const WebsocketContext = createContext<WebsocketContextProps>({
  sendMessage: () => {},
});
const useWebsocketContext = () => useContext(WebsocketContext);

function WebsocketContextProvider(props: ChildrenProps) {
  const { userName } = useUserContext();
  const { saveModel } = useModelContext();

  const ws = useRef<WebSocket>();

  const sendMessage = (message: string, type?: MessageType) => {
    if (message && ws && ws.current) {
      console.log("Sending message");
      ws.current.send(JSON.stringify(new Message(userName, message, type)));
      console.log("Sent message");
    }
  };

  useEffect(() => {
    if (ws && ws.current && wsIsOpenOrConnecting()) {
      console.log("connect: ws already open or connecting");
    } else {
      ws.current = new WebSocket(SERVER_URL);

      if (ws && ws.current) {
        ws.current.onopen = () => {
          console.log("Connection opened");
        };

        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.dir(data);
          if (data.type === MessageType.MODEL) {
            const newModel: Model = JSON.parse(data.body);
            console.log("Received new model");
            console.log(newModel);
            saveModel(newModel);
          }
        };
      }
    }

    return () => {
      if (ws && ws.current && !wsIsOpenOrConnecting()) {
        console.log("cleanup: close open or connecting websockets");
        ws.current.close();
      } else {
        console.log("cleanup: ws already closed or closing");
      }
    };
  }, [saveModel]);

  return (
    <WebsocketContext.Provider value={{ sendMessage }}>
      {props.children}
    </WebsocketContext.Provider>
  );

  function wsIsOpenOrConnecting(): boolean {
    if (ws && ws.current) {
      return ws.current.readyState === 1 || ws.current.readyState === 0;
    } else {
      return false;
    }
  }
}

export { useWebsocketContext, WebsocketContextProvider };
export type { WebsocketContextProps };

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
    ws.current = new WebSocket(SERVER_URL);

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

    return () => {
      console.log("Cleaning up...");
      if (ws && ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <WebsocketContext.Provider value={{ sendMessage }}>
      {props.children}
    </WebsocketContext.Provider>
  );
}

export { useWebsocketContext, WebsocketContextProvider };
export type { WebsocketContextProps };

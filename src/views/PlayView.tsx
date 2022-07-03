import React, { useRef } from "react";
import { Model } from "../common/Model";
import { useModelContext } from "../common/ModelContext";
import { useUserContext } from "../common/UserContext";
import MathPyramidMultiplayer from "../components/MathPyramidMultiplayer/MathPyramidMultiplayer";

type Props = {};
enum MessageType {
  TEXT = 0,
  MODEL = 1,
}
class Message {
  sender: string;
  body: string;
  type: MessageType;
  constructor(
    sender: string,
    body: string,
    type: MessageType = MessageType.TEXT
  ) {
    this.sender = sender;
    this.body = body;
    this.type = type;
  }
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : "ws://localhost:3333";

const PlayView: React.FC<Props> = () => {
  const { userName } = useUserContext();
  const { saveModel } = useModelContext();

  const ws = useRef<WebSocket>();

  const sendMessage = (message: string, type?: MessageType) => {
    if (message && ws && ws.current) {
      ws.current.send(JSON.stringify(new Message(userName, message, type)));
    }
  };
  React.useEffect(() => {
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
    <MathPyramidMultiplayer
      size={3}
      maxValue={100}
      sendModel={(model: Model) => {
        sendMessage(JSON.stringify(model), MessageType.MODEL);
      }}
    />
  );
};

export default PlayView;

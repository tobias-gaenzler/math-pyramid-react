import { Box, Button, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import { Model } from "../common/Model";
import { useUserContext } from "../common/UserContext";
import { MathPyramidCalculator } from "../service/MathPyramidCalculator";

type Props = {};
type Message = {
  id: string;
  sender: string;
  body: string;
  sentAt: Date;
};
enum MessageType {
  TEXT = 0,
  MODEL = 1,
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : "ws://localhost:3333";

const PlayView: React.FC<Props> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const calculator = new MathPyramidCalculator();
  const { userName } = useUserContext();

  const ws = useRef<WebSocket>();

  const sendMessage = (message: string, type?: MessageType) => {
    if (message && ws && ws.current) {
      if (!type) {
        type = MessageType.TEXT;
      }
      ws.current.send(
        JSON.stringify({
          sender: userName,
          body: message,
          type: type,
        })
      );
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
      }
      setMessages((_messages) => [..._messages, data]);
    };

    return () => {
      console.log("Cleaning up...");
      if (ws && ws.current) {
        ws.current.close();
      }
    };
  }, []);
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      {messages.map((message, index) => (
        <Box key={index}>{message.body}</Box>
      ))}
      <Button onClick={() => sendMessage("Solved by ".concat(userName))}>
        Send Message
      </Button>
      <Button
        onClick={() =>
          sendMessage(
            JSON.stringify(new Model(3, 100, calculator)),
            MessageType.MODEL
          )
        }
      >
        Send model
      </Button>
    </Stack>
  );
};

export default PlayView;

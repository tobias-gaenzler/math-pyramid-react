const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");
const dotenv = require("dotenv");

dotenv.config();

const MessageType = {
  TEXT: 0,
  MODEL: 1,
};
const port = process.env.PORT ? process.env.PORT : 3333;

const server = new WebSocket.Server(
  {
    port: port,
  },
  () => {
    console.log(`Server started on port ${port}`);
  }
);

const users = new Set();

server.on("connection", (ws, req) => {
  ws.id = uuidv4();
  const userRef = {
    ws,
  };
  users.add(userRef);
  console.log(
    "Adding connection: ".concat(ws.id).concat(", with url: ").concat(req.url)
  );
  console.log("Current clients:");
  server.clients.forEach(function each(client) {
    console.log("Client.ID: " + client.id);
  });

  ws.on("message", (message) => {
    console.log(`Server received message: ${message}`);
    try {
      const data = JSON.parse(message);

      if (typeof data.sender !== "string" || typeof data.body !== "string") {
        console.error("Invalid message");
        return;
      }
      const type = data.type === MessageType.TEXT ? 0 : 1;
      console.dir(data.type);
      const messageToSend = {
        id: ws.id,
        sender: data.sender,
        body: data.body,
        sentAt: Date.now(),
        type: type,
      };

      sendMessage(JSON.stringify(messageToSend));
      console.log("Server sent messages: ");
      console.dir(messageToSend);
    } catch (e) {
      console.error("Error passing message!", e);
    }
  });

  ws.on("close", (code, reason) => {
    users.delete(userRef);
    console.log(
      `Connection closed! id: ${ws.id}, code: ${code}, reason: ${reason}!`
    );
  });
});

const sendMessage = (message) => {
  users.forEach((user) => {
    user.ws.send(message);
  });
};

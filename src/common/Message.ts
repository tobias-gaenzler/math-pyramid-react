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

export { Message, MessageType };

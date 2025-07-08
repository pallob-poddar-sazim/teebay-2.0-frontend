interface IMessage {
  id: string;
  sender: {
    id: string;
  };
  text: string;
}

export default IMessage;

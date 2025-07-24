import { UUID } from "crypto";
import IMessage from "./IMessage";

interface IConversation {
  id: string;
  participants: {
    id: UUID;
    name: string;
  }[];
  lastMessage: IMessage;
}

export default IConversation;

import { IMessage } from "@/shared/typedefs";
import { UUID } from "crypto";
import { SetStateAction } from "react";

export type TChatProps = {
  conversationId?: string;
  currentUserId?: UUID;
  chatPartner?: {
    id: UUID;
    name: string;
  };
  onClose: () => void;
};

export type TUseChatFormProps = {
  setMessages: { (value: SetStateAction<IMessage[]>): void };
  conversationId?: string;
  currentUserId?: UUID;
  chatPartnerId?: UUID;
};

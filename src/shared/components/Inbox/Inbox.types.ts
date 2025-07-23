import { IConversation } from "@/shared/typedefs";
import { UUID } from "crypto";

export type TInboxProps = {
  userId: UUID;
  conversations: IConversation[];
  triggerRef?: React.RefObject<HTMLElement | null>;
  onConversationSelect: (conversation: IConversation) => void;
  onClose: () => void;
};

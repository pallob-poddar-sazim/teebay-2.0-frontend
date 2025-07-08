import { Key, useEffect, useRef, useState } from "react";
import { UUID } from "crypto";
import IConversation from "@/interfaces/IConversation";

type Props = {
  userId: UUID;
  conversations: IConversation[];
  triggerRef?: React.RefObject<HTMLElement | null>;
  onConversationSelect: (conversation: IConversation) => void;
  onClose: () => void;
};

const Inbox = (props: Props) => {
  const inboxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inboxRef.current &&
        !inboxRef.current.contains(event.target as Node) &&
        (!props.triggerRef ||
          !props.triggerRef.current?.contains(event.target as Node))
      ) {
        props.onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [props.onClose]);

  return (
    <article
      ref={inboxRef}
      className="absolute right-2 py-4 w-90 z-2 bg-white rounded-xl shadow-xl flex flex-col"
    >
      <p className="px-4 text-xl font-bold">Chats</p>
      {props.conversations.map((conversation: IConversation, index: Key) => (
        <div
          key={index}
          onClick={() => props.onConversationSelect(conversation)}
          className="mx-1 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <p className="font-medium">
            {
              conversation.participants.find(
                (participant) => participant.id !== props.userId
              )?.name
            }
          </p>
          <div className="flex items-center text-light text-sm text-gray-500">
            {props.userId === conversation.lastMessage.sender.id && "You: "}
            {conversation.lastMessage.text}
          </div>
        </div>
      ))}
    </article>
  );
};

export default Inbox;

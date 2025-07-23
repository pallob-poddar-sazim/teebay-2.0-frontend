import { Key, useEffect, useRef } from "react";
import { IConversation } from "@/shared/typedefs";
import { TInboxProps } from "./Inbox.types";

const Inbox = (props: TInboxProps) => {
  const inboxRef = useRef<HTMLElement>(null);
  const { triggerRef, onClose } = props;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inboxRef.current &&
        !inboxRef.current.contains(event.target as Node) &&
        (!triggerRef || !triggerRef.current?.contains(event.target as Node))
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [triggerRef, onClose]);

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
            {conversation.participants.find((participant) => participant.id !== props.userId)?.name}
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

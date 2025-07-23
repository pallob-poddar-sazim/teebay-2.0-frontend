import { Controller } from "react-hook-form";
import { IMessage } from "@/shared/typedefs";
import { useEffect, useRef, useState } from "react";
import { Button } from "../shadui/button";
import { useChatForm } from "./Chat.hooks";
import { TChatProps } from "./Chat.types";
import { X, SendHorizonal } from "lucide-react";

const Chat = (props: TChatProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { form, onSubmit } = useChatForm({
    setMessages,
    conversationId: props.conversationId,
    currentUserId: props.currentUserId,
    chatPartnerId: props.chatPartner?.id,
  });

  const errors = form.formState.errors;
  const textValue = form.watch("text");

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <article className="fixed bottom-0 right-10 z-2 w-80 h-100 bg-white rounded-xl shadow-xl flex flex-col">
      <div className="p-3 flex items-center justify-between gap-2 border-b border-gray">
        <p>{props.chatPartner?.name}</p>
        <Button variant={"ghost"} onClick={props.onClose}>
          <X />
        </Button>
      </div>

      <div ref={containerRef} className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {messages.map((message: IMessage, index) => (
          <p
            key={index}
            className={`px-3 py-2 w-fit max-w-7/10 rounded-full text-sm ${
              props.chatPartner?.id === message.sender.id ? "mr-auto bg-gray" : "ml-auto bg-blue"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="px-3 py-2 border-t border-gray flex items-center justify-between gap-4"
      >
        <div className="w-full">
          <Controller
            name="text"
            control={form.control}
            rules={{
              maxLength: {
                value: 2000,
                message: "Character limit exceeded",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Aa"
                autoFocus
                autoComplete="off"
                {...field}
                className="px-3 py-2 w-full rounded-full bg-gray-100"
              />
            )}
          />
          {errors.text && <p className="text-sm text-red-500 my-1">{errors.text.message}</p>}
        </div>

        <Button variant={"ghost"} disabled={!textValue?.trim()}>
          <SendHorizonal className={`${textValue?.trim() && "text-primary"}`} />
        </Button>
      </form>
    </article>
  );
};

export default Chat;

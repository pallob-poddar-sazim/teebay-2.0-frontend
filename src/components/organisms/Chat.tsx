import CloseIcon from "@/assets/icons/close-icon.svg";
import SendIcon from "@/assets/icons/send.svg";
import { Controller, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import IMessage from "@/interfaces/IMessage";
<<<<<<< HEAD

type Props = {
  chatPartner: {
    id: string;
    name: string;
  };
  messages: IMessage[];
=======
import { SEND_MESSAGE } from "@/graphql/mutations/messages";
import { MESSAGE_SENT } from "@/graphql/subscriptions/messages";
import { useMutation, useSubscription } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { UUID } from "crypto";
import { useMessages } from "@/hooks/useMessages";

type Props = {
  currentUserId: UUID;
  chatPartner: {
    id: UUID;
    name: string;
  };
>>>>>>> e47e558 (feat: integrate get messages api in chat service)
  onClose: () => void;
};

const Chat = (props: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
<<<<<<< HEAD
  } = useForm({
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  });

=======
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const textValue = watch("text");

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data: messageData } = useMessages(
    props.currentUserId,
    props.chatPartner.id
  );
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const subscriptionVariables = conversationId
    ? { conversationId }
    : { participantIds: [props.currentUserId, props.chatPartner.id] };

  const { data: subscriptionData } = useSubscription(MESSAGE_SENT, {
    variables: subscriptionVariables,
    skip: !subscriptionVariables,
    onData: ({ data }) => {
      const newMessage = data?.data?.messageSent;
      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
      }
    },
  });

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (messageData?.getMessages?.data?.[0]?.conversation?.id) {
      const id = messageData.getMessages.data[0].conversation.id;
      setConversationId(id);
      setMessages(messageData.getMessages.data);
    }
  }, [messageData]);

  const handlerOnSubmit = async () => {
    try {
      const formData = {
        senderId: props.currentUserId,
        text: getValues("text"),
        ...(conversationId
          ? { conversationId }
          : { participantIds: [props.currentUserId, props.chatPartner.id] }),
      };

      await sendMessage({ variables: formData });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

>>>>>>> e47e558 (feat: integrate get messages api in chat service)
  return (
    <article className="fixed bottom-0 right-10 z-2 w-80 h-100 bg-white rounded-xl shadow-xl flex flex-col">
      <div className="p-3 flex items-center justify-between gap-2 border-b border-gray">
        <p>{props.chatPartner.name}</p>
        <Button onClick={props.onClose} className="cursor-pointer">
          <CloseIcon />
        </Button>
      </div>

<<<<<<< HEAD
      <div className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {props.messages.map((message, index) => (
          <p
            key={index}
            className="px-3 py-2 ml-auto bg-blue rounded-full text-sm w-fit max-w-7/10"
=======
      <div
        ref={containerRef}
        className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto"
      >
        {messages.map((message: IMessage, index) => (
          <p
            key={index}
            className={`px-3 py-2 w-fit max-w-7/10 rounded-full text-sm ${
              props.chatPartner.id === message.sender.id
                ? "mr-auto bg-gray"
                : "ml-auto bg-blue"
            }`}
>>>>>>> e47e558 (feat: integrate get messages api in chat service)
          >
            {message.text}
          </p>
        ))}
      </div>

<<<<<<< HEAD
      <div className="px-3 py-2 border-t border-gray flex items-center justify-between gap-4">
        <div className="w-full">
          <Controller
            name="message"
=======
      <form
        onSubmit={handleSubmit(handlerOnSubmit)}
        className="px-3 py-2 border-t border-gray flex items-center justify-between gap-4"
      >
        <div className="w-full">
          <Controller
            name="text"
>>>>>>> e47e558 (feat: integrate get messages api in chat service)
            control={control}
            rules={{
              maxLength: {
                value: 2000,
                message: "Character limit exceeded",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Aa"
<<<<<<< HEAD
                {...field}
                className="px-3 py-2 w-full rounded-full bg-gray-200"
              />
            )}
          />
          {errors.message && (
            <p className="text-sm text-red-500 my-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <SendIcon className="fill-purple" />
      </div>
=======
                autoFocus
                autoComplete="off"
                {...field}
                className="px-3 py-2 w-full rounded-full bg-gray-100"
              />
            )}
          />
          {errors.text && (
            <p className="text-sm text-red-500 my-1">{errors.text.message}</p>
          )}
        </div>

        <Button disabled={!textValue?.trim()} className="cursor-pointer">
          <SendIcon className={`${textValue?.trim() && "fill-purple"}`} />
        </Button>
      </form>
>>>>>>> e47e558 (feat: integrate get messages api in chat service)
    </article>
  );
};

export default Chat;

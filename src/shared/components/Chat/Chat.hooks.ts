import { SEND_MESSAGE } from "@/shared/graphql/mutations/messages";
import { GET_MESSAGES } from "@/shared/graphql/queries/messages";
import { MESSAGE_SENT } from "@/shared/graphql/subscriptions/messages";
import { IMessage } from "@/shared/typedefs";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { UUID } from "crypto";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useChatForm = (
  currentUserId: UUID,
  chatPartnerId: UUID,
  setMessages: { (value: SetStateAction<IMessage[]>): void },
) => {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { data: messageData } = useQuery(GET_MESSAGES, {
    variables: {
      participantIds: [currentUserId, chatPartnerId],
    },
    fetchPolicy: "network-only",
  });
  const [conversationId, setConversationId] = useState<string | null>(null);

  const subscriptionVariables = conversationId
    ? { conversationId }
    : { participantIds: [currentUserId, chatPartnerId] };

  useSubscription(MESSAGE_SENT, {
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
    if (messageData?.getMessages?.data?.[0]?.conversation?.id) {
      const id = messageData.getMessages.data[0].conversation.id;
      setConversationId(id);
      setMessages(messageData.getMessages.data);
    }
  }, [messageData, setMessages]);

  const handlerOnSubmit = async (values: { text: string }) => {
    try {
      const formData = {
        senderId: currentUserId,
        text: values.text,
        ...(conversationId
          ? { conversationId }
          : { participantIds: [currentUserId, chatPartnerId] }),
      };

      await sendMessage({ variables: formData });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return { form, onSubmit: form.handleSubmit(handlerOnSubmit) };
};

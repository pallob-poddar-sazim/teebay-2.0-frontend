import { SEND_MESSAGE } from "@/shared/graphql/mutations/messages";
import { GET_MESSAGES } from "@/shared/graphql/queries/messages";
import { MESSAGE_SENT } from "@/shared/graphql/subscriptions/messages";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TUseChatFormProps } from "./Chat.types";

export const useChatForm = (props: TUseChatFormProps) => {
  const { setMessages, conversationId, currentUserId, chatPartnerId } = props;

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { data: messageData } = useQuery(GET_MESSAGES, {
    variables: conversationId
      ? { conversationId }
      : { participantIds: [currentUserId, chatPartnerId] },
    skip: !conversationId && (!currentUserId || !chatPartnerId),
    fetchPolicy: "cache-and-network",
  });

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
      setMessages(messageData.getMessages.data);
    }
  }, [messageData?.getMessages.data, setMessages]);

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

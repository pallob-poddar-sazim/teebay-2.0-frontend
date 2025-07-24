import { GET_CONVERSATIONS_BY_USER_ID } from "@/shared/graphql/queries/conversations";
import { MESSAGE_SENT_TO_USER } from "@/shared/graphql/subscriptions/messages";
import { IConversation } from "@/shared/typedefs";
import { useQuery, useSubscription } from "@apollo/client";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export const useConversations = (
  userId: UUID,
  handleConversationSelect: (conversation: IConversation) => void,
) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { data: conversationData } = useQuery(GET_CONVERSATIONS_BY_USER_ID, {
    variables: {
      userId,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (conversationData?.getConversationsByUserId.data) {
      setConversations(conversationData.getConversationsByUserId.data);
    }
  }, [conversationData]);

  useSubscription(MESSAGE_SENT_TO_USER, {
    variables: { userId },
    onData: ({ data }) => {
      const newMessage = data?.data?.messageSentToUser;
      if (!newMessage) return;

      setConversations((prevConversations) => {
        const updated = [...prevConversations];
        const index = updated.findIndex((conv) => conv.id === newMessage.conversation.id);

        const updatedConversation = {
          ...newMessage.conversation,
          lastMessage: newMessage,
          participants: newMessage.conversation.participants || [],
        };

        if (index !== -1) {
          updated.splice(index, 1);
        }

        updated.unshift(updatedConversation);

        return updated;
      });

      handleConversationSelect(newMessage.conversation);
    },
  });

  return { conversations };
};

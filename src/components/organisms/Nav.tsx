"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useApolloClient } from "@apollo/client";
import { GET_LOCAL_USER } from "@/graphql/queries/users";
import { useQuery, useSubscription } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatIcon from "@/assets/icons/chat.svg";
import Inbox from "./Inbox";
import Chat from "./Chat";
import IConversation from "@/interfaces/IConversation";
import { MESSAGE_SENT_TO_USER } from "@/graphql/subscriptions/messages";
import { GET_CONVERSATIONS_BY_USER_ID } from "@/graphql/queries/conversations";

const Nav = () => {
  const client = useApolloClient();
  const { data: user } = useQuery(GET_LOCAL_USER);
  const router = useRouter();
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);
  const chatButtonRef = useRef(null);
  const { data: conversationData } = useQuery(GET_CONVERSATIONS_BY_USER_ID, {
    variables: {
      userId: user.localUser?.id,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (conversationData?.getConversationsByUserId.data) {
      setConversations(conversationData.getConversationsByUserId.data);
    }
  }, [conversationData]);

  useEffect(() => {
    router.prefetch("/signin");
  }, [router]);

  const handleSignOut = () => {
    client.writeQuery({ query: GET_LOCAL_USER, data: { localUser: null } });
    router.push("/signin");
  };

  const chatPartner = selectedConversation?.participants.find(
    (participant) => participant.id !== user.localUser?.id
  );

  const handleConversationSelect = (conversation: IConversation) => {
    setSelectedConversation(conversation);
    setIsInboxOpen(false);
    setIsChatOpen(true);
  };

  const { data: subscriptionData } = useSubscription(MESSAGE_SENT_TO_USER, {
    variables: { userId: user.localUser?.id },
    onData: ({ data }) => {
      const newMessage = data?.data?.messageSentToUser;
      if (!newMessage) return;

      setConversations((prevConversations) => {
        const updated = [...prevConversations];
        const index = updated.findIndex(
          (conv) => conv.id === newMessage.conversation.id
        );

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

  return (
    <div className="relative mx-6 my-4">
      <nav className="flex items-center justify-end gap-4">
        <Button
          text="LOGOUT"
          variant="button-secondary"
          onClick={handleSignOut}
        />
        <Link
          href={`/users/${user.localUser?.id}/products/history`}
          className="text-blue"
        >
          <Button text="TRANSACTIONS" variant="button-primary" />
        </Link>
        <Link href={"/products"} className="text-blue">
          <Button text="ALL PRODUCTS" variant="button-primary" />
        </Link>
        <Link href={"/products/creation"} className="text-blue">
          <Button text="ADD PRODUCT" variant="button-primary" />
        </Link>
        <Link href={"/products/bulk-creation"} className="text-blue">
        <Button text="BULK CREATE" variant="button-primary" />
      </Link>
      <Button
          ref={chatButtonRef}
          onClick={() => setIsInboxOpen(!isInboxOpen)}
          className="cursor-pointer"
        >
          <ChatIcon className="size-10 fill-purple" />
        </Button>
      </nav>
      {isInboxOpen && (
        <Inbox
          userId={user.localUser?.id}
          conversations={conversations}
          triggerRef={chatButtonRef}
          onConversationSelect={handleConversationSelect}
          onClose={() => setIsInboxOpen(false)}
        />
      )}

      {isChatOpen && chatPartner && (
        <Chat
          currentUserId={user.localUser?.id}
          chatPartner={chatPartner}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default Nav;

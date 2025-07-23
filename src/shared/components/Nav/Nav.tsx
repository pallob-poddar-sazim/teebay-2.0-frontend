"use client";

import Link from "next/link";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { useQuery } from "@apollo/client";
import { Button } from "../shadui/button";
import { useSignout } from "@/shared/hooks/useSignout";
import { MessageSquareMore } from "lucide-react";
import { useRef, useState } from "react";
import Inbox from "../Inbox";
import { useConversations } from "./Nav.hooks";
import Chat from "../Chat";
import { IConversation } from "@/shared/typedefs";

const Nav = () => {
  const { data: user } = useQuery(GET_LOCAL_USER);
  const { signout } = useSignout();
  const chatButtonRef = useRef(null);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);

  const chatPartner = selectedConversation?.participants.find(
    (participant) => participant.id !== user.localUser?.id,
  );

  const handleConversationSelect = (conversation: IConversation) => {
    setSelectedConversation(conversation);
    setIsInboxOpen(false);
    setIsChatOpen(true);
  };

  const { conversations } = useConversations(user.localUser?.id, handleConversationSelect);

  return (
    <>
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
      <nav className="mx-6 mt-4 mb-8 flex justify-end gap-4">
        <Link href={`/`} className="text-blue">
          <Button variant={"ghost"}>DASHBOARD</Button>
        </Link>
        <Link href={"/products"} className="text-blue">
          <Button variant={"ghost"}>ALL PRODUCTS</Button>
        </Link>
        <Link href={"/products/creation"} className="text-blue">
          <Button variant={"ghost"}>ADD PRODUCT</Button>
        </Link>
        <Link href={"/products/bulk-creation"} className="text-blue">
          <Button variant={"ghost"}>BULK CREATE</Button>
        </Link>
        <Link href={`/users/${user.localUser?.id}/products/history`} className="text-blue">
          <Button variant={"ghost"}>TRANSACTIONS</Button>
        </Link>
        <Button variant={"ghost"} ref={chatButtonRef} onClick={() => setIsInboxOpen(!isInboxOpen)}>
          <MessageSquareMore color="#3d92dc" />
        </Button>
        <Button variant={"ghost"} onClick={signout} className="text-destructive">
          LOGOUT
        </Button>
      </nav>
    </>
  );
};

export default Nav;

import { UUID } from "crypto";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "@/graphql/queries/messages";

export const useMessages = (currentUserId: UUID, chatPartnerId: UUID) => {
  return useQuery(GET_MESSAGES, {
    variables: {
      participantIds: [currentUserId, chatPartnerId],
    },
    fetchPolicy: "network-only",
  });
};

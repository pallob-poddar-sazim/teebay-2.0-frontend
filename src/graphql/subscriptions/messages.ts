import { gql } from "@apollo/client";

export const MESSAGE_SENT = gql`
  subscription MessageSent($conversationId: String, $participantIds: [ID!]) {
    messageSent(
      conversationId: $conversationId
      participantIds: $participantIds
    ) {
      id
      conversation {
        id
        participants {
          id
          name
        }
      }
      sender {
        id
      }
      text
    }
  }
`;

export const MESSAGE_SENT_TO_USER = gql`
  subscription MessageSentToUser($userId: ID!) {
    messageSentToUser(userId: $userId) {
      id
      conversation {
        id
        participants {
          id
          name
        }
      }
      sender {
        id
      }
      text
    }
  }
`;

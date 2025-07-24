import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($conversationId: String, $participantIds: [ID!]) {
    getMessages(conversationId: $conversationId, participantIds: $participantIds) {
      success
      message
      data {
        id
        conversation {
          id
        }
        sender {
          id
        }
        text
      }
    }
  }
`;

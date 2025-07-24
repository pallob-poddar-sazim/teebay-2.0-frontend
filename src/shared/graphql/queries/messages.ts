import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
<<<<<<< HEAD:src/shared/graphql/queries/messages.ts
  query GetMessages($conversationId: String, $participantIds: [ID!]) {
    getMessages(conversationId: $conversationId, participantIds: $participantIds) {
=======
  query GetMessages($participantIds: [ID!]!) {
    getMessages(participantIds: $participantIds) {
>>>>>>> main:src/graphql/queries/messages.ts
      success
      message
      data {
        id
<<<<<<< HEAD:src/shared/graphql/queries/messages.ts
        conversation {
          id
        }
=======
>>>>>>> main:src/graphql/queries/messages.ts
        sender {
          id
        }
        text
      }
    }
  }
`;

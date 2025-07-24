import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($participantIds: [ID!]!) {
    getMessages(participantIds: $participantIds) {
      success
      message
      data {
        id
<<<<<<< HEAD
=======
        conversation {
          id
        }
>>>>>>> e47e558 (feat: integrate get messages api in chat service)
        sender {
          id
        }
        text
      }
    }
  }
`;

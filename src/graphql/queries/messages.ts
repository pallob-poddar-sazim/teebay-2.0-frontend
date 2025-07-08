import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($participantIds: [ID!]!) {
    getMessages(participantIds: $participantIds) {
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

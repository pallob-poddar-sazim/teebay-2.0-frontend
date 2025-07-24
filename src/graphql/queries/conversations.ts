import { gql } from "@apollo/client";

export const GET_CONVERSATIONS_BY_USER_ID = gql`
  query GetConversationsByUserId($userId: ID!) {
    getConversationsByUserId(userId: $userId) {
      success
      message
      data {
        id
        participants {
          id
          name
        }
        lastMessage {
          text
          sender {
            id
          }
        }
      }
    }
  }
`;

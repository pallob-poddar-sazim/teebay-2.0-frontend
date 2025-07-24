import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $senderId: ID!
    $text: String!
    $conversationId: String
    $participantIds: [ID!]
  ) {
    sendMessage(
      senderId: $senderId
      text: $text
      conversationId: $conversationId
      participantIds: $participantIds
    ) {
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
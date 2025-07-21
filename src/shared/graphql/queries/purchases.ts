import { gql } from "@apollo/client";

export const GET_PURCHASES_BY_USER_ID = gql`
  query GetPurchasesByUserId($userId: ID!) {
    getPurchasesByUserId(userId: $userId) {
      success
      message
      data {
        id
        product {
          id
          title
          categories {
            id
            name
          }
          description
          price
          rent
          rentOption
          seller {
            id
            name
            email
            phone
            address
          }
        }
        buyer {
          id
          name
          email
          phone
          address
        }
        createdAt
      }
    }
  }
`;

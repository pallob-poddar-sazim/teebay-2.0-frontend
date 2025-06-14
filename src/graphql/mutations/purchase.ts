import { gql } from "@apollo/client";

export const CREATE_PURCHASE = gql`
  mutation CreatePurchase($productId: ID!, $buyerId: ID!) {
    createPurchase(productId: $productId, buyerId: $buyerId) {
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

import { gql } from "@apollo/client";

export const GET_RENTALS_BY_USER_ID = gql`
  query GetRentalsByUserId($userId: ID!) {
    getRentalsByUserId(userId: $userId) {
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
        borrower {
          id
          name
          email
          phone
          address
        }
        rentStartDate
        rentEndDate
        createdAt
      }
    }
  }
`;

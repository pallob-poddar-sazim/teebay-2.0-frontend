import { gql } from "@apollo/client";

export const CREATE_RENTAL = gql`
  mutation CreateRental(
    $productId: ID!
    $borrowerId: ID!
    $rentStartDate: Date!
    $rentEndDate: Date!
  ) {
    createRental(
      productId: $productId
      borrowerId: $borrowerId
      rentStartDate: $rentStartDate
      rentEndDate: $rentEndDate
    ) {
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
      }
    }
  }
`;

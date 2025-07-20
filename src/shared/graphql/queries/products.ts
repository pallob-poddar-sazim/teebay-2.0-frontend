import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      success
      message
      data {
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
        createdAt
      }
    }
  }
`;

export const GET_MY_PRODUCTS = gql`
  query GetProductsBySellerId($sellerId: ID!) {
    getProductsBySellerId(sellerId: $sellerId) {
      success
      message
      data {
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
        createdAt
      }
    }
  }
`;

export const GET_SELECTED_PRODUCT = gql`
  query GetSelectedProduct {
    selectedProduct @client
  }
`;

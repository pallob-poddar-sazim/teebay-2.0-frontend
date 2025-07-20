import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $address: String!
    $email: String!
    $phone: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      name: $name
      address: $address
      email: $email
      phone: $phone
      password: $password
      confirmPassword: $confirmPassword
    ) {
      success
      message
      data {
        id
        name
        email
        phone
        address
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      message
      data {
        id
        name
        email
        phone
        address
      }
    }
  }
`;

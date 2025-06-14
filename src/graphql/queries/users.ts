import { gql } from "@apollo/client";

export const GET_LOCAL_USER = gql`
  query GetLocalUser {
    localUser @client
  }
`;

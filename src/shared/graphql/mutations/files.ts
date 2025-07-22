import { gql } from "@apollo/client";

export const PROCESS_CSV = gql`
  mutation ProcessCSV($key: String!) {
    processCSV(key: $key) {
      success
      message
      data {
        key
      }
    }
  }
`;

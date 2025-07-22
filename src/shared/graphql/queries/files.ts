import { gql } from "@apollo/client";

export const GET_PRESIGNED_URL = gql`
  query ($name: String!, $type: String!) {
    getPresignedUrl(name: $name, type: $type) {
      success
      message
      data {
        signedUrl
      }
    }
  }
`;

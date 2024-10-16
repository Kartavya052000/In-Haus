import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
      token
    }
  }
`;
// Login Mutation
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      token
    }
  }
`;

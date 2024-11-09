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
      points
    }
  }
`;

export const GOOGLE_MUTATION = gql`
  mutation googleSignIn($username: String!, $email: String!, $googleId: ID!) {
    googleSignIn(username: $username, email: $email, googleId: $googleId) {
      id
      username
      email
      token
    }
  }
`;


export const MY_PROFILE = gql`
  query myProfile {
    myProfile {
      id
      username
      email
      points
    }
  }
`;


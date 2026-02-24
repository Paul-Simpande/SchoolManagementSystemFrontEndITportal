import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    appUsers {
      userId
      firstName
      lastName
      email
      phone
      statusId
      schoolId
      genderId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $input: AppUserInput!
    $createdByUserId: Int!
  ) {
    createUser(
      input: $input
      createdByUserId: $createdByUserId
    ) {
      userId
      email
      firstName
      lastName
      genderId
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $input: AppUserInput!, $userId: Int!) {
    updateUser(id: $id, input: $input, userId: $userId) {
      userId
      firstName
      lastName
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!, $userId: Int!) {
    deleteUser(id: $id, userId: $userId)
  }
`;
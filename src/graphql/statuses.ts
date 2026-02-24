import { gql } from "@apollo/client"

export const GET_USER_STATUSES = gql`
    query GetAllAsync{
      userStatuses{
        statusId
        statusName
        isActive
      }
    }
`;

export const GET_GENDERS = gql`
    query GetAllAsync{
      genders{
        genderId
        genderName
      }
    }
`;
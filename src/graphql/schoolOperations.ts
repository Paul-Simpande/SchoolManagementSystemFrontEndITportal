import { gql } from "@apollo/client"

export const GET_SCHOOLS = gql`
    query GetSchools{
      schools {
        schoolId
        schoolName
        emisNumber
        district
        province
        country
      }
    }
`;
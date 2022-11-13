import { gql } from "apollo-angular";

const allPersons = gql`
  {
    peopleList {
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }
`;

export const GET_QUERY_BY_NAME = gql`
  query getPersonByName($name: String!) {
    getPersonByName(name: $name) {
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }
`;

export { allPersons };

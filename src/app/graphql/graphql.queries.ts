import { gql } from "apollo-angular";

export const ALL_PEOPLE = gql`
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
// peopleListPaged(page: 2){
//   results{
//     name
//     homeworld
//     height
//   }
// }
export const GET_QUERY_BY_PAGE = gql`
  query peopleListPaged($page: Int!) {
    peopleListPaged(page: $page) {
      next
      previous
      count
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

export const GET_PEOPLE_BY_ID = gql`
  query getPersonByID($id: ID!) {
    getPersonByID(id: $id) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;

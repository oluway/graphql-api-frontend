import  { gql }  from 'apollo-angular';

const ALL_PERSONS = gql `{
  query {
     peopleList {
        results {
            name,
            height, 
            mass,
            gender, 
            homeworld
        }
     }
  }
}`;

export { ALL_PERSONS };
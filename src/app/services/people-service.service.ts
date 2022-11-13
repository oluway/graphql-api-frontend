import { Injectable } from "@angular/core";
import { Apollo, gql, QueryRef } from "apollo-angular";

export interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

export interface PersonDetail extends Person {}

@Injectable({
  providedIn: "root",
})
export class PeopleServiceService {
  private peopleQuery: QueryRef<{ people: Person }, { offset: number }>;
  result: any;
  constructor(private apollo: Apollo) {
    this.peopleQuery = this.apollo.watchQuery({
      query: gql`
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
      `,
    });
  }

  async getPeople(offset?: number): Promise<Person> {
    this.result = await this.peopleQuery.refetch({ offset });
    return this.result;
  }
}

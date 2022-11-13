import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Apollo, gql } from "apollo-angular";
import { GET_QUERY_BY_NAME, ALL_PEOPLE } from "app/graphql/graphql.queries";
import { Person } from "../../model/person";

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.css"],
})
export class PeopleComponent implements OnInit {
  // people: any[] = [];
  loading = true;
  error: any;

  people!: Person;

  filterByName = this._fb.group({
    name: [""],
  });

  constructor(private _fb: FormBuilder, private apollo: Apollo) {}

  ngOnInit(): void {
    this.getPeople();
  }
  getPeople() {
    this.apollo
      .watchQuery({
        query: ALL_PEOPLE,
      })
      .valueChanges.subscribe((result: any) => {
        this.people = result?.data?.peopleList?.results;
        this.loading = result?.loading;
        this.error = false;
      });
  }
  queryByName() {
    this.apollo
      .watchQuery({
        query: GET_QUERY_BY_NAME,
        variables: {
          name: this.filterByName.get("name").value,
        },
      })
      .valueChanges.subscribe((result: any) => {
        this.people = result?.data?.getPersonByName?.results;
        this.loading = result?.loading;
        this.error = false;
      });
  }
  re;
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Apollo, gql } from "apollo-angular";
import {
  PeopleServiceService,
  Person,
} from "app/services/people-service.service";
import { GET_QUERY_BY_NAME } from "app/graphql/graphql.queries";

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

  constructor(
    private peopleService: PeopleServiceService,
    private _fb: FormBuilder,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.getPeople();
  }
  getPeople() {
    this.peopleService.getPeople().then((result: any) => {
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

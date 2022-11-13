import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import {
  PeopleServiceService,
  PersonDetail,
} from "app/services/people-service.service";
// import { getPersonByID } from "app/graphql/graphql.queries";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  id: any;
  data: PersonDetail;
  loading = true;
  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private peopleService: PeopleServiceService
  ) {}

  ngOnInit(): void {
    // let wow = this.peopleService.getPeople(1);
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.apollo
        .watchQuery({
          query: gql`
            query getPersonByID($id: ID!) {
              getPersonByID(id: $id) {
                name
                height
                mass
                gender
                homeworld
              }
            }
          `,
          variables: {
            id: this.id,
          },
        })
        .valueChanges.subscribe((result: any) => {
          this.data = result.data.getPersonByID;
          this.loading = result.loading;
          // this.error = false;
        });
    });
  }

  capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

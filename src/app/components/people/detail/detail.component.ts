import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import { GET_PEOPLE_BY_ID } from "app/graphql/graphql.queries";
import { PersonDetail } from "app/model/personDetails";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  id: any;
  data: PersonDetail;
  loading = true;
  error: boolean;
  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.apollo
        .watchQuery({
          query: GET_PEOPLE_BY_ID,
          variables: {
            id: this.id,
          },
        })
        .valueChanges.subscribe((result: any) => {
          this.data = result.data.getPersonByID;
          this.loading = result.loading;
          this.error = false;
        });
    });
  }

  capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

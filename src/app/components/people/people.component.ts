import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular'; 
import { ALL_PERSONS } from 'app/graphql/graphql.queries';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: ALL_PERSONS
    }).valueChanges.subscribe((result: any) => {
      console.log("Do we have result.... ", result)
      // this.people = result.
    })
  }

}

import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Apollo, gql } from "apollo-angular";
import {
  GET_QUERY_BY_NAME,
  ALL_PEOPLE,
  GET_QUERY_BY_PAGE,
} from "app/graphql/graphql.queries";
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

  public PAGESIZE: number = 10;
  public totalPage: number = 0;
  public count: number = 0;
  public currentPage: number = 1;
  public isNextable: boolean = false;
  public isPrevable: boolean = false;

  filterByName = this._fb.group({
    name: [""],
  });
  nextPageUrl: any;
  previousPageUrl: any;
  counter: number = 1;
  totalPerson: any;

  constructor(private _fb: FormBuilder, private apollo: Apollo) {}

  ngOnInit(): void {
    this.getPeople(this.currentPage);
  }
  // getPeople() {
  //   this.apollo
  //     .watchQuery({
  //       query: GET_QUERY_BY_PAGE,
  //     })
  //     .valueChanges.subscribe((result: any) => {
  //       this.people = result?.data?.peopleList?.results;
  //       this.loading = result?.loading;
  //       this.error = false;
  //     });
  // }
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

  previous() {
    // this.currentPage + 1;
    return this.currentPage-- - 1;
  }

  getPeople(pageNumber: number) {
    this.apollo
      .watchQuery({
        query: GET_QUERY_BY_PAGE,
        variables: {
          page: pageNumber,
        },
      })
      .valueChanges.subscribe((result: any) => {
        this.people = result?.data?.peopleListPaged?.results;
        this.totalPerson = result?.data?.peopleListPaged?.results.length;
        this.loading = false;
        this.nextPageUrl = result?.data?.peopleListPaged?.next;
        this.previousPageUrl = result?.data?.peopleListPaged?.previous;
        this.count = result?.data?.peopleListPaged?.count;
        this.isNextable = result?.data?.peopleListPaged?.next !== null;
        this.isPrevable = result?.data?.peopleListPaged?.previous !== null;
        this.error = false;
      });
  }
  keepIndex() {
    this.counter = this.PAGESIZE + 1;
    return this.counter;
    // console.log("PEOPLE .... ", this.counter);
  }
  nextPage() {
    this.keepIndex();
    let page_no = this.getURLParameter(this.nextPageUrl, "page");
    this.currentPage = Number(page_no);
    this.getPeople(this.currentPage);
  }
  previousPage() {
    let page_no = this.getURLParameter(this.previousPageUrl, "page");
    this.currentPage = Number(page_no);
    this.getPeople(this.currentPage);
  }

  getURLParameter(url, name) {
    return (RegExp(name + "=" + "(.+?)(&|$)").exec(url) || [, null])[1];
  }
}

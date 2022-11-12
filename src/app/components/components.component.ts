import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Apollo } from 'apollo-angular'; 
import { ALL_PERSONS } from 'app/graphql/graphql.queries';


@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {

    people: any[] = [];
    loading = true;
    error: any;



    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: {year: number, month: number};
    model: NgbDateStruct;
    constructor( private apollo : Apollo) {}

    ngOnInit(): void {
        this.apollo.watchQuery({
          query: ALL_PERSONS
        }).valueChanges.subscribe((result: any) => {
          console.log("Do we have result.... ", result)
          // this.people = result.
        })
      }
    // isWeekend(date: NgbDateStruct) {
    //     const d = new Date(date.year, date.month - 1, date.day);
    //     return d.getDay() === 0 || d.getDay() === 6;
    // }

    // isDisabled(date: NgbDateStruct, current: {month: number}) {
    //     return date.month !== current.month;
    // }

    // ngOnInit() {
    //     let input_group_focus = document.getElementsByClassName('form-control');
    //     let input_group = document.getElementsByClassName('input-group');
    //     for (let i = 0; i < input_group.length; i++) {
    //         input_group[i].children[0].addEventListener('focus', function (){
    //             input_group[i].classList.add('input-group-focus');
    //         });
    //         input_group[i].children[0].addEventListener('blur', function (){
    //             input_group[i].classList.remove('input-group-focus');
    //         });
    //     }
    // }

}

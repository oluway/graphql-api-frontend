import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PeopleComponent } from "./people.component";
import { DetailComponent } from "./detail/detail.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", component: PeopleComponent },
  { path: "people/detail/:id", component: DetailComponent },
];

@NgModule({
  declarations: [DetailComponent, PeopleComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class PeopleModule {}

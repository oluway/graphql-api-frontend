import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./components/people/people.module").then(
            (mod) => mod.PeopleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { FilterService } from "./services/filter.service";

var appRoutes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"", redirectTo: "home", pathMatch: "full"},
  {path:"**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterBarComponent,
    TaskListComponent,
    HeaderComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './components/table/table.component';
import {AppBarComponent} from "./components/app-bar/app-bar.component";

@NgModule({
  declarations: [
    TableComponent,
    AppBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }

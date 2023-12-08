import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './components/table/table.component';
import {AppBarComponent} from "./components/app-bar/app-bar.component";
import {DialogMessageComponent} from "./components/dialog-message/dialog-message.component";

@NgModule({
  declarations: [
    TableComponent,
    AppBarComponent,
    DialogMessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }

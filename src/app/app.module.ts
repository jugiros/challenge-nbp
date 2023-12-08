import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './components/table/table.component'; // Ruta correcta al componente de tabla

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }

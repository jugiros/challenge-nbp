import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppBarComponent} from "./components/app-bar/app-bar.component";
import {ProductViewComponent} from "./views/product-view/product-view.component";
import {TableComponent} from "./components/table/table.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppBarComponent,
    ProductViewComponent,
    TableComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AppBarComponent,
    ProductViewComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

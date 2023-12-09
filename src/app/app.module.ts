import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppBarComponent} from "./components/app-bar/app-bar.component";
import {ProductViewComponent} from "./views/product-view/product-view.component";
import {TableComponent} from "./components/table/table.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from "./services/product.service";
import {ProductCreateComponent} from "./views/product-create/product-create.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppBarComponent,
    ProductViewComponent,
    ProductCreateComponent,
    TableComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    AppBarComponent,
    ProductViewComponent,
    ProductCreateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ProductService
  ]
})
export class AppModule {
}

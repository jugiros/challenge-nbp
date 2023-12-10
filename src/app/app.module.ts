import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { ProductViewComponent } from './views/product-view/product-view.component';
import { ProductCreateComponent } from './views/product-create/product-create.component';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import {DialogMessageComponent} from "./components/dialog-message/dialog-message.component";
import {DialogService} from "./services/dialog.service";

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    ProductViewComponent,
    ProductCreateComponent,
    TableComponent,
    DialogMessageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [
    AppBarComponent,
    ProductViewComponent,
    ProductCreateComponent
  ],
  providers: [
    ProductService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

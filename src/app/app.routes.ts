import { Routes } from '@angular/router';
import {ProductViewComponent} from "./views/product-view/product-view.component";
import {ProductCreateComponent} from "./views/product-create/product-create.component";

export const routes: Routes = [
  { path: 'product-view', component: ProductViewComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: '', redirectTo: '/product-view', pathMatch: 'full' },
];

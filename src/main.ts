import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {ProductViewComponent} from "./app/views/product-view/product-view.component";
import {AppComponent} from "./app/app.component";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

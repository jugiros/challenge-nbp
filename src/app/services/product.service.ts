import { Injectable } from "@angular/core";
import { CrudService } from "../crud/crud.service";
import { ProductoFinanciero } from "../models/producto-financiero.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { API_PATHS } from "../config/api.config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<ProductoFinanciero> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}${API_PATHS.products}`);
  }

  override getAll(): Observable<ProductoFinanciero[]> {
    return super.getAll();
  }
}

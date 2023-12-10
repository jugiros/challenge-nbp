import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ProductoFinanciero} from "../models/producto-financiero.model";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private productoSource = new BehaviorSubject<ProductoFinanciero | null>(null);
  currentProduct = this.productoSource.asObservable();

  constructor() {}

  changeProduct(producto: ProductoFinanciero) {
    this.productoSource.next(producto);
  }
}

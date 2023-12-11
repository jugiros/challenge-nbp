import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductoFinanciero } from "../models/producto-financiero.model";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private productoSource = new BehaviorSubject<{
    producto: ProductoFinanciero | null,
    isEditing: boolean
  }>({ producto: null, isEditing: false });
  currentProduct = this.productoSource.asObservable();

  constructor() {}

  changeProduct(producto: ProductoFinanciero, isEditing: boolean) {
    this.productoSource.next({ producto, isEditing });
  }
}

import { Component } from '@angular/core';
import {ProductoFinanciero} from "../../models/producto-financiero.model";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  producto: ProductoFinanciero = new ProductoFinanciero('', '', '', '', new Date(), new Date());

  onSubmit() {
    // Lógica para enviar los datos del formulario (por ejemplo, a través de un servicio)
    // this.productService.create(this.producto);
    // this.producto = new ProductoFinanciero('', '', '', '', new Date(), new Date());
  }

  resetForm() {
    this.producto = new ProductoFinanciero('', '', '', '', new Date(), new Date());
  }
}

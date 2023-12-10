import { Component } from '@angular/core';
import { ProductoFinanciero } from '../../models/producto-financiero.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import {Router} from "@angular/router";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  producto: ProductoFinanciero = new ProductoFinanciero('', '', '', '', new Date(), new Date());
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router,
              private dialogService: DialogService) {
    this.productForm = this.formBuilder.group({
      id: [this.producto.id, Validators.required],
      name: [this.producto.name, Validators.required],
      description: [this.producto.description, Validators.required],
      logo: [this.producto.logo, Validators.required],
      date_release: [this.producto.date_release, Validators.required],
      date_revision: [this.producto.date_revision, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.producto = this.productForm.value;

      this.productService.create(this.producto).subscribe(
        (response: ProductoFinanciero) => {
          console.log('Producto creado:', response);
          this.resetForm();

          this.dialogService.showDialog('Proceso realizado de manera correcta').subscribe(() => {
            this.router.navigate(['/']);
          });
        },
        (error) => {
          this.dialogService.showDialog('Error al momento de guardar el producto');
          console.error('Error al crear el producto:', error);
        }
      );
    } else {
      this.validateAllFormFields(this.productForm);
    }
  }

  resetForm() {
    this.producto = new ProductoFinanciero('', '', '', '', new Date(), new Date());
    this.productForm.reset();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductoFinanciero } from '../../models/producto-financiero.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { ProductDataService } from '../../services/product.data.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  producto: ProductoFinanciero = new ProductoFinanciero('', '', '', '', new Date(), new Date());
  isEditing: boolean = false;
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private dialogService: DialogService,
    private productDataService: ProductDataService
  ) {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productDataService.currentProduct.subscribe(({ producto, isEditing }) => {
      if (producto) {
        this.producto = producto;
        this.productForm.patchValue(this.producto);
      }
      this.isEditing = isEditing;
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productToUpdate = this.productForm.value as ProductoFinanciero;

      const productServiceMethod = this.isEditing ? 'update' : 'create';

      this.productService[productServiceMethod](productToUpdate).subscribe(
        (response: ProductoFinanciero) => {
          console.log(`Producto ${this.isEditing ? 'editado' : 'creado'}:`, response);
          this.resetForm();

          this.dialogService.showDialog('Proceso realizado de manera correcta').subscribe(() => {
            this.router.navigate(['/']);
          });
        },
        (error) => {
          const errorMessage = this.isEditing ? 'editar' : 'guardar';
          this.dialogService.showDialog(`Error al momento de ${errorMessage} el producto`);
          console.error(`Error al ${errorMessage} el producto:`, error);
        }
      );
    } else {
      this.validateAllFormFields(this.productForm);
    }
  }

  resetForm(): void {
    this.producto = new ProductoFinanciero('', '', '', '', new Date(), new Date());
    this.productForm.reset();
  }

  validateAllFormFields(formGroup: FormGroup): void {
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

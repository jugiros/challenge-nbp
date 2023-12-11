import { Component, OnInit } from '@angular/core';
import { TableData } from '../../components/table/table.component';
import { ProductoFinanciero } from '../../models/producto-financiero.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { ProductDataService } from "../../services/product.data.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  tableData: TableData | undefined;
  productos: ProductoFinanciero[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialogService: DialogService,
    private productDataService: ProductDataService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAll().subscribe((productos: ProductoFinanciero[]) => {
      this.productos = productos;
      this.tableData = this.generateTableData(productos);
    });
  }

  generateTableData(productos: ProductoFinanciero[]): TableData {
    const headers = [
      'id',
      'Logo',
      'Nombre',
      'Descripción',
      'Fecha de Lanzamiento',
      'Fecha de Revisión',
      'Acciones'
    ];
    const rows: any[] = productos.map((producto: ProductoFinanciero) => [
      producto.id,
      producto.logo,
      producto.name,
      producto.description,
      producto.date_release,
      producto.date_revision
    ]);

    return { headers, rows };
  }

  navigateToProductCreate(): void {
    const newEmptyProduct: ProductoFinanciero = new ProductoFinanciero('', '', '', '', new Date(), new Date());
    this.productDataService.changeProduct(newEmptyProduct, false);
    this.router.navigate(['/product-create']);
  }

  confirmProductDeletion(productoArray: string[]): void {
    this.dialogService.showDialog(`¿Está seguro de eliminar el producto ${productoArray[2]}?`).subscribe(() => {
      this.deleteProduct(productoArray);
    });
  }

  updateProduct(productoArray: string[]): void {
    const productoFinanciero: ProductoFinanciero = this.createProduct(productoArray);
    this.productDataService.changeProduct(productoFinanciero, true);
    this.router.navigate(['/product-create']);
  }

  deleteProduct(productoArray: string[]): void {
    const productoFinanciero: ProductoFinanciero = this.createProduct(productoArray);
    this.productService.delete(productoFinanciero.id).subscribe(
      () => {
        this.fetchProducts();
        this.dialogService.showDialog('Producto eliminado correctamente');
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
        this.fetchProducts();
      }
    );
  }

  createProduct(productoArray: string[]): ProductoFinanciero {
    const productoFinanciero: ProductoFinanciero = new ProductoFinanciero(
      productoArray[0],
      productoArray[2],
      productoArray[3],
      productoArray[1],
      new Date(productoArray[4]),
      new Date(productoArray[5])
    );

    return productoFinanciero;
  }
}

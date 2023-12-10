import { Component, OnInit } from '@angular/core';
import { TableData } from '../../components/table/table.component';
import { ProductoFinanciero } from '../../models/producto-financiero.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import {ProductDataService} from "../../services/product.data.service";

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
    this.refreshTableData();
  }

  refreshTableData(): void {
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
    this.router.navigate(['/product-create']);
  }

  onDeleteItem(productoArray: string[]): void {
    const productoFinanciero: ProductoFinanciero = new ProductoFinanciero(
      productoArray[0],
      productoArray[2],
      productoArray[3],
      productoArray[1],
      new Date(productoArray[4]),
      new Date(productoArray[5])
    );

    this.dialogService.showDialog(`¿Está seguro de eliminar el producto ${productoFinanciero.name}?`).subscribe(() => {
      this.deleteProduct(productoFinanciero);
    });
  }

  onUpdateItem(productoArray: string[]): void {
    const productoFinanciero: ProductoFinanciero = new ProductoFinanciero(
      productoArray[0],
      productoArray[2],
      productoArray[3],
      productoArray[1],
      new Date(productoArray[4]),
      new Date(productoArray[5])
    );
    this.productDataService.changeProduct(productoFinanciero);
    this.router.navigate(['/product-create']);
  }

  deleteProduct(producto: ProductoFinanciero): void {
    this.productService.delete(producto.id).subscribe(
      () => {
        this.refreshTableData();
        this.dialogService.showDialog('Producto eliminado correctamente');
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
        this.refreshTableData();
      }
    );
  }
}

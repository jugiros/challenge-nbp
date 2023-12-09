import { Component, OnInit } from '@angular/core';
import { TableData } from '../../components/table/table.component';
import {ProductoFinanciero} from "../../models/producto-financiero.model";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  tableData: TableData | undefined;
  productos: ProductoFinanciero[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe((productos: ProductoFinanciero[]) => {
        this.productos = productos;
        this.tableData = this.generateTableData(productos);
      });
  }

  generateTableData(productos: ProductoFinanciero[]): TableData {
    const headers = ['Logo', 'Nombre', 'Descripción', 'Fecha de Lanzamiento', 'Fecha de Revisión'];
    const rows: any[] = [];

    productos.forEach((producto: ProductoFinanciero) => {
      const row = [
        producto.logo,
        producto.name,
        producto.description,
        producto.date_release,
        producto.date_revision
      ];
      rows.push(row);
    });

    return { headers, rows };
  }

  navigateToProductCreate() {
    this.router.navigate(['/product-create']);
  }
}

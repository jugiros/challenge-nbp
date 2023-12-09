import { Component, OnInit } from '@angular/core';
import { TableData } from '../../components/table/table.component';
import {ProductoFinanciero} from "../../models/producto-financiero.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  tableData: TableData | undefined;
  productos: ProductoFinanciero[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe((productos: ProductoFinanciero[]) => {
        this.productos = productos;
        this.tableData = this.generateTableData(productos);
      });
  }

  generateTableData(productos: ProductoFinanciero[]): TableData {
    const headers = ['ID', 'Nombre', 'Descripción', 'Logo', 'Fecha de Lanzamiento', 'Fecha de Revisión'];
    const rows: any[] = [];

    productos.forEach((producto: ProductoFinanciero) => {
      const row = [
        producto.id,
        producto.name,
        producto.description,
        producto.logo,
        producto.date_release,
        producto.date_revision
      ];
      rows.push(row);
    });

    return { headers, rows };
  }
}

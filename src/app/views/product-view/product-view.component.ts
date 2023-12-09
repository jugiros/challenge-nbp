import { Component } from '@angular/core';
import { TableData } from '../../components/table/table.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  tableData: TableData | undefined;

  constructor() {
    this.tableData = {
      headers: ['Name', 'Age', 'Country'],
      rows: [
        ['John Doe', 30, 'USA'],
        ['Alice Smith', 25, 'Canada'],
        ['Bob Johnson', 35, 'UK']
      ]
    };
  }
}

import { Component, Input } from '@angular/core';

interface TableData {
  headers: string[];
  rows: any[][];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() tableData: TableData | undefined;
}

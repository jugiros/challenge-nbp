import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface TableData {
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
  @Output() searchChange = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.searchChange.emit(target.value);
    }
  }

  onChangePageSize(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.pageSizeChange.emit(Number(target.value));
    }
  }
}

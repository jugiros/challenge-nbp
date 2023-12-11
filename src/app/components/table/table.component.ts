import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

export interface TableData {
  headers: string[];
  rows: any[][];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableData: TableData | undefined;
  @Output() updateItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  filteredRows: any[][] = [];
  displayedRows: any[][] = [];
  searchTerm: string = '';
  pageSize: number = 5;

  ngOnInit(): void {
    this.updateDisplayedRows();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && changes['tableData'].currentValue) {
      this.filteredRows = [...changes['tableData'].currentValue.rows];
      this.updateDisplayedRows();
    }
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.searchTerm = target.value.toLowerCase().trim();
      this.filterRows();
    }
  }

  onChangePageSize(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.pageSize = Number(target.value);
      this.updateDisplayedRows();
    }
  }

  onUpdateItem(row: any): void {
    this.updateItem.emit(row);
  }

  onDeleteItem(row: any): void {
    this.deleteItem.emit(row);
  }

  private filterRows(): void {
    if (!this.searchTerm || this.searchTerm === '') {
      this.filteredRows = [...this.tableData?.rows || []];
    } else {
      this.filteredRows = (this.tableData?.rows || []).filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(this.searchTerm))
      );
    }
    this.updateDisplayedRows();
  }

  private updateDisplayedRows(): void {
    if (this.filteredRows.length > this.pageSize) {
      this.displayedRows = this.filteredRows.slice(0, this.pageSize);
    } else {
      this.displayedRows = this.filteredRows;
    }
  }
}

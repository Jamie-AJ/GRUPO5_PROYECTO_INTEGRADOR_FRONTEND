import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements  OnInit, OnChanges{
  
  @Input() pagination:any;
  @Input() currentPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  pages: number[] = [];
  
  desde: number = 0;
  hasta: number = 0;

  ngOnInit(): void {
  
  }
  ngOnChanges(): void {
    this.desde = Math.min(Math.max(1, this.pagination.number - 2), this.pagination.totalPages - 5);
    this.hasta = Math.max(Math.min(this.pagination.totalPages, this.pagination.number + 2), 6);
    if (this.pagination.totalPages > 5) { 
      this.pages = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.pages = new Array(this.pagination.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }

}

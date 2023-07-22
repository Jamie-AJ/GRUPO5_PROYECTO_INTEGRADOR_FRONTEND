import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements  OnInit, OnChanges{
  
  @Input() pagination: any;
  @Input() urlBase: string = '';

  @Output() pageChange = new EventEmitter<number>();
  pages: number[] = [];
  
  desde: number = 0;
  hasta: number = 0;

  ngOnInit(): void {
   this.initPaginator();
  }
  ngOnChanges(changes: SimpleChanges) {
    let paginatorUpdated = changes['pagination'];
    if(paginatorUpdated.previousValue){
      this.initPaginator();
    }
  }
  private initPaginator(): void {
    //Este metodo esta calculando el numero de pagina inicial para el componente de paginacion.
    this.desde = Math.min(Math.max(1, this.pagination.number - 2), this.pagination.totalPages - 4);
    //Este metodo esta calculando el valor máximo para la variable "hasta";
    this.hasta = Math.max(Math.min(this.pagination.totalPages, this.pagination.number + 2), 6);
    
    /* This code block is responsible for generating the array of page numbers that will be displayed
    in the pagination component. */
    if (this.pagination.totalPages > 5) { 
      this.pages = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.pages = new Array(this.pagination.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }
}

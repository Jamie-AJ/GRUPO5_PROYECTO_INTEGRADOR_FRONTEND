import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements  OnInit{
  
  @Input() totalPages:any;
  @Input() currentPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  pages:number[] = [];

  ngOnInit(): void {
    
  }

  

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit{

  @Input() tabs:string[] = [];
  @Output() onTabsChange = new EventEmitter<number>();
  
  activeTabs: number = 0;
  ngOnInit(): void {
    
  }
  onTabClick(index: number){
    this.activeTabs = index;
    this.onTabsChange.emit(this.activeTabs);
  }
}

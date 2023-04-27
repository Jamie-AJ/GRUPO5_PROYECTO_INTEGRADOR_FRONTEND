import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  @Input() collapse = false;
  @Input() screenWidth = 0;

  
  getHeadClass():string{
    let styleClass: string = '';
    if(this.collapse && this.screenWidth > 768){
      styleClass = 'head-collapsed';
    }else {
      styleClass = 'head-expanded';
    }
    return styleClass;

  }
}

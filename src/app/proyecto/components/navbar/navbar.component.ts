import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  onToggleSideNav():void{
    this.toggleSidebar.emit();
  }
}

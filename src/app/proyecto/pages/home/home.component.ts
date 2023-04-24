import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSideBarOpen = false;
  isCollapsed = true;

  toggleSideBar(){
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}

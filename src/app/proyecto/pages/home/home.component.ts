import { Component } from '@angular/core';


interface SideNavToggle{
  screenWidth:number;
  isOpen:boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSideBarCollapse: boolean = false;
  screenWidth:number = 0;
  
/**
 * The function onToggleSideBar sets the screenWidth and isSideBarCollapse properties based on the data
 * passed in as a parameter.
 * @param {SideNavToggle} data - SideNavToggle object, which contains two properties:
 */
  onToggleSideBar(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideBarCollapse = data.isOpen;
  }
}

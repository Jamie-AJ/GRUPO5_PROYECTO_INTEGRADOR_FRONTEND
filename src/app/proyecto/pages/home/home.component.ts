import { Component, Input } from '@angular/core';


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

  @Input() collapse = false;
  @Input() screenWidth = 0;
  isSideBarCollapse = false;
  screenWith = 0;
  
/**
 * The function onToggleSideBar sets the screenWidth and isSideBarCollapse properties based on the data
 * passed in as a parameter.
 * @param {SideNavToggle} data - SideNavToggle object, which contains two properties:
 */
  onToggleSideBar(data:SideNavToggle):void{
    this.screenWith = data.screenWidth;
    this.isSideBarCollapse = data.isOpen;
  }

  getBodyClass(){
    let styleClass:string = '';
    if(this.collapse && this.screenWith > 768){
      styleClass = 'sidebar-open';
    }else if(this.collapse && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'sidebar-md-screen';
    }
    return styleClass;
  }
}

import { Component, Input } from '@angular/core';


interface SideNavToggle{
  screenWidth:number;
  collapse:boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isSideBarCollapse = false;
  screenWidth = 0;
  onToggleSideBar(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideBarCollapse = data.collapse;
  }
  getBodyClass(){
    let styleClass:string = '';
    if(this.isSideBarCollapse && this.screenWidth > 768){
      styleClass = 'body-open';
    }else if(this.isSideBarCollapse && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';


interface SideNavToggle{
  screenWidth:number;
  isOpen:boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {


 /* Creating an output property called `onToggleSideBar` which is an instance of the `EventEmitter`
 class with a generic type of `SideNavToggle`. This output property can emit events of type
 `SideNavToggle` which can be subscribed to by parent components. */
 @Output() onToggleSideBar: EventEmitter<SideNavToggle> = new EventEmitter();

  collapse = false;
  screenWidth = 0;

  /**
   * The function toggles the collapse state of a sidebar and emits an event with the current screen
   * width and collapse state.
   */
  toggleCollapse():void{
    this.collapse = !this.collapse;
    this.onToggleSideBar.emit({screenWidth: this.screenWidth, isOpen: this.collapse});
  }
  /**
   * This function sets the "collapse" property to false and emits an event indicating that the sidebar
   * has been closed.
   */
  closeCollapse():void{
    this.collapse = false;
    this.onToggleSideBar.emit({screenWidth: this.screenWidth, isOpen: this.collapse});
  }
}

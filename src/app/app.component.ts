import { Component, Input } from '@angular/core';

interface SideNavToggle{
  screenWidth:number;
  collapse:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'investGofrontend';
  isDarkMode= false;

  onToggleDarkMode(){
    this.isDarkMode = !this.isDarkMode;
  }

}

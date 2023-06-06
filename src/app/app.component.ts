import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Invest Go!';
  isDarkMode= false;

  onToggleDarkMode(){
    this.isDarkMode = !this.isDarkMode;
  }

}

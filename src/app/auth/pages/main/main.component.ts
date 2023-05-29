import { Component, Input, Output } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  slider = [
    {url: 'assets/img/slider01v2.png', text: '¿Listo para conseguir financiamiento o invertir?', urlAlt:'slider01'},
    {url: 'assets/img/slider02v2.png', text: '¡Diversifica e invierte en facturas negociables!', urlAlt:'slider03'},
    {url: 'assets/img/slider03v2.png', text: '¡Encuentra la solución financiera que te beneficie!', urlAlt:'slider04'},
  ]

}

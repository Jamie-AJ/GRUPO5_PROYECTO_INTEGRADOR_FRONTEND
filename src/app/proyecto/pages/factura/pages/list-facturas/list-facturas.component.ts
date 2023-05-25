import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-facturas',
  templateUrl: './list-facturas.component.html',
  styleUrls: ['./list-facturas.component.css']
})
export class ListFacturasComponent {
  title = 'Facturas de Empresas';
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

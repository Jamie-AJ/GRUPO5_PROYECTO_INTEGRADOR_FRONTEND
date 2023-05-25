import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrls: ['./add-factura.component.css']
})
export class AddFacturaComponent {
  title="Generar Factura de Empresas";

  constructor(private router: Router) { }
}

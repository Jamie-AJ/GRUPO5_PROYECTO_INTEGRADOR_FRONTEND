import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-list-facturas',
  templateUrl: './list-facturas.component.html',
  styleUrls: ['./list-facturas.component.css']
})
export class ListFacturasComponent implements OnInit {
  title = 'Facturas de Empresas';
  factura:Factura[] = [];
  tabs: string[] = ['General', 'Activos' ]
  activeTabsIndex: number = 0;


  constructor(private facturaService:FacturaService){}
  
  ngOnInit(): void {
    this.getFaturasActive();
    this.getFacturas();
  }
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }

  getFaturasActive(){
    this.facturaService.getFacturasActivas().subscribe(resp => {
      console.log(resp);
      this.factura = resp as Factura[]; 
    });
  }
  getFacturas(){
    this.facturaService.getFacturas().subscribe(resp => {
      console.log(resp);
      this.factura = resp;
    })
  }
  
}

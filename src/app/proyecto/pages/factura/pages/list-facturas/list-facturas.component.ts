import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
  facturasActivas:Factura[] = [];
  tabs: string[] = ['Todos', 'Activos' ]
  activeTabsIndex: number = 0;
  pagination: any;

  constructor(private facturaService:FacturaService, private activeRouted:ActivatedRoute){}
  
  ngOnInit(): void {
    this.getFaturasActive();
    // this.getFacturas();
    this.getFacturaspages();
  }
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
  getBadgeClass(riesgo: string): string {
    switch (riesgo) {
      case 'Activo':
        return 'text-bg-success';
      case 'No Activo':
        return 'text-bg-danger';
      default:
        return '';
    }
  }
  getFaturasActive(){
    this.facturaService.getFacturasActivas().subscribe(resp => {
      console.log(resp);
      this.facturasActivas = resp as Factura[]; 
    });
  }
  getFacturas(){
    this.facturaService.getFacturas().subscribe(resp => {
      console.log(resp);
      this.factura = resp;
    })
  }
  getFacturaspages() {
    this.activeRouted.paramMap.subscribe(params => {
      let totalPages: number = +params.get('page')!;
      if (!totalPages) {
        totalPages = 0;
      }
      this.facturaService.getFacturasPages(totalPages).subscribe(resp => {
        this.factura = resp.content as Factura[];
        this.pagination = resp;
      })
    })
  }
  
}

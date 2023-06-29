import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/interface/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  title: string = 'Listado de empresas';
  tabs: string[] = ['General', 'Activos' ]
  activeTabsIndex: number = 0;
  empresasList: Empresas[] = [];
  empresasActivas: Empresas[] = [];
  constructor(private empresaService:EmpresasService){}
  
  ngOnInit(): void {
    this.getEmpresas();
    this.getEmpresasActivasList();
  }
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
  getEmpresasActivasList() {
    this.empresaService.getEmpresasActive().subscribe(empresa =>{
      console.log(empresa);
      this.empresasActivas = empresa;
    })
  }
  getEmpresas() { 
    this.empresaService.getEmpresasAll().subscribe(empresa => { 
      console.log(empresa);
      this.empresasList = empresa;
    });
  }
}

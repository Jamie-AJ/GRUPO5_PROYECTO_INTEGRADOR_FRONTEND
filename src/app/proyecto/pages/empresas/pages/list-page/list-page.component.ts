import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresas } from 'src/app/interface/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  title: string = 'Listado de empresas';
  tabs: string[] = ['General', 'Activos']
  activeTabsIndex: number = 0;
  empresasList: Empresas[] = [];
  empresasActivas: Empresas[] = [];
  pagination: any;
  constructor(private empresaService: EmpresasService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // this.getEmpresas();
    this.getEmpresasActivasList();
    this.getEmpresasPage()
  }
  tabsChange(tab: number) {
    this.activeTabsIndex = tab;
  }
  getEmpresasActivasList() {
    this.empresaService.getEmpresasActive().subscribe(empresa => {
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
  getEmpresasPage() {
    this.activatedRouter.paramMap.subscribe((params) => {
      let totalPages: number = +params.get('page')!;
      if (!totalPages) {
        totalPages = 0;
      }
      this.empresaService.getEmpresasAllPage(totalPages).subscribe(response => {
        console.log(response);
        this.empresasList = response.content as Empresas[];
        this.pagination = response;
      });
    })

  }
  // onPageChange(page: number): void {
  //   this.currentPage = page;
  //   this.getEmpresasPage();
  // }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresas } from 'src/app/interface/empresas.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  title: string = 'Listado de empresas';
  tabs: string[] = ['Todos', 'Activos']
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
  deleteEmpresas(id:number) {
    return this.empresaService.deleteEmpresas(id).subscribe(response => { 
      console.log('Empresa eliminada');
      Swal.fire({
        title: '¿Estas seguro?',
        text: "No seras capaz de revertir esto!.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#434CE6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            response.mensaje,
            'success'
          )
        }
      })
    });
 }
}

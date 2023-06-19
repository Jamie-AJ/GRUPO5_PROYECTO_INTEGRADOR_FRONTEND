import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { Saldo } from 'src/app/interface/saldo.interface';
import { OportunidadesService } from 'src/app/services/oportunidades.service';
import { SaldoService } from 'src/app/services/saldo.service';

@Component({
  selector: 'app-oportunities',
  templateUrl: './oportunities.component.html',
  styleUrls: ['./oportunities.component.css']
})
export class OportunitiesComponent implements OnInit {
  title = 'Oportunidades de Inversión'
  public objOportunidades: Oportunidades[] = [];
  public showModal: boolean = false;
  public selectOportunity: Oportunidades = new Oportunidades();
  public isOpen: boolean[] = [false, false];
  objSaldo:Saldo = {
    idCartera:0,
    saldo:0,
  }
  
  constructor(
    private oportunidadesService: OportunidadesService,
    private saldoService:SaldoService
  ) { }

  ngOnInit(): void {
    this.getOportunidadesPorUser();
    // this.getOportunidadesPorId();
    this.getSaldo();
  }
  getSaldo() {
    this.saldoService.getDetallCartera().subscribe(resp => {
      this.objSaldo = resp;
    })
  }
  //esta función se encargar de truncar un string par una maxima longitud especifica de caracteres y añade puntos suspensivos al final.
  public truncateString(texto: string | undefined, maxLength: number): string {
    //valida si el texto es undefined o null y retorna un string vacio
    if (!texto) {
      return '';
    }
    //valida si el texto es menor al maximo de caracteres para ser truncado y retorna el texto
    if (texto.length <= maxLength) {
      return texto;
    }
    //retorna el texto truncado con los puntos suspensivos
    return texto.substring(0, maxLength) + '...';
  }
  getOportunidadesPorUser(){
    this.oportunidadesService.getOportunidadPorUsuario().subscribe(resp => {
      console.log(resp);
      this.objOportunidades = resp as Oportunidades[]; 
    })
  }
  //MODAL
  public openModal(oportunidades: Oportunidades): void {
    this.showModal = true;
    this.selectOportunity = oportunidades;
  }
  public closeModal(): void {
    this.showModal = false;
  }
  //ACORDEON
  openAccordion(index:number) {
    this.isOpen[index] = !this.isOpen[index];
  }
}

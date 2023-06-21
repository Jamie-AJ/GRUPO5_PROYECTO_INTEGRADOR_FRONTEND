import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InversionUsuario } from 'src/app/interface/oportunidad_usuario.interface';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { Saldo } from 'src/app/interface/saldo.interface';
import { OportunidadUsuarioService } from 'src/app/services/oportunidad-usuario.service';
import { OportunidadesService } from 'src/app/services/oportunidades.service';
import { SaldoService } from 'src/app/services/saldo.service';

@Component({
  selector: 'app-oportunities',
  templateUrl: './oportunities.component.html',
  styleUrls: ['./oportunities.component.css']
})
export class OportunitiesComponent implements OnInit {
  title = 'Oportunidades de Inversión'
  public showModal: boolean = false;
  public isOpen: boolean[] = [false, false];

  //CALCULOS 
  public montoInvertido: number = 0;
  public tasaAnual: number = 0;
  public tir: number = 0;
  public interesAnual: number = 0;
  public interesDiario: number = 0;
  public dailyInterestRate: number = 0;
  public estimatedEarnings: number = 0;

  public objOportunidades: Oportunidades[] = [];
  public selectOportunity: Oportunidades = new Oportunidades();
  public objInversionUsuario: InversionUsuario = new InversionUsuario();

  objSaldo:Saldo = {
    idCartera:0,
    saldo:0,
    
  }

  constructor(
    private oportunidadesService: OportunidadesService,
    private saldoService: SaldoService,
    private oportunidadesUsuarioService: OportunidadUsuarioService
  ) { }

  ngOnInit(): void {
    this.getOportunidadesPorUser();
    // this.getOportunidadesPorId();
    this.getSaldo();
    // this.getOportunidadesUsuPorIdOpor();
    this.calcularInteresesRates();
  }
  //MODAL
  public openModal(oportunidades: Oportunidades): void {
    this.showModal = true;
    this.selectOportunity = oportunidades;
    this.objInversionUsuario.oportunidadInversion = oportunidades;
    // this.getOportunidadesUsuPorIdOpor();
  }
  public closeModal(): void {
    this.showModal = false;
  }
  //ACORDEON
  openAccordion(index:number) {
    this.isOpen[index] = !this.isOpen[index];
  }
  //esta función se encargar de truncar un string par una maxima longitud especifica de caracteres y añade puntos suspensivos al final.
  public truncateString(texto: string | undefined, maxLength: number): string {
    //valida si el texto es undefined o null y retorna un string vacio
    if (!texto) return '';
    //valida si el texto es menor al maximo de caracteres para ser truncado y retorna el texto
    if (texto.length <= maxLength) return texto;
    //retorna el texto truncado con los puntos suspensivos
    return texto.substring(0, maxLength) + '...';
  }
  /*FUNCIONES CONSUMO HTTP*/
  getSaldo() {
    this.saldoService.getDetallCartera().subscribe(resp => {
      this.objSaldo = resp;
    })
  }
  
  getOportunidadesPorUser(){
    this.oportunidadesService.getOportunidadPorUsuario().subscribe(resp => {
      this.objOportunidades = resp as Oportunidades[]; 
    })
  }
  // getOportunidadesUsuPorIdOpor() {
  //   const idOportunidad = this.objInversionUsuario.idOportunidad;

  //   console.log(idOportunidad);
  //   this.oportunidadesUsuarioService.getOporUsuarioPorIdOpor(idOportunidad).subscribe(resp => { 
  //     console.log(resp);
  //   });
  // }
  calcularInteresesRates() {
    this.tir = (this.objSaldo.saldo! - this.objInversionUsuario.montoInvertido!) / this.objInversionUsuario.montoInvertido!; 
    const calculos = {
      montoInvertido: this.tir,
    }
    console.log(calculos);
  }
  postRegistrarInversionUsuario() {
    
  }
  
  
}

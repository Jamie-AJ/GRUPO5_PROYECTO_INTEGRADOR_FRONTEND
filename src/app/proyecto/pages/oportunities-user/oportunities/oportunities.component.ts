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
  public oportunidadSeleccionada:any;
  //CALCULOS 
  public montoInvertido: number ;
  public tasaDiaria: number = 0;
  public tasaMensual: number = 0;
  public tasaMensualRedondeado: number = 0;
  public tir: number = 0;
  public interesAnual: number = 0;
  public interesDiario: number = 0;
  public dailyInterestRate: number = 0;
  public estimatedEarnings: number = 0;
  public inversionPorcentaje: number = 0;
  public inversionRedondeado: number = 0;
  public recaudadoPorcentaje: number = 0;
  public recaudadoRedondeado: number = 0;
  public gananciaMaxima: number = 0;
  public gananciaRedondeado: number =0;

  public objOportunidades: Oportunidades[] = [];
  public selectOportunity: Oportunidades = new Oportunidades();
  public objInversionUsuario: InversionUsuario = new InversionUsuario();
  public oportunidadUsuario:InversionUsuario[] = [];

  objSaldo:Saldo = {
    idCartera:0,
    saldo:0,
    
  }

  constructor(
    private oportunidadesService: OportunidadesService,
    private saldoService: SaldoService,
    private oportunidadesUsuarioService: OportunidadUsuarioService
  ) { 
    this.montoInvertido = 0;
  }

  ngOnInit(): void {
    this.getOportunidadesPorUser();
    // this.getOportunidadesPorId();
    this.getSaldo();
    //this.calcularInteresesRates();
    this.calcularPorcentajeInversion();
    this.calcularPorcentajeRecaudado();
    this.calcularTasaMensual();
  }
  //MODAL
  public openModal(oportunidades: Oportunidades): void {
    this.showModal = true;
    this.selectOportunity = oportunidades;
    this.objInversionUsuario.oportunidadInversion = oportunidades;
    this.getOportunidadesUsuPorIdOpor(oportunidades);
  }
  public closeModal(): void {
    this.showModal = false;
    this.montoInvertido=0;
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
  getOportunidadesUsuPorIdOpor(oportunidadInversion:Oportunidades) {
    if (oportunidadInversion.idOportunidad === undefined) { 
      return;
    }
    this.oportunidadSeleccionada = oportunidadInversion;
    this.oportunidadesUsuarioService.getOporUsuarioPorIdOpor(oportunidadInversion.idOportunidad).subscribe(resp => { 
      const inversiones = resp as InversionUsuario[];
      this.oportunidadUsuario = inversiones;
      console.log(inversiones);
    });
  }
  calcularPorcentajeInversion(){
    const montoOportunidad = this.selectOportunity.monto!;
    this.inversionPorcentaje = (this.montoInvertido / montoOportunidad)*   100;
    this.inversionRedondeado =+ this.inversionPorcentaje.toFixed(2);
    //console.log("Monto invertido: ", this.montoInvertido);
    //console.log("Monto de la oportunidad:", this.selectOportunity.monto);
    //console.log("monto en porcentaje: " + this.inversionPorcentaje);
    //console.log("monto en porcentaje redondeado: " + this.inversionRedondeado);
  }
  calcularPorcentajeRecaudado(){
    const montoRecaudado = this.selectOportunity.montoRecaudado!;
    const montoOportunidad = this.selectOportunity.monto!;
    this.recaudadoPorcentaje = (montoRecaudado * 100) / montoOportunidad;
    this.recaudadoRedondeado =+ this.recaudadoPorcentaje.toFixed(2);
    //console.log("Monto recaudado", this.selectOportunity.montoRecaudado)
    //console.log("Monto de la oportunidad", this.selectOportunity.monto)
    //console.log("monto porcentaje:", this.recaudadoPorcentaje )
    //console.log("monto porcentaje redondeado:", this.recaudadoRedondeado)
  }
  calcularTasaMensual(){
    const tasaAnual = this.selectOportunity.rendimiento!;
    this.tasaMensual = (Math.pow( 1 + tasaAnual, 1.0/12.0 ) -1 ) * 100;
    this.tasaMensualRedondeado =+ this.tasaMensual.toFixed(2);
    console.log("tasa mensual", this.tasaMensual)

  }
  calcularGanancia(){
    const fechaInicio = this.selectOportunity.fechaRegistro? new Date(this.selectOportunity.fechaRegistro) : undefined;
    const fechaFinal = this.selectOportunity.fechaPago ? new Date(this.selectOportunity.fechaPago) : undefined;

    const tasaAnual = this.selectOportunity.rendimiento!;
    const tasaMensual = Math.pow(1+ tasaAnual, 1/12)-1;
    const tasaDiaria =  Math.pow(1+tasaMensual, 1/30)-1;
    const diasInversion = Math.floor((fechaFinal!.getTime() - fechaInicio!.getTime()) / (1000*60*60*24));
    this.gananciaMaxima = this.montoInvertido * Math.pow(1+tasaDiaria, diasInversion)- this.montoInvertido;
    this.gananciaRedondeado =+ this.gananciaMaxima.toFixed(2);
    console.log("tasa diaria", tasaDiaria)
    console.log("resta de dias", diasInversion)
    console.log("ganancia maxima", this.gananciaMaxima)
  }

  borrarValoresIniciales() {
    this.montoInvertido = NaN;
  }

  postRegistrarInversionUsuario() {
    
  }
  
  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InversionUsuario } from 'src/app/interface/oportunidad_usuario.interface';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { Saldo } from 'src/app/interface/saldo.interface';
import { OportunidadUsuarioService } from 'src/app/services/oportunidad-usuario.service';
import { OportunidadesService } from 'src/app/services/oportunidades.service';
import { SaldoService } from 'src/app/services/saldo.service';
import Swal from 'sweetalert2';
import * as customValidators from 'src/app/shared/components/validators';
import { OportunidadFactura } from 'src/app/interface/oportunidad_factura.interfce';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-oportunities',
  templateUrl: './oportunities.component.html',
  styleUrls: ['./oportunities.component.css']
})
export class OportunitiesComponent implements OnInit {
  title = 'Oportunidades de Inversión'
  //MODAL
  public showModal: boolean = false;
  //ACORDEON
  public isOpen: boolean[] = [false, false, false];
  //SELECCIONAR OPORTUNIDAD
  public oportunidadSeleccionada: any;

  //CALCULOS 
  public restante: number = 0;
  public montoInvertido: number = 0;
  // public tasaDiaria: number = 0;
  public tasaMensual: number = 0;
  public tasaMensualRedondeado: number = 0;
  public inversionPorcentaje: number = 0;
  public inversionRedondeado: number = 0;
  public recaudadoPorcentaje: number = 0;
  public recaudadoRedondeado: number = 0;
  public gananciaMaxima: number = 0;
  public gananciaRedondeado: number = 0;
  // public inversionTotal: number = 0;
  // public inversionRealizada: number = 0;
  public montoRecaudado: number = 0;
  public montoTotal: number = 0;

  // OBJETOS Y ARREGLOS
  public objOportunidades: Oportunidades[] = [];
  public selectOportunity: Oportunidades = new Oportunidades();
  public objInversionUsuario: InversionUsuario = new InversionUsuario();
  public oportunidadUsuario: InversionUsuario[] = [];
  public oportunidadFactura: OportunidadFactura[] = [];
  objSaldo: Saldo = {
    idCartera: 0,
    saldo: 0,
  }
  //VALIDAR EL ROL DEL USUARIO
  public isAdministrador = this.loginService.getUserRole() === 'ADMIN'

  constructor(
    private oportunidadesService: OportunidadesService,
    private saldoService: SaldoService,
    private oportunidadesUsuarioService: OportunidadUsuarioService,
    private builder: FormBuilder,
    private loginService: LoginService

  ) { }
  form: FormGroup = this.builder.group({
    montoInvertido: ['', [Validators.required, customValidators.validarNumerosNegativos, customValidators.validarMontoIngresado]],
  });

  ngOnInit(): void {
    this.getOportunidadesPorUser();
    // this.getOportunidadesPorId();
    this.getSaldo();
    //this.calcularInteresesRates();
    this.calcularPorcentajeInversion();
    this.calcularPorcentajeRecaudado();
    this.calcularTasaMensual();

    // this.progressBarInicio();
  }
  isValid(field: string) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;
    const errors: ValidationErrors = this.form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'montoInvalido':
          return 'El monto ingresado debe ser mayor o igual a S/.300.';
        case 'negativeNumber':
          return 'El valor ingresado no puede ser negativo.';
      }
    }
    return null;
  }
  //COLORES DE BADGES
  getBadgeClassRango(riesgo: string): string {
    switch (riesgo) {
      case 'A':
        return 'text-bg-success';
      case 'B':
        return 'text-bg-success';
      case 'C':
        return 'text-bg-warning';
      default:
        return '';
    }
  }
  //MODAL
  public openModal(oportunidades: Oportunidades): void {
    this.showModal = true;
    this.selectOportunity = oportunidades;
    this.objInversionUsuario.oportunidadInversion = oportunidades;

    this.getOportunidadesUsuPorIdOpor(oportunidades);
    // this.getOportunidadesUsuPorIdOpor();
    this.calcularRestante();
    this.calcularPorcentajeInversion();
    this.calcularMontoTotal();
    this.getFacturaPorOportunidades(oportunidades);
  }
  public closeModal(): void {
    this.showModal = false;
    this.montoInvertido = 0;
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  //ACORDEON
  openAccordion(index: number) {
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

  getOportunidadesPorUser() {
    this.oportunidadesService.getOportunidadPorUsuario().subscribe(resp => {
      this.objOportunidades = resp as Oportunidades[];
    })
  }
  getFacturaPorOportunidades(oportunidades: Oportunidades) {
    if (oportunidades.idOportunidad === undefined) {
      return;
    }
    this.oportunidadSeleccionada === oportunidades;
    this.oportunidadesService.getFacturaPorOportunidad(oportunidades.idOportunidad).subscribe(resp => {
      const factura = resp as OportunidadFactura[];
      this.oportunidadFactura = factura;
    });
  }
  getOportunidadesUsuPorIdOpor(oportunidadInversion: Oportunidades) {
    if (oportunidadInversion.idOportunidad === undefined) {
      return;
    }
    this.oportunidadSeleccionada = oportunidadInversion;
    this.oportunidadesUsuarioService.getOporUsuarioPorIdOpor(oportunidadInversion.idOportunidad).subscribe(resp => {
      const inversiones = resp as InversionUsuario[];
      this.oportunidadUsuario = inversiones;
      this.oportunidadUsuario.sort((a: any, b: any) => {
        const dataA = new Date(a.fecha);
        const dataB = new Date(b.fecha);
        return dataB.getTime() - dataA.getTime();
      })
      // this.oportunidadUsuario.reverse();
      this.oportunidadUsuario = this.oportunidadUsuario.slice(0, 5);
      console.log(inversiones);
    });
  }
  calcularPorcentajeInversion() {
    const montoOportunidad: number = this.selectOportunity.monto!;
    this.inversionPorcentaje = (this.montoInvertido / montoOportunidad) * 100;
    this.inversionRedondeado = + this.inversionPorcentaje.toFixed(2);
    //console.log("Monto invertido: ", this.montoInvertido);
    //console.log("Monto de la oportunidad:", this.selectOportunity.monto);
    //console.log("monto en porcentaje: " + this.inversionPorcentaje);
    //console.log("monto en porcentaje redondeado: " + this.inversionRedondeado);
  }
  calcularPorcentajeRecaudado() {
    const montoRecaudado:number = this.selectOportunity.montoRecaudado!;
    const montoOportunidad: number = this.selectOportunity.monto!;
    this.recaudadoPorcentaje = (montoRecaudado * 100) / montoOportunidad;
    this.recaudadoRedondeado = + this.recaudadoPorcentaje.toFixed(2);
    //console.log("Monto recaudado", this.selectOportunity.montoRecaudado)
    //console.log("Monto de la oportunidad", this.selectOportunity.monto)
    //console.log("monto porcentaje:", this.recaudadoPorcentaje )
    //console.log("monto porcentaje redondeado:", this.recaudadoRedondeado)
  }
  calcularTasaMensual() {
    const tasaAnual:number = this.selectOportunity.rendimiento!;
    this.tasaMensual = (Math.pow(1 + tasaAnual, 1.0 / 12.0) - 1) * 100;
    this.tasaMensualRedondeado = + this.tasaMensual.toFixed(2);
    // console.log("tasa mensual", this.tasaMensual)

  }
  calcularGanancia() {
    const fechaInicio: any = this.selectOportunity.fechaRegistro ? new Date(this.selectOportunity.fechaRegistro) : undefined;
    const fechaFinal: any = this.selectOportunity.fechaPago ? new Date(this.selectOportunity.fechaPago) : undefined;

    const tasaAnual: number = this.selectOportunity.rendimiento!;
    const tasaMensual: number = Math.pow(1 + tasaAnual, 1 / 12) - 1;
    const tasaDiaria: number = Math.pow(1 + tasaMensual, 1 / 30) - 1;
    const diasInversion: number = Math.floor((fechaFinal!.getTime() - fechaInicio!.getTime()) / (1000 * 60 * 60 * 24));
    this.gananciaMaxima = this.montoInvertido * Math.pow(1 + tasaDiaria, diasInversion) - this.montoInvertido;
    this.gananciaRedondeado = + this.gananciaMaxima.toFixed(2);
    console.log("tasa diaria", tasaDiaria)
    console.log("resta de dias", diasInversion)
    console.log("ganancia maxima", this.gananciaMaxima)
  }

  // borrarValoresIniciales() {
  //   this.montoInvertido = NaN;
  // }

  postRegistrarInversionUsuario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.montoInvertido >= 300) {
      const inversionUsuario: InversionUsuario = {
        idOportunidad: this.selectOportunity.idOportunidad,
        montoInvertido: this.montoInvertido,
        idEmpresa: this.selectOportunity.idEmpresa,
        ganancia: this.gananciaRedondeado,
      };
      this.oportunidadesUsuarioService.postRegistroInversionUsuario(inversionUsuario).subscribe(
        resp => {
          console.log(resp);
          Swal.fire({
            title: "Registro Exitoso",
            text: "Invirtio de manera exitosa",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            // Si se hace clic en "Aceptar"
            if (result.isConfirmed) {
              // Recargar la página
              this.form.reset();
              this.closeModal();
              window.location.reload();
            }
          });
        },
        error => {
          Swal.fire('error', error.error.mensaje, 'error')
        }

      )
    } else {
      Swal.fire('error', "El monto de inversion debe ser mayor a S/.300. ", 'error')
    }

  }
  calcularRestante() {
    const monto = this.selectOportunity.monto!;
    this.montoRecaudado = this.selectOportunity.montoRecaudado!;
    this.restante = monto - this.montoRecaudado

  }
  calcularMontoTotal() {
    this.montoTotal = this.selectOportunity.monto!;
  }

  calcularPorcentajeRecaudadoBar(objOportunidades: Oportunidades): number {

    const montoRecaudado = objOportunidades.montoRecaudado!;
    const montoOportunidad = objOportunidades.monto!;
    const recaudadoPorcentaje = (montoRecaudado * 100) / montoOportunidad;
    const recaudadoRedondeado = + recaudadoPorcentaje.toFixed(2);
    return recaudadoRedondeado;
    //console.log("Monto recaudado", this.selectOportunity.montoRecaudado)
    //console.log("Monto de la oportunidad", this.selectOportunity.monto)
    //console.log("monto porcentaje:", this.recaudadoPorcentaje )
    //console.log("monto porcentaje redondeado:", this.recaudadoRedondeado)
  }

}

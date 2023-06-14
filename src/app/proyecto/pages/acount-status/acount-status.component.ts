import { Component, OnInit, ViewChild, inject} from '@angular/core';
import { FormBuilder,FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Bancos } from 'src/app/interface/bancos.interface';
import { CuentaBancaria } from 'src/app/interface/cuentaBancaria.interface';
import { Mes, Year } from 'src/app/interface/expiration.interface';

import { Monedas } from 'src/app/interface/monedas.interface';
import { Usuario } from 'src/app/interface/usuario.interface';
import { BancoService } from 'src/app/services/banco.service';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { DateService } from 'src/app/services/date.service';
import { MonedaService } from 'src/app/services/moneda.service';

import {  cvvPattern } from 'src/app/shared/components/validators';
import * as customValidators from 'src/app/shared/components/validators';
import Swal from 'sweetalert2';
declare var $:any;


@Component({
  selector: 'app-acount-status',
  templateUrl: './acount-status.component.html',
  styleUrls: ['./acount-status.component.css']
})
export class AcountStatusComponent implements OnInit{
  title:string = 'Estado de Cuenta';
  //LISTA DE BANCOS Y MONEDAS
  cuentaBancariaList:CuentaBancaria[] = []; 
  bancos:Bancos[] = [];
  monedas:Monedas[] = [];
  mostrarFormularioDeposito:boolean = false;

  objCuentaBancaria:CuentaBancaria = {
    idCuentaBancaria:0,
    nroCuenta:'',
    cvv:'',
    mes:'',
    year:'',
    bancos:{
      idBancos:-1,
      nomBancos:'',
    },
    monedas:{
      idMonedas:-1,
      nomMonedas:'',
      valorMonedas:''
    }
  };
  //COMPORTAMIENTO DE LOS TABS
  tabs: string[] = ['Movimientos','Depositos y Retiros','Cuentas Bancaria' ]
  //TAB ACTIVO
  activeTabsIndex: number = 0;

  //USUARIO LOGEADO
  user!:Usuario;

 private bancoService = inject(BancoService);
 private cuentaBancaria= inject(CuentaBancariaService);
 
  constructor(
    private monedasService:MonedaService, 
    private builder:FormBuilder,
    private dateService:DateService){}

    form: FormGroup = this.builder.group({
      nroCuenta: ['', [Validators.required,customValidators.validarTarjetaCredito]],
      nroCuentaCci: ['', [Validators.required,customValidators.validarTarjetaCredito]],
      cvv: ['', [Validators.required,Validators.pattern(cvvPattern)]],
      mes: ['', [Validators.required]],
      year: ['', [Validators.required]],
      bancos: ['', [Validators.required]],
      monedas: ['', [Validators.required,Validators.minLength(1)]],
    });

  ngOnInit(): void {
    this.bancoService.getBancos().subscribe(bancos =>{this.bancos = bancos});
    this.monedasService.getMonedas().subscribe(monedas => {this.monedas = monedas})
    this.getCuentaBancarias();
  }
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
  //llena el select con los meses
  get meses():Mes[]{
    return this.dateService.meses;
  }
  //llena el select con los años
  get years():Year[]{
    return this.dateService.years;
  }

  //VALIDACIONES
  isValid(field: string) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;
    const errors:ValidationErrors = this.form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Debe tener Minimo ${errors['minlength']['requiredLength']} caracteres`;
        case 'pattern':
          return 'El valor ingresado no tiene formato válido';
      }
    }
    return null;
  }
  //VALIDACIONES DE LOS SELECTS
  getCuentaBancarias(){
    this.cuentaBancaria.getCuentaBancaria().subscribe(cuentaBancaria => {
      console.log(cuentaBancaria);
      this.cuentaBancariaList = cuentaBancaria;});
  }

  postCuentaBancaria(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    this.cuentaBancaria.postCuentaBancaria(this.form.value).subscribe(resp => {
      document.getElementById('btnCloseModal')?.click();
      Swal.fire('Excelente', resp.mensaje, 'success');
      this.getCuentaBancarias()
    });
  }

  desactivarCuentasBancarias(cuentaBacaria:CuentaBancaria){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentaBancaria.deleteById(cuentaBacaria.idCuentaBancaria || 0).subscribe(resp =>{
          this.getCuentaBancarias();
          Swal.fire(
            'Deleted!',
            resp.mensaje,
            'success'
          )
        }) 
      }
    })
    
  }

}

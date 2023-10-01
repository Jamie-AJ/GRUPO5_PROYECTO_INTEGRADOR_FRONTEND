import { Component, Host, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HasUnsavedChanges } from 'src/app/guards/without-unsaved-changes.guard';
import { Bancos } from 'src/app/interface/bancos.interface';
import { CuentaBancaria } from 'src/app/interface/cuentaBancaria.interface';
import { Mes, Year } from 'src/app/interface/expiration.interface';
import { Monedas } from 'src/app/interface/monedas.interface';
import { BancoService } from 'src/app/services/banco.service';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { DateService } from 'src/app/services/date.service';
import { MonedaService } from 'src/app/services/moneda.service';
import * as customValidators from 'src/app/shared/components/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit, HasUnsavedChanges{
  title = 'Estás por agregar una cuenta bancaria.'

  //LISTA DE BANCOS Y MONEDAS
  cuentaBancariaList: CuentaBancaria[] = [];
  bancos: Bancos[] = [];
  monedas: Monedas[] = [];
  // mostrarFormularioDeposito:boolean = false;

  objCuentaBancaria: CuentaBancaria = {
    idCuentaBancaria: 0,
    nroCuenta: '',
    cvv: '',
    mes: '',
    year: '',
    bancos: {
      idBancos: -1,
      nomBancos: '',
    },
    monedas: {
      idMonedas: -1,
      nomMonedas: '',
      valorMonedas: ''
    }
  };
  
    
  constructor(
    private monedasService: MonedaService,
    private bancoService: BancoService,
    private cuentaBancaria: CuentaBancariaService,
    private builder: FormBuilder,
    private router: Router,
    private dateService: DateService) { }

  form: FormGroup = this.builder.group({
    nroCuenta: ['', [Validators.required, customValidators.validarTarjetaCredito]],
    nroCuentaCci: ['', [Validators.required, customValidators.validarCuentaCCI]],
    nombreCompleto: ['', [Validators.required, Validators.pattern(customValidators.stringPattern),Validators.minLength(15)]],
    cvv: ['', [Validators.required, Validators.pattern(customValidators.cvvPattern)]],
    mes: ['', [Validators.required]],
    year: ['', [Validators.required]],
    bancos: ['', [Validators.required]],
    monedas: ['', [Validators.required, Validators.minLength(1)]],
  });

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnloadHandler(event: BeforeUnloadEvent): boolean { 
    return this.hasUnsavedChanges() === false;
  }
  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }
  
  ngOnInit(): void {
    this.bancoService.getBancos().subscribe(bancos => { this.bancos = bancos });
    this.monedasService.getMonedas().subscribe(monedas => { this.monedas = monedas })
    this.changeNameCard();
    this.changeNumberCard();
    this.dateCard();
  }
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const eventKey:string = event.key;
    if (eventKey === 'Enter') {
      this.postCuentaBancaria();
    }
  }
  //llena el select con los meses
  get meses(): Mes[] {
    return this.dateService.meses;
  }
  //llena el select con los años
  get years(): Year[] {
    return this.dateService.years;
  }

  //VALIDACIONES
  isValid(field: string) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;
    const errors: ValidationErrors = this.form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este valor es requerido.';
        case 'minlength':
          return `Debe tener Minimo ${errors['minlength']['requiredLength']} caracteres.`;
        case 'pattern':
          return 'El valor ingresado no es válido.';
      }
    }
    return null;
  }
  
  changeNameCard() {
    const nameCard: any = document.querySelector('.card__details-name');
    const inputNameCard: any = document.getElementById('nombreCompleto');
    inputNameCard.addEventListener('input', () => {
      if (inputNameCard.value === '') {
        nameCard.textContent = 'NOMBRE COMPLETO';
      } else {
        nameCard.innerText = inputNameCard.value;
      }
    })

  }
  changeNumberCard() {
    const numbercard: any = document.querySelector('.card__bank-number');
    const inputNumberCard: any = document.getElementById('nroCuenta');
    inputNumberCard.addEventListener('input', () => {
      if (inputNumberCard.value === '') {
        numbercard.textContent = '0000 0000 0000 0000';
      } else {
        numbercard.innerText = inputNumberCard.value;
      }
    });
  }
  dateCard() {
    const monthCard: any = document.querySelector('.card__month');
    const inputMonthCard: any = document.getElementById('mes');
    const yearCard: any = document.querySelector('.card__year');
    const inputYearCard: any = document.getElementById('year');
    inputMonthCard.addEventListener('change', () => {
      if (inputMonthCard.value === '') {
        monthCard.textContent = 'MM';
      } else {
        monthCard.innerText = inputMonthCard.value;
      }
    })
    inputYearCard.addEventListener('change', () => { 
      if (inputYearCard.value === '') {
        yearCard.textContent = 'YY';
      } else {
        yearCard.innerText = inputYearCard.value;
      }
    });
  }
  postCuentaBancaria() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    this.cuentaBancaria.postCuentaBancaria(this.form.value).subscribe(resp => {
      console.log('click');
      Swal.fire('Excelente', resp.mensaje, 'success');
      this.form.reset();
      this.router.navigateByUrl('/dashboard/account-status');
    });
  }
}

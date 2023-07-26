import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  selector: 'app-account-bank',
  templateUrl: './account-bank.component.html',
  styleUrls: ['./account-bank.component.css']
})
export class AccountBankComponent implements OnInit {

  cuentaBancariaList: CuentaBancaria[] = [];
  bancos: Bancos[] = [];
  monedas: Monedas[] = [];
  // display: boolean = false;

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
    private builder: FormBuilder,
    private bancoService: BancoService,
    private cuentaBancaria: CuentaBancariaService,
    private dateService: DateService) { }

  form: FormGroup = this.builder.group({
    nroCuenta: ['', [Validators.required, customValidators.validarTarjetaCredito]],
    nroCuentaCci: ['', [Validators.required, customValidators.validarTarjetaCredito]],
    cvv: ['', [Validators.required, Validators.pattern(customValidators.cvvPattern)]],
    mes: ['', [Validators.required]],
    year: ['', [Validators.required]],
    bancos: ['', [Validators.required]],
    monedas: ['', [Validators.required, Validators.minLength(1)]],
  });
  ngOnInit(): void {
    this.bancoService.getBancos().subscribe(bancos => { this.bancos = bancos });
    this.monedasService.getMonedas().subscribe(monedas => { this.monedas = monedas })
    this.getCuentaBancarias();
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
  getCuentaBancarias() {
    this.cuentaBancaria.getCuentaBancaria().subscribe(cuentaBancaria => {
      console.log(cuentaBancaria);
      this.cuentaBancariaList = cuentaBancaria;
    });
  }
  desactivarCuentasBancarias(cuentaBancaria: CuentaBancaria) {
  
      Swal.fire({
        title: '¿Estas seguro?',
        text: "No seras capaz de revertir esto!.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#434CE6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.cuentaBancaria.deleteById(cuentaBancaria.idCuentaBancaria!).subscribe(response => {
            Swal.fire(
              'Eliminado!',
              response.mensaje,
              'success'
            )
          })
        }
      })
  }
}

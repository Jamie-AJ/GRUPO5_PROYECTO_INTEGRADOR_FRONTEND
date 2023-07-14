import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CuentaBancaria } from 'src/app/interface/cuentaBancaria.interface';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import Swal from 'sweetalert2';
import * as customValidators from 'src/app/shared/components/validators';


@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})

export class DepositoComponent {
  @Output() depositoCompletado = new EventEmitter<void>();
  objTransaccion: Transaccion = new Transaccion();

  cuentabancariaCombo: CuentaBancaria[] = [];
  public loading = false;
  loadingDeposito = false;
  mensajeDeposito = 'Cargando depósito...';
  constructor(
    private cuentaBancariaService: CuentaBancariaService,
    private transaccionService: TransaccionService,
    private builder: FormBuilder,
    private router: Router,
   private activeRouted:ActivatedRoute) { }

  form: FormGroup = this.builder.group({
    monto: ['', [Validators.required, customValidators.validarNumerosNegativos]],
    idCuentaBancaria: ['', Validators.required],

  })
  ngOnInit() {
    this.obtenerCuentasBancarias();
    this.activeRouted.paramMap.subscribe(params => {
      const activeTab = params.get('activeTab');
      // Verificar el valor de activeTab y establecer el tab activo correspondiente
    });
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
        case 'negativeNumber':
          return 'El valor ingresado no puede ser negativo';
      }
    }
    return null;
  }

  obtenerCuentasBancarias() {
    this.cuentaBancariaService.getCuentaBancaria().subscribe(
      cuentas => {
        this.cuentabancariaCombo = cuentas;
        console.log(cuentas);
      },
      error => {
        console.error(error);
      }
    );
  }

  postDepositar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loadingDeposito = true;
    setTimeout(() => {
      this.transaccionService.postDeposito(this.form.value).subscribe(
        response => {
          this.loadingDeposito = false;
          Swal.fire({
            title: "Exitoso",
            text: response.mensaje,
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              //recarga la pagina
              this.form.reset();
              window.location.reload();
            }
          });
          this.finalizarDeposito();
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            console.error(error.error.mensaje);
            this.loadingDeposito = false;
          }
        }
      );
    }, 1000);
  }



  finalizarDeposito() {
    // Restablecer el estado del componente principal
    this.depositoCompletado.emit();
  }
}

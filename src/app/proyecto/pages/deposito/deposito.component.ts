import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(
    private cuentaBancariaService: CuentaBancariaService,
    private transaccionService: TransaccionService,
    private builder: FormBuilder,
    private router:Router) { }
  
    form:FormGroup = this.builder.group({
      monto: ['',[Validators.required,customValidators.validarNumerosNegativos]],
      idCuentaBancaria: ['',Validators.required],
      
    })
  ngOnInit() {
    this.obtenerCuentasBancarias();
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
      case 'negativeNumber':
        return 'El valor ingresado no puede ser negativo';
    }
  }
  return null;
}

  obtenerCuentasBancarias(){
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
    this.loading = true;
    setTimeout(() => {
    this.transaccionService.postDeposito(this.form.value).subscribe(
      response => {
        this.loading = false;
        Swal.fire('Exito', response.mensaje, 'success');
        this.finalizarDeposito();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error =>{
        console.error(error);
        if (error.status === 400) {
          console.error(error.error.mensaje);
        } else {
        }
      }
      );
    }, 2000);
  }
  


  finalizarDeposito() {
    // Restablecer el estado del componente principal
    this.depositoCompletado.emit();
  }
}

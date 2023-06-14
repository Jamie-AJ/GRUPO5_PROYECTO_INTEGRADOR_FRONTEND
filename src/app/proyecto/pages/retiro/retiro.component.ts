import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CuentaBancaria } from 'src/app/interface/cuentaBancaria.interface';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as customValidators from 'src/app/shared/components/validators';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent {
  @Output() retiroCompletado = new EventEmitter<void>();
  
   objTransaccion: Transaccion = new Transaccion();
   cuentabancariaCombo: CuentaBancaria[] = [];
  transaccion: Transaccion[] = [];
  
    constructor(private cuentaBancariaService: CuentaBancariaService, private transaccionService: TransaccionService, private builder:FormBuilder){
  }
  
  form: FormGroup = this.builder.group({
    monto: ['',[Validators.required,customValidators.validarNumerosNegativos]],
    idCuentaBancaria: ['',[Validators.required]],
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
  postRetirar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
     }

    this.transaccionService.postRetiro(this.form.value).subscribe(
      response =>{
        Swal.fire('Exito', response.mensaje, 'success');
        this.finalizarRetiro();
        // window.location.reload();
      },
      error =>{
        console.error(error);
        if (error.status === 400) {
          console.error(error.error.mensaje);
        } else {
        }
      }
    );
  }


  finalizarRetiro() {
    // Restablecer el estado del componente principal
    this.retiroCompletado.emit();
  }

}

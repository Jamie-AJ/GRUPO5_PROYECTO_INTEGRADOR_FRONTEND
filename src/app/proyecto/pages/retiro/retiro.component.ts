import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CuentaBancaria } from 'src/app/interface/cuentaBancaria.interface';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    constructor(private cuentaBancariaService: CuentaBancariaService, private transaccionService: TransaccionService){
   }

   ngOnInit() {
    this.obtenerCuentasBancarias();
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
  postRetirar(){
    this.transaccionService.postRetiro(this.objTransaccion).subscribe(
      response =>{
        Swal.fire('Retiro con Exito', response.mensaje, 'success');
        this.finalizarRetiro();
        window.location.reload();
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

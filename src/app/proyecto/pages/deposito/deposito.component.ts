import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CuentaBancaria } from 'src/app/interface/cuentaBancaria.interface';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})

export class DepositoComponent {
  @Output() depositoCompletado = new EventEmitter<void>();
  objTransaccion: Transaccion = new Transaccion();
  
  /*objTransaccion:Transaccion = {
    idCuentaBancaria:0,
    monto: 0
  };*/
  cuentabancariaCombo: CuentaBancaria[] = [];

  private router = inject(Router);
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

  postDepositar(){
    this.transaccionService.postDeposito(this.objTransaccion).subscribe(
      response =>{
        Swal.fire('Depositado con Exito', response.mensaje, 'success');
        this.finalizarDeposito();
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


  finalizarDeposito() {
    // Restablecer el estado del componente principal
    this.depositoCompletado.emit();
  }
}

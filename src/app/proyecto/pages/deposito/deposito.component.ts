import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { CuentaBancaria } from '../../../interface/cuentaBancaria.interface';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { TipoTransaccion } from '../../../interface/tipoTransaccion.interface';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {
  @Output() depositoCompletado = new EventEmitter<void>();

  private cuentaBancariaService = inject(CuentaBancariaService);
  private transaccionService = inject(TransaccionService);

  cuentaBancariaList:CuentaBancaria[] = [];
  objTransaccion:Transaccion={
    idTransaccion:0,
    monto:0,
    cuentaBancaria:{
      idCuentaBancaria:0         
    },
    tipoTransaccion:{
      idTipoTransaccion:0
    }
  }
  ngOnInit(): void {
    this.getListaCuenta();
  }
  finalizarDeposito() {
    // Restablecer el estado del componente principal
    this.depositoCompletado.emit();
  }

  getListaCuenta(){
    this.cuentaBancariaService.getCuentaBancaria().subscribe(cuenta =>{
      console.log(cuenta);
      this.cuentaBancariaList = cuenta;
    })
   }
   postDeposito(){
    this.transaccionService.postDeposito(this.objTransaccion).subscribe(transaccion =>{

    });
   }
}

import { Component, OnInit, inject } from '@angular/core';
import { Saldo } from 'src/app/interface/saldo.interface';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { SaldoService } from 'src/app/services/saldo.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit{
  
  private saldoService = inject(SaldoService);
  private transactionService = inject(TransaccionService);
  transaccion: Transaccion[] = [];

  objSaldo: Saldo = {
    idCartera: 0,
    saldo: 0,
  }
  objTransaccion:Transaccion = {
    idTransaccion:0,
    monto:0,
    fecha: new Date(),
    tipoTransaccion:{
      idTipoTransaccion:0,
      tipo:''
    },
  }
 ngOnInit(): void {
   this.saldoService.getDetallCartera().subscribe(saldo =>{
      this.objSaldo = saldo;
   })
   this.getTransacciones();
 }

 getTransacciones(){
    this.transactionService.getTransaction().subscribe(transaccion =>{
      console.log(transaccion);
      this.transaccion = transaccion;
    })
 }

}

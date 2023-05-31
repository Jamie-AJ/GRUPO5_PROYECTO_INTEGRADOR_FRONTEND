import { Component, OnInit, inject } from '@angular/core';
import { Saldo } from 'src/app/interface/saldo.interface';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { LoginService } from 'src/app/services/login.service';
import { SaldoService } from 'src/app/services/saldo.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit{
  
  private saldoService          = inject(SaldoService);
  private transactionService    = inject(TransaccionService);
  private authService           = inject(LoginService);
  

  // isModalOpen: boolean = false;
  formularioActivo: string    = ''
  mostrarLista: boolean       = true;
  isInversionista             = this.authService.getUserRole() === 'INVERSIONISTA';
  transaccion: Transaccion[]  = [];

  //VARIABLES
  showFormDeposit:boolean     = false;
  //OBJETOS
  objSaldo: Saldo = {
    idCartera: 0,
    saldo: 0,
  }
  objTransaccion:Transaccion = {
    idTransaccion:0,
    monto:0,
    fecha: new Date(),
    idTipoTransaccion:0,

  }

 ngOnInit(): void {
  if(this.authService.getUserRole() == 'INVERSIONISTA'){
    this.saldoService.getDetallCartera().subscribe(saldo =>{this.objSaldo = saldo;})

  }
  this.getTransacciones();
  
}
  mostrarFormularioRetiro(){
    this.formularioActivo = 'retiro';
    this.mostrarLista = false;
  }
  mostrarFormularioDeposito(){
    this.formularioActivo = 'deposito';
    this.mostrarLista = false;
  }
  finalizarTransaccion(){
    this.mostrarLista = true;
    this.formularioActivo = '';
  }

 //MUESTRA LAS TRANSACCIONES
 getTransacciones(){
    this.transactionService.getTransaction().subscribe(transaccion =>{
      console.log(transaccion);
      this.transaccion = transaccion;
    })
 }
}

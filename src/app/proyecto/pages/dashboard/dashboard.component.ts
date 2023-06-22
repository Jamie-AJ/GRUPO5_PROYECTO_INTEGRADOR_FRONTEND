import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Saldo } from 'src/app/interface/saldo.interface';
import { Transaccion } from 'src/app/interface/transaccion.interface';
import { SaldoService } from 'src/app/services/saldo.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  title = 'Dashboard';
  public currentMonth?: String;
  public currentYear?: Number;
  public contadorDeposito: number = 0;
  public transaccionList: Transaccion[] = [];
  objSaldo: Saldo = {
    idCartera: 0,
    saldo: 0,
  }

  public monthNames: String[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private saldoService: SaldoService,
      private transaccion:TransaccionService) { }
  ngOnInit(): void {
    this.getDate();

    this.getSaldo();
    this.getListarTransacciones();
  }

  depositoCount() {
    this.contadorDeposito++;
  }
  getDate() {
    this.monthNames;
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.currentMonth = this.monthNames[monthIndex];
    this.currentYear = currentDate.getFullYear();
  }
  getSaldo() { 
    this.saldoService.getDetallCartera().subscribe(resp => {
      this.objSaldo = resp;
      console.log(this.objSaldo);
    })
  }
  getListarTransacciones() {
    this.transaccion.getTransaction().subscribe(resp => { 
      this.transaccionList = resp;
      console.log(resp);
      this.transaccionList.sort((a:any, b:any) => {
        const dataA = new Date(a.fecha);
        const dataB = new Date(b.fecha);
        return dataB.getTime() - dataA.getTime();
      })
      this.transaccionList.reverse();
      this.transaccionList = this.transaccionList.slice(0, 5);
    });
  }
}

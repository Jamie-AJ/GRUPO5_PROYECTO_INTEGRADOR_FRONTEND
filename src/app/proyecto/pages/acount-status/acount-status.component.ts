import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bancos } from 'src/app/interface/bancos.interface';
import { CuentaBancaria } from 'src/app/interface/cuentaBancaria.interface';

import { Monedas } from 'src/app/interface/monedas.interface';
import { BancoService } from 'src/app/services/banco.service';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-acount-status',
  templateUrl: './acount-status.component.html',
  styleUrls: ['./acount-status.component.css']
})
export class AcountStatusComponent implements OnInit {

  
  bancos:Bancos[] = [];
  monedas:Monedas[] = [];
  cuentaBancariaList:CuentaBancaria[] = [];
  tabs: string[] = ['Movimientos','Depositos y Retiros','Cuentas Bancaria' ]
  activeTabsIndex: number = 0;
  id:number = 0;

  objCuentaBancaria:CuentaBancaria = {
    nroCuenta: '',
    nroCuentaCci: '',
    cvv: '',
    mes: new Date(),
    year: new Date(),
    banco: {
      idBancos: -1,
    },
    moneda:{
      idMonedas: -1,
    },
      usuario:{
        id: -1,
      }
  }

  constructor(
    private bancoService:BancoService, 
    private monedasService:MonedaService, 
    private userService:UserService,
    private cuentaBancaria:CuentaBancariaService,
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.bancoService.getBancos().subscribe(bancos =>{this.bancos = bancos});
    this.monedasService.getMonedas().subscribe(monedas => {this.monedas = monedas})
    this.cuentaBancaria.getCuentaBancaria().subscribe(cuentaBancaria => {
      console.log(cuentaBancaria);
      this.cuentaBancariaList = cuentaBancaria;
    });
    this.mesDinamico();   
    this.yearDinamico();
    this.inputNumber();
  }

  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
  //llena el select con los meses
  mesDinamico(){
    for(let i:number = 1; i <= 12; i++){
      const option = document.createElement('option');
      option.value = i.toString();
      option.innerText = i.toString();
      document.getElementById('mes')?.appendChild(option);
    } 
  }
  //llena el select con los años
  yearDinamico(){
    const date = new Date().getFullYear();
    for(let i:number = date; i <= date + 10; i++){
      const option = document.createElement('option');
      option.value = i.toString();
      option.innerText = i.toString();
      document.getElementById('year')?.appendChild(option);
    }
  }
  //valida que solo se ingresen numeros en el input
  inputNumber(){
    const input:any = document.querySelector('#cuenta');
    const cvv:any = document.querySelector('#cvv')
    input.addEventListener('keyup', (e:any) => {
      let valorInput:string = e.target.value;
      //eliminar el espacio en blanco
      input.value = valorInput.replace(/\s/g, '')
      //eliminar letras
      .replace(/\D/g, '')
      //poner espacio cada 4 numeros
      .replace(/([0-9]{4})/g, '$1 ').trim();
    });
    cvv.addEventListener('keyup', (e:any) => {
      let valorInput:string = e.target.value;
       //eliminar letras
      cvv.value = valorInput.replace(/\D/g, '').trim();
    });
  }

  postCuentaBancaria(){
    this.cuentaBancaria.postCuentaBancaria(this.id,this.objCuentaBancaria).subscribe((resp) =>{
      this.cuentaBancaria =resp;
      console.log(resp);
      alert('Cuenta Bancaria Registrada');
    }, (err) =>{
      console.log(err);
      
    });
  }
}

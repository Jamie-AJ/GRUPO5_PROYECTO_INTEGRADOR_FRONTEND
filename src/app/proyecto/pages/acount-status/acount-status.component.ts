import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acount-status',
  templateUrl: './acount-status.component.html',
  styleUrls: ['./acount-status.component.css']
})
export class AcountStatusComponent implements OnInit {

  tabs: string[] = ['Movimientos','Depositos y Retiros','Cuentas Bancaria' ]
  activeTabsIndex: number = 0;


  ngOnInit(): void {
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
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acount-status',
  templateUrl: './acount-status.component.html',
  styleUrls: ['./acount-status.component.css']
})
export class AcountStatusComponent implements OnInit {

  activeTabs: string = 'Movimientos';


  ngOnInit(): void {
    this.mesDinamico();   
    this.yearDinamico();
    this.inputNumber();
  }
  mesDinamico(){
    for(let i:number = 1; i <= 12; i++){
      const option = document.createElement('option');
      option.value = i.toString();
      option.innerText = i.toString();
      document.getElementById('mes')?.appendChild(option);
    } 
  }
  yearDinamico(){
    const date = new Date().getFullYear();
    for(let i:number = date; i <= date + 10; i++){
      const option = document.createElement('option');
      option.value = i.toString();
      option.innerText = i.toString();
      document.getElementById('year')?.appendChild(option);
    }
  }
  inputNumber(){
    const input:any = document.querySelector('#cuenta');
    input.addEventListener('keyup', (e:any) => {
      let valorInput = e.target.value;
      //eliminar el espacio en blanco
      input.value = valorInput.replace(/\s/g, '')
      //eliminar letras
      .replace(/\D/g, '')
      //poner espacio cada 4 numeros
      .replace(/([0-9]{4})/g, '$1 ').trim();
    });
  }
  onTabClick(tab: string): void {
    this.activeTabs = tab;
  }

}

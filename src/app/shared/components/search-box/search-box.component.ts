import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent  implements OnInit, OnDestroy{

  //SUBJECT ->  TIPO ESPECIAL DE OBSERVABLE QUE PERMITE VALORES PARA SER MULTICASTEADOS PARA MUCHOS OBSERVADORES
  //SON COMO LOS EVENTEMITTERS
  private debouncer:Subject<String> = new Subject();

  private debouncerSuscription:Subscription = new Subscription(); 
  @Input() placeholder: string = '';
  @Output() onDebounce = new EventEmitter<String>();

  constructor(private builder:FormBuilder){}
  ngOnInit(): void {
    //MANDAR UNA NUEVA EMISIÓN CADA VEZ QUE SE PRESIONA UNA TECLA
    this.debouncerSuscription = this.debouncer
    .pipe(
      //ESPERAR 1000 MILISEGUNDOS DESPUES DE CADA EMISIÓN
      //debounceTime -> OPERADOR DE RETRASO DE TIEMPO QUE RETRASA LA EMISIÓN DE NOTIFICACIONES DE ELEMENTOS DE UN OBSERVABLE
      debounceTime(1000)
    )
    .subscribe((value)=>{
      this.onDebounce.emit(value);
    })
  }
  //DESTRUIR EL SUBSCRIBER
  ngOnDestroy(): void {
    this.debouncerSuscription.unsubscribe();
  }
  onKeyPress(keyword: string){
    this.debouncer.next(keyword);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Monedas } from '../interface/monedas.interface';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  url:string = 'http://localhost:8091/api';

  constructor(private http:HttpClient) { }

  getMonedas():Observable<Monedas[]>{
    return this.http.get<Monedas[]>(this.url + '/listarMonedas');
  }
}

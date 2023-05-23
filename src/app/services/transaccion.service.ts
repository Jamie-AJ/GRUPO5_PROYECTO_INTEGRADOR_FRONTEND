import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoTransaccion } from '../interface/tipoTransaccion.interface';
import { Transaccion } from '../interface/transaccion.interface';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private http = inject(HttpClient);
  url: string = 'http://localhost:8091/api';
  // getTipoTransaction():Observable<TipoTransaccion>{
  // }

  getTransaction():Observable<Transaccion[]>{
    return this.http.get<Transaccion[]>(`${this.url}/user/listaTransacciones`);
  }
}

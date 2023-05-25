import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoTransaccion } from '../interface/tipoTransaccion.interface';
import { Transaccion } from '../interface/transaccion.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private http = inject(HttpClient);
  url: string = 'http://localhost:8091/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  // getTipoTransaction():Observable<TipoTransaccion>{
  // }

  getTransaction():Observable<Transaccion[]>{
    return this.http.get<Transaccion[]>(`${this.url}/user/listaTransacciones`);
  }
  postDeposito(transaccion:Transaccion):Observable<any>{
    return this.http.post<any>(`${this.url}/deposito`,transaccion,{headers:this.httpHeaders})
    .pipe(
      catchError(err =>{
        Swal.fire('Error', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
}

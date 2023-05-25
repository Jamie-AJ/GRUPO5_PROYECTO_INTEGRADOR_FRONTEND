import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError, pipe, throwError } from 'rxjs';
import { TipoTransaccion } from '../interface/tipoTransaccion.interface';
import { Transaccion } from '../interface/transaccion.interface';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private http = inject(HttpClient);
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  url: string = 'http://localhost:8091/api';


  getTransaction():Observable<Transaccion[]>{
    return this.http.get<Transaccion[]>(`${this.url}/user/listaTransacciones`);
  }
  postDeposito(transaccion:Transaccion):Observable<any>{

    return this.http.post<any>(`${this.url}/deposito`,transaccion,{headers:this.httpHeaders}).pipe(
      catchError(error =>{
        Swal.fire('Error', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }
  postRetiro(transaccion:Transaccion):Observable<any>{
    return this.http.post<any>(`${this.url}/retiro`,transaccion,{headers:this.httpHeaders}).pipe(
      catchError(error =>{
        Swal.fire('Error', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Saldo } from '../interface/saldo.interface';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {


  url:string = "http://localhost:8091/api";
  private http = inject(HttpClient);


  getDetallCartera():Observable<any>{
    return this.http.get<any>(`${this.url}/detalleCartera`).pipe(
      catchError(e =>{
        Swal.fire('Error al obtener saldo', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
}

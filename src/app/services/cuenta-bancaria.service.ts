import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CuentaBancaria } from '../interface/cuentaBancaria.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  url:string = "http://localhost:8091/api";
  
  constructor(private http:HttpClient) { }

  //LISTADO DE CUENTAS BANCARIAS ACTIVAS
  getCuentaBancaria():Observable<CuentaBancaria[]>{
    return this.http.get<CuentaBancaria[]>(`${this.url}/user/listarCuentaBancaria`).pipe(
      map((response) => response as CuentaBancaria[]),
    );
  }
  
  postCuentaBancaria(cuentaBancaria:CuentaBancaria):Observable<any>{
    return this.http.post<any>(`${ this.url }/registrarCuentaBancaria`,cuentaBancaria,{headers:this.httpHeaders}).pipe(
      catchError(err =>{
        Swal.fire('Error', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }
  deleteById(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/user/eliminarCuentaBancaria/${id}`, {headers:this.httpHeaders})
  }
}

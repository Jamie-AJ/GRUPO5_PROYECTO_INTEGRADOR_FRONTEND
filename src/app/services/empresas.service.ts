import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Empresas } from '../interface/empresas.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  url:string = 'http://localhost:8091/api';
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor( private http:HttpClient) { }

  getEmpresas():Observable<Empresas[]>{
    return this.http.get<Empresas[]>(`${this.url}/active/listaEmpresas`).pipe(
      catchError(e =>{
        Swal.fire('Error al obtener las empresas', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
  postEmpresas(empresas:Empresas):Observable<any>{
    return this.http.post<any>(`${this.url}/registrarEmpresa`,empresas,{ headers:this.httpHeaders}).
    pipe(
      catchError(err =>{
        Swal.fire('Error', err.error.mensaje, 'error');
        return throwError(err);
      })
    )
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError, of, map } from 'rxjs';
import { Empresas } from '../interface/empresas.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  url:string = 'http://localhost:8091/api';
   private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor( private http:HttpClient) { }

  private getEmpresasRequest(url: string):Observable<Empresas[]>{
    return this.http.get<Empresas[]>(url).pipe(
      catchError( () => of([]) )
    )
  }

  filterEmpresas(keyword:String):Observable<Empresas[]>{
    const url = `${this.url}/active/buscarEmpresasContains/${keyword}`
    return this.getEmpresasRequest(url).pipe(
      catchError( () => of([]) )
    );
  }
  getEmpresasActive():Observable<Empresas[]>{
    const url = `${this.url}/active/listaEmpresas`
    return this.getEmpresasRequest(url);
  }
  getEmpresasAllPage(page:number): Observable<any> {
    return this.http.get<any>(`${this.url}/buscarEmpresas/${page}`)
      .pipe(
        map((response: any) => {
          (response.content as Empresas[]).map(empresa => {
            return empresa;
          });
          return response;
        })
      );
      
  }
  getEmpresasAll(): Observable<Empresas[]> { 
    const url = `${this.url}/listaEmpresas`
    return this.getEmpresasRequest(url);
  }
  getEmpresasById(id:number):Observable<Empresas | undefined>{
    const url = `${this.url}/empresa/buscar/${id}`
    return this.http.get<Empresas>(url).pipe(
      catchError( err => 
        of(undefined))
    )
  }
  postEmpresas(empresas:Empresas):Observable<any>{
    return this.http.post<any>(`${this.url}/registrarEmpresa`,empresas).
    pipe(
      catchError(err =>{
        Swal.fire('Error', err.error.mensaje, 'error');
        return throwError(err);
      })
    )
  }
  deleteEmpresas(id: number):Observable<any> {
    return this.http.delete<any>(`${this.url}/eliminarEmpresa/${id}`).
      pipe(
        catchError(err => { 
          Swal.fire('Error', err.error.mensaje, 'error');
          return throwError(err);
        })
    )
  }
}

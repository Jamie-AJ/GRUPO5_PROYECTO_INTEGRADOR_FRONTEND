import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentaBancaria } from '../interface/cuentaBancaria.interface';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  url:string = "http://localhost:8091/api";
  constructor(private http:HttpClient) { }

  getCuentaBancaria():Observable<CuentaBancaria[]>{
    return this.http.get<CuentaBancaria[]>(this.url+"/listarCuentaBancaria");
  }
  postCuentaBancaria(idUsuario:number,cuentaBancaria:CuentaBancaria):Observable<any>{
    return this.http.post<any>(this.url+ "/" + idUsuario +"/registrarCuentaBancaria",cuentaBancaria);
  }
}

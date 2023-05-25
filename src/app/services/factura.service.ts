import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Factura } from '../interface/factura.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  url:string = "http://localhost:8091/api";
  constructor(private http:HttpClient) { }


  getFacturas():Observable<Factura[]>{
    return this.http.get<Factura[]>(`${this.url}/listaFacturas`,{headers:this.httpHeaders});
  }
  getFacturasActivas():Observable<Factura[]>{
    return this.http.get<Factura[]>(`${this.url}/active/listaFacturas`,{headers:this.httpHeaders});
  }
  postFactura(factura:Factura):Observable<any>{
    return this.http.post<any>(`${this.url}/registrarFactura`,factura,{headers:this.httpHeaders})
    .pipe(
      catchError(e =>{
        Swal.fire('Error', e.error.mensaje, 'error' );
        return throwError(e);
      })
    );
  }
}

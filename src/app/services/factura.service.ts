import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
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

    return this.http.get<Factura[]>(`${this.url}/listaFacturas`);
  }
  getFacturasActivas():Observable<Factura[]>{
    return this.http.get<Factura[]>(`${this.url}/active/listaFactura`).pipe(
      catchError(e =>{
        Swal.fire('Error al obtener las facturas', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  getFacturasXEmpresa(id:number):Observable<Factura[]>{
    return this.http.get<Factura[]>(`${this.url}/facturas/${id}`).pipe(  
      catchError( err => 
        of([] as Factura[]))
    );
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
  postAddFacturaOportunidad(idFactura:number):Observable<any>{
  const url = `${this.url}/addFactura`;
  const requestBody = { idFactura: idFactura };
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  return this.http.post<any>(url, requestBody, httpOptions);
  }

  deleteAddFacturaOportunidad(idFactura:number):Observable<any>{
    const url = `${this.url}/deleteFacturalist/${idFactura}`;
    return this.http.delete(url);

  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Oportunidades } from '../interface/oportunidades.interface';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { InversionUsuario } from '../interface/oportunidad_usuario.interface';

@Injectable({
    providedIn: 'root'
})
export class OportunidadesService {

    private http = inject(HttpClient);
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    url: string = 'http://localhost:8091/api';


    getOportunidad():Observable<Oportunidades[]>{
        return this.http.get<Oportunidades[]>(`${this.url}/listarOportunidadInversion`);

    }
    getRefrescarFacturas(): Observable<any> { 
        return this.http.get<any>(`${this.url}/refrescarListaFactura`);
    }
    getOportunidadPorUsuario(): Observable<Oportunidades[]> {
        return this.http.get<Oportunidades[]>(`${this.url}/user/listarOportunidadInversion`)
    }
    getOportunidadPorId(id: number): Observable<Oportunidades> { 
        return this.http.get<Oportunidades>(`${this.url}/user/buscarOportunidades/${id}`).
            pipe(
                catchError(e => { 
                    Swal.fire('Error', e.error.mensaje, 'error');
                    return throwError(e);
                })
            )
    }
    postOportunidad(oportunidades: Oportunidades): Observable<any> {
        return this.http.post<any>(`${this.url}/insertaOportunidadInversion`, oportunidades, { headers: this.httpHeaders }).pipe(
            catchError(error => {
                Swal.fire('OJO', 'Se debe agregar facturas para poder registrar una oportunidad', 'warning');
                return throwError(error);
            })
        );
    }
    

   
}
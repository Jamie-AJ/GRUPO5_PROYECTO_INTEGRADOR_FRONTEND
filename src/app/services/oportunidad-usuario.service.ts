import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { InversionUsuario } from '../interface/oportunidad_usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class OportunidadUsuarioService {

  private http = inject(HttpClient);
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string = 'http://localhost:8091/api';


  postRegistroInversionUsuario(inversionUsuario: InversionUsuario): Observable<any> {
    return this.http.post<any>(`${this.url}/registaInversionUsuario`, inversionUsuario, { headers: this.httpHeaders }).pipe(
      catchError(error => {
        Swal.fire('warning', error.error.mensaje, 'warning');
        return throwError(error);
      }
      ));
  }

}

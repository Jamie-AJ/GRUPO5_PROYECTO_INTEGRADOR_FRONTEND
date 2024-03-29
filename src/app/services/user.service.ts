import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

import { Observable, catchError, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../interface/usuario.interface';
import { Role } from '../interface/role.interface';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8091/api';
  constructor(private http: HttpClient) { }

  listarRoles():Observable<Role[]>{
    return this.http.get<Role[]>(`${this.url}/listarRoles`).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  getUsuarioById(id: number): Observable<Usuario | undefined>{
    return this.http.get<Usuario>(`${this.url}/buscar/${id}`).pipe(
      catchError(e => of(undefined))
    );
  }
 
  añadirUsuario(user: Usuario): Observable<any>{
    return this.http.post<any>(`${this.url}/registrar`,user).pipe(
      catchError((error):any => {
        Swal.fire('Error', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }
  actualizarUsuario(user:Usuario):Observable<any>{
    if(!user.id) throw Error("El id es requerido");
    return this.http.put<any>(`${this.url}/actualizar`,user).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
  
}

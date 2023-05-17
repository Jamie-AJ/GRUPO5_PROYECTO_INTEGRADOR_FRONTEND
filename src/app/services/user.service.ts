import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

import { Observable, catchError, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../interface/usuario.interface';
import { Role } from '../interface/role.interface';


const url = 'http://localhost:8091/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  listarRoles():Observable<Role[]>{
    return this.http.get<Role[]>(url + '/listarRoles').pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  getUsuarioById(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(url + '/buscar/' + id);
  }
  añadirUsuario(user:Usuario):Observable<any>{;
    return this.http.post<any>(url + '/registrar',user).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  actualizarUsuario(user:Usuario):Observable<any>{
    return this.http.put<any>(url + '/actualizar',user).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
  
}

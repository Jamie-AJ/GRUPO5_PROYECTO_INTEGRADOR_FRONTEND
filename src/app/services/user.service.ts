import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
// import { Usuario } from '../auth/interface/usuario.interface';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../auth/interface/usuario.interface';

const url = 'http://localhost:8091/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  añadirUsuario(user:Usuario):Observable<any>{;
    return this.http.post(url + '/registrar',user).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bancos } from '../interface/bancos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  url:string = 'http://localhost:8091/api';

  constructor(private http:HttpClient) { }

  getBancos():Observable<Bancos[]>{
    return this.http.get<Bancos[]>(this.url + '/listarBancos');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interface/role.interface';


const url = 'http://localhost:8091/api';

@Injectable({
  providedIn: 'root'
})
export class RolesService {


  constructor(private http:HttpClient) { }

}

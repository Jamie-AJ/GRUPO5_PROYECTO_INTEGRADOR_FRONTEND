import { Injectable } from '@angular/core';
import { Mes, Year } from '../interface/expiration.interface';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _meses: Mes[] =[ Mes.Enero, Mes.Febrero, Mes.Marzo, Mes.Abril, Mes.Mayo, Mes.Junio, Mes.Julio, Mes.Agosto, Mes.Septiembre, Mes.Octubre, Mes.Noviembre, Mes.Diciembre ];
  
  private _years: Year[] = [ Year.Year2023, Year.Year2024, Year.Year2025, Year.Year2026, Year.Year2027, Year.Year2028,
    Year.Year2029, Year.Year2030, Year.Year2031, Year.Year2032]
  constructor() { }

  get meses(): Mes[]{
    return [...this._meses];
  }
  get years():Year[]{
    return [...this._years];
  }
}

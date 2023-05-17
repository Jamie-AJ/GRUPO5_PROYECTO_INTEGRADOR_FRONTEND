import { Bancos } from "./bancos.interface";
import { Monedas } from "./monedas.interface";
import { Usuario } from "./usuario.interface";

export class CuentaBancaria{
    idCuentaBancaria?:number;
    nroCuenta?:string;
    nroCuentaCci?:string;
    cvv?:string;
    mes?:Date;
    year?:Date;
    banco?:Bancos;
    moneda?:Monedas;
    usuario?:Usuario;
}
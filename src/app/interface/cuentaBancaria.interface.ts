import { Bancos } from "./bancos.interface";
import { Monedas } from "./monedas.interface";
import { Usuario } from "./usuario.interface";

export class CuentaBancaria {
    idCuentaBancaria?:  number;
    nroCuenta?:         string;
    nroCuentaCci?:      string;
    cvv?:               string;
    mes?:               string;
    year?:              string;
    saldo?:             number;
    bancos?:            Bancos;
    monedas?:           Monedas;
    eneable?:           string;
    usuario?:           Usuario;
}
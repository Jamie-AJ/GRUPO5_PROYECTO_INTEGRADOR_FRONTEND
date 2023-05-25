import { CuentaBancaria } from "./cuentaBancaria.interface";
import { TipoTransaccion } from "./tipoTransaccion.interface";

export class Transaccion{
    idTransaccion?: number;
    fecha?: Date;
    monto?: number;
    tipoTransaccion?: TipoTransaccion;
    idTipoTransaccion?: number;
    cuentaBancaria?:CuentaBancaria;
    idCuentaBancaria?: number;
}
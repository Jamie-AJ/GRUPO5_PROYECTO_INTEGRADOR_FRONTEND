import { Empresas } from "./empresas.interface";

export interface Factura {
    idFactura?:     number;
    monto?:         number;
    fechaEmision?:  Date;
    fechaPago?:     Date;
    codFactura?: string;
    enable?:        string;
    descripcion?:   string;
    empresas?:       Empresas;
    idEmpresa?:     number;
}
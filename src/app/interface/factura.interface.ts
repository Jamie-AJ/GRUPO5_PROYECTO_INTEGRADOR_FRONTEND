import { Empresas } from "./empresas.interface";

export class Factura {
    idFactura?:     number;
    monto?:         number;
    fechaEmision?:  Date;
    fechaPago?:     Date;
    codFactura?: string;
    enable?:        string;
    descripcion?:   string;
    empresa?:       Empresas;
    // idEmpresa?:     number; //  1*1
}

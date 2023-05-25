import { Empresas } from "./empresas.interface";

export class Factura {
    idFactura?:     number;
    monto?:         number;
    fechaEmision?:  Date;
    fechaPago?:     Date;
    codigoFactura?: string;
    enable?:        string;
    descripcion?:   string;
    empresa?:       Empresas;
    idEmpresa?:     number;
}
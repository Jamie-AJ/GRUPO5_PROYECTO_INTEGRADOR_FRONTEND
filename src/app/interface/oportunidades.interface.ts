import { Empresas } from "./empresas.interface";
import { Factura } from "./factura.interface";
import { Usuario } from "./usuario.interface";

export class Oportunidades {
    idOportunidad?:  number;
    rendimiento?:    number;
    tir?:            number;
    monto?:          number;
    montoRecaudado?: number;
    fechaCaducidad?: Date;
    fechaRegistro?:  Date;
    enable?:         string;
    fechaPago?:      Date;
    empresa?:        Empresas;
    idEmpresa?:      number;
    facturas?:        Factura;
    idFactura?:      number;
    usuario?:        Usuario;
    usuarioId?:      number;
    // oportunidadFactura?: any;
}
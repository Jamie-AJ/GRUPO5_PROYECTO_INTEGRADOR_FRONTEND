import { Factura } from "./factura.interface";
import { Oportunidades } from "./oportunidades.interface";

export interface OportunidadFactura {
    idOportunidadFactura?: number;
    oportunidadInversion?: Oportunidades;
    idOportunidad?:        number;
    factura?:              Factura;
    idFactura?:            number;
}

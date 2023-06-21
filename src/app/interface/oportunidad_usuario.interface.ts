import { Empresas } from './empresas.interface';
import { Oportunidades } from './oportunidades.interface';
import { Usuario } from './usuario.interface';

export class InversionUsuario {
    idOportunidadUsuario?: number;
    oportunidadInversion?: Oportunidades;
    idOportunidad?:        number;
    montoInvertido?:       number;
    ganancia?:             number;
    estado?:               string;
    fecha?:                string;
    empresa?:              Empresas;
    idEmpresa?:            number;
    usuario?:              Usuario;
    usuarioId?:            number;
}
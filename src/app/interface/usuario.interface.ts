import { Role } from "./role.interface";

export class Usuario{
    id?:number;
    nombre?:string;
    apellidoMa?:string;
    apellidoPa?:string;
    correo?:string;
    username?:string;
    password?:string;
    telefono?:string;
    fecha?:Date; 
    dni?:string;
    enable?:string;  
    // rol?:Role;
}
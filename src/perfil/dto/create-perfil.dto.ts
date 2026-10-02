import { Estado } from "../enums/estado.enum";
import { PerfilPreferencia } from "../entities/perfil-preferencia.entity";
import { Persona } from "../entities/persona.entity";

export class CreatePerfilDto {
    alias: string;
    nombre: string;
    apellido: string;
    email: string;
    paisResidencia: number;
    estado: Estado;
    idiomasHablados: string[];
    nivelesHablados: number[]; 
    idiomasAprendiendo: string[];
    nivelesAprendidos: number[];
    preferencia: PerfilPreferencia;
    contactos: Persona[];
}

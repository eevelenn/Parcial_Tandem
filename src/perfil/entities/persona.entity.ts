import { Estado } from "../enums/estado.enum";
import { IdiomaPersona } from "../idioma/entities/idioma-persona";
import { Pais } from "../pais/entities/pais.entity";
import { PerfilPreferencia } from "./perfil-preferencia.entity";

export class Persona {
    alias: string;
    nombre: string;
    apellido: string;
    email: string;
    paisResidencia: Pais;
    estado: Estado;
    idiomasHablados: IdiomaPersona[];
    idiomasAprendiendo: IdiomaPersona[];
    tandem: boolean;
    preferencia: PerfilPreferencia;
    contactos: Persona[];
}
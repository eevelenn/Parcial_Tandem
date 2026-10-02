import { Estado } from "../enums/estado.enum";
import { IdiomaPersona } from "../idioma/entities/idioma-persona";
import { Idioma } from "../idioma/entities/idioma.entity";
import { Pais } from "./pais.entity";

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
}
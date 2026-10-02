import { Estado } from "../enums/estado.enum";
import { Pais } from "../entities/pais.entity";

export class CreatePerfilDto {
    alias: string;
    nombre: string;
    apellido: string;
    email: string;
    paisResidencia: Pais;
    estado: Estado;
    idiomasHablados: string[];
    idiomasAprendiendo: string[];
}

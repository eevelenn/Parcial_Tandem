import { Persona } from "../../entities/persona.entity";
import { IdiomaService } from "../idioma.service";

export class CargarCatalogoDto {
    idiomas: IdiomaService[];
    persona: Persona;
}
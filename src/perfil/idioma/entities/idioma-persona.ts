import { Persona } from "../../entities/persona.entity";
import { Nivel } from "../../enums/nivel.enum";
import { Idioma } from "./idioma.entity";

export class IdiomaPersona {
    idioma: Idioma;
    persona: Persona;
    nivel: Nivel;
}
import { EleccionConversacion } from "../enums/eleccion-conversacion.enum";
import { Modo } from "../enums/modo.enum";

export class PerfilPreferencia {
    conversacion: EleccionConversacion;
    conversacionActiva: number;
    modo: Modo;
}

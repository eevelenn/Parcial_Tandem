import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Persona } from './entities/persona.entity';
import { IdiomaPersona } from './idioma/entities/idioma-persona';
import { Idioma } from './idioma/entities/idioma.entity';
import { Nivel } from './enums/nivel.enum';
import { IdiomaService } from './idioma/idioma.service';
import { Estado } from './enums/estado.enum';
import { PaisService } from './pais/pais/pais.service';

@Injectable()
export class PerfilService {
  static perfiles: Persona[] = [];
  static alias: string[] = [];

  constructor(private readonly paisService: PaisService, private readonly idiomaService: IdiomaService){}

  create(createPerfilDto: CreatePerfilDto) {
    const pais = this.paisService.findOne(createPerfilDto.paisResidencia);
    
    const newPerfil = new Persona;
    newPerfil.alias = createPerfilDto.alias;
    
    if (!PerfilService.alias.includes(newPerfil.alias)) {
      PerfilService.alias.push(newPerfil.alias);
    }else{
      console.log("Ya está usado el alias");
    }

    newPerfil.nombre = createPerfilDto.nombre;
    newPerfil.apellido = createPerfilDto.apellido;
    newPerfil.email = createPerfilDto.email;
    newPerfil.paisResidencia = pais;
    newPerfil.estado = createPerfilDto.estado;
    const estadoDelPerfil = this.verificarEstadoUsuario(newPerfil);
    if (estadoDelPerfil){ //si devuelve true, es decir que no está suspendida, entonces permite la personalización de conversacion
      newPerfil.preferencia.conversacion = createPerfilDto.preferencia.conversacion;
      newPerfil.preferencia.conversacionActiva = createPerfilDto.preferencia.conversacionActiva;
      newPerfil.preferencia.modo = createPerfilDto.preferencia.modo;
    }

    const newIdioma1Persona = new IdiomaPersona;
    newIdioma1Persona.idioma = this.idiomaService.findOne(createPerfilDto.idiomasHablados[0]); 
    newIdioma1Persona.nivel = Nivel.A1;
    newIdioma1Persona.persona = newPerfil;

    newPerfil.idiomasHablados.push(newIdioma1Persona);

    const newIdiomaAprender = new IdiomaPersona;
    newIdiomaAprender.idioma = this.idiomaService.findOne(createPerfilDto.idiomasAprendiendo[0]); 
    newIdiomaAprender.nivel = Nivel.A2;
    newIdiomaAprender.persona = newPerfil;

    createPerfilDto.idiomasHablados.forEach((idIdioma) => {
      const newIdioma1Persona = new IdiomaPersona;
      newIdioma1Persona.idioma = this.idiomaService.findOne(idIdioma); 
      newIdioma1Persona.nivel = Nivel.A1;
      newIdioma1Persona.persona = newPerfil;

      newPerfil.idiomasHablados.push(newIdioma1Persona);
    })
    
    const hay = newPerfil.idiomasHablados.some((i) => i.idioma.abreviatura == newIdiomaAprender.idioma.abreviatura);
    if (
      !hay //si no habla el idioma
      && newPerfil.idiomasAprendiendo.length <= 3 //si esta aprendiendo tres o menos idiomas
      && newPerfil.idiomasHablados.length >= 1 //si habla al menos un idioma
      && IdiomaService.idiomas.some((i) => i.abreviatura == newIdiomaAprender.idioma.abreviatura) //si el idioma se encuentra dentro del catalogo
    ) {
      newIdiomaAprender.idioma = this.idiomaService.findOne(createPerfilDto.idiomasAprendiendo[0]); 
      newIdiomaAprender.nivel = Nivel.A2;
      newIdiomaAprender.persona = newPerfil;

      newPerfil.idiomasAprendiendo.push(newIdiomaAprender);
    }else{
      console.log("No es posible. Elimina uno."); //lo eliminaria con la funcion de remove
    }
    
    PerfilService.perfiles.push(newPerfil);
  }

  verificarEstadoUsuario(perfil: Persona){
    let puede: boolean;
    if (perfil.estado == Estado.SUSPENDIDA) {
      perfil.contactos = []; //aca le defino que si está suspendido la lista de contactos
      puede = false;
    } else {
      puede = true;
    }

    return puede;
  }

  findAll() {
    return PerfilService.perfiles;
  }

  findOne(id: string) {
    const perfil = PerfilService.perfiles.find((p) => p.alias == id);
    if (!perfil) {
      throw new NotFoundException();
    }
    return perfil;
  }

  update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return `This action updates a #${id} perfilPreferencia`;
  }

  remove(id: string) {
    PerfilService.perfiles.find((p) => p.alias == id);
    return true;
  }
}

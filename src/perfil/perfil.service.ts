import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Persona } from './entities/persona.entity';
import { Pais } from './entities/pais.entity';
import { IdiomaPersona } from './idioma/entities/idioma-persona';
import { Idioma } from './idioma/entities/idioma.entity';
import { Nivel } from './enums/nivel.enum';
import { contain } from 'supertest/lib/cookies';

@Injectable()
export class PerfilService {
  static perfiles: Persona[] = [];
  static alias: string[] = [];

  create(createPerfilDto: CreatePerfilDto) {
    const newPais = new Pais;
    newPais.nombre = "Argentina";
    
    const newPerfil = new Persona;
    newPerfil.alias = "eve";
    
    if (!PerfilService.alias.includes(newPerfil.alias)) {
      PerfilService.alias.push(newPerfil.alias);
    }else{
      console.log("Ya está usado el alias");
    }

    newPerfil.nombre = "Evelyn";
    newPerfil.apellido = "Cuellar";
    newPerfil.email = "abc@gmail.com";
    newPerfil.paisResidencia = newPais;

    const idiomaHablado1 = new Idioma;
    const idiomaHablado2 = new Idioma;
    idiomaHablado1.nombre = "Español";
    idiomaHablado1.abreviatura = "ES";
    idiomaHablado2.nombre = "Chino";
    idiomaHablado2.abreviatura = "CH";

    const idiomaAprender = new Idioma;
    idiomaAprender.nombre = "Aleman";
    idiomaAprender.abreviatura = "AL";

    const newIdioma1Persona = new IdiomaPersona;
    newIdioma1Persona.idioma = idiomaHablado1; 
    newIdioma1Persona.nivel = Nivel.A1;
    newIdioma1Persona.persona = newPerfil;

    const newIdioma2Persona = new IdiomaPersona;
    newIdioma2Persona.idioma = idiomaHablado2; 
    newIdioma2Persona.nivel = Nivel.B2;
    newIdioma2Persona.persona = newPerfil;


    const idiomasHabladosPorUsuario = [newIdioma1Persona, newIdioma2Persona];
    
    const hay = idiomasHabladosPorUsuario.some((i) => i.idioma.abreviatura == idiomaAprender.abreviatura);
    if (!hay) {
      newPerfil.idiomasAprendiendo.push(idiomaAprender);
      newPerfil.idiomasAprendiendo.nivel = Nivel.A1;
      newPerfil.idiomasAprendiendo.persona = newPerfil;
    }
   
    
    PerfilService.perfiles.push(newPerfil);
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

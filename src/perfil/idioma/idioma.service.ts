import { Injectable, NotFoundException } from '@nestjs/common';
import { Idioma } from './entities/idioma.entity';

@Injectable()
export class IdiomaService {
    static idiomas: Idioma[] = [
        new Idioma("Español", "ES"),
        new Idioma("Inglés", "IN"),
        new Idioma("Aleman", "AL"),
        new Idioma("Chino", "CH")
    ];

    findOne(id: string) {
    const idioma = IdiomaService.idiomas.find((i) => i.abreviatura == id);
    if (!idioma) {
        throw new NotFoundException();
    }
    return idioma;
    }
}


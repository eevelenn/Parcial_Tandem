import { Injectable, NotFoundException } from '@nestjs/common';
import { Pais } from '../entities/pais.entity';

@Injectable()
export class PaisService {
    static paises: Pais[] = [new Pais(1, "Argentina")];

    findOne(id: number) {
    const pais = PaisService.paises.find((p) => p.id == id);
    if (!pais) {
        throw new NotFoundException();
    }
    return pais;
    }
}

import { Injectable } from '@nestjs/common';
import { CargarCatalogoDto } from './dto/cargar-catalogo.dto';
import { Idioma } from './entities/idioma.entity';

@Injectable()
export class IdiomaService {
    private idiomas: Idioma[] = [];

    cargarCatalogo(cargarCatalogoDto: CargarCatalogoDto) {
        const espaniol = new Idioma;
        espaniol.nombre = "Español";
        espaniol.abreviatura = "ES";
        const ingles = new Idioma;
        ingles.nombre = "Ingles";
        ingles.abreviatura = "IN";
        const aleman = new Idioma;
        aleman.nombre = "Aleman";
        aleman.abreviatura = "AL";
        const chino = new Idioma;
        chino.nombre = "Chino";
        chino.abreviatura = "CH";

        this.idiomas.push(espaniol);
        this.idiomas.push(ingles);
        this.idiomas.push(aleman);
        this.idiomas.push(chino);
    }

    findAll() {
        return this.idiomas; //devuelve el catalogo d idiomas
    }
}


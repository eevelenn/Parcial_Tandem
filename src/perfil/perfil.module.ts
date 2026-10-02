import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { IdiomaService } from './idioma/idioma.service';

@Module({
  controllers: [PerfilController],
  providers: [PerfilService, IdiomaService],
})
export class PerfilModule {}

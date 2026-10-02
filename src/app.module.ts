import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilModule } from './perfil/perfil.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [PerfilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { Servicio } from '../servicio/entities/servicio.entity';
import { ProfesionalService } from './profesional.service';
import { ProfesionalController } from './profesional.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profesional, Servicio])],
  controllers: [ProfesionalController],
  providers: [ProfesionalService],
})
export class ProfesionalModule {}

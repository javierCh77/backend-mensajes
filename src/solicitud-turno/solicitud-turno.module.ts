import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudTurno } from './entities/solicitud-turno.entity';
import { SolicitudesTurnoService } from './solicitud-turno.service';
import { SolicitudesTurnoController } from './solicitud-turno.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudTurno])],
  controllers: [SolicitudesTurnoController],
  providers: [SolicitudesTurnoService],
})
export class SolicitudTurnoModule {}

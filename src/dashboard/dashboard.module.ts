import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SolicitudTurnoModule } from '../solicitud-turno/solicitud-turno.module'; // ✅ Importás el módulo que exporta el servicio

@Module({
  imports: [SolicitudTurnoModule], // ✅ Necesario para usar SolicitudesTurnoService
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

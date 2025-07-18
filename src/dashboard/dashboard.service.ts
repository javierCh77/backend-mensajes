import { Injectable } from '@nestjs/common';
import { SolicitudesTurnoService } from '../solicitud-turno/solicitud-turno.service';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(
    private readonly solicitudTurnoService: SolicitudesTurnoService,
  ) {}

  async getResumen() {
    const hoy = new Date();

    const mensajesHoy = await this.solicitudTurnoService.contarEntreFechas(
      startOfDay(hoy),
      endOfDay(hoy),
    );

    const mensajesPendientes = await this.solicitudTurnoService.contarPorEstado('pendiente');
    const mensajesAsignados = await this.solicitudTurnoService.contarPorEstado('asignado');

    const respuestasIA = 5; // placeholder
    const tiempoPromedioRespuesta = '0m 20s'; // placeholder
    const porcentajeExitoIA = 98; // placeholder

    const ultimosMensajes = await this.solicitudTurnoService.obtenerUltimos(5);

    const mensajesUltimos7Dias = await this.solicitudTurnoService.contarPorFechaUltimos7Dias();
    const mensajesPorEstadoUltimos7Dias = await this.solicitudTurnoService.contarPorEstadoYFechaUltimos7Dias();
    const estadosDetalle = await this.solicitudTurnoService.obtenerResumenPorEstado();

    return {
      mensajesHoy,
      respuestasIA,
      tiempoPromedioRespuesta,
      porcentajeExitoIA,
      mensajesPendientes,
      mensajesAsignados,
      mensajesUltimos7Dias,
      mensajesPorEstadoUltimos7Dias,
      mensajesPorHora: [
        { hora: "08:00", cantidad: 1 },
        { hora: "09:00", cantidad: 2 },
        { hora: "10:00", cantidad: 0 },
        { hora: "11:00", cantidad: 0 },
        { hora: "12:00", cantidad: 8 },
        { hora: "13:00", cantidad: 7 },
        { hora: "14:00", cantidad: 5 },
        { hora: "15:00", cantidad: 0 },
        { hora: "16:00", cantidad: 0 },
        { hora: "17:00", cantidad: 0 },
        { hora: "18:00", cantidad: 0 },
        { hora: "19:00", cantidad: 0 },
        { hora: "20:00", cantidad: 0 },
      ],
      
      mensajesPorMes: [
        { mes: "Enero", cantidad: 120 },
        { mes: "Febrero", cantidad: 98 },
        { mes: "Marzo", cantidad: 132 },
        { mes: "Abril", cantidad: 87 },
        { mes: "Mayo", cantidad: 150 },
        { mes: "Junio", cantidad: 123 },
        { mes: "Julio", cantidad: 165 },
        { mes: "Agosto", cantidad: 0 },
        { mes: "Septiembre", cantidad: 0 },
        { mes: "Octubre", cantidad: 0 },
        { mes: "Noviembre", cantidad: 0 },
        { mes: "Diciembre", cantidad: 0 },
      ],
      mensajesPorCanal: [], // opcional
      estadosDetalle,
      ultimosMensajes,
    };
  }
}

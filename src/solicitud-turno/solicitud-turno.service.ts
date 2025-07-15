import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { SolicitudTurno } from './entities/solicitud-turno.entity';
import { CreateSolicitudTurnoDto } from './dto/create-solicitud-turno.dto';
import { UpdateSolicitudTurnoDto } from './dto/update-solicitud-turno.dto';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

@Injectable()
export class SolicitudesTurnoService {
  constructor(
    @InjectRepository(SolicitudTurno)
    private readonly repo: Repository<SolicitudTurno>,
  ) {}

  // Crear solicitud
  create(dto: CreateSolicitudTurnoDto) {
    const nueva = this.repo.create(dto);
    return this.repo.save(nueva);
  }

  // Buscar todas
  findAll() {
    return this.repo.find({ order: { fechaSolicitud: 'DESC' } });
  }

  // Buscar una
  async findOne(id: string) {
    const solicitud = await this.repo.findOneBy({ id });
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    return solicitud;
  }

  async update(id: string, dto: UpdateSolicitudTurnoDto) {
    const solicitud = await this.findOne(id);
    Object.assign(solicitud, dto);
  
    if (dto.estado) {
      solicitud.fechaModificacion = new Date();
      solicitud.usuarioModificacion = dto.usuarioModificacion;
    }
  
    if (dto.fechaHoraTurno) {
      solicitud.fechaHoraTurno = new Date(dto.fechaHoraTurno);
    }
  
    return this.repo.save(solicitud);
  }

  // Eliminar
  async remove(id: string) {
    const solicitud = await this.findOne(id);
    return this.repo.remove(solicitud);
  }

  // 🔢 Cantidad por estado
  async contarPorEstado(estado: string): Promise<number> {
    return this.repo.count({ where: { estado } });
  }

  // 🔢 Cantidad entre fechas
  async contarEntreFechas(desde: Date, hasta: Date): Promise<number> {
    return this.repo.count({
      where: { fechaSolicitud: Between(desde, hasta) },
    });
  }

  // 🧾 Últimos N mensajes
  async obtenerUltimos(cantidad: number) {
    return this.repo.find({
      order: { fechaSolicitud: 'DESC' },
      take: cantidad,
      select: ['nombre', 'apellido', 'fechaSolicitud'],
    });
  }

  // 📈 Conteo diario últimos 7 días
  async contarPorFechaUltimos7Dias() {
    const resultados = [];
    for (let i = 6; i >= 0; i--) {
      const fecha = subDays(new Date(), i);
      const inicio = startOfDay(fecha);
      const fin = endOfDay(fecha);
      const cantidad = await this.contarEntreFechas(inicio, fin);
      resultados.push({ fecha: format(fecha, 'yyyy-MM-dd'), cantidad });
    }
    return resultados;
  }

  // 📊 Recibidos vs Respondidos últimos 7 días
  async contarPorEstadoYFechaUltimos7Dias() {
    const resultados = [];
    for (let i = 6; i >= 0; i--) {
      const fecha = subDays(new Date(), i);
      const inicio = startOfDay(fecha);
      const fin = endOfDay(fecha);

      const recibidos = await this.contarEntreFechas(inicio, fin);
      const respondidos = await this.repo.count({
        where: {
          estado: 'respondido',
          fechaSolicitud: Between(inicio, fin),
        },
      });

      resultados.push({
        fecha: format(fecha, 'yyyy-MM-dd'),
        recibidos,
        respondidos,
      });
    }
    return resultados;
  }

  // 🟠 Detalle por estado con última modificación
  async obtenerResumenPorEstado() {
    const estados = ['pendiente', 'asignado', 'respondido', 'cerrado'];
    const resumen = [];

    for (const estado of estados) {
      const cantidad = await this.contarPorEstado(estado);
      const ultima = await this.repo.findOne({
        where: { estado },
        order: { fechaModificacion: 'DESC' },
        select: ['fechaModificacion'],
      });

      resumen.push({
        estado,
        cantidad,
        ultimaActualizacion: ultima?.fechaModificacion ?? null,
      });
    }

    return resumen;
  }
}

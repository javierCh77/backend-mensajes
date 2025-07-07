import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudTurno } from './entities/solicitud-turno.entity';
import { CreateSolicitudTurnoDto } from './dto/create-solicitud-turno.dto';
import { UpdateSolicitudTurnoDto } from './dto/update-solicitud-turno.dto';

@Injectable()
export class SolicitudesTurnoService {
  constructor(
    @InjectRepository(SolicitudTurno)
    private readonly repo: Repository<SolicitudTurno>,
  ) {}

  create(dto: CreateSolicitudTurnoDto) {
    const nueva = this.repo.create(dto);
    return this.repo.save(nueva);
  }

  findAll() {
    return this.repo.find({ order: { fechaSolicitud: 'DESC' } });
  }

  async findOne(id: string) {
    const solicitud = await this.repo.findOneBy({ id });
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    return solicitud;
  }

  async update(id: string, dto: UpdateSolicitudTurnoDto) {
    const solicitud = await this.findOne(id);
    Object.assign(solicitud, dto);
  
    // Si se modifica el estado, también registramos quién y cuándo lo hizo
    if (dto.estado) {
      solicitud.fechaModificacion = new Date();
      solicitud.usuarioModificacion = dto.usuarioModificacion; // ✅ GUARDAMOS el usuario
    }
  
    return this.repo.save(solicitud);
  }

  async remove(id: string) {
    const solicitud = await this.findOne(id);
    return this.repo.remove(solicitud);
  }
}

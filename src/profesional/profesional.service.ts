import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from './entities/profesional.entity';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Servicio } from '../servicio/entities/servicio.entity';

@Injectable()
export class ProfesionalService {
  constructor(
    @InjectRepository(Profesional)
    private readonly repo: Repository<Profesional>,

    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}

  async create(dto: CreateProfesionalDto) {
    const servicio = await this.servicioRepo.findOneByOrFail({ id: dto.servicioId });
    const profesional = this.repo.create({ ...dto, servicio });
    return this.repo.save(profesional);
  }

  findAll() {
    return this.repo.find({ order: { apellido: 'ASC' } });
  }

  async findOne(id: string) {
    const profesional = await this.repo.findOne({ where: { id } });
    if (!profesional) throw new NotFoundException('Profesional no encontrado');
    return profesional;
  }

  async update(id: string, dto: UpdateProfesionalDto) {
    const profesional = await this.findOne(id);
    if (dto.servicioId) {
      const servicio = await this.servicioRepo.findOneByOrFail({ id: dto.servicioId });
      profesional.servicio = servicio;
    }
    Object.assign(profesional, dto);
    return this.repo.save(profesional);
  }

  async remove(id: string) {
    const profesional = await this.findOne(id);
    return this.repo.remove(profesional);
  }
}

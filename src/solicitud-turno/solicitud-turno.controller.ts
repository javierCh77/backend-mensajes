import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SolicitudesTurnoService } from './solicitud-turno.service';
import { CreateSolicitudTurnoDto } from './dto/create-solicitud-turno.dto';
import { UpdateSolicitudTurnoDto } from './dto/update-solicitud-turno.dto';
import { User } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('solicitudes-turno')
export class SolicitudesTurnoController {
  constructor(private readonly service: SolicitudesTurnoService) {}

  @Post()
  create(@Body() dto: CreateSolicitudTurnoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSolicitudTurnoDto) {
    return this.service.update(id, {
      ...dto,
      fechaModificacion: new Date(), // <- igualmente lo registramos
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

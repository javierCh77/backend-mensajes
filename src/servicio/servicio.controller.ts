import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Post()
  create(@Body() dto: CreateServicioDto) {
    return this.servicioService.create(dto);
  }

  @Get()
  findAll() {
    return this.servicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServicioDto) {
    return this.servicioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicioService.remove(id);
  }
}

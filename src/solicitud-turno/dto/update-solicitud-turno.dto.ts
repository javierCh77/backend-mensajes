import { IsOptional, IsIn, IsString, IsDate, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSolicitudTurnoDto {
  @IsOptional()
  @IsIn(['pendiente', 'confirmado', 'cancelado'])
  estado?: string;

  @IsOptional()
  @IsString()
  usuarioModificacion?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaModificacion?: Date;
  
  @IsOptional()
  @IsISO8601()
  fechaHoraTurno?: string;
}

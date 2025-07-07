import { IsOptional, IsIn, IsString, IsDate } from 'class-validator';
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
}

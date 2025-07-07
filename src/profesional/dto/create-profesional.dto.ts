import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProfesionalDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  matricula: string;

  @IsUUID()
  servicioId: string;
}

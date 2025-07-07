import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateSolicitudTurnoDto {
  @IsNotEmpty() nombre: string;
  @IsNotEmpty() apellido: string;
  @IsNotEmpty() dni: string;
  @IsEmail() correo: string;
  @IsNotEmpty() telefono: string;
  @IsNotEmpty() especialidad: string;
  @IsNotEmpty() profesional: string;
  @IsNotEmpty() franjaHoraria: string;
  @IsNotEmpty() obraSocial: string;
}

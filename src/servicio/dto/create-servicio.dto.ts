import { IsNotEmpty } from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;
}

import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';



export enum RolUsuario {
  DESARROLLADOR = 'desarrollador',
  ADMINISTRACION = 'administracion',
  PRESTADOR = 'prestador',
  CONTABILIDAD = 'contabilidad',
  GERENCIA = 'gerencia',
}





export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  dni: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  celular: string;

  @IsOptional()
  @IsString()
  numeroMatricula?: string;

  @IsEnum(RolUsuario, { message: 'Rol inválido' })
  rol: RolUsuario;
}

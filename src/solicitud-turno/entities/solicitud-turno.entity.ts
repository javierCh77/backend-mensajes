import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('solicitudes_turno')
export class SolicitudTurno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  dni: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  especialidad: string;

  @Column()
  profesional: string;

  @Column()
  franjaHoraria: string;

  @Column()
  obraSocial: string;

  @CreateDateColumn()
  fechaSolicitud: Date;

  @Column({ default: 'pendiente' })
  estado: string; // pendiente | confirmado | cancelado

  // 👇 NUEVOS CAMPOS
  @Column({ nullable: true })
  usuarioModificacion: string;
  
  @Column({ type: 'timestamp', nullable: true })
  fechaModificacion: Date;
  
}

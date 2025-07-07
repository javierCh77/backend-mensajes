import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Servicio } from '../../servicio/entities/servicio.entity';
  
  @Entity('profesionales')
  export class Profesional {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nombre: string;
  
    @Column()
    apellido: string;
  
    @Column({ unique: true })
    dni: string;
  
    @Column()
    matricula: string;
  
    @ManyToOne(() => Servicio, { eager: true })
    @JoinColumn({ name: 'servicio_id' })
    servicio: Servicio;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
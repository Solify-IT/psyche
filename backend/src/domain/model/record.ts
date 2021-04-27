import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany,
} from 'typeorm';
import { Patient } from '.';
import PatientForm from './patientForm';

@Entity()
export default class Record {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: true })
  active?: boolean;

  @CreateDateColumn({ type: 'date' })
  startDate?: Date;

  @OneToMany(() => Patient, (patient) => patient.record, { cascade: true, eager: true, onDelete: 'CASCADE' })
  patients: Patient[];

  @OneToMany(() => PatientForm, (form) => form.record)
  forms: PatientForm[];
}

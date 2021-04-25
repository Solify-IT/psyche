import {
  Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '.';
import PatientFormField from './patientFormField';

@Entity()
export default class PatientForm {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'date' })
  createdDate?: Date;

  @OneToMany(() => PatientFormField, (field) => field.form, { cascade: true, eager: true, onDelete: 'CASCADE' })
  fields?: PatientFormField[];

  @ManyToOne(() => Patient, (patient) => patient.forms)
  patient?: Patient;
}

import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn,
} from 'typeorm';
import { Form } from '.';
import PatientForm from './patientForm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @CreateDateColumn({ type: 'date' })
  startDate?: Date;

  @Column()
  type: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  birthPlace: string;

  @Column({
    nullable: true,
  })
  birthDate: Date;

  @Column()
  postalCode: string;

  @OneToMany(() => PatientForm, (form) => form.patient, { cascade: true, eager: true, onDelete: 'CASCADE' })
  forms?: Form[];
}

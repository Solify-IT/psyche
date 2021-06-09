import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany,
} from 'typeorm';
import { Patient } from '..';
import PatientArea from './patientArea';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  address: string;

  @Column()
  zipCode: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @Column({ default: true })
  firstTime?: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  professionalLicense?: string;

  @Column({ nullable: true })
  telephone?: string;

  @Column({ nullable: true })
  workSchedule?: string;

  @OneToMany(() => PatientArea, (areas) => areas.user, { cascade: true, eager: true, onDelete: 'CASCADE' })
  patientAreas?: PatientArea[];

  @ManyToMany(() => Patient, (patient: Patient) => patient.users)
  patients: Patient[];
}

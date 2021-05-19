import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import PatientArea from './patientArea';
import Patient from '../patient';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  zipCode: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column({ default: true })
  firstTime?: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  professionalLicense: string;

  @OneToMany(() => PatientArea, (areas) => areas.user, { cascade: true, eager: true, onDelete: 'CASCADE' })
  patientAreas?: PatientArea[];

  @OneToMany(() => Patient, (patient) => patient.user, { cascade: true, eager: true, onDelete: 'CASCADE' })
  patients: Patient[];
}

import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import PatientForm from './patientForm';

@Entity()
export default class PatientFormField {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne(() => PatientForm, (form) => form.fields)
  form?: PatientForm;
}

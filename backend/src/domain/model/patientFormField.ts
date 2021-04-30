import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import PatientForm from './form';

@Entity()
export default class PatientFormField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => PatientForm, (form) => form.fields)
  form: PatientForm;
}

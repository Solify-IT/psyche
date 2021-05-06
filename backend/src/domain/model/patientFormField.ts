import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import PatientFieldOption from './patientFieldOption';
import PatientForm from './patientForm';

@Entity()
export default class PatientFormField {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  label: string;

  @Column()
  type: string;

  @Column({ default: '' })
  value: string;

  @OneToMany(() => PatientFieldOption, (options) => options.field, { cascade: true, eager: true, onDelete: 'CASCADE' })
  options: PatientFieldOption[];

  @ManyToOne(() => PatientForm, (form) => form.fields)
  form?: PatientForm;
}

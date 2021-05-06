import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import PatientFormField from './patientFormField';

@Entity()
export default class PatientFieldOption {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  label: string;

  @Column({ default: '' })
  value?: string;

  @Column({ default: false })
  checked?: boolean;

  @ManyToOne(() => PatientFormField, (field) => field.options)
  field?: PatientFormField;
}

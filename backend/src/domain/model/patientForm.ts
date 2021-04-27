import {
  Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import PatientFormField from './patientFormField';
import Record from './record';

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

  @ManyToOne(() => Record, (record) => record.forms)
  record?: Record;
}

import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import PatientFormField from './patientFormField';
import Record from './record';

@Entity()
export default class PatientForm {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @CreateDateColumn({ type: 'date' })
  createdDate?: Date;

  @OneToMany(() => PatientFormField, (field) => field.form, { cascade: true, eager: true, onDelete: 'CASCADE' })
  fields?: PatientFormField[];

  @ManyToOne(() => Record, (record) => record.forms)
  @JoinColumn()
  record?: Record;

  @Column()
  recordId: number;
}

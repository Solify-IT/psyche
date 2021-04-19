import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Form from './form';

@Entity()
export default class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => Form, (form) => form.fields)
  form: Form;
}

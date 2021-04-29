import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import FieldOption from './fieldOption';
import Form from './form';

@Entity()
export default class Field {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  label: string;

  @Column({ default: '' })
  value?: string;

  @Column()
  type: string;

  @ManyToOne(() => Form, (form) => form.fields)
  form?: Form;

  @OneToMany(() => FieldOption, (options) => options.field, { cascade: true, eager: true, onDelete: 'CASCADE' })
  options: FieldOption[];
}

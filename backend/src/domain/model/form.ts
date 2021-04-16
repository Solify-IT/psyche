import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Field from './field';

@Entity()
export default class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Field, (field) => field.form, { cascade: true, eager: true, onDelete: 'CASCADE' })
  fields: Field[];
}

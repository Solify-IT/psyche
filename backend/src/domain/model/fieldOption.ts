import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import Field from './field';

@Entity()
export default class FieldOption {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  label: string;

  @Column({ default: '' })
  value?: string;

  @Column({ default: false })
  checked?: boolean;

  @ManyToOne(() => Field, (field) => field.options, { onDelete: 'CASCADE' })
  field?: Field;
}

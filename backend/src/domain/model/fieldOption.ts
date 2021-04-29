import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Field } from '.';

@Entity()
class FieldOption {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  label: string;

  @Column({ default: '' })
  value?: string;

  @Column({ default: false })
  checked?: boolean;

  @ManyToOne(() => Field, (field) => field.options)
  field?: Field;
}
export default FieldOption;

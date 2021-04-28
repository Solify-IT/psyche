import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Field } from '.';
// eslint-disable-next-line import/no-cycle

@Entity()
class FieldOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  value: string;

  @ManyToOne(() => Field, (field) => field.options)
  field: Field;
}
export default FieldOption;

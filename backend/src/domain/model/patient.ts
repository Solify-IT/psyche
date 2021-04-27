import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  type: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  birthPlace: string;

  @Column()
  birthDate: string;

  @Column()
  postalCode: string;

  @Column()
  area: string;

  @Column()
  doctor_id: number;
}

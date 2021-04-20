import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  type: string;

  @Column()
  costPerSession: number;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  civilStatus: string;

  @Column()
  notes: string;

//  @Column()
//  person: Person;
}

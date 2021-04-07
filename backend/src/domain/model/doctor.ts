import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Doctor {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;
}

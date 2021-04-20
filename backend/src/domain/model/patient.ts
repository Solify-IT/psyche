import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

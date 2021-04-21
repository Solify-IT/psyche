import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;
}

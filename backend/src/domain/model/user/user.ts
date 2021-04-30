import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  zipCode: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;
}

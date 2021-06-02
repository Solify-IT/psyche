import Record from 'domain/model/record';
import User from 'domain/model/user/user';
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @CreateDateColumn({ type: 'date' })
  startDate?: Date;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  telephone: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  birthPlace: string;

  @Column({ nullable: false })
  birthDate: Date;

  @Column({ nullable: false })
  postalCode: number;

  @Column({ nullable: false })
  motive: string;

  @Column({ nullable: false })
  legalProceeding: boolean;

  @Column({ nullable: false })
  status: boolean;

  @Column({ nullable: false })
  abuseType: string;

  @Column({ nullable: true })
  abuseFirstTime: string;

  @Column({ nullable: true })
  abuseAttempts: string;

  @Column({ nullable: true })
  abuseMotive: string;

  @Column({ name: 'record_id' })
  recordId: number;

  @Column({ name: 'user_id', nullable: true })
  userId?: number;

  @ManyToOne(() => Record, (record) => record.patients)
  @JoinColumn({ name: 'record_id' })
  record?: Record;

  @ManyToOne(() => User, (user) => user.patients)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

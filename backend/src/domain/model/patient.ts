import Record from 'domain/model/record';
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
  area: string;

  @Column({ name: 'record_id' })
  recordId: number;

  @ManyToOne(() => Record, (record) => record.patients)
  @JoinColumn({ name: 'record_id' })
  record?: Record;
}

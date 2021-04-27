import Record from 'domain/model/record';
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne,
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

  @ManyToOne(() => Record, (record) => record.patients)
  record: Record;
}

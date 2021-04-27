<<<<<<< HEAD
import {
  Entity, Column, PrimaryGeneratedColumn,
=======
import Record from 'domain/model/record';
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne,
>>>>>>> feat/patientDetail
} from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

<<<<<<< HEAD
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
=======
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
  record?: Record;
>>>>>>> feat/patientDetail
}

import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

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
  birthDate: string;

  @Column({ nullable: false })
  postalCode: number;
}

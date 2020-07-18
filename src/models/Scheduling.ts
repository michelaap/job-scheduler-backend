import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedulings')
class Scheduling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Scheduling;

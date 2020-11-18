import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int', width: 200 })
  public value: number;
}

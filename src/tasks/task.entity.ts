import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { statusType } from './task.model';
import { User } from 'src/auth/user.entitiy';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: statusType;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}

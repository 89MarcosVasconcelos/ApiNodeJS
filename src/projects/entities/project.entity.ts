import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;
  
  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn()
  user: User;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}

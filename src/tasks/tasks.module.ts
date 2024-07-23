import { Module } from '@nestjs/common';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [ProjectsModule, UsersModule, TypeOrmModule.forFeature([Task, Project])],
  controllers: [TasksController],
  providers: [TasksService],
})



export class TasksModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly usersService: UsersService
  ) {}

  async create(userEmail: string, createTaskDto: CreateTaskDto) {

    const user = await this.usersService.findOneByOrFail({
      email: userEmail 
    });

    const project = await this.projectRepository.findOneByOrFail({ 
      id: createTaskDto.projectId
    });

    return this.taskRepository.save({ ...createTaskDto, project, user})
  }

  async findAll(userEmail: string) {
    const user = await this.usersService.findOneByOrFail({ email: userEmail })

    return this.taskRepository.find({
      relations: ["project"],
      where: { user }
    });
  }

  async findOne(userEmail: string, id: number) {
    const user = await this.usersService.findOneByOrFail({
      email: userEmail
    })

  return this.taskRepository.find({ where: { id, user}, relations: ["project"]}); 
  }

  async update(userEmail: string, id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.usersService.findOneByOrFail({
      email: userEmail
    })

    const task = this.taskRepository.findOneByOrFail({id, user})

    if(!task) {
      throw new UnauthorizedException();
    }

    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}

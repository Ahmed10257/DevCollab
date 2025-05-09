import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from 'src/repositories/task.repository';
import { Logger } from 'nestjs-pino';

@Injectable()
export class TaskService {

  constructor(private taskRepo: TaskRepository, private readonly logger: Logger) { }

  create(createTaskDto: CreateTaskDto) {
    this.logger.log({ msg: 'Creating task: ', createTaskDto }, 'TaskService');
    return this.taskRepo.createTask(createTaskDto);
  }

  findAll() {
    return this.taskRepo.findAllTasks();
  }

  findOne(id: number) {
    return this.taskRepo.findTaskById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    this.logger.log({ msg: 'Updating task: ', updateTaskDto }, 'TaskService');
    return this.taskRepo.updateTask(id, updateTaskDto);
  }

  remove(id: number) {
    this.logger.log({ msg: 'Deleting task with id: ', id }, 'TaskService');
    return this.taskRepo.deleteTask(id);
  }
}

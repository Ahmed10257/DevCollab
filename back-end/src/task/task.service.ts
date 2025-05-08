import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from 'src/repositories/task.repository';

@Injectable()
export class TaskService {

  constructor(private taskRepo: TaskRepository) { }

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepo.createTask(createTaskDto);
  }

  findAll() {
    return this.taskRepo.findAllTasks();
  }

  findOne(id: number) {
    return this.taskRepo.findTaskById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepo.updateTask(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepo.deleteTask(id);
  }
}

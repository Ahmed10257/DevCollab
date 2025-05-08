import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from 'src/repositories/task.repository';
import { DirzzleModule } from 'src/dirzzle/dirzzle.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  imports: [DirzzleModule],
})
export class TaskModule { }

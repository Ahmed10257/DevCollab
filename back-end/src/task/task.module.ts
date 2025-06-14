import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from 'src/repositories/task.repository';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  imports: [DrizzleModule],
})
export class TaskModule { }

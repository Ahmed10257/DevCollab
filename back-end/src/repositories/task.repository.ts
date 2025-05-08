import { Injectable } from "@nestjs/common";
import { DrizzleDB } from "src/dirzzle/types/drizzle";
import { tasks } from "src/dirzzle/schema/task.schema";
import { eq } from "drizzle-orm";
import { DRIZZLE } from "src/dirzzle/dirzzle.module";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";

@Injectable()
export class TaskRepository {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) { }

    async createTask(task: CreateTaskDto): Promise<any> {
        return this.db.insert(tasks).values(task).returning();
    }

    async findAllTasks(): Promise<any[]> {
        return this.db.select().from(tasks);
    }

    async findTaskById(id: number): Promise<any | null> {
        const task = await this.db.select().from(tasks).where(eq(tasks.id, id)).execute();
        return task || null;
    }

    async updateTask(id: number, task: UpdateTaskDto): Promise<any> {
        return this.db.update(tasks).set(task).where(eq(tasks.id, id)).returning();
    }

    async deleteTask(id: number): Promise<void> {
        await this.db.delete(tasks).where(eq(tasks.id, id)).execute();
    }
}
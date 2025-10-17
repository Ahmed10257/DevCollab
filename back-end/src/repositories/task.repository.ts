import { Injectable, Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DrizzleDB } from "../drizzle/types/drizzle";
import { tasks } from "../drizzle/schema/task.schema";
import { DRIZZLE } from "../drizzle/drizzle.module";
import { CreateTaskDto } from "../task/dto/create-task.dto";
import { UpdateTaskDto } from "../task/dto/update-task.dto";

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
import { eq } from 'drizzle-orm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { users } from '../dirzzle/schema/user.schema';
import { DrizzleDB } from 'src/dirzzle/types/drizzle';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { DRIZZLE } from 'src/dirzzle/dirzzle.module';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';



@Injectable()
export class UsersRepository {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }

    findAll() {
        return this.db.query.users.findMany();
    }


    findByEmail(email: string) {
        return this.db.query.users.findFirst({ where: eq(users.email, email) });
    }

    create(user: CreateUserDto) {
        return this.db.insert(users).values(user).returning();
    }

    findById(id: number) {
        return this.db.query.users.findFirst({ where: eq(users.id, id) });
    }

    update(id: number, user: UpdateUserDto) {
        return this.db.update(users).set(user).where(eq(users.id, id)).returning();
    }

    delete(id: number) {
        return this.db.delete(users).where(eq(users.id, id)).returning();
    }
}

import { eq } from 'drizzle-orm';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { users } from '../drizzle/schema/user.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { DRIZZLE } from '../drizzle/drizzle.module';
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class UsersRepository {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }

    findAll() {
        return this.db.query.users.findMany();
    }

    findByEmail(email: string) {
        return this.db.query.users.findFirst({ where: eq(users.email, email) });
    }

    findByUsername(username: string) {
        return this.db.query.users.findFirst({ where: eq(users.username, username) });
    }

    create(user: CreateUserDto & { role?: string }) {
        return insertReturning(this.db, users, {
            ...user,
            role: user.role ?? 'user',
        });
    }

    createFromAd(data: {
        username: string;
        name: string;
        email: string;
        role: string;
    }) {
        return insertReturning(this.db, users, {
            username: data.username,
            name: data.name,
            email: data.email,
            role: data.role,
            isVerified: true,
        });
    }

    findById(id: number) {
        return this.db.query.users.findFirst({ where: eq(users.id, id) });
    }

    update(id: number, user: UpdateUserDto & { role?: string; username?: string }) {
        return updateReturning(this.db, users, eq(users.id, id), user);
    }

    updateRefreshToken(userId: number, refreshToken: string | null) {
        return updateReturning(this.db, users, eq(users.id, userId), { refreshToken });
    }

    delete(id: number) {
        return deleteReturningById(this.db, users, id);
    }
}

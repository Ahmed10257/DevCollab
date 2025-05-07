import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from 'src/dirzzle/dirzzle.module';
import { DrizzleDB } from 'src/dirzzle/types/drizzle';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { users } from '../dirzzle/schema';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }
  async create(createUserDto: CreateUserDto) {
    return await this.db.insert(users).values(createUserDto);
  }

  async findAll() {
    return await this.db.select().from(users);
  }

  async findOne(id: number) {
    return await this.db.query.users.findFirst({
      where: (users) => users.id.equals(id),
    });
  }

  async findUserByEmail(email: string) {
    return await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null) {
    return await this.db.query.users.update({
      where: (users) => users.id.equals(userId),
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

}

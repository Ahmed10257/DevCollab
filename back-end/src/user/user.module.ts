import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersRepository } from 'src/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  imports: [DrizzleModule],
  exports: [UserService],
})
export class UserModule { }

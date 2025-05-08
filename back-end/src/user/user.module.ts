import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DirzzleModule } from 'src/dirzzle/dirzzle.module';
import { UsersRepository } from 'src/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  imports: [DirzzleModule],
  exports: [UserService],
})
export class UserModule { }

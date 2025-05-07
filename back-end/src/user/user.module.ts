import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DirzzleModule } from 'src/dirzzle/dirzzle.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DirzzleModule],
  exports: [UserService],
})
export class UserModule { }

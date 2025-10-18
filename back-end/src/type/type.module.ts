import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeRepository } from '../repositories/type.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [TypeController],
  providers: [TypeService, TypeRepository],
  exports: [TypeService],
})
export class TypeModule {}

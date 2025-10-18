import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { ModelRepository } from '../repositories/model.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [ModelController],
  providers: [ModelService, ModelRepository],
  exports: [ModelService, ModelRepository],
})
export class ModelModule {}

import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerRepository } from '../repositories/manufacturer.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [ManufacturerController],
  providers: [ManufacturerService, ManufacturerRepository],
  exports: [ManufacturerService, ManufacturerRepository],
})
export class ManufacturerModule {}

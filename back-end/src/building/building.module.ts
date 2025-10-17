import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { BuildingsRepository } from '../repositories/building.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
    imports: [DrizzleModule],
    controllers: [BuildingController],
    providers: [BuildingService, BuildingsRepository],
    exports: [BuildingService, BuildingsRepository],
})
export class BuildingModule {}

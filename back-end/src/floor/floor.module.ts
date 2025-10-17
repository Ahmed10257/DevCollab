import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { FloorsRepository } from '../repositories/floor.repository';

@Module({
    controllers: [FloorController],
    providers: [FloorService, FloorsRepository],
    exports: [FloorService, FloorsRepository],
})
export class FloorModule {}

import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomsRepository } from '../repositories/room.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
    imports: [DrizzleModule],
    controllers: [RoomController],
    providers: [RoomService, RoomsRepository],
    exports: [RoomService, RoomsRepository],
})
export class RoomModule {}

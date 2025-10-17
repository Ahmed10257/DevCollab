import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomsRepository } from '../repositories/room.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
    constructor(private readonly roomsRepository: RoomsRepository) {}

    async findAll() {
        return await this.roomsRepository.findAll();
    }

    async findByFloor(floorId: number) {
        return await this.roomsRepository.findByFloorId(floorId);
    }

    async findOne(id: number) {
        const room = await this.roomsRepository.findById(id);
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return room;
    }

    async create(createRoomDto: CreateRoomDto) {
        const result = await this.roomsRepository.create(
            createRoomDto.name,
            createRoomDto.floorId
        );
        return result[0];
    }

    async update(id: number, updateRoomDto: UpdateRoomDto) {
        await this.findOne(id); // Check if exists
        const result = await this.roomsRepository.update(
            id,
            updateRoomDto.name!,
            updateRoomDto.floorId
        );
        return result[0];
    }

    async remove(id: number) {
        await this.findOne(id); // Check if exists
        const result = await this.roomsRepository.delete(id);
        return result[0];
    }
}

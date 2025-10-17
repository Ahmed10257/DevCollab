import { Injectable, NotFoundException } from '@nestjs/common';
import { FloorsRepository } from '../repositories/floor.repository';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@Injectable()
export class FloorService {
    constructor(private readonly floorsRepository: FloorsRepository) {}

    async findAll() {
        return await this.floorsRepository.findAll();
    }

    async findByBuilding(buildingId: number) {
        return await this.floorsRepository.findByBuildingId(buildingId);
    }

    async findOne(id: number) {
        const floor = await this.floorsRepository.findById(id);
        if (!floor) {
            throw new NotFoundException(`Floor with ID ${id} not found`);
        }
        return floor;
    }

    async create(createFloorDto: CreateFloorDto) {
        const result = await this.floorsRepository.create(
            createFloorDto.name,
            createFloorDto.buildingId
        );
        return result[0];
    }

    async update(id: number, updateFloorDto: UpdateFloorDto) {
        await this.findOne(id); // Check if exists
        const result = await this.floorsRepository.update(
            id,
            updateFloorDto.name!,
            updateFloorDto.buildingId
        );
        return result[0];
    }

    async remove(id: number) {
        await this.findOne(id); // Check if exists
        const result = await this.floorsRepository.delete(id);
        return result[0];
    }
}
